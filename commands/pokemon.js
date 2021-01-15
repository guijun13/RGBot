const fetch =  require('node-fetch');
module.exports = {
  name: 'poke',
  description: 'poke command',
  args: true,
  async execute(receivedMessage, arg){
    
    let url = `https://pokeapi.co/api/v2/pokemon/${arg}`;
    let response = await fetch(url);
    let json = await response.json();
    // console.log(json.sprites.other['official-artwork'].front_default);

    receivedMessage.channel.send(json.sprites.other['official-artwork'].front_default);
  },
}