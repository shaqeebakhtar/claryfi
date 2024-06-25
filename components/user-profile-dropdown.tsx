'use client';

import { generateAvatar } from '@/components/random-avatar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { CircleHelp, LogOut, MessageCircleReply, Settings } from 'lucide-react';
// import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

const UserProfileDropdown = () => {
  //   const { data: session } = useSession();
  const { slug } = useParams() as { slug?: string };
  const [avatar, setAvatar] = useState<ReactNode>('');

  //     useEffect(() => {
  //       if (session?.user?.email) {
  //   const generatedAvatar = generateAvatar(session.user.email as string);
  //         setAvatar(generatedAvatar);
  //       }
  //     }, [session]);

  useEffect(() => {
    const generatedAvatar = generateAvatar('test123');
    setAvatar(generatedAvatar);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            {/* <AvatarImage src={session?.user.image as string} /> */}
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
            {/* <p className="font-medium truncate">{session?.user?.email}</p> */}
            <p className="font-medium truncate">test123@gmail.com</p>
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
        <DropdownMenuItem
        // onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut className="w-4 h-4 mr-2 text-gray-700" />
          <span className="font-normal">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;