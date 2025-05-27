// src/client/oauth.ts
import { ErrorKind } from "../types.js";
var oauth = (options, provider) => {
  const flow = options.flow || "redirect";
  console.log("flow", flow);
  if (flow === "popup") {
    return oauthPopup(options, provider);
  } else if (flow === "redirect") {
    return oauthRedirect(options, provider);
  } else {
    throw new Error("Invalid flow");
  }
};
var oauthRedirect = (options, provider) => {
  const base = process.env.NEXT_PUBLIC_SERVER_URL;
  const authUrl = `${base}/api/${options.name}/oauth/authorization/${provider}?redirect=true&redirectUri=${encodeURIComponent(window.location.href)}&clientOrigin=${encodeURIComponent(window.location.origin)}`;
  window.location.href = authUrl;
};
var oauthPopup = (options, provider) => {
  return new Promise((resolve) => {
    const channelId = `oauth_channel_${Math.random().toString(36).substring(2, 15)}`;
    const channel = new BroadcastChannel(channelId);
    const defaultOutput = {
      message: "Failed to authenticate",
      kind: ErrorKind.BadRequest,
      data: null,
      isSuccess: false,
      isError: true
    };
    const base = process.env.NEXT_PUBLIC_SERVER_URL;
    const authUrl = `${base}/api/${options.name}/oauth/authorization/${provider}?clientOrigin=${encodeURIComponent(window.location.origin + `#${channelId}`)}`;
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(authUrl, "oauth", `width=${width},height=${height},left=${left},top=${top}`);
    channel.onmessage = (event) => {
      channel.close();
      if (popup && !popup.closed)
        popup.close();
      clearTimeout(timeoutId);
      resolve(event.data);
    };
    const timeoutId = setTimeout(() => {
      if (!popup || popup.closed) {
        channel.close();
        resolve(defaultOutput);
      } else {
        const checkInterval = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkInterval);
            channel.close();
            resolve(defaultOutput);
          }
        }, 1000);
        setTimeout(() => {
          clearInterval(checkInterval);
          channel.close();
          if (popup && !popup.closed)
            popup.close();
          resolve(defaultOutput);
        }, 120000);
      }
    }, 1000);
  });
};
export {
  oauth
};
