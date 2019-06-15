const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const words = JSON.parse(fs.readFileSync("./data/words.json"))

function login() {
    var settings = JSON.parse(fs.readFileSync("./data/settings.json"))
    bot.login(settings.token)
}

login()

bot.on("message",

    function (message) {

        if (message.author.equals(bot.user)) return;

        var theySaidTheWord = false

        words.watching.forEach(word => {
            if(message.content.toLowerCase().replace(/\s/g, "").includes(word) && !theySaidTheWord) {

                if(words.mentionUser){
                    message.channel.send(message.author.member + " " + words.response)   
                } else {
                    message.channel.send(words.response)   
                }
                theySaidTheWord = true
            }
        })
    });