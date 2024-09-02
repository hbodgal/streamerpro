import { Message } from "@/components/form-message";
import ForgotPassword from "@/components/ui/forgot-password";
 
export default function Page({ searchParams }: { searchParams: Message }) {
  return (
      <ForgotPassword searchParams={searchParams} />
  )
}