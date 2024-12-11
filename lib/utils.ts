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

export function snakeCaseToString(snakeCase: string): string {
  return snakeCase
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const tagColors = [
  {
    name: 'Gray',
    tagClass: 'bg-gray-100 text-gray-600',
    buttonClass: 'bg-gray-500',
  },
  {
    name: 'Red',
    tagClass: 'bg-red-100 text-red-600',
    buttonClass: 'bg-red-500',
  },
  {
    name: 'Orange',
    tagClass: 'bg-orange-100 text-orange-600',
    buttonClass: 'bg-orange-500',
  },
  {
    name: 'Cyan',
    tagClass: 'bg-cyan-100 text-cyan-600',
    buttonClass: 'bg-cyan-500',
  },
  {
    name: 'Green',
    tagClass: 'bg-green-100 text-green-600',
    buttonClass: 'bg-green-500',
  },
  {
    name: 'Blue',
    tagClass: 'bg-blue-100 text-blue-600',
    buttonClass: 'bg-blue-500',
  },
  {
    name: 'Yellow',
    tagClass: 'bg-yellow-100 text-yellow-600',
    buttonClass: 'bg-yellow-500',
  },
  {
    name: 'Purple',
    tagClass: 'bg-purple-100 text-purple-600',
    buttonClass: 'bg-purple-500',
  },
];
