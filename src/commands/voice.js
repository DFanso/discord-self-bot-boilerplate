const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'voice',
    description: 'Joins the specified voice channel and stays there.',
    execute(client, message, args) {
        if (!args.length) {
            return message.reply('You need to provide a voice channel ID!');
        }

        const voiceChannelId = args[0];
        const voiceChannel = message.guild.channels.cache.get(voiceChannelId);

        if (!voiceChannel || voiceChannel.type !== 'GUILD_VOICE') {
            return message.reply('Invalid voice channel ID!');
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false
        });

        connection.on('error', console.error);

        message.reply(`Joined voice channel: ${voiceChannel.name}`);
    },
};
