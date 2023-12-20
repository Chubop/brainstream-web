"use server";

import * as React from "react";
import Link from "next/link";

import { clearChats } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { SidebarList } from "@/components/sidebar-list";
import {
  IconSeparator,
} from "@/components/ui/icons";
import { SidebarFooter } from "@/components/sidebar-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClearHistory } from "@/components/clear-history";
import { UserMenu } from "@/components/user-menu";
import {
  createSupabaseAppServerClient,
} from "@/app/auth/supabaseAppRouterClient";
import HeaderButtons from "./header-buttons";
import NewStreamButton from "./ui/new-stream-button";

export async function Header() {
  const supabaseClient = createSupabaseAppServerClient();
  const session = (await supabaseClient.auth.getSession()).data.session;

  
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        {session?.user && (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              {/* @ts-ignore */}
              <NewStreamButton />
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
          {/* <IconGitHub /> */}
          <HeaderButtons />
          {/* <HeaderButton href="/" icon={<IconHome />}>
              Homepage
            </HeaderButton> */}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
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
