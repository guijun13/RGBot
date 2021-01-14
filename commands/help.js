module.exports = {
  name: 'help',
  description: 'help command',
  args: true,
  execute(receivedMessage, arg){
    receivedMessage.channel.send(`Parece que você precisa de ajuda com \`${arg}\``);
  },
};