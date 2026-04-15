import mongoose from "mongoose";
import { RoleEnum } from "../../common/enum/user.enum.js";

const bankAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  accountNumber: {
    type: Number,
    trim: String,
    required: true,
  },
  balanceCurrency: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const bankAccountModel =
  mongoose.models.bankAccount ||
  mongoose.model("bankAccount", bankAccountSchema);
export default bankAccountModel;
