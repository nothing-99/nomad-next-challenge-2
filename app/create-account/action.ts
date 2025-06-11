"use server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import { HASH_SALT, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { checkUniqueEamil, checkUniqueUsername } from "@/lib/validations";

const formSchema = z
  .object({
    username: z.string().min(3).trim(),
    email: z.string().email().trim(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(checkUniqueUsername)
  .superRefine(checkUniqueEamil)
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "check password and confirm password",
    path: ["confirmPassword"],
  });

export async function createAccountAction(prevState: any, formData: FormData) {
  const userData = Object.fromEntries(formData.entries());

  const result = await formSchema.safeParseAsync(userData);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, HASH_SALT);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/profile");
  }
}
