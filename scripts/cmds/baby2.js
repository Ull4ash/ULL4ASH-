const { GoatWrapper } = require("fca-liane-utils");
const axios = require('axios');
const baseApiUrl = async () => {
  const base = await axios.get('https://raw.githubusercontent.com/ARYAN-STORE/ARYAN-ALL-API/refs/heads/main/api.json');
  return base.data.api;
};

module.exports.config = {
  name: "bby",
  version: "6.9.0",
  author: "dipto| ArYAN",//no prefix by ArYan ❤
  countDown: 0,
  role: 0,
  description: "better then all sim simi",
  category: "chat",
  guide: {
    en: "{pn} [anyMessage]"
  }
};

module.exports.onStart = async ({ api, event, args, usersData }) => {
  const link = `${await baseApiUrl()}/baby`;
  const ArYan = args.join(" ").toLowerCase();
  const uid = event.senderID;
  let command, comd, final;

  try {
    if (!args[0]) {
      const ran = ["BABY HI ❤"];
      return api.sendMessage(ran[Math.floor(Math.random() * ran.length)], event.threadID, event.messageID);
    }

    if (args[0] === 'remove') {
      const fina = ArYan.replace("remove ", "");
      const dat = (await axios.get(`${link}?remove=${fina}&senderID=${uid}`)).data.message;
      return api.sendMessage(dat, event.threadID, event.messageID);
    }

    if (args[0] === 'rm' && ArYan.includes('-')) {
      const [fi, f] = ArYan.replace("rm ", "").split(' - ');
      const da = (await axios.get(`${link}?remove=${fi}&index=${f}`)).data.message;
      return api.sendMessage(da, event.threadID, event.messageID);
    }

    if (args[0] === 'list') {
      if (args[1] === 'all') {
        const data = (await axios.get(`${link}?list=all`)).data;
        const teachers = await Promise.all(data.teacher.teacherList.map(async (item) => {
          const number = Object.keys(item)[0];
          const value = item[number];
          const name = (await usersData.get(number)).name;
          return { name, value };
        }));
        teachers.sort((a, b) => b.value - a.value);
        const output = teachers.map((t, i) => `${i + 1}/ ${t.name}: ${t.value}`).join('\n');
        return api.sendMessage(`Total Teach = ${data.length}\n👑 | List of Teachers of baby\n${output}`, event.threadID, event.messageID);
      } else {
        const d = (await axios.get(`${link}?list=all`)).data.length;
        return api.sendMessage(`Total Teach = ${d}`, event.threadID, event.messageID);
      }
    }

    if (args[0] === 'msg') {
      const fuk = ArYan.replace("msg ", "");
      const d = (await axios.get(`${link}?list=${fuk}`)).data.data;
      return api.sendMessage(`Message ${fuk} = ${d}`, event.threadID, event.messageID);
    }

    if (args[0] === 'edit') {
      const command = dipto.split(' - ')[1];
      if (command.length < 2) return api.sendMessage('❌ | Invalid format! Use edit [YourMessage] - [NewReply]', event.threadID, event.messageID);
      const dA = (await axios.get(`${link}?edit=${args[1]}&replace=${command}&senderID=${uid}`)).data.message;
      return api.sendMessage(`changed ${dA}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] !== 'amar' && args[1] !== 'react') {
      [comd, command] = ArYan.split(' - ');
      final = comd.replace("teach ", "");
      if (command.length < 2) return api.sendMessage('❌ | Invalid format!', event.threadID, event.messageID);
      const re = await axios.get(`${link}?teach=${final}&reply=${command}&senderID=${uid}`);
      const tex = re.data.message;
      const teacher = (await usersData.get(re.data.teacher)).name;
      return api.sendMessage(`✅ Replies added ${tex}\nTeacher: ${teacher}\nTeachs: ${re.data.teachs}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] === 'amar') {
      [comd, command] = ArYan.split(' - ');
      final = comd.replace("teach ", "");
      if (command.length < 2) return api.sendMessage('❌ | Invalid format!', event.threadID, event.messageID);
      const tex = (await axios.get(`${link}?teach=${final}&senderID=${uid}&reply=${command}&key=intro`)).data.message;
      return api.sendMessage(`✅ Replies added ${tex}`, event.threadID, event.messageID);
    }

    if (args[0] === 'teach' && args[1] === 'react') {
      [comd, command] = ArYan.split(' - ');
      final = comd.replace("teach react ", "");
      if (command.length < 2) return api.sendMessage('❌ | Invalid format!', event.threadID, event.messageID);
      const tex = (await axios.get(`${link}?teach=${final}&react=${command}`)).data.message;
      return api.sendMessage(`✅ Replies added ${tex}`, event.threadID, event.messageID);
    }

    if (ArYan.includes('amar name ki') || ArYan.includes('amr nam ki') || ArYan.includes('amar nam ki') || ArYan.includes('amr name ki') || ArYan.includes('whats my name')) {
      const data = (await axios.get(`${link}?text=amar name ki&senderID=${uid}&key=intro`)).data.reply;
      return api.sendMessage(data, event.threadID, event.messageID);
    }

    const d = (await axios.get(`${link}?text=${ArYan}&senderID=${uid}&font=1`)).data.reply;
    api.sendMessage(d, event.threadID, (error, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        type: "reply",
        messageID: info.messageID,
        author: event.senderID,
        d, 
        apiUrl: link
      });
    }, event.messageID);

  } catch (e) {
    console.log(e);
    api.sendMessage("Check console for error", event.threadID, event.messageID);
  }
};

module.exports.onReply = async ({ api, event, Reply }) => {
  try{
  if (event.type == "message_reply") {
    const a = (await axios.get(`${Reply.apiUrl}?text=${encodeURIComponent(event.body?.toLowerCase())}&senderID=${event.senderID}&font=1`)).data.reply;
    await api.sendMessage(a, event.threadID, (error, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        type: "reply",
        messageID: info.messageID,
        author: event.senderID,
        a
      });
    }, event.messageID);
  }  
  }catch(err){
      return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
    }};
    
    const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
