"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconSpinner } from "@/components/ui/icons";
import supabaseClient from "@/lib/supabaseClient";
import { Dialog, DialogTrigger } from "../dialog";
import CheckEmailDialog from "./check-email-dialog";

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
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSignUp = () => {
    setIsLoading(true);
    supabaseClient.auth.signUp({
      email: email,
      password: password,
    })
    .then(response => {
      console.log(response);
      setIsLoading(false);
      if(response.error === null){
        // Successful email sent
        setIsDialogOpen(true); // Open the dialog on successful sign up
      }
      else{
        alert(response.error);
      }
    })
    .catch(error => {
      console.error(error);
      setIsLoading(false);
    });
  };

  return (
    <>
      <Button
        variant="outline"
        fullWidth
        onClick={handleSignUp}
        disabled={isLoading}
        className={cn(className)}
        {...props}
      >
        {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : null}
        {text}
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <CheckEmailDialog setIsDialogOpen={setIsDialogOpen}/>
      </Dialog>
    </>
  );
}