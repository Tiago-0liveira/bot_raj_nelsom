"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const consts_1 = require("./consts");
const Commands_1 = __importDefault(require("./classes/Commands"));
const Command_1 = __importDefault(require("./classes/Command"));
const client = new discord_js_1.Client();
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}.`);
});
Commands_1.default.registerCommand(new Command_1.default(["nelsom"], "Nelsom", "Shows Nelsom", "nelsom", false, (message, author, member, mentions, guild) => {
    message.channel.send("", { files: ["https://i.imgur.com/poLRPQQ.png"] });
}));
client.on("voiceStateUpdate", (oldMember, newMember) => {
    if (newMember.id === consts_1.AMIGO_RAJ_ID) {
        if (!oldMember.selfDeaf && newMember.selfDeaf) {
            newMember.member.voice.kick();
        }
    }
});
client.on("message", Commands_1.default.onNewMessage);
client.login(consts_1.TOKEN);
