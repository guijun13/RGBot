require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log("Connected as " + client.user.tag);

  client.guilds.cache.forEach((guild) => {
    console.log(" - " + guild.name);
    // List all channels
    guild.channels.cache.forEach((channel) => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    });
  });

  let generalChannel = client.channels.cache.get("797996459651498017");
  generalChannel.send("Hello world!");
})

client.on('message', (receivedMessage) => {
  if(receivedMessage.author == client.user){
    return;
  }

  // receivedMessage.channel.send("Mensagem recebida " + receivedMessage.author.toString() + ": " + receivedMessage.content);

  if(receivedMessage.content.startsWith("!")){
    processCommand(receivedMessage);
  }

})

function processCommand(receivedMessage){
  let fullCommand = receivedMessage.content.substr(1);
  let splitCommand = fullCommand.split(" ");
  let primaryCommand = splitCommand[0];
  let arguments = splitCommand.slice(1);

  if(primaryCommand == "help"){
    helpCommands(arguments, receivedMessage);
  }
}

function helpCommands(arguments, receivedMessage){
  if(arguments.length == 0){
    receivedMessage.channel.send("Não entendi seu comando. Tente `!help [topico]`");
  } else {
    receivedMessage.channel.send("Parece que você precisa de ajuda com " + arguments);
  }
}

client.login(process.env.BOTTOKEN);
