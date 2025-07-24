import { PasswordOptions } from '../types/password';

export function generatePassword(options: PasswordOptions): string {
  const { length, useSymbols, useUppercase, useLowercase, useNumbers, firstUppercase, forbiddenSymbols } = options;
  let chars = '';
  if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useSymbols) chars += '!@#$%^&*()_+-={}[]|:;<>,.?/';
  if (useNumbers) chars += '0123456789';
  // 禁止記号除外
  if (forbiddenSymbols) {
    chars = chars.split('').filter(c => !forbiddenSymbols.includes(c)).join('');
  }
  if (!chars) return '';
  let pw = '';
  for (let i = 0; i < length; i++) {
    pw += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // 先頭大文字化
  if (firstUppercase && pw.length > 0) {
    pw = pw[0].toUpperCase() + pw.slice(1);
  }
  return pw;
}

export async function generateSha256(): Promise<string> {
  const raw = Math.random().toString(36).slice(2) + Date.now();
  const hash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(raw)
  );
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function getStrength(password: string): number {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}
