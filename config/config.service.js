import dotenv from "dotenv";
import { resolve } from "node:path";

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: resolve(`config/.env.${NODE_ENV}`) });

export const PORT = +process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL;
export const WHITE_LIST = process.env.WHITE_LIST?.split(",") || [];
