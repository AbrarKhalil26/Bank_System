import { Router } from "express";
import * as AS from "./auth.service.js";
import * as AV from "./auth.validation.js";
import { validation } from "../../common/middleware/validation.js";

export const authRouter = Router({ caseSensitive: true, strict: true });
authRouter.post("/register", validation(AV.registerSchema), AS.register);
authRouter.post("/login", validation(AV.loginSchema), AS.login);
