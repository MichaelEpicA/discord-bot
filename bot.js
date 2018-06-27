const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const botSettings = require("./botsettings.json")
const prefix = botSettings.prefix
bot.commands = new Discord.Collection();

fs.readdir("./Commands/", (err,files) => {

if(err) console.log(err);

var jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0){
	console.log("oof no commands")
	return;
}
jsfile.forEach((f,i) =>{
var props = require(`./Commands/${f}`);
console.log(`${f} loaded`)
bot.commands.set(props.help.name, props)
})
})

//const db = require('quick.db');
//var db = require('quick.db')

bot.login(botSettings.token)
//bot.login(process.env.BOT_TOKEN)


bot.on('ready', function() {
  console.log(`Ready as: ${bot.user.tag}`)
  console.log(`In ${bot.guilds.size} servers`)
  console.log(`https://discordapp.com/oauth2/authorize?client_id=336874091057381386&scope=bot&permissions=1610083455`)
	  bot.user.setActivity(`in ${bot.guilds.size} servers| &help`, { type: "Listening" });
})


bot.on("message",function(msg) {
	if (!msg.content.startsWith(prefix))
 return;
  //var command = msg.content.split(" ")[0].slice(prefix.length).toLowerCase()
	var messageArray = msg.content.split(" ");
  var cmd = messageArray[0];
  var args = messageArray.slice(1);
	var commandfile = bot.commands.get(cmd.slice(prefix.length));
	  if(commandfile) commandfile.run(bot,msg,args);
  let suffix = args.join(" ")
	//if(msg.author.bot) return;
	if(msg.channel.type === "dm") return;


 // var noreason = new Discord.RichEmbed()
  //.addField("Kick/Ban", "Please Supply a reason")
 // .setFooter("Mouse-Bot#9560", bot.user.avatarURL)
  //.setColor(0x0000FF)

// var notnsfw = new Discord.RichEmbed()
// .addField("NSFW", "This channel is not NSFW")
//  .setFooter("Mouse-Bot#9560", bot.user.avatarURL)
//  .setColor(0x0000FF)
//f(command === "lewd") {
//	msg.delete();
 // if(!msg.channel.nsfw) return msg.channel.sendEmbed(notnsfw);
//  var nsfw = ['https://cdn.discordapp.com/attachments/422584638154997761/422914876768518154/lewd_neko373.jpeg', 'https://cdn.discordapp.com/attachments/422584638154997761/422914857529245718/lewd_neko807.jpg', 'https://cdn.discordapp.com/attachments/422584638154997761/422914839032233984/lewd_neko490.jpeg', 'https://cdn.discordapp.com/attachments/422584638154997761/422914802524880896/lewd_neko399.jpeg', 'https://cdn.discordapp.com/attachments/422584638154997761/422914800532717571/lewd_neko215.jpeg', 'https://cdn.discordapp.com/attachments/422584638154997761/422914224025632769/lewd_neko296.jpeg', 'https://cdn.discordapp.com/attachments/422584638154997761/422913841345855489/lewd_neko107.jpeg', 'https://cdn.discordapp.com/attachments/422584638154997761/422913774291517440/lewd_neko363.jpg', 'https://cdn.discordapp.com/attachments/422584638154997761/422913738694459395/lewd_neko162.png', 'https://cdn.discordapp.com/attachments/422584638154997761/422913717894643712/lewd_neko057.jpg', 'https://cdn.discordapp.com/attachments/422584638154997761/423299470361624606/lewd_neko181.jpg']

//  var lewd = Math.floor((Math.random() * nsfw.length));

//  var isnsfw = new Discord.RichEmbed()
//  .setTitle("NSFW")
 // .setImage(nsfw[lewd])
 // .setFooter("Mouse-Bot#9560", bot.user.avatarURL)
 // .setColor(0x0000FF)
 // msg.channel.sendEmbed(isnsfw)
//}



if(msg.content.includes("kek")) {
    msg.channel.send("***Oh we kekkin?***", {files: ["./images/LMAO.png"]});
		return;
}
if(msg.content.includes("gay")) {
    msg.channel.send("***I am not gay........................................***", {files: ["./images/gay.jpg"]});
		return;
}
})

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "'" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

bot.on("message", message => {
	var noot4u = new Discord.RichEmbed()
  .addField("Eval", "This is not for you because you can destroy my whole bot and break and copy my code so that is why u no has access")
  .setFooter("Mouse-Bot#9560", bot.user.avatarURL)
  .setColor(0x0000FF)
  const args = message.content.split(" ").slice(1);

if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== "162587551721324544") return message.channel.sendEmbed(noot4u);
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        var embed = new Discord.RichEmbed()
  .addField("Eval" , clean(evaled), {code:"xl"}.true)
.setFooter("Mouse-Bot#9560", bot.user.avatarURL)
  .setColor(0x0000FF)
message.channel.sendEmbed(embed);
  } catch (err) {
  var error = new Discord.RichEmbed()
  .addField("rip there is a error" , `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``.true)
  .setFooter("Mouse-Bot#9560", bot.user.avatarURL)
  .setColor(0x0000FF)
message.channel.sendEmbed(error);
  }
}
})
