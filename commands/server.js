module.exports = {
  name: 'server',
  aliases: ['servidor', 's'],
  description: 'server command',
  args: false,
  execute(receivedMessage){
    receivedMessage.channel.send(`O nome desse server é ${receivedMessage.guild.name}`);
  },
};