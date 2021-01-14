const { Message } = require("discord.js");

module.exports = {
  name: 'help',
  description: 'help command',
  execute(receivedMessage, arg){
    if(arg.length == 0){
      receivedMessage.channel.send("Não entendi seu comando. Tente `!help [topico]`");
    } else {
      receivedMessage.channel.send(`Parece que você precisa de ajuda com ${arg}`);
    }
  },
};