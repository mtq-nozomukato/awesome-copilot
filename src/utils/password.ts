import { PasswordOptions } from '../types/password';

export function generatePassword(options: PasswordOptions): string {
  const { length, useSymbols, useUppercase, useLowercase } = options;
  let chars = '';
  if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useSymbols) chars += '!@#$%^&*()_+-={}[]|:;<>,.?/';
  chars += '0123456789';
  let pw = '';
  for (let i = 0; i < length; i++) {
    pw += chars.charAt(Math.floor(Math.random() * chars.length));
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
