const config = require('../config.json');
const { db } = require('../functions')

module.exports = (client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;

        if(message.channel.id == config.channels.countgame) {
            db.query('SELECT * FROM counting', function(error, results) {
                if(error) throw error;
                let i = results.length - 1;
                let number = results.length + 1;
                if(message.author.id == results[i].user) {
                    return message.delete();
                }
                if(message.content != `${number}`) {
                    return message.delete();
                }
                db.query('INSERT INTO `counting`(`number`, `user`) VALUES(?,?)', [message.content, message.author.id], function(error) {
                    if(error) throw error;
                });
            });
        }
    });
};