"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { CopyButton } from "../components/CopyButton";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Radio } from "../components/Radio";
import { StrengthIndicator } from "../components/StrengthIndicator";
import { ThemeToggleButton } from "../components/ThemeToggleButton";
import { generatePassword, generateSha256, getStrength } from "../utils/password";
import type { PasswordType, PasswordOptions } from "../types/password";

const defaultLength = 12;

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function Home() {
  const [length, setLength] = useState(defaultLength);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [firstUppercase, setFirstUppercase] = useState(false);
  const [forbiddenSymbols, setForbiddenSymbols] = useState("");
  const [type, setType] = useState<PasswordType>('password');
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getSystemTheme());

  useEffect(() => {
    if (theme === 'system') {
      const update = () => setResolvedTheme(getSystemTheme());
      update();
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', update);
      return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', update);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const handleGenerate = async () => {
    if (type === "uuid") {
      setResult(crypto.randomUUID());
      return;
    }
    if (type === "sha256") {
      setResult(await generateSha256());
      return;
    }
    const options: PasswordOptions = {
      length,
      useSymbols,
      useUppercase,
      useLowercase,
      useNumbers,
      type,
      firstUppercase,
      forbiddenSymbols,
    };
    setResult(generatePassword(options));
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const strength = getStrength(result);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2 dark:text-white">
          パスワード自動生成サービス
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          オプションを選んで「生成」ボタンを押すだけ！
        </p>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <div className="flex items-center gap-2">
            <label htmlFor="length-input" className="font-medium dark:text-white">文字数:</label>
            <Button type="button" className={length === 6 ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} onClick={() => setLength(6)}>6</Button>
            <Button type="button" className={length === 8 ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"} onClick={() => setLength(8)}>8</Button>
            <Input id="length-input" type="number" min={4} max={32} value={length} onChange={e => setLength(Number(e.target.value))} className="w-16" aria-label="文字数を指定" />
          </div>
          <div className="flex gap-4 flex-wrap">
            <Checkbox id="symbols" label="記号含む" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} />
            <Checkbox id="uppercase" label="大文字含む" checked={useUppercase} onChange={e => setUseUppercase(e.target.checked)} />
            <Checkbox id="lowercase" label="小文字含む" checked={useLowercase} onChange={e => setUseLowercase(e.target.checked)} />
            <Checkbox id="numbers" label="数字含む" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} />
            <Checkbox id="first-uppercase" label="先頭を大文字にする" checked={firstUppercase} onChange={e => setFirstUppercase(e.target.checked)} />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="forbidden-symbols" className="font-medium dark:text-white">禁止記号:</label>
            <Input id="forbidden-symbols" type="text" value={forbiddenSymbols} onChange={e => setForbiddenSymbols(e.target.value)} className="w-32" aria-label="禁止記号を指定" placeholder="例: @#$" />
          </div>
          <div className="flex gap-4 flex-wrap" role="radiogroup" aria-label="生成タイプ">
            <Radio id="type-password" label="パスワード" name="type" value="password" checked={type === "password"} onChange={() => setType("password")}/>
            <Radio id="type-uuid" label="uuid" name="type" value="uuid" checked={type === "uuid"} onChange={() => setType("uuid")}/>
            <Radio id="type-sha256" label="sha256" name="type" value="sha256" checked={type === "sha256"} onChange={() => setType("sha256")}/>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">生成</Button>
        </form>
        <div className="flex flex-col gap-2 items-center">
          <div className="w-full flex items-center gap-2">
            <span className="font-mono text-lg break-all dark:text-white" aria-live="polite">
              {result || "ここに生成結果が表示されるよ"}
            </span>
            <CopyButton copied={copied} onClick={handleCopy} disabled={!result} />
          </div>
          {type === "password" && result && <StrengthIndicator strength={strength} />}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          ※ 生成したパスワードは保存されません。安全な場所にコピーして使ってね！
        </p>
      </div>
    </div>
  );
}
