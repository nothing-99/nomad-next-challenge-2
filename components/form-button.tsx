import { useFormStatus } from "react-dom";

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  const buttonText = pending ? "Loading..." : text;
  const styles = pending ? "bg-orange-300 cursor-not-allowed" : "bg-orange-400 text-stone-200";
  return (
    <button
      disabled={pending}
      className={`font-bold rounded-lg h-8 ${styles} w-full`}
    >
      {buttonText}
    </button>
  );
}

interface FormButtonProps {
  text: string;
}
