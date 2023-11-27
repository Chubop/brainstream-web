"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconSpinner } from "@/components/ui/icons";
import supabaseClient from "@/lib/supabaseClient";
import { Input } from "./ui/input";

interface LoginButtonProps extends ButtonProps {
  text?: string;
}

export function LoginButton({
  text = "Login",
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setIsLoading(true);
          // Use Supabase signIn() function for normal sign in
          supabaseClient.auth.signInWithPassword({
            email: "email",
            password: "password",
          });
        }}
        disabled={isLoading}
        className={cn(className)}
        {...props}
      >
        {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : null}
        {text}
      </Button>
    </>
  );
}
