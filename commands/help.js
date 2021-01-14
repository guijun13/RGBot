module.exports = {
  name: 'help',
  description: 'help command',
  execute(receivedMessage){
    receivedMessage.channel.send("Não entendi seu comando. Tente `!help [topico]`");
  },
};