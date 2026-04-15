import mongoose from "mongoose";
import { RoleEnum } from "../../common/enum/user.enum.js";
import { TypeEnum } from "../../common/enum/transaction.enum.js";

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankAccount",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(TypeEnum),
      default: TypeEnum.deposit,
    },
    balanceBefore: {
      type: String,
      required: true,
    },
    balanceAfter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {createdAt: true},
    strictQuery: true,
  },
);

const transactionModel =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);
export default transactionModel;
