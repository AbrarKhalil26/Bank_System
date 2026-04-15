import dotenv from "dotenv";
import { resolve } from "node:path";

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: resolve(`config/.env.${NODE_ENV}`) });

export const PORT = +process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL;
export const WHITE_LIST = process.env.WHITE_LIST?.split(",") || [];
export const SALT_ROUNDS = +process.env.SALT_ROUNDS || 11;
export const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
export const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
export const PREFIX = process.env.PREFIX;
