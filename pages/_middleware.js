import jwt from "@tsndr/cloudflare-worker-jwt";
import { NextResponse } from "next/server";
export async function middleware(req, res) {
  const token = req ? req.cookies?.token : null;

  const { pathname } = req.nextUrl;
  let userId = undefined;
  if (token) {
    userId = await jwt.decode(token, process.env.JWT_SECRET)?.issuer;
  }
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
