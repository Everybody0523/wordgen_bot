const Discord = require('discord.js');
const arg_handler = require('./arg_handler');
const config = require("./config.json");

var client = new Discord.Client();
client.login(config.token);


client.once("ready", () => {
    client.user.setActivity("skribbl")
});


client.on("message", (message) => {
    if (message.author.bot) {
        return;
    }  
    else if (message.content.startsWith (config.prefix)) {
        let msgOpts = arg_handler.parse_message_contents(message, config.prefix);
    }
    else{
        return;
    }
});
