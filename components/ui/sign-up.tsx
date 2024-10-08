import { googleSignInAction, signUpAction } from "@/lib/authActions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Modal from "@/components/Modal";
import SignInWithGoogleButton from "@/components/ui/signInWithGoogle";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <Modal>
      <div className="auth-container">
      <form action={signUpAction} className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <SignInWithGoogleButton />
        <p className="text-sm text-foreground text-center">OR</p>

        <Label htmlFor="firstname">First Name</Label>
        <Input name="firstname" placeholder="firstname" required />
        <Label htmlFor="lastname">Last Name</Label>
        <Input name="lastname" placeholder="lastname" required />
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton type="submit" pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </form>
    </div>
    </Modal>
  );
}