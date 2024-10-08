// This file contains code to open Sign Up page as a Modal.

import { Message } from "@/components/form-message";
import Modal from "@/components/Modal";
import Signup from "@/components/ui/sign-up";

 
export default function Page({ searchParams }: { searchParams: Message }) {
  return (
    <Modal>
      <Signup searchParams={searchParams} />
    </Modal>
  )
}