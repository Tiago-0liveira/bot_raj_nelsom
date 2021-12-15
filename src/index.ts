import { Client, MessageEmbed, TextChannel } from "discord.js";
import { COLORS, PREFIX, TOKEN } from "./consts";
import Commands from "./classes/Commands"
import Command from "./classes/Command"

const client = new Client();

client.on("ready", async () => {
	console.log(`Logged in as ${client.user.tag}.`);
});


client.on("message", Commands.onNewMessage)
client.login(TOKEN);
