'use client';

import { useSession } from 'next-auth/react';

import { LoginModal } from './auth/login/login-modal';
import { UserAvatarButton } from './user-avatar-button';

export const UserButton = () => {
  const session = useSession();

  if (session.status === 'loading') return null;

  if (session.status === 'authenticated')
    return (
      <UserAvatarButton
        avatar={session.data?.user?.image || undefined}
        fallBack={session.data?.user?.name?.substring(0, 1) || 'A'}
      />
    );

  return <LoginModal />;
};
