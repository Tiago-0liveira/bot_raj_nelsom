import * as dotenv from "dotenv";
import { default as config } from "./config.json"
dotenv.config();

export const TOKEN = process.env.TOKEN;
export const PREFIX: string = process.env.PREFIX;
export const COLORS = {
	BLUE: "#00B9EB",
	RED: "#FF4119",
	YELLOW: "#EBE400",
	GREEN: "#00FF80",
}
export const AMIGO_RAJ_ID = "265545968177381377";