import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Cta = () => {
  return (
    <section className="bg-white w-full mx-auto py-10 px-3 lg:py-20 lg:px-16 flex flex-col items-center">
      <h2 className="text-center text-3xl md:text-5xl font-bold font-title max-w-[820px] mx-auto leading-[1.15] md:leading-[1.15]">
        Ready to Build a Product Your Customers Will Love?
      </h2>
      <p className="md:text-lg md:leading-6 text-center text-muted-foreground mx-auto max-w-[680px] mt-4">
        Sign up now to start collecting feedback, prioritizing features, and
        delivering what your customers need.
      </p>
      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: 'default' }),
          'px-8 h-10 mt-8 rounded-full'
        )}
      >
        Get Started for Free
      </Link>
    </section>
  );
};

export default Cta;
