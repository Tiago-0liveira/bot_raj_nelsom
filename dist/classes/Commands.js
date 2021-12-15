"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var consts_1 = require("../consts");
var Command_1 = __importDefault(require("./Command"));
var Commands = /** @class */ (function () {
    function Commands() {
    }
    Commands.registerCommand = function (command) {
        Commands.registeredCommands.push(command);
    };
    Commands.onNewMessage = function (message) {
        if (message.channel.type !== "text") {
            message.channel.send(new discord_js_1.MessageEmbed()
                .setColor(consts_1.COLORS.RED)
                .setTitle("This bot only works in text Channels inside servers!"));
            return;
        }
        ;
        Commands.registeredCommands.forEach(function (command) {
            if (command.alias.some((function (alias) { return message.content.replace(command.prefix, "").startsWith(alias); }))) {
                command.execute(message, message.author, message.member, message.mentions.members, message.guild);
            }
        });
    };
    var _a;
    _a = Commands;
    Commands.registeredCommands = [];
    (function () {
        Commands.registerCommand(new Command_1["default"](["help"], "Help", "Displays all commands", "help", false, function (message) {
            var embed = new discord_js_1.MessageEmbed()
                .setColor(consts_1.COLORS.BLUE)
                .setTitle("Help");
            _a.registeredCommands.forEach(function (command) {
                embed.addField("".concat(command.label, ": ").concat(command.description), "```".concat(command.usage, "```"));
            });
            message.channel.send(embed);
        }));
    })();
    return Commands;
}());
exports["default"] = Commands;
