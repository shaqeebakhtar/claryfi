'use client';
import { getBoards } from '@/services/admin/board';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  const { data: session, status } = useSession();

  const { data: boards, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  if (!session?.user && status !== 'loading') {
    redirect('/login');
  }

  if (boards?.length === 0 && !isLoading) {
    redirect('/onboarding');
  }

  if (boards && !isLoading) {
    redirect(`/${boards[0].slug}`);
  }
};

export default Dashboard;
