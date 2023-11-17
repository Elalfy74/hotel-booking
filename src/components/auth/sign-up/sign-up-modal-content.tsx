import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Divider } from '@/components/ui/divider';

import { ContentComponentProps } from '../shared/auth-modal-content';
import { SocialAuth } from '../shared/social-auth';
import { SignUpForm } from './sign-up-form';

export const SignUpModalContent = ({ handleContentChange }: ContentComponentProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-4 text-center text-3xl">Let&apos;s go</DialogTitle>
        <div>
          <SocialAuth />
          <Divider>Or continue with</Divider>
          <SignUpForm />
        </div>
      </DialogHeader>
      <DialogFooter className="items-center !justify-center text-sm text-muted-foreground">
        Already have an account?
        <Button variant="link" size="sm" onClick={() => handleContentChange('login')}>
          Login
        </Button>
      </DialogFooter>
    </>
  );
};
