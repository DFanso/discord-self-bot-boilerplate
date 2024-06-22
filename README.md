# Discord Self-Bot Boilerplate

![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![Yarn Version](https://img.shields.io/badge/yarn-%3E%3D1.22.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Overview

This is a boilerplate project for creating a self-bot using `discord.js-selfbot-v13`. It includes commands for joining voice channels, playing audio clips, and watching text channels to forward messages.

## Features

- Join and play audio clips in voice channels.
- Watch specific text channels and forward messages.
- Easy command structure for adding new functionalities.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Yarn >= 1.22.0

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/dfanso/discord-self-bot-boilerplate.git
   cd discord-self-bot-boilerplate
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

### Configuration

1. Rename `config.example.json` to `config.json` and update the values:
   ```json
   {
     "token": "YOUR_DISCORD_TOKEN"
   }
   ```

2. Ensure you have a `music` folder in the `src` directory containing the audio clips you want to play.

### Running the Bot

Start the bot using Yarn:
```sh
yarn start
```

## Commands

### `!hello`

Responds with "Hello World!".

### `!voice <voiceChannelId>`

Joins the specified voice channel and plays an audio clip repeatedly for 24 hours.

### `!watch <sourceChannelId> <targetChannelId1> <targetChannelId2> ...`

Watches the specified source text channel and forwards new messages to the target channels every 10 seconds.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## Acknowledgements

- [discord.js-selfbot-v13](https://github.com/aiko-chan-ai/discord.js-selfbot-v13)
- [libsodium-wrappers](https://github.com/jedisct1/libsodium.js)
- [prism-media](https://github.com/amishshah/prism-media)
