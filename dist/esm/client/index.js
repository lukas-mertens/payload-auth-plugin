// src/client/index.ts
import { MissingEnv } from "../core/errors/consoleErrors.js";
import {
  forgotPassword,
  passwordRecover,
  passwordReset
} from "./password.js";
import { refresh } from "./refresh.js";
import { adminSignin, appSignin } from "./signin.js";
import { appSignup } from "./signup.js";
var appClient = (options) => {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) {
    throw new MissingEnv("NEXT_PUBLIC_SERVER_URL");
  }
  return {
    signin: () => appSignin(options),
    signup: () => appSignup(options),
    resetPassword: async (payload) => await passwordReset(options, payload),
    forgotPassword: async (payload) => await forgotPassword(options, payload),
    passwordRecover: async (payload) => await passwordRecover(options, payload),
    refresh: async () => await refresh(options)
  };
};
var adminClient = () => {
  return {
    signin: () => adminSignin()
  };
};
export {
  appClient,
  adminClient
};
