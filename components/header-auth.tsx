// This file contains code to check authentication and render UI (Header).
import { signOutAction } from "@/lib/authActions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.full_name}!
      <div>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/protected/dashboard">Dashboard</Link>
        </Button>
      </div>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
