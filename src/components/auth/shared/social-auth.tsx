'use client';

import { GithubIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { GoogleLogo } from '@/components/ui/google-logo';

export const SocialAuth = () => {
  return (
    <div className="flex gap-x-2 text-center">
      <GoogleButton />
      <GitHubButton />
    </div>
  );
};

const GoogleButton = () => {
  return (
    <Button className="flex-1 space-x-3 fill-current" size="lg">
      <GoogleLogo className="h-4 w-4" />
      <span>Sign in With Google</span>
    </Button>
  );
};

const GitHubButton = () => {
  const handleGithubLogin = async () => {
    await signIn('github', {
      redirect: false,
    });
  };

  return (
    <Button
      size="icon"
      className="h-10 w-10 bg-gray-700 hover:bg-gray-700/90"
      onClick={handleGithubLogin}
    >
      <GithubIcon className="h-5 w-5 fill-current dark:fill-white dark:stroke-white" />
    </Button>
  );
};
