import type { ButtonHTMLAttributes, ReactNode } from "react";

export const Button = ({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => (
  <button
    className={`px-4 py-2 rounded font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  >
    {children}
  </button>
);
