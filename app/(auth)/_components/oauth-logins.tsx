'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

type OAuthLoginsProps = {
  googleVariant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
};

const OAuthLogins = ({ googleVariant }: OAuthLoginsProps) => {
  const [isGoogleSignin, setIsGoogleSignin] = useState(false);
  const [isGithubSignin, setIsGithubSignin] = useState(false);
  const searchParams = useSearchParams();

  const handleGoogleSingin = async () => {
    setIsGoogleSignin(true);
    await signIn('google', {
      callbackUrl: searchParams.get('next')
        ? (searchParams.get('next') as string)
        : '/dashboard',
    });
  };

  const handleGithubSingin = async () => {
    setIsGithubSignin(true);
    await signIn('github', {
      callbackUrl: searchParams.get('next')
        ? (searchParams.get('next') as string)
        : '/dashboard',
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <Button
        variant={googleVariant}
        disabled={isGoogleSignin}
        onClick={handleGoogleSingin}
      >
        {isGoogleSignin ? (
          <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Icons.google className="w-4 h-4 mr-2" />
        )}
        Continue with Google
      </Button>
      <Button
        variant={'outline'}
        disabled={isGithubSignin}
        onClick={handleGithubSingin}
      >
        {isGithubSignin ? (
          <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Icons.gitHub className="w-4 h-4 mr-2" />
        )}
        Continue with GitHub
      </Button>
    </div>
  );
};

export default OAuthLogins;