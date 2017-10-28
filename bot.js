const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "="

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})
client.on("message", function(msg){
  console.log(`${msg.author}in #${msg.channel.name} or ${msg.guild.name} ${msg.content}`)
})

client.on('message', msg => {
  if(msg.author.bot || !msg.content.startsWith(prefix)) {
    return;
  }
  var command = msg.content.split(" ")[0].slice(prefix.length).toLowerCase()
  var args = msg.content.split(" ").slice(1);
  let say = args.join(" ")
  if(command === "ping") {
	msg.channel.send("Pinging...").then(function(m) {
    m.edit(`Pong! Took ${m.createdTimestamp - msg.createdTimestamp}ms`)
	})
  }
  var help = new Discord.RichEmbed()
  .addField("Help", "Thanks for jmmousee for beeing a good sport anyways the commands are &help, &ping and &eval")
  .setColor(0x0000FF)
  if(command === "help") {
msg.channel.sendEmbed(help);
  }
if(command === "kick") {
  const reason = args.slice(1).join(' ');
  const user = msg.mentions.users.first();
  const modlog = bot.channels.find('name', 'mod-log');
  if (!modlog) return msg.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return msg.reply('You must supply a reason for the kick.');
  if (msg.mentions.users.size < 1) return msg.reply('You must mention someone to kick them.').catch(console.error);

  if (!msg.guild.member(user).kickable) return msg.reply('I cannot kick that member');
  msg.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${msg.author.tag}\n**Reason:** ${reason}`);
  return bot.channels.get(modlog.id).send({embed});
}
})
client.login(process.env.BOT_TOKEN);
