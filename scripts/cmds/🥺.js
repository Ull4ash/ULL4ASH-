module.exports = {
 config: {
	 name: "🥺",
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
 if (event.body && event.body.toLowerCase() === "🥺") {
 return message.reply({
 body: "     「🍒🧃নিজের অনুভূতি কাউকে বুঝানো যায় না,নিজেই কষ্ট পাই আবার নিজেই সহ্য করে নেই ……….!! \n\n❤️‍🩹জান সময় পেলে আমার একটু খোঁজ নিও ,তোমার মেসেজ এর অপেক্ষা করতে করতে আমার চোখের পানি চলে আসে..!!🙃❤️‍🩹\n\n°°°°°°\n\n সত্যি মায়াবতী আপনাকে অনেক বেশি মিস করি \n\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n☆𝐀𝐁𝐇𝐑𝐀𝐍𝐈𝐋☆\nᑘᒪᒪᗩSᕼ ッ」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/h6sAZf6.mp4")
 });
 }
 }
}
