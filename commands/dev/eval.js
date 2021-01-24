const { inspect } = require('util')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'eval',
    async execute(message, args, client) {
        let embed = new MessageEmbed().setColor('GREEN')
        // Put your userID here
        if (message.author.id !== '480692379913945099') return;
        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
            if(evaled.length >= 2048){
                evaled = await evaled.substr(1,2045).replace(/ /g,"");
                
                return   await message.channel.send(embed
                    .setAuthor('Eval')
                    .addField('Input',`\`\`\`js\n${code}\`\`\``)
                    .setDescription(`**Output**\n\`\`\`js\n${clean(evaled)}...\n\`\`\``))
                    
                
            }
            
            await message.channel.send(embed
                .setAuthor('Eval')
                .addField('Input',`\`\`\`js\n${code}\`\`\``)
                .setDescription(`**Output**\n\`\`\`js\n${clean(evaled)}\n\`\`\``))
           
        } catch (err) {
            message.channel.send(embed.setAuthor('Eval ERROR').addField('Input',`\`\`\`js\n${code}\`\`\``).setDescription(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)).setColor('#ff0000');
        }

    }
}