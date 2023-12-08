'use client';

import { useClientSession } from '@/store/use-client-session';

import { LoginModal } from './auth/login/login-modal';
import { CustomAvatar } from './custom-avatar';
import { UserAvatarButton } from './user-avatar-button';

export const UserButton = () => {
  const session = useClientSession((state) => state.session);

  if (session.isLoading) return <CustomAvatar />;

  if (session.data)
    return (
      <UserAvatarButton
        avatar={session.data.user.image || undefined}
        isAdmin={session.data.user.role === 'ADMIN'}
        fallBack={session.data.user.name?.substring(0, 1) || 'A'}
      />
    );

  return <LoginModal />;
};
