import { Router } from "express";
import * as AS from "./account.service.js";
import * as AV from "./account.validation.js";
import { validation } from "../../common/middleware/validation.js";
import { authentication } from "../../common/middleware/authentication.js";

export const accountRouter = Router({ caseSensitive: true, strict: true });
accountRouter.get("/me", authentication, AS.getData);
