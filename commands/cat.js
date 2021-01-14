const fetch =  require('node-fetch');
module.exports = {
  name: 'cat',
  description: 'cat command',
  args: false,
  async execute(receivedMessage){
    fetch('https://aws.random.cat/meow').then(response => response.json());
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

    receivedMessage.channel.send(file);
  },
};