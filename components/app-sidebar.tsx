'use client';

import { LifeBuoy, Send, Settings, ZapIcon } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser, NavUserLoader } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';
import { BoardSwitcher, BoardSwitcherLoader } from './board-switcher';
import { Separator } from './ui/separator';
import { getBoards } from '@/services/admin/board';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: boards, isPending } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  const { data: session, status } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const pathname = usePathname();

  const navLinks = {
    navMain: [
      {
        title: 'Feedbacks',
        url: `/${slug}`,
        icon: Send,
        isActive: pathname === `/${slug}`,
      },
      {
        title: 'Settings',
        url: `/${slug}/settings`,
        icon: Settings,
        isActive: pathname === `/${slug}/settings`,
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isPending ? (
          <BoardSwitcherLoader />
        ) : (
          boards && <BoardSwitcher boards={boards} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navLinks.navMain} />
        <NavSecondary items={navLinks.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          className="bg-orange-600 hover:bg-orange-600/90 mb-3 text-white hover:text-white group-data-[state=expanded]:justify-center"
          tooltip="Upgrade"
        >
          <ZapIcon />
          <span>Upgrade</span>
        </SidebarMenuButton>
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
