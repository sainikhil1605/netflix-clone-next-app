import cookie from "cookie";
export const setTokenCookie = (token, res) => {
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
  const setCookie = cookie.serialize("token", token, cookieOptions);
  res.setHeader("Set-Cookie", setCookie);
};
