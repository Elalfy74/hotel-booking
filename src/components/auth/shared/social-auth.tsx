import { TwitterIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { GoogleLogo } from '@/components/ui/google-logo';

export const SocialAuth = () => {
  return (
    <div className="flex gap-x-2 text-center">
      <GoogleButton />
      <TwitterButton />
    </div>
  );
};

const GoogleButton = () => {
  return (
    <Button className="flex-1 space-x-3" size="lg">
      <GoogleLogo className="h-4 w-4" />
      <span>Sign in With Google</span>
    </Button>
  );
};

const TwitterButton = () => {
  return (
    <Button size="icon" className="h-10 w-10 bg-gray-700 hover:bg-gray-700/90">
      <TwitterIcon className="h-5 w-5 fill-current dark:fill-white dark:stroke-white" />
    </Button>
  );
};
