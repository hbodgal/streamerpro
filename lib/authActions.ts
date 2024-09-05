// This file contains code of Authentication Actions to perform Server Side on demand.
"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Server Action called on Signup
export const signUpAction = async (formData: FormData) => {
  const firstname = formData.get("firstname")?.toString();
  const lastname = formData.get("lastname")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password || !firstname || !lastname) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${firstname + " " + lastname}`,
        email: formData.get("email") as string
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

// Server Action called on SignIn using Form
export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();
  const origin = headers().get("origin");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect(`${origin}`);
};

// Server Action called on Google SignIn
export const googleSignInAction = async () => {

  const supabase = createClient();
  const origin = headers().get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
      redirectTo: `${origin}/auth/callback`,
    },
  })
  
  if (data.url) {
    redirect(data.url)
  }
};

// Server Action called on Sign Out
export const signOutAction = async () => {
  const supabase = createClient();
  const origin = headers().get("origin");
  await supabase.auth.signOut();
  return redirect("/");
};

// Server Action called to Check if user is still Authenticated
export const checkAuthenticationAction = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
      return redirect("/sign-in");
  }
  return data;
}

// Server Action called to get User Details
export const getUserAction = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return;
  }
  return data;
}

// Server Action called to redirect user to home from anywhare
export const redirectUserToHomeAction = async () => {
  return redirect("/");
}