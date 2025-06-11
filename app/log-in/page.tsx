"use client";

import { useActionState } from "react";
import { loginAction } from "./action";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";

export default function LogInPage() {
  const [state, dispatch] = useActionState(loginAction, null);
  return (
    <div className='max-w-xs flex flex-col gap-4 mx-auto py-2 px-4 bg-stone-200 rounded-sm shadow-orange-400 shadow-2xl'>
      <header className='flex justify-center'>
        <h2 className='font-bold text-xl'>Log In</h2>
      </header>
      <form
        action={dispatch}
        className=''
      >
        <label className='flex flex-col gap-2'>
          <span className='pl-1 uppercase'>email</span>
          <FormInput
            name='email'
            type='text'
            placeholder='Email'
            required
            errors={state?.fieldErrors.email}
          />
        </label>
        <label className='flex flex-col gap-2'>
          <span className='pl-1 uppercase'>password</span>
          <FormInput
            name='password'
            type='password'
            placeholder='Password'
            required
            errors={state?.fieldErrors.password}
          />
        </label>
        <div className='mt-4'>
          <FormButton text='login' />
        </div>
      </form>
    </div>
  );
}
