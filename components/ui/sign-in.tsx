import { googleSignInAction, signInAction } from "@/lib/authActions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import SignInWithGoogleButton from "@/components/ui/signInWithGoogle"
export default function Login({ searchParams }: { searchParams: Message }) {

  return (
      <div className="auth-container">
      <form className="flex-1 flex flex-col min-w-64" action={signInAction}>
      <h1 className="text-2xl font-medium">Sign in</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
      <SignInWithGoogleButton />
      <p className="text-sm text-foreground text-center">OR</p>
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton type="submit" pendingText="Signing In...">
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
      <p className="text-sm text-foreground">
        Don&rsquo;t have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </form>
  </div>
  );
}
