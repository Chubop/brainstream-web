'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { IconSidebar } from '@/components/ui/icons';
import { useUserId } from '@/lib/hooks/use-user-id';

export interface SidebarProps {
    children?: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
    const userId = useUserId();

    return (
        <Sheet>
            <SheetTrigger asChild>
                {userId && (
                    <Button variant="ghost" className="-ml-2 h-9 w-9 p-0">
                        <IconSidebar className="h-6 w-6" />
                        <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
                <SheetHeader className="p-4">
                    <SheetTitle className="text-sm">
                        Recording History
                    </SheetTitle>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    );
}
