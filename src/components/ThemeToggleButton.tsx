import { MdDarkMode, MdLightMode, MdSettings } from "react-icons/md";

export const ThemeToggleButton = ({ theme, setTheme }: { theme: 'system' | 'light' | 'dark', setTheme: (t: 'system' | 'light' | 'dark') => void }) => (
  <div className="fixed top-4 right-4 z-50 flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-full p-2 shadow-md">
    <button
      className={`p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === 'system' ? 'bg-blue-200 dark:bg-blue-900' : ''}`}
      onClick={() => setTheme('system')}
      aria-label="OSの設定に従う"
      type="button"
    >
      <MdSettings size={20} />
    </button>
    <button
      className={`p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === 'light' ? 'bg-blue-200' : ''}`}
      onClick={() => setTheme('light')}
      aria-label="ライトモード"
      type="button"
    >
      <MdLightMode className="text-yellow-400" size={20} />
    </button>
    <button
      className={`p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === 'dark' ? 'bg-blue-900' : ''}`}
      onClick={() => setTheme('dark')}
      aria-label="ダークモード"
      type="button"
    >
      <MdDarkMode className="text-gray-800 dark:text-white" size={20} />
    </button>
  </div>
);
