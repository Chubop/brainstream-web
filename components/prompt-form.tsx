"use client";

import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { Button, buttonVariants } from '@/components/ui/button'
import { IconArrowElbow, IconPlus, IconUpload } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import AudioUploadDialog from './audio-upload/upload-dialog';
import { Dialog } from './ui/dialog';
import { createSupabaseFrontendClient } from '@/app/auth/supabase';

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [userId, setUserId] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const supabaseClient = createSupabaseFrontendClient();

  React.useEffect(() => {
    async function loadSession() {
      try {
        const { data } = await supabaseClient.auth.getSession();
        if (data.session?.user?.id) {
          setUserId(data.session.user.id);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    }
  
    loadSession();
  }, [supabaseClient.auth]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        
        {isDialogOpen && (
          <div className='m-5'>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AudioUploadDialog setIsDialogOpen={setIsDialogOpen} />
            </Dialog>
          </div>
        )}

        {userId && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={e => {
                  e.preventDefault();
                  setIsDialogOpen(true);
                }}
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
                )}
              >
                <IconUpload />
                <span className="sr-only">New Chat</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>Upload an Audio File</TooltipContent>
          </Tooltip>
        )}

        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
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
  )
}