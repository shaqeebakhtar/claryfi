import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="max-w-screen-xl w-full mx-auto py-10 px-3 lg:py-20 lg:px-16">
      <h1 className="text-center font-title font-bold text-4xl leading-[1.15] md:text-6xl md:leading-[1.15]">
        Collect, Prioritize, and{' '}
        <span className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-blue-600 bg-clip-text text-transparent">
          Build Products
        </span>{' '}
        Your Customers Love
      </h1>
      <p className="text-center text-xl text-muted-foreground mx-auto max-w-[680px] mt-4">
        Effortlessly gather feedbacks and suggestions, prioritize the most
        impactful features, and make data-driven product decisions.
      </p>
      <div className="flex flex-col items-center gap-2 mt-6 justify-center">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'rounded-full px-6 h-10'
          )}
        >
          Get Started for Free
        </Link>
        <span className="text-sm text-muted-foreground">
          Free Forever. No credit cards required.
        </span>
      </div>
      <div className="relative max-w-screen-lg mx-2 rounded-xl aspect-video md:mx-auto mt-16 backdrop-blur-sm bg-gray-400/5 p-2 ring-2 ring-inset ring-gray-200/50 lg:rounded-2xl lg:p-3 shadow-[4px_20px_40px_-8px_rgba(0,0,0,0.1)]">
        <Image
          alt="App Demo"
          draggable="false"
          className="w-full h-full object-cover bg-center rounded-sm"
          height="800"
          src="/claryfi-dashboard.png"
          width="1200"
        />
      </div>
    </section>
  );
};

export default Hero;
