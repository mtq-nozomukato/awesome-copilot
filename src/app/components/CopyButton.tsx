import { MdContentCopy, MdCheck } from "react-icons/md";
import { ButtonHTMLAttributes } from "react";

export default function CopyButton({ copied, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { copied: boolean }) {
  return (
    <button
      aria-label={copied ? "コピー済" : "コピー"}
      className="ml-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      {...props}
    >
      {copied ? <><MdCheck className="text-green-500" /> コピー済</> : <><MdContentCopy /> コピー</>}
    </button>
  );
}
