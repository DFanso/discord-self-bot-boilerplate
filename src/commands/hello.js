module.exports = {
    name: 'hello',
    description: 'Responds with Hello World!',
    execute(client, message) {
        message.channel.send('Hello World!');
    },
};
