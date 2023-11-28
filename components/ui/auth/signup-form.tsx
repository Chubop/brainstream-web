"use client";

import { useState } from "react";
import supabaseClient from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "./signup-button";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="mx-auto flex h-[calc(100vh-theme(spacing.16))] max-w-lg flex-col items-center justify-center space-y-4 py-10">
      <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <Input
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <SignUpButton
        email={email}
        password={password}
        disabled={password !== confirmPassword || password.trim().length <= 0}
      />
      <hr className="w-full" />
    </div>
  );
}
