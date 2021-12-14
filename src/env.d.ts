declare module "data.json" {
	const value: {
		[guild_id:string]: {
			list: [{ nickname:string, discord_id: string }]
		}
	};
	export default value;
}