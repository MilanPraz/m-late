// import {
//   createAudioPlayer,
//   createAudioResource,
//   joinVoiceChannel,
//   VoiceConnectionStatus,
//   AudioPlayerStatus,
//   entersState,
// } from "@discordjs/voice";
// import { Client, GatewayIntentBits } from "discord.js";
// import { config } from "dotenv";
// import cron from "node-cron";
// import play from "play-dl";
// config();

// const botClient = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.GuildMembers, // ✅ Needed to fetch members!
//   ],
// });

// //everyday at 10:00am a godmornig msg
// // 0 10 * * * means everyday at 10:00 am. It is in the cron format where:
// //  * * * * *  corresponds to:
// //  minute (0-59),
// //  hour (0-23),
// //  day of the month (1-31),
// //  month of the year (1-12),
// //  day of the week (0-6) with 0 = Sunday.
// //  so 0 10 * * * is 10:00 am every day
// //   for 2 pm -> 0 14 * * *

// botClient.on("ready", () => {
//   // 🕙 Schedules task for 2:23 PM every day
//   cron.schedule("28 14 * * *", async () => {
//     try {
//       const channelId = "1385532679729971310"; // replace with your text channel ID
//       const guildId = "1293177236530135092"; // replace with your guild/server ID

//       const guild = await botClient.guilds.fetch(guildId);
//       await guild.members.fetch(); // fetch all members to cache

//       const channel = await botClient.channels.fetch(channelId);
//       if (!channel || !channel.isTextBased()) {
//         console.error("Channel not found or not a text channel.");
//         return;
//       }

//       // ✅ Get all members and ping them in one message (better practice)
//       const mentions = guild.members.cache
//         .filter((member) => !member.user.bot) // skip bots
//         .map((member) => `<@${member.id}>`)
//         .join(" ");
//       console.log("mentions", mentions);

//       await channel.send(`🌞 Good Morning!! ${mentions}`);
//       console.log("✅ Good morning message sent!");
//     } catch (err) {
//       console.error("❌ Error sending good morning message:", err);
//     }
//   });
// });

// botClient.on("messageCreate", (message) => {
//   if (message.content === "!khana") {
//     message.reply("Hajur Khaye");
//   }
// });

// //music-feature

// botClient.on("messageCreate", async (message) => {
//   //here we check if the message is from a guild and if the message is from a bot
//   if (!message.guild || message.author.bot) return;

//   //play command
//   if (message.content.startsWith("!bajau")) {
//     //here we split the message into args and get the query
//     const args = message.content.split(" ").slice(1);
//     const query = args.join(" ");

//     if (!query) {
//       return message.reply("No Query Provided!");
//     }

//     const voiceChannel = message.member.voice.channel;
//     if (!voiceChannel) {
//       return message.reply(
//         "You need to be in a voice channel to use this command!"
//       );
//     }

//     try {
//       const searchResult = await play.search(query, { limit: 1, type: "song" });

//       if (!searchResult.length) {
//         return message.reply("No Results Found!");
//       }

//       console.log("searchResult", searchResult);

//       const url = searchResult[0]?.url;

//       if (!url) {
//         return message.reply("Could not get the video URL");
//       }
//       console.log("URL:", url);

//       const streamInfo = await play.stream(url, {
//         quality: 3,
//       });
//       console.log("Stream Info:", streamInfo);
//       const resource = createAudioResource(streamInfo.stream, {
//         inputType: streamInfo.type,
//       });
//       console.log("Resource:", resource);

//       console.log("voiceChannel", voiceChannel);
//       // Create connection
//       const connection = joinVoiceChannel({
//         channelId: voiceChannel.id,
//         guildId: voiceChannel.guild.id,
//         adapterCreator: voiceChannel.guild.voiceAdapterCreator,
//       });

//       // Create player
//       const player = createAudioPlayer();
//       player.play(resource);

//       // Connect player and connection
//       connection.subscribe(player);

//       // Wait for connection and player to be ready
//       try {
//         await entersState(connection, VoiceConnectionStatus.Ready, 30000);
//         await entersState(player, AudioPlayerStatus.Playing, 5000);
//         message.reply(`Now playing: ${searchResult[0].title}`);
//       } catch (error) {
//         console.error("Failed to connect or play:", error);
//         message.reply("Failed to play the song. Please try again.");
//         if (connection) connection.destroy();
//       }
//     } catch (Err) {
//       console.log("Error", Err);
//     }
//   }
// });

// botClient.login(process.env.BOT_TOKEN);

import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnectionStatus,
  AudioPlayerStatus,
  entersState,
} from "@discordjs/voice";
import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import cron from "node-cron";
import ytdl from "@distube/ytdl-core";

config();

const botClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

botClient.on("ready", () => {
  console.log(`✅ Bot is ready! Logged in as ${botClient.user.tag}`);

  // Good morning message scheduler
  cron.schedule("00 10 * * *", async () => {
    try {
      const channelId = "1385532679729971310";
      const guildId = "1293177236530135092";

      const guild = await botClient.guilds.fetch(guildId);
      await guild.members.fetch();

      const channel = await botClient.channels.fetch(channelId);
      if (!channel || !channel.isTextBased()) {
        console.error("Channel not found or not a text channel.");
        return;
      }
      d;

      const mentions = guild.members.cache
        .filter((member) => !member.user.bot)
        .map((member) => `<@${member.id}>`)
        .join(" ");

      await channel.send(`🌞 Good Morning!! ${mentions}`);
      console.log("✅ Good morning message sent!");
    } catch (err) {
      console.error("❌ Error sending good morning message:", err);
    }
  });
});

botClient.on("messageCreate", (message) => {
  if (message.content === "!khana") {
    message.reply("Hajur Khaye");
  }
});

botClient.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  if (message.content.startsWith("!bajau")) {
    const args = message.content.split(" ").slice(1);
    const input = args.join(" ");

    if (!input) {
      return message.reply(
        "❌ Please provide a YouTube URL!\nExample: `!bajau https://www.youtube.com/watch?v=VIDEO_ID`"
      );
    }

    // Only accept YouTube URLs
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    if (!youtubeUrlRegex.test(input)) {
      return message.reply(
        "❌ Please provide a valid YouTube URL!\nExample: `!bajau https://www.youtube.com/watch?v=z1seJ9EKmv8`"
      );
    }

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply("❌ You need to be in a voice channel!");
    }

    try {
      // Validate URL
      if (!ytdl.validateURL(input)) {
        return message.reply("❌ Invalid YouTube URL format!");
      }

      message.reply("🎵 Loading song...");

      // Get video info
      const info = await ytdl.getInfo(input);
      const videoDetails = info.videoDetails;

      // Check duration (max 20 minutes)
      if (parseInt(videoDetails.lengthSeconds) > 1200) {
        return message.reply("❌ Video too long! Maximum 20 minutes allowed.");
      }

      // Create stream
      const stream = ytdl(input, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      });

      const resource = createAudioResource(stream);

      // Join voice channel
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      await entersState(connection, VoiceConnectionStatus.Ready, 30000);

      // Create player
      const player = createAudioPlayer();

      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });

      player.on("error", (error) => {
        console.error("Player error:", error);
        connection.destroy();
      });

      connection.subscribe(player);
      player.play(resource);

      await entersState(player, AudioPlayerStatus.Playing, 10000);

      const duration =
        Math.floor(videoDetails.lengthSeconds / 60) +
        ":" +
        (videoDetails.lengthSeconds % 60).toString().padStart(2, "0");

      message.reply(
        `🎵 **Now Playing:** ${videoDetails.title}\n**Duration:** ${duration}`
      );
    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ Failed to play song. Please try another video.");
    }
  }

  if (message.content === "!stop") {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply("❌ You need to be in a voice channel!");
    }

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      connection.destroy();
      message.reply("⏹️ Stopped and disconnected!");
    } catch (error) {
      message.reply("❌ Error stopping music");
    }
  }

  if (message.content === "!help") {
    message.reply(`
  🎵 **Simple Music Bot Commands:**
  \`!bajau <YouTube URL>\` - Play a YouTube video
  \`!stop\` - Stop and disconnect
  \`!khana\` - Traditional response
  \`!help\` - Show this help
  
  **Example:**
  \`!bajau https://www.youtube.com/watch?v=z1seJ9EKmv8\`
  
  **Note:** Only YouTube URLs are supported, no search functionality.
      `);
  }
});

botClient.on("error", console.error);
process.on("unhandledRejection", console.error);

botClient.login(process.env.BOT_TOKEN);
