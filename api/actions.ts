"use server";

export async function loginAction(
  prevState: IState | null,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

  const inputData = Object.fromEntries(formData);
  const { password } = inputData;
  const errors = [];
  let isCorrectPassword = true;

  if (password !== "12345") {
    isCorrectPassword = false;
    errors.push("Wrong password!");
  }

  return {
    ok: isCorrectPassword,
    errors,
  };
}

interface IState {
  ok: boolean;
  errors: [] | string[];
}
