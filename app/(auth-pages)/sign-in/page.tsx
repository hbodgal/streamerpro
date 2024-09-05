// This file loads Login UI component
import { Message } from "@/components/form-message";
import Login from "@/components/ui/sign-in";
 
export default function Page({ searchParams }: { searchParams: Message }) {
  return (
      <Login searchParams={searchParams} />
  )
}