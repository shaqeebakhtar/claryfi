import { buttonVariants } from '@/components/ui/button';
import { FileX2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <div className="grid place-items-center min-h-screen">
        <div className="h-full flex flex-col items-center justify-center">
          <div className="rounded-full bg-gray-100 p-3">
            <FileX2 className="h-6 w-6 text-gray-600" />
          </div>
          <h1 className="my-3 text-xl font-semibold">Page Not Found</h1>
          <p className="max-w-sm text-center text-sm text-muted-foreground mb-8">
            The page you are looking for does not exist. You either typed the
            wrong URL or dont have access to this page.
          </p>
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: 'default' })}
          >
            Back to my dashboard
          </Link>
          <Image
            src="/searching.png"
            alt="No links yet"
            width={400}
            height={400}
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
