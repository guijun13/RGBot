module.exports = {
  name: 'user',
  description: 'user command',
  args: false,
  cooldown: 5, // segundos
  execute(receivedMessage){
    receivedMessage.channel.send(`Seu usuário: ${receivedMessage.author.username}\nSeu ID: ${receivedMessage.author.id}`);
  },
};