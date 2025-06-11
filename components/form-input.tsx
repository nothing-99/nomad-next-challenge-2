export default function FormInput({ emoji, name, errors, ...props }: FormInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className={`flex items-center gap-2 ring-1 ring-stone-400  px-2 rounded-xl has-[:focus]:ring-stone-700 has-[:click]:ring-stone-400`}>
        {emoji}
        <input
          name={name}
          {...props}
          className='w-full h-8 outline-none placeholder:text-xs'
        />
      </div>
      <div className='text-xs text-red-500'>
        {errors?.map((error, index) => (
          <span key={index}>{error}</span>
        ))}
      </div>
    </div>
  );
}

interface FormInputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  emoji?: React.ReactNode;
  errors?: string[];
}
