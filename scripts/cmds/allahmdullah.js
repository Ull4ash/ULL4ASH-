module.exports = {
 config: {
	 name: "allahmdullah",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "allahmdullah") {
 return message.reply({
 body: "     「🫰 Allahmdullah for everything ❤️‍🩹\n\n°°°°°°\n\n \n\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n☆𝐀𝐁𝐇𝐑𝐀𝐍𝐈𝐋☆\n\n°°°°°°\n\nᑘᒪᒪᗩSᕼ ッ」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/ZEaUI9A.mp4")
 });
 }
 }
}
