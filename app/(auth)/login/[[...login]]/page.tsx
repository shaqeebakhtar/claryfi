'use client';
import { SignIn, useUser } from '@clerk/nextjs';
import { redirect, useSearchParams } from 'next/navigation';

const Login = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();

  const next = searchParams.get('next');

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="h-screen bg-background grid place-items-center">
      <SignIn fallbackRedirectUrl={next ?? '/dashboard'} />
    </div>
  );
};

export default Login;
