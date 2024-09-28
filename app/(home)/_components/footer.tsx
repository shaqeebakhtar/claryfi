import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="max-w-screen-xl mx-auto py-8 px-3 lg:pt-8 lg:pb-4 lg:px-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-6 justify-between">
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
          <div className="flex items-center justify-between space-x-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-muted-foreground transition-all hover:text-primary hover:underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-muted-foreground transition-all hover:text-primary hover:underline underline-offset-2"
            >
              Terms of Service
            </Link>
          </div>
        </div>
        <hr className="border-t border-t-gray-500/20 mt-8 mb-4" />
        <p className="text-xs text-center text-muted-foreground">
          - By{' '}
          <Link
            href="https://x.com/shaqeeb_akhtar"
            target="_blank"
            className="text-muted-foreground transition-all hover:text-primary hover:underline underline-offset-2"
          >
            Shaqeeb
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
