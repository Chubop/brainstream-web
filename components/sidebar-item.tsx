'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Stream, type Chat } from '@/lib/types'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface SidebarItemProps {
  stream: Stream
  children: React.ReactNode
}

export function SidebarItem({ stream, children }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === stream.stream_id

  if (!stream?.stream_id) return null

  return (
    <div className="relative">
      <div className="absolute left-2 top-1 flex h-6 w-6 items-center justify-center">
        {(
          <IconMessage className="mr-2" />
        )}
          <IconMessage className="mr-2" />
      </div>
      <Link
        href={"/stream/" + stream.stream_id}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full pl-8 pr-16',
          isActive && 'bg-accent'
        )}
      >
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={stream.stream_name}
        >
          <span className="whitespace-nowrap">{stream.stream_name}</span>
        </div>
      </Link>
      {isActive && <div className="absolute right-2 top-1">{children}</div>}
    </div>
  )
}
