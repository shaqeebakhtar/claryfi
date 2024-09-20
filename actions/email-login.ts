'use server';

import { signIn } from '@/lib/auth';
import { db } from '@/lib/db';

export const handleEmailSingin = async (email: string) => {
  // check if account exists
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    await signIn('resend', {
      email,
      redirect: false,
      redirectTo: '/dashbaord',
    });

    return { isSuccess: true, message: 'Email sent! Please check your inbox.' };
  }

  return { isSuccess: false, message: 'No account exists with this email.' };
};
