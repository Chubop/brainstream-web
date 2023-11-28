"use client"

import { useState } from "react";
import { LoginButton } from "./login-button";
import { Input } from "../input";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto flex h-[calc(100vh-theme(spacing.16))] max-w-lg flex-col items-center justify-center space-y-4 py-10">
      <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <LoginButton fullWidth />
    </div>
  );
}
