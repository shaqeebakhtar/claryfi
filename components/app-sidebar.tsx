'use client';

import {
  Box,
  Code,
  LifeBuoy,
  Send,
  Settings2,
  UsersRound,
  ZapIcon,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser, NavUserLoader } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { getBoards } from '@/data-access/board';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { BoardSwitcher, BoardSwitcherLoader } from './board-switcher';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useParams } from 'next/navigation';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: boards, isPending } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  const { data: session, status } = useSession();
  const { slug } = useParams<{ slug: string }>();

  const navLinks = {
    navMain: [
      {
        title: 'Feedbacks',
        url: `/${slug}`,
        icon: Send,
      },
      {
        title: 'Changelog',
        url: `/${slug}/changelog`,
        icon: Box,
      },
      {
        title: 'Share & Embed',
        url: `/${slug}/share`,
        icon: Code,
      },
      {
        title: 'Team',
        url: `/${slug}/team`,
        icon: UsersRound,
      },
      {
        title: 'Settings',
        url: `/${slug}/settings`,
        icon: Settings2,
      },
    ],
    navSecondary: [
      {
        title: 'Support',
        url: '#',
        icon: LifeBuoy,
      },
      {
        title: 'Share feedback',
        url: '#',
        icon: Send,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        {isPending ? (
          <BoardSwitcherLoader />
        ) : (
          <BoardSwitcher boards={boards} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navLinks.navMain} />
        <NavSecondary items={navLinks.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <Button className="bg-orange-600 hover:bg-orange-600/90 mb-3">
          <ZapIcon className="w-4 h-4 mr-2" />
          Upgrade
        </Button>
        <Separator />
        {status === 'authenticated' ? (
          <NavUser user={session.user} />
        ) : (
          <NavUserLoader />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
