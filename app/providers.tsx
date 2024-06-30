'use client';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClerkProvider>
  );
};

export default Providers;
