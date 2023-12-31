'use client';

import * as React from 'react';
import Textarea from 'react-textarea-autosize';

import { Button } from '@/components/ui/button';
import { IconArrowElbow } from '@/components/ui/icons';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import AudioUploadDialog from './audio-upload/upload-dialog';
import { Dialog } from './ui/dialog';
import AudioDropdown from './audio-upload/audio-dropdown';
import { useUserId } from '@/lib/hooks/use-user-id';

export interface PromptProps {
    onSubmit: (value: string) => Promise<void>;
    input: string;
    setInput: (value: string) => void;
    isLoading: boolean;
}

export function PromptForm({
    onSubmit,
    input,
    setInput,
    isLoading,
}: PromptProps) {
    const { formRef, onKeyDown } = useEnterSubmit();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const userId = useUserId()
    const inputRef = React.useRef<HTMLTextAreaElement>(null);


    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setInput('');
                await onSubmit(input);
                if (!input?.trim()) {
                    return;
                }
            }}
            ref={formRef}
        >
            <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                {isDialogOpen && (
                    <div className="m-5">
                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                        >
                            <AudioUploadDialog
                                setIsDialogOpen={setIsDialogOpen}
                            />
                        </Dialog>
                    </div>
                )}

                {userId && <AudioDropdown setIsDialogOpen={setIsDialogOpen} />}

                <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={userId ? "Send a message." : "You must be logged in to send a message."}
                    spellCheck={false}
                    disabled={userId ? false : true}
                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                />
                <div className="absolute right-0 top-4 sm:right-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || input === ''}
                            >
                                <IconArrowElbow />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </form>
    );
}
