"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconSpinner } from "@/components/ui/icons";
import { createSupabaseFrontendClient } from "@/app/auth/supabase";
import { useRouter } from "next/navigation";

interface LoginButtonProps extends ButtonProps {
  text?: string;
  fullWidth?: boolean;
  password?: string;
  email?: string;
}

export function LoginButton({
  text = "Login",
  className,
  email = "",
  password = "",
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter(); // Initialize useRouter

  const supabaseClient = createSupabaseFrontendClient();
  return (
    <>
      <Button
        variant="outline"
        onClick={async () => {
          setIsLoading(true);
          try {
            const response = await supabaseClient.auth.signInWithPassword({
              email: email,
              password: password,
            });
            console.log('Login successful:', response);
            router.push('/'); // Redirect to home page after successful login
          } catch (error) {
            console.error('Login error:', error);
          } finally {
            setIsLoading(false);
          }
        }}
        style={props.fullWidth ? { width: "100%" } : {}}
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
