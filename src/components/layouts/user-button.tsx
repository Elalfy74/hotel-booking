'use client';

import { useClientSession } from '@/store/use-client-session';

import { LoginModal } from '../auth/login/login-modal';
import { CustomAvatar } from '../custom-avatar';
import { UserAvatarButton } from './user-avatar-button';

export const UserButton = () => {
  const { data, isLoading } = useClientSession((state) => state.session);

  if (isLoading) return <CustomAvatar />;

  if (data)
    return (
      <UserAvatarButton
        avatar={data.user.image || undefined}
        isAdmin={data.user.role === 'ADMIN'}
        fallBack={data.user.name?.substring(0, 1) || 'A'}
      />
    );

  return <LoginModal />;
};
