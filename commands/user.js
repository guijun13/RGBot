module.exports = {
  name: 'user',
  description: 'user command',
  execute(receivedMessage, arg){
    if(arg.length == 0){
          receivedMessage.channel.send(`Seu usuário: ${receivedMessage.author.username}\nSeu ID: ${receivedMessage.author.id}`)
        }
  },
};