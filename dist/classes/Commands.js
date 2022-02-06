"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const consts_1 = require("../consts");
const Command_1 = __importDefault(require("./Command"));
class Commands {
    static registerCommand(command) {
        Commands.registeredCommands.push(command);
    }
    static onNewMessage(message) {
        if (message.channel.type !== "text") {
            message.channel.send(new discord_js_1.MessageEmbed()
                .setColor(consts_1.COLORS.RED)
                .setTitle("This bot only works in text Channels inside servers!"));
            return;
        }
        ;
        Commands.registeredCommands.forEach(command => {
            if (command.alias.some((alias => message.content.replace(command.prefix, "").startsWith(alias)))) {
                command.execute(message, message.author, message.member, message.mentions.members, message.guild);
            }
        });
    }
}
exports.default = Commands;
_a = Commands;
Commands.registeredCommands = [];
(() => {
    Commands.registerCommand(new Command_1.default(["help"], "Help", "Displays all commands", "help", false, (message) => {
        const embed = new discord_js_1.MessageEmbed()
            .setColor(consts_1.COLORS.BLUE)
            .setTitle("Help");
        _a.registeredCommands.forEach(command => {
            embed.addField(`${command.label}: ${command.description}`, `\`\`\`${command.usage}\`\`\``);
        });
        message.channel.send(embed);
    }));
})();
