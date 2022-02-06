"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuccessEmbed = exports.getErrorEmbed = exports.isTrustedUser = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const consts_1 = require("./consts");
const isTrustedUser = (member) => {
    return config_json_1.trustedUsers.includes(member.id) || member.roles.cache.map(r => r.id).some(r => config_json_1.trustedRoles.includes(r));
};
exports.isTrustedUser = isTrustedUser;
const getErrorEmbed = (error) => {
    return new discord_js_1.MessageEmbed()
        .setColor(consts_1.COLORS.RED)
        .addField("Error", error);
};
exports.getErrorEmbed = getErrorEmbed;
const getSuccessEmbed = (msg) => {
    return new discord_js_1.MessageEmbed()
        .setColor(consts_1.COLORS.GREEN)
        .addField("Success", msg);
};
exports.getSuccessEmbed = getSuccessEmbed;
