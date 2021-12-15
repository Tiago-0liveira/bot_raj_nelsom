"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var consts_1 = require("../consts");
var helpers_1 = require("../helpers");
/**
 * @class Command
 * @classdesc New Discord Chat Command
 * @method constructor
 * @method onCommand
 * @method ShowUsage
*/
var Command = /** @class */ (function () {
    /**
     * @constructor Command
     * @param alias string[] —> command alia's
     * @param label string —> command label
     * @param description string -> command description
     * @param usage string -> command usage
     * @param needsPerms boolean —> needs perms to use command
     * @param onCommand function —> function that is executed when command is called
     * @param prefix string | default to GlobalPrefix —> command prefix
     * @param deleteMessage deleteType | default to "after" —> when to delete message "after" | "never"
     */
    function Command(alias, label, description, usage, needsPerms, onCommand, prefix, deleteMessage) {
        if (prefix === void 0) { prefix = consts_1.PREFIX; }
        if (deleteMessage === void 0) { deleteMessage = "never"; }
        this.prefix = consts_1.PREFIX;
        this.deleteMessage = "after";
        this.alias = alias;
        this.label = label;
        this.description = description;
        this.usage = usage;
        this.needsPerms = needsPerms;
        this.onCommand = onCommand;
        this.prefix = prefix;
        this.deleteMessage = deleteMessage;
    }
    /**
     * @method Execute
     * @description Executes the Command
     * @param message Message
     * @param author User
     * @param member GuildMember
     * @param Mentions Collection<string, GuildMember>
     * @param Guild Guild
     */
    Command.prototype.execute = function (message, author, member, Mentions, Guild) {
        if ((this.needsPerms && (0, helpers_1.isTrustedUser)(member)) || !this.needsPerms) {
            this.onCommand(message, author, member, Mentions, Guild);
        }
        else {
            var sentMessage_1;
            message.channel.send((0, helpers_1.getErrorEmbed)("Not Enough Perms!")).then(function (m) { return sentMessage_1 = m; });
            if (sentMessage_1) {
                setTimeout(function () {
                    try {
                        sentMessage_1.deletable && sentMessage_1["delete"]();
                    }
                    catch (error) {
                        console.error(error);
                    }
                }, 3 * 1000);
            }
        }
        if (this.deleteMessage === "after") {
            try {
                message.deletable && message["delete"]();
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * @method Usage
     * @param member GuildMember
     */
    Command.prototype.ShowUsage = function (member) {
        member.send(new discord_js_1.MessageEmbed()
            .addField("Usage", this.usage));
    };
    return Command;
}());
exports["default"] = Command;
