// src/client/signup.ts
import { passwordSignup } from "./password.js";
var appSignup = (options) => {
  return {
    password: async (paylaod) => await passwordSignup(options, paylaod)
  };
};
export {
  appSignup
};
