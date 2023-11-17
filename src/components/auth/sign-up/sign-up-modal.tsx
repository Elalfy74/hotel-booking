import { Button } from '@/components/ui/button';

import { AuthModal } from '../shared/auth.modal';

export const SignUpModal = () => {
  return (
    <AuthModal contentKey="signUp">
      <Button>Sign Up</Button>
    </AuthModal>
  );
};
