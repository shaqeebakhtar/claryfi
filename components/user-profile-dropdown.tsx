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
import { useClerk, useUser } from '@clerk/nextjs';
import { CircleHelp, LogOut, MessageCircleReply, Settings } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

const UserProfileDropdown = () => {
  const [avatar, setAvatar] = useState<ReactNode>('');
  const { signOut } = useClerk();
  const { user } = useUser();

  useEffect(() => {
    if (user?.emailAddresses[0].emailAddress) {
      const generatedAvatar = generateAvatar(
        user?.emailAddresses[0].emailAddress as string
      );
      setAvatar(generatedAvatar);
    }
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={user?.imageUrl as string} />
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

            <p className="font-medium truncate">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`#`}>
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
              <Settings className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-normal">Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/login' })}>
          <LogOut className="w-4 h-4 mr-2 text-gray-700" />
          <span className="font-normal">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
