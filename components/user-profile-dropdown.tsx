'use client';

import { generateAvatar } from '@/components/random-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CircleHelp,
  CircleUserRound,
  LogOut,
  MessageCircleReply,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

const UserProfileDropdown = () => {
  const [avatar, setAvatar] = useState<ReactNode>('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      const generatedAvatar = generateAvatar(session?.user?.email as string);
      setAvatar(generatedAvatar);
    }
  }, [session?.user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={session?.user?.image as string} />
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 font-medium bg-background"
        align="end"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 overflow-hidden">
            <p className="text-xs text-gray-700 font-normal">Logged in as</p>
            <p className="font-medium truncate">{session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/b/claryfi`} target="_blank">
            <DropdownMenuItem>
              <MessageCircleReply className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-normal">Share feedback</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`#`}>
            <DropdownMenuItem>
              <CircleHelp className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-normal">Support</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`#`}>
            <DropdownMenuItem>
              <CircleUserRound className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-normal">Account</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
          onClick={() => signOut({ redirectTo: '/login' })}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="font-normal">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
