const util = require('minecraft-server-util');
const Discord = require('discord.js');

port = 25565; // port is default 25565
module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args) {
        if(!args[0]) return message.channel.send('Please enter a mc server ip');
        if(args[1]) {
            port = args[1];
        }
        
        util.status(args[0], {port: parseInt(port)})
            .then((response) => {
                const embed = new Discord.MessageEmbed()
                .setTitle('Server Status')
                .addFields(
                    {name: 'Server IP', value: response.host},
                    {name: 'Server version', value: response.version},
                    {name: 'Online Players', value: response.onlinePlayers},
                    {name: 'Max Players', value: response.maxPlayers}
                )

                message.channel.send(embed);
                console.log(response);
            })
            .catch((error) => {
                message.channel.send('Invalid ip address');
                console.log(error);
            });
    }
}