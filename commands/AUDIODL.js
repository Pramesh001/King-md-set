const { tlang, ringtone, cmd,fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('../lib')
const { mediafire } = require("../lib/mediafire.js");
const {GDriveDl} = require('../lib/scraper.js')
const fbInfoVideo = require('fb-info-video'); 
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const cheerio = require('cheerio')
const fs  = require('fs-extra');
const axios= require('axios');
var videotime = 36000 // 300 min
var dlsize = 1000 // 1000mb

cmd({
            pattern: "song",
            react: "🎧",
            alias :["son2","𝚢𝚝2"],
            desc: "Downloads audio from youtube.",
            category: "downloader",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
            let yts = require("secktor-pack"); 
let textYt;        
if (text.startsWith("https://youtube.com/shorts/")) {
  const svid = text.replace("https://youtube.com/shorts/", "https://youtube.com/v=");
  const s2vid = svid.split("?feature")[0];
  textYt = s2vid;
} else {
  textYt = text;
}
            let search = await yts(textYt);
            let anu = search.videos[0];
                       let buttonMessaged ={
             image: {
                    url: anu.thumbnail,
               },
                caption: `
*◈━━━━━━━━━━━━━◈*\n𝙆𝙄𝙉𝙂 𝙍𝘼𝙑𝘼𝙉𝘼 𝙈𝘿*\n*◈━━━━━━━━━━━━━◈*\n      𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃\n       ◈════════════◈

╏📃 *Title:* ${anu.title}
⦁
╏🌐 *Duration:* ${anu.timestamp}
⦁
╏👀 *Viewers:* ${anu.views}
⦁
╏⬆️📅*Uploaded:* ${anu.ago}
⦁
╏🌝 *Author:* ${anu.author.name}
⦁
╏⛓️ *Url* : ${anu.url}


*1.1 ╏ AUDIO* 🎧
*2.1 ╏ DOCUMENT* 📂

*𝙆𝙄𝙉𝙂⃝ 𝙍𝘼𝙑𝘼𝙉𝘼 𝙈𝘿 : 𝙏𝙍𝘼𝙉𝙎𝙁𝙊𝙍𝙈𝙀𝙍 𝘾𝙊𝘿𝙀*
 
`,
                footer: tlang().footer,
                headerType: 4,
            };
            await Void.sendMessage(citel.chat, buttonMessaged, {
                quoted: citel,
            });

            

            


        }
    )
cmd({
            pattern: "1.1",
            react: "🎶",
            alias :[],
            desc: "",
            category: "downloader",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
		try{
var msg = citel	
if(!msg.quoted) return 
if (!msg.quoted.isBaileys ) return 
if(!msg.quoted.caption) return console.log('ew')
text = msg.quoted.caption
if (!text.includes('🎧 *${Config.botname}_* 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗗𝗘𝗥🎧'))  return 
text = text.split('╏📡 *Url* : ')[1].split('\n')[0]		
if(!text) return 
await Void.sendMessage(citel.chat, { react: {  text: "🎧", key: msg.key } } )			
		        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };

        if (text.length === 0) {
            citel.reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);
            return;
        }
            let urlYt = text;
            if (!urlYt.startsWith("http")) {
                citel.reply(`❌ Give youtube link!`);
                return;
            }
            let infoYt = await ytdl.getInfo(urlYt);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= videotime) {
                citel.reply(`❌ I can't download that long video!`);
                return;
            }
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(urlYt, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let yts = require("secktor-pack");
                let search = await yts(text);
                
             
             let buttonMessage = {
                    audio: fs.readFileSync(`./${randomName}`),
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
                    headerType: 4,
                   
                }
             
             
                await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                return fs.unlinkSync(`./${randomName}`);
		
		} }catch(e){
			citel.reply('' + e)
		}})


cmd({
            pattern: "2.1",
            react: "",
            alias :[],
            desc: "",
            category: "downloader",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
		try{
var msg = citel	
if(!msg.quoted) return 
if (!msg.quoted.isBaileys ) return 
if(!msg.quoted.caption) return console.log('ew')
text = msg.quoted.caption
if (!text.includes('🎧 *𝙆𝙄𝙉𝙂⃝ 𝙍𝘼𝙑𝘼𝙉𝘼 𝙈𝘿* 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗗𝗘𝗥 🎧'))  return 
text = text.split('╏📡 *Url* : ')[1].split('\n')[0]		
if(!text) return 
await Void.sendMessage(citel.chat, { react: {  text: "⬇️", key: msg.key } } )			
		        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };

        if (text.length === 0) {
            citel.reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);
            return;
        }
            let urlYt = text;
            if (!urlYt.startsWith("http")) {
                citel.reply(`❌ Give youtube link!`);
                return;
            }
            let infoYt = await ytdl.getInfo(urlYt);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= videotime) {
                citel.reply(`❌ I can't download that long video!`);
                return;
            }
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(urlYt, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let yts = require("secktor-pack");
                let search = await yts(text);
                
             
             let buttonMessage = {
                    document: fs.readFileSync(`./${randomName}`),
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
		    caption: `*𝙆𝙄𝙉𝙂⃝ 𝙍𝘼𝙑𝘼𝙉𝘼 𝙈𝘿 : 𝙏𝙍𝘼𝙉𝙎𝙁𝙊𝙍𝙈𝙀𝙍 𝘾𝙊𝘿𝙀*\n*1.1* 👑`,       
                    headerType: 4,
                   
                }
             
             
                await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                return fs.unlinkSync(`./${randomName}`);
		
		} }catch(e){
			citel.reply('' + e)
		}})


cmd({

            pattern: "video",
            desc: "video dl",
            react: "📽️",
            category: "downloader"

        },

        async(Void, citel, text) => {    
        let yts = require("secktor-pack");
        let search = await yts(text);
        let anu = search.videos[0];
        if (!text) return     

const tvideo = await fetchJson(`https://api.fgmods.xyz/api/downloader/ytv?url=`)
const videolink = tvideo.result.url
            citel.reply (`*◈━━━━━━━━━━━━━◈*\n𝙆𝙄𝙉𝙂 𝙍𝘼𝙑𝘼𝙉𝘼 𝙈𝘿*\n*◈━━━━━━━━━━━━━◈*\n\n\n\nℹ️ *Title:* ${anu.title}\n\n🕑 *Duration:* ${anu.timestamp}\n\n👀 *Viewers:* ${anu.views}\n\n🖇️ *Url:* ${anu.url}\n\n⬆️ *Uploaded:* ${anu.ago}\n\n🎗️ *Author:* ${anu.author.name}`);
            return Void.sendMessage(citel.chat, {

                video: {
                    url: videolink ,

                },

                mimetype: "video/mp4",
                caption: tlang().footer,

            }, {
                quoted: citel,
            });
        }
    )    
//═══════════════════════════════════