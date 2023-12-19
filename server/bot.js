const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env.DISCORD_BOT_TOKEN; // 봇 토큰을 여기에 입력하세요
const guildId = process.env.LIMELIGHT_DISCORD_GUILD_ID; // Discord 서버의 ID를 여기에 입력하세요

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);


// 역할 부여
const addRole = async (roleId, userId) => {

  const guild = client.guilds.cache.get(guildId);

  const role = guild.roles.cache.get(roleId);
  if (!role) {
    console.error('Role not found.');
    return;
  }

  const member = await guild.members.fetch(userId);
  if (!member) {
    console.error('Member not found.');
    return;
  }

  try {
    await member.roles.add(role);
    console.log(`Added role ${role.name} to user ${member.user.tag}`);
  } catch (error) {
    console.error('Error adding role:', error.message);
  }

}


// 역할 목록 조회
const getRoles = async () => {

  // 길드 객체 가져오기
  const guild = await client.guilds.fetch(guildId);

  // 길드의 역할(Role) 목록 가져오기
  const roles = guild.roles.cache;

  return roles;
}



module.exports = {
  addRole,
  getRoles,
}