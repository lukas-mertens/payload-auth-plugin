// src/client/signin.ts
import { passwordSignin } from "./password.js";
import { oauth } from "./oauth.js";
import { init as passkeyInit } from "./passkey/index.js";
var appSignin = (options) => {
  return {
    oauth: async (provider) => await oauth(options, provider),
    passkey: () => passkeyInit(),
    password: async (payload) => await passwordSignin(options, payload)
  };
};
var adminSignin = () => {
  return {
    oauth: async (provider) => await oauth({ name: "admin" }, provider),
    passkey: () => {
      passkeyInit();
    }
  };
};
export {
  appSignin,
  adminSignin
};
