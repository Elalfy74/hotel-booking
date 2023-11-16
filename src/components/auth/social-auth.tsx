import { TwitterIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { GoogleLogo } from '../ui/google-logo';

export const SocialAuth = () => {
  return (
    <div className='text-center space-x-2'>
      <GoogleButton />
      <TwitterButton />
    </div>
  );
};

const GoogleButton = () => {
  return (
    <Button className='space-x-3' size='lg'>
      <GoogleLogo className='w-4 h-4' fill='white' />
      <span>Sign in With Google</span>
    </Button>
  );
};

const TwitterButton = () => {
  return (
    <Button size='icon' className='h-10 w-10 bg-gray-700 hover:bg-gray-700/90'>
      <TwitterIcon className='w-5 h-5 fill-current' />
    </Button>
  );
};
