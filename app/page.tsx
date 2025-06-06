"use client";

import { useActionState } from "react";

import { FaBitcoin, FaRegCheckCircle, FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";

import { loginAction } from "@/api/actions";

export default function Home() {
  const [state, action] = useActionState(loginAction, null);
  return (
    <div className='max-w-xs flex flex-col gap-6 m-auto'>
      <header className='flex justify-center'>
        <FaBitcoin className='size-10' />
      </header>
      <form
        action={action}
        className={`flex flex-col gap-2 *:text-sm`}
      >
        <FormInput
          emoji={<MdAlternateEmail />}
          name='email'
          type='email'
          placeholder='Email'
          required
          errors={state?.fieldErrors?.email}
        />
        <FormInput
          emoji={<FaRegUser />}
          name='username'
          type='text'
          placeholder='Username'
          required
          errors={state?.fieldErrors?.username}
        />
        <FormInput
          emoji={<IoKeyOutline />}
          name='password'
          type='password'
          placeholder='Password'
          required
          errors={state?.fieldErrors?.password}
        />
        <FormButton text='Login' />
        {state?.success && (
          <div className='h-8 bg-green-500 rounded-lg flex items-center justify-center gap-2 font-bold'>
            <FaRegCheckCircle />
            <span>Welcome back!</span>
          </div>
        )}
      </form>
    </div>
  );
}
