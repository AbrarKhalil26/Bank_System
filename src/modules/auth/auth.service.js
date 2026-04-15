import * as db_service from "../../DB/db_service.js";
import * as config_service from "../../../config/config.service.js";
import userModel from "../../DB/models/user.model.js";
import { successResponse } from "../../common/utils/response/response.success.js";
import { Compare, Hash } from "../../common/utils/security/hash.security.js";
import { GenerateToken } from "../../common/utils/token.service.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (await db_service.findOne({ model: userModel, filter: { email } })) {
    throw new Error("Email already exist");
  }
  const user = await db_service.create({
    model: userModel,
    data: {
      fullName,
      email,
      password: Hash({
        plainText: password,
        salt_rounds: config_service.SALT_ROUNDS,
      }),
    },
  });
  successResponse({ res, status: 201, data: user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await db_service.findOne({
    model: userModel,
    filter: { email },
  });
  if (!user) throw new Error("User not exists");
  if (!Compare({ plainText: password, cipherText: user.password }))
    throw new Error("Password is not Correct");

  const access_token = GenerateToken({
    payload: { id: user.id, email: user.email },
    secret_key: config_service.ACCESS_SECRET_KEY,
    options: { expiresIn: "7d", jwtid: uuidv4() },
  });

  successResponse({ res, status: 200, data: {access_token} });
};
