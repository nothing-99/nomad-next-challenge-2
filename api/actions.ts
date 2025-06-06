"use server";

import { FaShieldHeart } from "react-icons/fa6";
import { z } from "zod";

/**
 * 오직 "@zod.com" 이메일만 허용 된다.
 * 유저명은 5 글자 이상이어야 한다.
 * 비밀번호는 10 글자 이상이어야 하며, 반드시 1개 이상의 숫자를 포함해야 한다.
 */

const formSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/@zod\.com$/, 'end only "@zod.com"'),
  username: z.string().min(5, "at least 5 characters"),
  password: z.string().min(10, "at least 10 charaters").regex(/\d/, "include at least a number"),
});

export async function loginAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

  const inputData = Object.fromEntries(formData);
  // validation with zod
  const result = formSchema.safeParse(inputData);

  if (!result.success) {
    return { success: false, ...result.error.flatten() };
  }

  return {
    success: true,
    formErrors: null,
    fieldErrors: null,
  };
}
