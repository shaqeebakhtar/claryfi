import { FrameIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid place-items-center h-screen mx-auto">
      <div className="h-full flex flex-col items-center p-6 lg:p-8 2xl:px-24">
        <Link href="/">
          <span className="flex items-center space-x-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
            >
              <rect width="30" height="30" fill="#111827" rx="4" />
              <path
                fill="#fff"
                d="M25 15a10 10 0 0 1-20 0h4a6 6 0 0 0 12 0h4Z"
              />
              <path fill="#fff" d="M17 17h-4V7h4z" />
              <path fill="#fff" d="M15 11V7h10v4z" />
            </svg>
            <span className="font-bold text-lg">Claryfi</span>
          </span>
        </Link>
        <main className="h-full flex items-center justify-between">
          {children}
        </main>
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <p className="text-xs text-muted-foreground">© 2024 Acme Inc</p>
          <div className="flex items-center gap-3 text-muted-foreground text-xs divide-x">
            <Link
              href="/privacy"
              target="_blank"
              className="underline underline-offset-1 hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              target="_blank"
              className="pl-2.5 underline underline-offset-1 hover:text-primary"
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
