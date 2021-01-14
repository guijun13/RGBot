module.exports = {
  name: 'server',
  description: 'server command',
  args: false,
  execute(receivedMessage){
    receivedMessage.channel.send(`O nome desse server é ${receivedMessage.guild.name}`);
  },
};