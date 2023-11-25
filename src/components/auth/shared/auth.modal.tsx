'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/lib/utils';

const AuthModalContent = dynamic(
  () => import('./auth-modal-content').then((mod) => mod.AuthModalContent),
  {
    loading: () => (
      <div className="h-32">
        <Loader />
      </div>
    ),
  },
);

// represent the keys of modal content
export type ContentKey = 'login' | 'signUp' | 'forgotPassword';

interface AuthModalProps {
  contentKey: ContentKey;
  // Trigger element
  children: React.ReactNode;
}

export const AuthModal = ({ contentKey, children }: AuthModalProps) => {
  const [opened, { close, setOpened }] = useDisclosure(false);
  const [currentContentKey, setCurrentContentKey] = useState<ContentKey>(contentKey);

  const handleContentChange = (contentKey: ContentKey) => {
    setCurrentContentKey(contentKey);
  };
  const resetContent = useCallback(() => setCurrentContentKey(contentKey), [contentKey]);

  const widthStyle = currentContentKey === 'signUp' ? 'max-w-md' : 'max-w-sm';

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn(widthStyle, 'transition-none')}>
        <AuthModalContent
          currentContentKey={currentContentKey}
          handleContentChange={handleContentChange}
          resetContent={resetContent}
          close={close}
        />
      </DialogContent>
    </Dialog>
  );
};
