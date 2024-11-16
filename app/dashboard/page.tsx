'use client';
import { getBoards } from '@/data-access/board';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const { data: boards, isPending } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  if (!session?.user && status !== 'loading') {
    redirect('/login');
  }

  if (boards && !isPending) {
    redirect(`/${boards[0].slug}`);
  }
};

export default Dashboard;
