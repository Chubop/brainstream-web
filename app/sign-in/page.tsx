// pages/sign-in.tsx
import { GetServerSideProps } from "next";
import { auth } from "@/auth";
import SignInForm from "@/components/ui/auth/signin-form";

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
