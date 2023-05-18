
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {

    client.distube
    .on("playSong", (queue, song) => {
      let playSong = new EmbedBuilder()
      .setTitle(`▶️ Music — Now playing.`)
      .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\` \nRequested by: ${song.user}`)
      .setColor("#FFFFFF")
      .setThumbnail(song.thumbnail)
      .setTimestamp()

      song.metadata.interaction.reply({embeds: [playSong]});

    })
    .on('addSong', (queue, song) => {
      let addedSong = new EmbedBuilder()
      .setTitle(`⏩ Music — Added to Queue`)
      .setDescription(`Toegevoegd aan de queue: \n\`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: \n${song.user}\n\n **Queue**:\n` + queue.songs.map((song, id) => `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
      .setColor("#52AB33")
      .setThumbnail(song.thumbnail)
      .setTimestamp()

      song.metadata.interaction.reply({embeds: [addedSong]});
    })
    .on('deleteQueue', (queue) => {
      let deleteQueue = new EmbedBuilder()
      .setTitle(`😢 Music — Music stopped`)
      .setDescription(`The music has stopped, the bot has left the channel.`)
      .setColor("#FFFFFF")
      .setTimestamp()

      queue.textChannel.send({ embeds: [deleteQueue] });
    })
    .on('error', (channel, e) => {
      if (channel) channel.send(`🚫 │ Whoops, something went wrong. \nFout: ${e.toString().slice(0, 1900)}`)
      else console.error(e)
    })
    .on('empty', channel => channel.send(':x: | The voice channel is empty!'))
};