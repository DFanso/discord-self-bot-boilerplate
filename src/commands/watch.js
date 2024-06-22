const watchedChannels = new Map();
const lastMessageCache = new Map();

module.exports = {
    name: 'watch',
    description: 'Watches a specific channel and forwards the latest message to other channels.',
    execute(client, message, args) {
        if (args.length < 2) {
            return message.reply('You need to provide the channel ID to watch and at least one channel ID to forward to!');
        }

        const [sourceChannelId, ...targetChannelIds] = args;
        const sourceChannel = message.guild.channels.cache.get(sourceChannelId);

        if (!sourceChannel || sourceChannel.type !== 'GUILD_TEXT') {
            return message.reply('Invalid source channel ID!');
        }

        const validTargetChannels = targetChannelIds.map(id => message.guild.channels.cache.get(id)).filter(channel => channel && channel.type === 'GUILD_TEXT');

        if (validTargetChannels.length === 0) {
            return message.reply('No valid target channels provided!');
        }

        watchedChannels.set(sourceChannelId, validTargetChannels);

        message.reply(`Now watching <#${sourceChannelId}> and forwarding messages to: ${validTargetChannels.map(channel => `<#${channel.id}>`).join(', ')}`);
        console.log(`Now watching ${sourceChannelId} and forwarding messages to: ${validTargetChannels.map(channel => channel.id).join(', ')}`);

        // Start polling for new messages every 10 seconds
        if (!lastMessageCache.has(sourceChannelId)) {
            lastMessageCache.set(sourceChannelId, null);
            setInterval(async () => {
                try {
                    const messages = await sourceChannel.messages.fetch({ limit: 1 });
                    const lastMessage = messages.first();

                    if (lastMessage && lastMessage.id !== lastMessageCache.get(sourceChannelId)) {
                        lastMessageCache.set(sourceChannelId, lastMessage.id);
                        validTargetChannels.forEach(channel => {
                            channel.send(`${lastMessage.content}`)
                                .then(() => console.log(`Message forwarded to ${channel.id}`))
                                .catch(console.error);
                        });
                    }
                } catch (error) {
                    console.error(`Error fetching messages: ${error}`);
                }
            }, 10000); // 10000 ms = 10 seconds
        }
    },
};

module.exports.watchedChannels = watchedChannels;
