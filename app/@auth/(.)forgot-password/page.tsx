import { Message } from "@/components/form-message";
import Modal from "@/components/Modal";
import ForgotPassword from "@/components/ui/forgot-password";
 
export default function Page({ searchParams }: { searchParams: Message }) {
  return (
    <Modal>
      <ForgotPassword searchParams={searchParams} />
    </Modal>
  )
}