import mongoose from "mongoose";
import { DB_URL } from "../../config/config.service.js";

export const checkConnectionDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Database connected successfully, ${DB_URL}`);
  } catch (error) {
    console.log(`Database connected failed, ${error}`);
  }
};
