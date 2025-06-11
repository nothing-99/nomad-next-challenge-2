"use server";
import { z } from "zod";
import bcrypt from "bcrypt";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { checkExsitEamil } from "@/lib/validations";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkExsitEamil, "Wrong email"),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function loginAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000 * 3)); //

  const data = Object.fromEntries(formData);
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        password: true,
        id: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user!.password as string);
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password"],
          email: [],
        },
      };
    }
  }
}
