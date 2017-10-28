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
  const modlog = client.channels.find('name', 'mod-log');
  if (!modlog) return msg.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return msg.reply('You must supply a reason for the kick.');
  if (msg.mentions.users.size < 1) return msg.reply('You must mention someone to kick them.').catch(console.error);

  if (!msg.guild.member(user).kickable) return msg.reply('I cannot kick that member');
  msg.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${msg.author.tag}\n**Reason:** ${reason}`);
  return client.channels.get(modlog.id).send({embed});
}
})

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "'" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("message", message => {
  const args = message.content.split(" ").slice(1);

if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== "239847961717112833") return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        var embed = new Discord.RichEmbed()
  .addField("The code is down there v" , clean(evaled), {code:"xl"}.true)
  .setColor(0x0000FF)
message.channel.sendEmbed(embed);
  } catch (err) {
  var error = new Discord.RichEmbed()
  .addField("rip there is a error" , `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``.true)
  .setColor(0x0000FF)
message.channel.sendEmbed(error);
  }
 }
});

client.login(process.env.BOT_TOKEN);
