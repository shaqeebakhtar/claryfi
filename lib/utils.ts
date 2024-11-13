import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

function hashStringToNumber(string: string): number {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function generateBgColors(string: string): string {
  const hash = hashStringToNumber(string);

  const r = ((hash & 0xff0000) >> 16) * 0.5;
  const g = ((hash & 0x00ff00) >> 8) * 0.5;
  const b = (hash & 0x0000ff) * 0.5;

  // Convert RGB to hex
  const toHex = (value: number) => {
    const hex = Math.floor(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
