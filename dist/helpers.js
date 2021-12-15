"use strict";
exports.__esModule = true;
exports.getSuccessEmbed = exports.getErrorEmbed = exports.isTrustedUser = void 0;
var discord_js_1 = require("discord.js");
var config_json_1 = require("./config.json");
var consts_1 = require("./consts");
var isTrustedUser = function (member) {
    return config_json_1.trustedUsers.includes(member.id) || member.roles.cache.map(function (r) { return r.id; }).some(function (r) { return config_json_1.trustedRoles.includes(r); });
};
exports.isTrustedUser = isTrustedUser;
var getErrorEmbed = function (error) {
    return new discord_js_1.MessageEmbed()
        .setColor(consts_1.COLORS.RED)
        .addField("Error", error);
};
exports.getErrorEmbed = getErrorEmbed;
var getSuccessEmbed = function (msg) {
    return new discord_js_1.MessageEmbed()
        .setColor(consts_1.COLORS.GREEN)
        .addField("Success", msg);
};
exports.getSuccessEmbed = getSuccessEmbed;
