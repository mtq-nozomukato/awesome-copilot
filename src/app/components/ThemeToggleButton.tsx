import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggleButton({ theme, setTheme }: { theme: 'light' | 'dark', setTheme: (t: 'light' | 'dark') => void }) {
  return (
    <button
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="テーマ切り替え"
      type="button"
    >
      {theme === 'dark' ? <MdLightMode className="text-yellow-400" size={24} /> : <MdDarkMode className="text-gray-800" size={24} />}
    </button>
  );
}
