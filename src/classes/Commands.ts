import { Message, MessageEmbed } from "discord.js";
import { COLORS } from "../consts";
import Command from "./Command";

export default class Commands {
	private static registeredCommands: Command[] = []


	static registerCommand(command: Command) {
		Commands.registeredCommands.push(command)
	}

	static {
		Commands.registerCommand(new Command(["help"], "Help", "Displays all commands", "help", false, (message: Message) => {
			const embed = new MessageEmbed()
				.setColor(COLORS.BLUE)
				.setTitle("Help")
			this.registeredCommands.forEach(command => {
				embed.addField(`${command.label}: ${command.description}`, `\`\`\`${command.usage}\`\`\``)
			});
			message.channel.send(embed)
		}))
	}

	static onNewMessage(message: Message) {
		if (message.channel.type !== "text") {
			message.channel.send(new MessageEmbed()
				.setColor(COLORS.RED)
				.setTitle("This bot only works in text Channels inside servers!")
			)
			return
		};
		Commands.registeredCommands.forEach(command => {
			if (command.alias.some((
				alias => message.content.replace(command.prefix, "").startsWith(alias)
			))) {
				command.execute(
					message,
					message.author,
					message.member,
					message.mentions.members,
					message.guild
				)}
		})
	}
}