'use client';

import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import CreateBoardDialog from '@/app/dashboard/_components/create-board-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Board } from '@prisma/client';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

export function BoardSwitcher({ boards }: { boards: Board[] }) {
  const { isMobile } = useSidebar();
  const [activeBoard, setActiveBoard] = useState(boards[0]);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm leading-none text-center font-medium uppercase select-none">
                  {activeBoard.name.slice(0, 2)}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeBoard.name}
                  </span>
                  <span className="truncate text-xs">{activeBoard.slug}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Boards
              </DropdownMenuLabel>
              {boards.map((board) => (
                <DropdownMenuItem
                  key={board.id}
                  onClick={() => setActiveBoard(board)}
                  className="gap-2 p-2"
                  asChild
                >
                  <Link href={'#'}>
                    <div className="flex aspect-square size-6 items-center justify-center rounded-sm border text-xs leading-none text-center font-medium uppercase select-none">
                      {board.name.slice(0, 2)}
                    </div>
                    {board.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <CreateBoardDialog />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

export const BoardSwitcherLoader = () => {
  return (
    <div className="w-full flex items-center gap-2 p-2">
      <Skeleton className="size-8 rounded-lg bg-gray-200" />
      <div className="grid gap-1">
        <Skeleton className="w-24 h-[14px] rounded-sm bg-gray-200" />
        <Skeleton className="w-20 h-[10px] rounded-sm bg-gray-200" />
      </div>
      <Skeleton className="size-6 rounded-md ml-auto bg-gray-200" />
    </div>
  );
};
