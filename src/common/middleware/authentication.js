import userModel from "../../DB/models/users.model";
import { VerifyToken } from "../utils/token.service";
import { ACCESS_TOKEN_SECRET, PREFIX_TOKEN } from "../../../config/config.service";
import { findById } from "../../DB/db_service";
import { checkUserNotFound } from "../utils/response/response.error";

export const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("No token provided in header authorization.");
  }
  const [prefix, token] = authorization.split(" ");
  if (prefix !== PREFIX_TOKEN) throw new Error("Invalid token type");

  // Verify Token and get decoded data ------->
  const decoded = VerifyToken({ token, secret_key: ACCESS_TOKEN_SECRET });
  if (!decoded || !decoded?.id) throw new Error("Invalid token");

  // Check user exist in DB ------------------>
  const user = await findById({ model: userModel, id: decoded.id });
  checkUserNotFound(user);

  // ------------------------------>
  req.user = user;
  req.decoded = decoded;
  next();
};
