import { Button } from '@/components/ui/button';

import { AuthModal } from '../shared/auth.modal';

export const LoginModal = () => {
  return (
    <AuthModal contentKey="login">
      <Button>Login</Button>
    </AuthModal>
  );
};
