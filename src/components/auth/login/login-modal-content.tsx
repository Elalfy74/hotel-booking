import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Divider } from '@/components/ui/divider';

import { ContentComponentProps } from '../shared/auth-modal-content';
import { SocialAuth } from '../shared/social-auth';
import { LoginForm } from './login-form';

export const LoginModalContent = ({ handleContentChange }: ContentComponentProps) => {
  return (
    <>
      <DialogHeader className="text-left">
        <DialogTitle className="mb-4 text-center text-3xl">Welcome Back!</DialogTitle>
        <div>
          <SocialAuth />
          <Divider>Or continue with</Divider>
          <LoginForm handleForgotPassword={() => handleContentChange('forgotPassword')} />
        </div>
      </DialogHeader>
      <DialogFooter className="flex-row items-center !justify-center  text-sm text-muted-foreground">
        Doesn&apos;t have an account?
        <Button variant="link" size="sm" onClick={() => handleContentChange('signUp')}>
          Sign up
        </Button>
      </DialogFooter>
    </>
  );
};
