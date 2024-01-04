"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SignUpButton } from "./signup-button";
import { Label } from "../ui/label";
import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { Checkbox } from "../ui/checkbox";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checked, setChecked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleBlur = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleDisabled = () => {
    if (!checked) return true;
    if (!email || !firstName || !lastName) return true;
    return password !== confirmPassword || password.trim().length <= 0 || password.length <= 6;
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-theme(spacing.56))] max-w-lg flex-col items-center justify-center space-y-4 py-10">
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
          onBlur={handleBlur}
          type="password"
          className={passwordError ? 'border-red-600' : ''}
        />
      </div>

      <div style={{width: "100%"}}>
        <Label>Confirm Password</Label>
        <Input
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleBlur}
          type="password"
          className={passwordError ? 'border-red-600' : ''}
        />
      </div>

      <div className="flex items-center space-x-2 py-4">
        <Checkbox defaultChecked={checked} onCheckedChange={(val: boolean) => setChecked(val)} />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>

      <SignUpButton
        email={email}
        password={password}
        firstName={firstName}
        lastName={lastName}
        disabled={handleDisabled()}
      />


      <hr className="w-full" />
    </div>
  );
}
