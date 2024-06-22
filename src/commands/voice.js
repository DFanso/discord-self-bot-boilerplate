const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const fs = require('fs');
const path = require('path');
const prism = require('prism-media');

module.exports = {
    name: 'voice',
    description: 'Joins the specified voice channel, plays a clip repeatedly for 24 hours.',
    async execute(client, message, args) {
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

        const player = createAudioPlayer();

        const playAudioClip = () => {
            const musicFolderPath = path.join(__dirname, '..', 'music');
            const files = fs.readdirSync(musicFolderPath);
            const audioFilePath = path.join(musicFolderPath, files[0]); // Modify as needed to select different files

            const resource = createAudioResource(audioFilePath, {
                inputType: prism.FFmpeg,
            });

            player.play(resource);
        };

        playAudioClip();

        player.on(AudioPlayerStatus.Idle, () => {
            playAudioClip(); // Repeat the clip when it finishes
        });

        connection.subscribe(player);

        // Stop the player after 24 hours
        setTimeout(() => {
            player.stop();
            connection.destroy();
            message.reply('Stopped playing and left the voice channel after 24 hours.');
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    },
};
