// pages/sign-in.tsx
import { GetServerSideProps } from "next";
import SignInForm from "@/components/ui/auth/login-form";

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
