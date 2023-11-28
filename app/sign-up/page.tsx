"use client";

import { useState } from "react";
import supabaseClient from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/ui/auth/signup-form";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <SignUpForm />
    </div>
  );
}
