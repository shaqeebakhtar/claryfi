import MaxWidthContainer from '@/components/max-width-container';
import { buttonVariants } from '@/components/ui/button';
import UserProfileDropdown from '@/components/user-profile-dropdown';
import { FileX2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <header className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href={'/dashboard'}>
                <span className="font-bold">Claryfi</span>
              </Link>
            </div>
            <UserProfileDropdown />
          </div>
        </div>
      </header>
      <div className="h-[calc(100vh-68px)] grid place-items-center">
        <MaxWidthContainer className="h-full">
          <div className="h-full my-10 flex flex-col items-center justify-center rounded-md border border-gray-200 bg-background py-12">
            <div className="rounded-full bg-gray-100 p-3">
              <FileX2 className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="my-3 text-xl font-semibold">Board Not Found</h1>
            <p className="max-w-sm text-center text-sm text-muted-foreground mb-8">
              The board you are looking for does not exist. You either typed in
              the wrong URL or dont have access to this board.
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
        </MaxWidthContainer>
      </div>
    </>
  );
};

export default NotFound;
