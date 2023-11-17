import { ArrowRightIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

import { AuthModal } from '../shared/auth.modal';

export const LoginModal = () => {
  return (
    <AuthModal contentKey="login">
      <Button variant="ghost" className="gap-x-2">
        Login
        <ArrowRightIcon />
      </Button>
    </AuthModal>
  );
};
