export default function FormInput({
  emoji,
  name,
  type,
  placeholder,
  required = false,
}: FormInputProps) {
  return (
    <div className="flex items-center gap-2 ring-1 ring-stone-400 px-2 rounded-xl has-[:focus]:ring-stone-700">
      {emoji}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full h-8 outline-none placeholder:text-xs"
      />
    </div>
  );
}

interface FormInputProps extends React.HTMLAttributes<HTMLInputElement> {
  emoji: React.ReactNode;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
}
