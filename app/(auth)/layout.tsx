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
      <div className="h-full flex flex-col p-6 lg:p-8 2xl:px-24">
        <div className="flex items-center gap-2 text-lg font-title font-semibold">
          <FrameIcon className="w-5 h-5 text-primary" />
          Acme Inc
        </div>
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
