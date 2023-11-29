import { cn } from '@/lib/utils';
import React from 'react';
import { buttonVariants } from './ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface HeaderButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    icon: React.ReactElement;
    children: React.ReactNode;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, children, ...props }) => {

    return (
        <Link
        href="/"
        className={`group inline-block ${cn(buttonVariants({ variant: "link" }))}`}
        >
            <div className="flex flex-row items-center group-hover:space-x-1">
                {icon}
                <span className='mt-0.5 inline-block max-w-0 overflow-hidden transition-none group-hover:max-w-xl group-hover:transition-all group-hover:duration-200'>{children}</span>
            </div>
        </Link>
    );
};

export default HeaderButton;