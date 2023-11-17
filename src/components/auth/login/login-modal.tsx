import { Button } from '@/components/ui/button';

import { AuthModal } from '../shared/auth.modal';

export const LoginModal = () => {
  return (
    <AuthModal contentKey="login">
      <Button variant="ghost">Login</Button>
    </AuthModal>
  );
};
