'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { TooltipProvider } from '@/components/ui/tooltip'
import { UserProvider } from '@/app/context/UserContext'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <UserProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </UserProvider>
    </NextThemesProvider>
  )
}
