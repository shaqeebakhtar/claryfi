import { Metadata } from 'next';
import Link from 'next/link';
import OAuthLogins from '../_components/oauth-logins';

export const metadata: Metadata = {
  title: 'Create an account | Acme Inc',
};

const Register = () => {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="space-y-6">
        <div className="space-y-1.5 text-center">
          <h3 className="text-2xl font-semibold font-title">
            Create your account
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit sapiente.
          </p>
        </div>
        <OAuthLogins />
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="underline underline-offset-1 font-medium hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
