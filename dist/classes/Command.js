"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const consts_1 = require("../consts");
const helpers_1 = require("../helpers");
/**
 * @class Command
 * @classdesc New Discord Chat Command
 * @method constructor
 * @method onCommand
 * @method ShowUsage
*/
class Command {
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
    constructor(alias, label, description, usage, needsPerms, onCommand, prefix = consts_1.PREFIX, deleteMessage = "never") {
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
    execute(message, author, member, Mentions, Guild) {
        if ((this.needsPerms && (0, helpers_1.isTrustedUser)(member)) || !this.needsPerms) {
            this.onCommand(message, author, member, Mentions, Guild);
        }
        else {
            let sentMessage;
            message.channel.send((0, helpers_1.getErrorEmbed)("Not Enough Perms!")).then(m => sentMessage = m);
            if (sentMessage) {
                setTimeout(() => {
                    try {
                        sentMessage.deletable && sentMessage.delete();
                    }
                    catch (error) {
                        console.error(error);
                    }
                }, 3 * 1000);
            }
        }
        if (this.deleteMessage === "after") {
            try {
                message.deletable && message.delete();
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    /**
     * @method Usage
     * @param member GuildMember
     */
    ShowUsage(member) {
        member.send(new discord_js_1.MessageEmbed()
            .addField("Usage", this.usage));
    }
}
exports.default = Command;
