"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { createAccountAction } from "./action";
import { useActionState } from "react";

export default function CreateAccountPage() {
  const [state, dispatch] = useActionState(createAccountAction, null);
  return (
    <div className='max-w-xs flex flex-col gap-4 mx-auto py-2 px-4 bg-stone-200 rounded-sm shadow-orange-400 shadow-2xl'>
      <header className='flex justify-center'>
        <h2 className='font-bold text-xl'>Create Account</h2>
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
          <span className='pl-1 uppercase'>username</span>
          <FormInput
            name='username'
            type='text'
            placeholder='Username'
            required
            errors={state?.fieldErrors.username}
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
        <label className='flex flex-col gap-2'>
          <span className='pl-1 uppercase'>confirm</span>
          <FormInput
            name='confirmPassword'
            type='password'
            placeholder='Confirm password'
            required
            errors={state?.fieldErrors.confirmPassword}
          />
        </label>
        <div className='mt-4'>
          <FormButton text='submit' />
        </div>
      </form>
    </div>
  );
}
