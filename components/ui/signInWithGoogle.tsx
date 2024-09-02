"use client";
import { googleSignInAction } from "@/lib/authActions"
import { Button } from "@/components/ui/button"
const SignInWithGoogleButton = () => {
    return (
        <Button type="button" onClick={() => {googleSignInAction()}} className="bg-white text-black border border-black p-4 hover:bg-black hover:text-white">Continue with Google Account</Button>
    )
}

export default SignInWithGoogleButton;