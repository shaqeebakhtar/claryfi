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

export function hextToHSL(hex: string) {
  hex = hex.replace('#', '');

  // Convert hex to RGB
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Get the max and min of RGB
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let delta = max - min;

  // Calculate lightness
  let l = (max + min) / 2;

  // If max and min are equal, it's a shade of gray
  let h, s;

  if (delta === 0) {
    h = 0;
    s = 0;
  } else {
    // Calculate saturation
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // Calculate hue
    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / delta + 2) * 60;
        break;
      case b:
        h = ((r - g) / delta + 4) * 60;
        break;
    }
  }

  // Round the results to make them look cleaner
  h = Math.round(h as number);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

export const compressImage = (
  file: File,
  maxWidth = 800,
  quality = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to base64
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Unable to get canvas 2D context');

        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};

export const tagColors = [
  {
    name: 'Gray',
    tagClass: 'bg-gray-50 text-gray-600 border border-gray-200',
    buttonClass: 'bg-gray-500',
  },
  {
    name: 'Red',
    tagClass: 'bg-red-50 text-red-600 border border-red-200',
    buttonClass: 'bg-red-500',
  },
  {
    name: 'Orange',
    tagClass: 'bg-orange-50 text-orange-600 border border-orange-200',
    buttonClass: 'bg-orange-500',
  },
  {
    name: 'Cyan',
    tagClass: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
    buttonClass: 'bg-cyan-500',
  },
  {
    name: 'Green',
    tagClass: 'bg-green-50 text-green-600 border border-green-200',
    buttonClass: 'bg-green-500',
  },
  {
    name: 'Blue',
    tagClass: 'bg-blue-50 text-blue-600 border border-blue-200',
    buttonClass: 'bg-blue-500',
  },
  {
    name: 'Yellow',
    tagClass: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
    buttonClass: 'bg-yellow-500',
  },
  {
    name: 'Purple',
    tagClass: 'bg-purple-50 text-purple-600 border border-purple-200',
    buttonClass: 'bg-purple-500',
  },
];
