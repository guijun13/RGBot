require('dotenv').config();

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

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
  // if(receivedMessage.author == client.user) return;

  // if(receivedMessage.content.startsWith("!")){
  //   processCommand(receivedMessage);
  // }
  
  // receivedMessage.channel.send("Mensagem recebida " + receivedMessage.author.toString() + ": " + receivedMessage.content);
  let prefix = "!";

  if(!receivedMessage.content.startsWith(prefix) || receivedMessage.author.bot) return;

  const args = receivedMessage.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if(!client.commands.has(command)) return console.log('Nao tem esse comando');
  
  try{
    client.commands.get(command).execute(receivedMessage, args);
  } catch (error) {
    console.error(error);
    receivedMessage.reply('Houve um erro ao executar esse comando!');
  }
});

// function processCommand(receivedMessage){
//   let fullCommand = receivedMessage.content.substr(1);
//   let splitCommand = fullCommand.split(" ");
//   let primaryCommand = splitCommand[0];
//   let command = splitCommand.slice(1);

client.login(process.env.BOTTOKEN);
