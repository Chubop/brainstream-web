"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconSpinner } from "@/components/ui/icons";
import supabaseClient from "@/lib/supabaseClient";

interface LoginButtonProps extends ButtonProps {
  text?: string;
  fullWidth?: boolean;
  password?: string;
  email?: string;
}

export function SignUpButton({
  text = "Sign Up",
  className,
  email = "",
  password = "",
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <Button
        variant="outline"
        fullWidth
        onClick={() => {
          setIsLoading(true);
          supabaseClient.auth.signUp({
            email: email,
            password: password,
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
