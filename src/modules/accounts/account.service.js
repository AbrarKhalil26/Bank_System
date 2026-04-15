import { successResponse } from "../../common/utils/response/response.success.js";

export const getData = async (req, res, next) => {
  successResponse({ res, status: 200, data: req.user });
};
