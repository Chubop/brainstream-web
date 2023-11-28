import { GetServerSideProps } from 'next';
import { auth } from "@/auth";
import { LoginButton } from "@/components/ui/auth/login-button";
import { Input } from "@/components/ui/input";
import SignInForm from '@/components/ui/auth/signin-form';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth();

  // If user is already logged in, redirect to home
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // If not logged in, continue rendering the page
  return {
    props: {}, // add your own props as necessary
  };
};

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}

