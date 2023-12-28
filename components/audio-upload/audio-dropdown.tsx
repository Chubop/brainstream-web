import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IconHamburger, IconPlus, IconUpload } from '../ui/icons';
import { SetStateAction } from 'react';

type AudioDropdownProps = {
    setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>
};

export default function AudioDropdown({setIsDialogOpen}: AudioDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    className={cn(
                        buttonVariants({
                            size: 'sm',
                            variant: 'outline',
                        }),
                        'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
                    )}
                >
                    <IconHamburger />
                    <span className="sr-only">New Chat</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    <IconUpload className="mr-2" />
                    Upload a Recording
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IconPlus className="mr-2" />
                    New Recording
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
