"use server";

import { z } from "zod";
import db from "./db";

export async function checkUniqueUsername({ username }: { username: string }, ctx: z.RefinementCtx) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "Username is already",
      path: ["username"],
      fatal: true,
    });
    return z.NEVER;
  }
  return true;
}

export async function checkUniqueEamil({ email }: { email: string }, ctx: z.RefinementCtx) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "Email is already",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
  return true;
}

export async function checkExsitEamil(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
}
