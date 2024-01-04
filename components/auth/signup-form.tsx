"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SignUpButton } from "./signup-button";
import { Label } from "../ui/label";
import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="mx-auto flex h-[calc(100vh-theme(spacing.16))] max-w-lg flex-col items-center justify-center space-y-4 py-10">
      
      <div style={{width: "100%"}}>
        <Label>First Name</Label>
        <Input
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div style={{width: "100%"}}>
        <Label>Last Name</Label>
        <Input
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      
      <div style={{width: '100%'}} >
        <Label>Email</Label>
        <Input onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div style={{width: "100%"}}>
        <Label>Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
      </div>

      <div style={{width: "100%"}}>
        <Label>Confirm Password</Label>
        <Input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />
      </div>

      <SignUpButton
        email={email}
        password={password}
        firstName={firstName}
        lastName={lastName}
        // disabled={password !== confirmPassword || password.trim().length <= 0 || password.length <= 6}
      />
      
      <hr className="w-full" />
    </div>
  );
}
