import type { InputHTMLAttributes } from "react";

export const Radio = ({ label, id, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex items-center gap-1">
    <input type="radio" id={id} {...props} className="accent-blue-600 w-4 h-4" />
    <label htmlFor={id} className="dark:text-white select-none cursor-pointer">{label}</label>
  </div>
);
