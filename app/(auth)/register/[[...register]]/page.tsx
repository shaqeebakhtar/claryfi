import { SignUp } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Register = () => {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="h-screen bg-background grid place-items-center">
      <SignUp fallbackRedirectUrl={'/dashboard'} />
    </div>
  );
};

export default Register;
