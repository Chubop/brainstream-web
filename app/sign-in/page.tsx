"use client";

import { auth } from "@/auth";
import { LoginButton } from "@/components/login-button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useState } from "react";

export default async function SignInPage() {
  const session = await auth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redirect to home if user is already logged in
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] items-center justify-center space-y-4 py-10 max-w-lg mx-auto">
      <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <LoginButton />
    </div>
  );
}
