require('dotenv').config();

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const cooldowns = new Discord.Collection();

// const fetch = require('node-fetch');

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

client.on('message', async (receivedMessage) => {
  // if(receivedMessage.author == client.user) return;

  // if(receivedMessage.content.startsWith("!")){
  //   processCommand(receivedMessage);
  // }
  
  // receivedMessage.channel.send("Mensagem recebida " + receivedMessage.author.toString() + ": " + receivedMessage.content);
  let prefix = "!";

  if(!receivedMessage.content.startsWith(prefix) || receivedMessage.author.bot) return;

  const args = receivedMessage.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // if(!client.commands.has(commandName)) return console.log('Nao tem esse comando');

  // const command = client.commands.get(commandName);

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd. aliases.includes(commandName));

  if(!command) return console.log('Nao tem esse comando');

  // Required arguments config
  if(command.args && !args.length){
    return receivedMessage.channel.send(`Não entendi seu comando. Tente \`${receivedMessage} [topic]\``);
  }

  // Cooldown config
  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown) * 1000;

  if(timestamps.has(receivedMessage.author.id)){
    const expirationTime = timestamps.get(receivedMessage.author.id) + cooldownAmount;

    if(now < expirationTime){
      const timeLeft = (expirationTime - now) / 1000;
      return receivedMessage.reply(`Espere ${timeLeft.toFixed(1)} segundos antes de usar \`${receivedMessage}\` novamente`);
    }
  }

  timestamps.set(receivedMessage.author.id, now);
  setTimeout(() => timestamps.delete(receivedMessage.author.id), cooldownAmount);
  
  try{
    command.execute(receivedMessage, args);
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
