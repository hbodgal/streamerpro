// This file loads Signup UI component
import { Message } from "@/components/form-message";
import Signup from "@/components/ui/sign-up";
 
export default function Page({ searchParams }: { searchParams: Message }) {
  return (
      <Signup searchParams={searchParams} />
  )
}