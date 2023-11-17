import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { ContentComponentProps } from '../shared/auth-modal-content';
import { ForgotPasswordForm } from './forgot-password-form';

export const ForgotPasswordModalContent = ({ handleContentChange }: ContentComponentProps) => {
  return (
    <DialogHeader>
      <DialogTitle className="mb-4 text-center text-3xl">Password Recovery</DialogTitle>
      <DialogDescription>Enter your email to recover your password</DialogDescription>
      <div>
        <ForgotPasswordForm />
      </div>
    </DialogHeader>
  );
};
