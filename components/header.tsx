'use server';

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { clearChats } from "@/app/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { SidebarList } from "@/components/sidebar-list";
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel,
} from "@/components/ui/icons";
import { SidebarFooter } from "@/components/sidebar-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClearHistory } from "@/components/clear-history";
import { UserMenu } from "@/components/user-menu";
import { LoginButton } from "@/components/ui/auth/login-button";
import { createSupabaseAppServerClient, createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { createSupabaseFrontendClient } from "@/app/auth/supabase";

export async function Header() {

  const supabaseClient = createSupabaseAppServerClient();
  const session = ((await supabaseClient.auth.getSession())).data.session;
  return (

    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        {session?.user && (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              {/* @ts-ignore */}
              <SidebarList userId={session?.user?.id} />
            </React.Suspense>
            <SidebarFooter>
              <ThemeToggle />
              <ClearHistory clearChats={clearChats} />
            </SidebarFooter>
          </Sidebar>
        )}
        <div className="flex items-center">
          <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button variant="link" asChild className="-ml-2">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {/* <IconGitHub /> */}
          <span className="hidden md:flex">Shave Max Balls</span>
        </a>
        {/* <a
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          target="_blank"
          className={cn(buttonVariants())}
        >
          <IconVercel className="mr-2" />
          <span className="hidden sm:block">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
        </a> */}
      </div>
    </header>
  );
}
