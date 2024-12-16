'use client';
import { generateAvatar } from '@/components/random-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
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
        <Button variant="ghost" className="relative h-8 w-8 rounded-lg">
          <Avatar className="h-8 w-8 rounded-lg">
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
        <DropdownMenuItem
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="font-normal">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
