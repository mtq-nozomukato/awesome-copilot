import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 ${props.className ?? ''}`}
    />
  );
}
