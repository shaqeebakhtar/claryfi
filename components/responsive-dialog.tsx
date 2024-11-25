'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react';

interface ModalRootProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  asChild?: true;
}

const Modal = ({ children, ...props }: ModalRootProps) => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;

  const Modal = isMobile ? Drawer : Dialog;

  return <Modal {...props}>{children}</Modal>;
};

const ModalTrigger = ({ className, children, ...props }: ModalProps) => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;

  const ModalTrigger = isMobile ? DrawerTrigger : DialogTrigger;

  return (
    <ModalTrigger className={className} {...props}>
      {children}
    </ModalTrigger>
  );
};

const ModalContent = ({ className, children, ...props }: ModalProps) => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;

  const ModalContent = isMobile ? DrawerContent : DialogContent;

  return (
    <ModalContent className={className} {...props}>
      {children}
    </ModalContent>
  );
};

const ModalHeader = ({ className, children, ...props }: ModalProps) => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;

  const ModalHeader = isMobile ? DrawerHeader : DialogHeader;

  return (
    <ModalHeader className={className} {...props}>
      {children}
    </ModalHeader>
  );
};

const ModalTitle = ({ className, children, ...props }: ModalProps) => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;

  const ModalTitle = isMobile ? DrawerTitle : DialogTitle;

  return (
    <ModalTitle className={className} {...props}>
      {children}
    </ModalTitle>
  );
};

const ModalDescription = ({ className, children, ...props }: ModalProps) => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;

  const ModalDescription = isMobile ? DrawerDescription : DialogDescription;

  return (
    <ModalDescription className={className} {...props}>
      {children}
    </ModalDescription>
  );
};

const ModalFooter = ({ className, children, ...props }: ModalProps) => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;

  const ModalFooter = isMobile ? DrawerFooter : DialogFooter;

  return (
    <ModalFooter className={className} {...props}>
      {children}
    </ModalFooter>
  );
};

const ModalClose = ({ className, children, ...props }: ModalProps) => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;

  const ModalClose = isMobile ? DrawerClose : DialogClose;

  return (
    <ModalClose className={className} {...props}>
      {children}
    </ModalClose>
  );
};

export {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
};
