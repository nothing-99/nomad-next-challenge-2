"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession() {
  return await getIronSession<{ id?: number }>(await cookies(), {
    cookieName: process.env.COOKIE_LOGIN_NAME!,
    password: process.env.COOKIE_PASSWORD!,
  });
}
