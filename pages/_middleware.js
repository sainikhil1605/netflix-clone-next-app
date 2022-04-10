import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export function middleware(req, res) {
  const token = req ? req.cookies?.token : null;
  const userId = jwt.decode(token, process.env.JWT_SECRET)?.issuer;
  const { pathname } = req.nextUrl;

  if (
    (token && userId) ||
    pathname.includes("/api/login") ||
    pathname.includes("/static")
  ) {
    return NextResponse.next();
  }
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
