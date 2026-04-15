import userModel from "../../DB/models/user.model.js";
import { VerifyToken } from "../utils/token.service.js";
import { ACCESS_SECRET_KEY, PREFIX } from "../../../config/config.service.js";
import { findById } from "../../DB/db_service.js";

export const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("No token provided in header authorization.");
  }
  const [prefix, token] = authorization.split(" ");
  if (prefix !== PREFIX) throw new Error("Invalid token type");
  
  // Verify Token and get decoded data ------->
  const decoded = VerifyToken({
    payload: token,
    secret_key: ACCESS_SECRET_KEY,
  });
  if (!decoded || !decoded?.id) throw new Error("Invalid token");

  // Check user exist in DB ------------------>
  const user = await findById({ model: userModel, id: decoded.id });
  if (!user) throw new Error("User not exist", { cause: 400 });

  // ------------------------------>
  req.user = user;
  req.decoded = decoded;
  next();
};
