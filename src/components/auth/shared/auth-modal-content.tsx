'use client';

import { useEffect } from 'react';

import { ForgotPasswordModalContent } from '../forgot-password/forgot-password-modal-content';
import { LoginModalContent } from '../login/login-modal-content';
import { SignUpModalContent } from '../sign-up/sign-up-modal-content';
import { ContentKey } from './auth.modal';

interface AuthModalContentProps {
  currentContentKey: ContentKey;
  resetContent: () => void;
  handleContentChange: (contentKey: ContentKey) => void;
}

export type ContentComponentProps = {
  handleContentChange: (contentKey: ContentKey) => void;
};

type Contents = Record<ContentKey, React.FC<ContentComponentProps>>;

const contents: Contents = {
  login: LoginModalContent,
  signUp: SignUpModalContent,
  forgotPassword: ForgotPasswordModalContent,
};

export const AuthModalContent = ({
  currentContentKey,
  resetContent,
  handleContentChange,
}: AuthModalContentProps) => {
  const ContentComponent = contents[currentContentKey];

  useEffect(() => {
    resetContent();
  }, [resetContent]);

  return <ContentComponent handleContentChange={handleContentChange} />;
};
