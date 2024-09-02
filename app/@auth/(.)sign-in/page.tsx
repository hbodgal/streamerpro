import { Message } from "@/components/form-message";
import Modal from "@/components/Modal";
import Login from "@/components/ui/sign-in";

 
export default function Page({ searchParams }: { searchParams: Message }) {
  return (
    <Modal>
      <Login searchParams={searchParams} />
    </Modal>
  )
}