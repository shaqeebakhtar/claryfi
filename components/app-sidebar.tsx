'use client';

import {
  Box,
  Code,
  LifeBuoy,
  MousePointerClick,
  Palette,
  Send,
  Settings2,
  Tag,
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
        title: 'Events',
        url: `/${slug}/events`,
        icon: MousePointerClick,
      },
      {
        title: 'Share & Embed',
        url: `/${slug}/share`,
        icon: Code,
      },
      {
        title: 'Settings',
        url: `/${slug}/settings`,
        icon: Settings2,
      },
      {
        title: 'Appearance',
        url: `/${slug}/appearance`,
        icon: Palette,
      },
      {
        title: 'Tags',
        url: `/${slug}/tags`,
        icon: Tag,
      },
      {
        title: 'People',
        url: `/${slug}/people`,
        icon: UsersRound,
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
