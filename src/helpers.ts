import { GuildMember, MessageEmbed } from "discord.js";
import {trustedUsers, trustedRoles} from "./config.json";
import { COLORS } from "./consts";

export const isTrustedUser: (member: GuildMember) => boolean = (member) => {
	return trustedUsers.includes(member.id) || member.roles.cache.map(r => r.id).some(r => trustedRoles.includes(r));
}

export const getErrorEmbed: (error: string)=> MessageEmbed = (error) => {
	return new MessageEmbed()
		.setColor(COLORS.RED)
		.addField("Error", error)
}
export const getSuccessEmbed: (msg: string)=> MessageEmbed = (msg) => {
	return new MessageEmbed()
		.setColor(COLORS.GREEN)
		.addField("Success", msg)
}