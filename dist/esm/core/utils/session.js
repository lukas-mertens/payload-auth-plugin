// src/core/utils/session.ts
import { SuccessKind } from "../../types.js";
function sessionResponse(cookies, returnURL) {
  let res = new Response;
  res = new Response(JSON.stringify({
    message: "Authentication successful",
    kind: SuccessKind.Created,
    isSuccess: true,
    isError: false
  }), {
    status: 200
  });
  if (returnURL) {
    const url = new URL(returnURL);
    const channelID = url.hash;
    const isRedirectFlow = true;
    if (isRedirectFlow) {
      res = new Response(null, {
        status: 302,
        headers: {
          Location: returnURL.split("?")[0]
        }
      });
    } else if (channelID) {
      res = new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authentication Complete</title>
          </head>
          <body>
            <script type="text/javascript">
              const message = {
                message: "Authentication successful",
                kind: "Created",
                isSuccess: true,
                isError: false,
                timestamp: Date.now(),
              }
              const channel = new BroadcastChannel('${channelID.replace("#", "")}');
              channel.postMessage(message);
              channel.close();
              window.close()
            </script>
          </body>
        </html>
      `, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      });
    }
  }
  cookies.forEach((cookie) => {
    res.headers.append("Set-Cookie", cookie);
  });
  return res;
}
var revokeSession = (cookies) => {
  const res = new Response(JSON.stringify({
    message: "Session revoked",
    kind: SuccessKind.Deleted,
    isSuccess: true,
    isError: false
  }), {
    status: 200
  });
  cookies.forEach((cookie) => {
    res.headers.append("Set-Cookie", cookie);
  });
  return res;
};
export {
  sessionResponse,
  revokeSession
};
