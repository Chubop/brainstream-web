'use client';

import { Button } from './button';
import { IconPlus, IconSpinner } from './icons';
import { useCreateStream } from '@/lib/hooks/use-create-stream';

type NewStreamButton = {
    children?: string;
};

const NewStreamButton: React.FC<NewStreamButton> = ({ children }) => {
    const { createAndNavigate, isLoading } = useCreateStream();

    return (
        <div className="flex w-full justify-center px-2 pb-2">
            <Button
                onClick={createAndNavigate}
                disabled={isLoading}
                variant={'ghost'}
                className="w-full text-center"
            >
                {isLoading ? (
                    <IconSpinner className="mr-2 animate-spin" />
                ) : (
                    <IconPlus className="mr-2" />
                )}
                {children || 'New Stream'}
            </Button>
        </div>
    );
};
export default NewStreamButton;
