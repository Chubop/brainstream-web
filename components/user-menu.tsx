'use client';

import Image from 'next/image';
import { type Session } from 'next-auth';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconExternalLink } from '@/components/ui/icons';
import { createSupabaseFrontendClient } from '@/app/auth/supabase';
import { useRouter } from 'next/navigation';

export interface UserMenuProps {
    user: Session['user'];
}

function getUserInitials(name: string) {
    const [firstName, lastName] = name.split(' ');
    return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2);
}

export function UserMenu({ user }: UserMenuProps) {
    const supabaseClient = createSupabaseFrontendClient();
    const router = useRouter();

    return (
        <div className="flex items-center justify-between">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="pl-0">
                        {user?.image ? (
                            <Image
                                className="h-6 w-6 select-none rounded-full ring-1 ring-zinc-100/10 transition-opacity duration-300 hover:opacity-80"
                                src={user?.image ? `${user.image}&s=60` : ''}
                                alt={user.name ?? 'Avatar'}
                                height={48}
                                width={48}
                            />
                        ) : (
                            <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
                                {user?.name
                                    ? getUserInitials(user?.name)
                                    : null}
                            </div>
                        )}
                        <span className="ml-2">{user?.name}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    sideOffset={8}
                    align="start"
                    className="w-[180px]"
                >
                    <DropdownMenuItem className="flex-col items-start">
                        <div className="text-xs font-medium">{user?.name}</div>
                        <div className="text-xs text-zinc-500">
                            {user?.email}
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <a
                            onClick={() => {
                                router.refresh();
                                router.push('/settings');
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-between text-xs"
                        >
                            Settings
                            {/* <IconExternalLink className="w-3 h-3 ml-auto" /> */}
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={async () => {
                            await supabaseClient.auth.signOut();
                            router.refresh();
                            router.push('/');
                        }}
                        className="text-xs"
                    >
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
