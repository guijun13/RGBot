module.exports = {
  name: 'server',
  description: 'server command',
  execute(receivedMessage, arg){
    if(arg.length == 0){
      receivedMessage.channel.send(`O nome desse server é ${receivedMessage.guild.name}`);
    }
  },
};