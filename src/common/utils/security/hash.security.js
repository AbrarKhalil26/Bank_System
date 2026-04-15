import { compareSync, hashSync } from "bcrypt";
import { SALT_ROUNDS } from "../../../../config/config.service.js";

export const Hash = ({ plainText, salt_rounds = SALT_ROUNDS } = {}) => {
  return hashSync(plainText, salt_rounds);
};

export const Compare = ({ plainText, cipherText } = {}) => {
  return compareSync(plainText, cipherText);
};
