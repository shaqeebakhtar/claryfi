'use client';
import { handleEmailSingin } from '@/actions/email-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderIcon, MailIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const EmailLogin = () => {
  const [isEmailSignin, setIsEmailSignin] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEmailSignin(true);
    const { isSuccess, message } = await handleEmailSingin(email);

    if (isSuccess) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    setIsEmailSignin(false);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => onSubmit(e)}>
      <Input
        type="email"
        placeholder="example@domain.co"
        required
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <Button type="submit">
        {isEmailSignin ? (
          <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <MailIcon className="w-4 h-4 mr-2" />
        )}
        Continue with Email
      </Button>
    </form>
  );
};

export default EmailLogin;
