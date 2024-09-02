import Link from "next/link";

const Modal = ({ children }) => {
    return (
        <div>
            <Link href="/" className="modal" />
            {children}
        </div>
    )
}

export default Modal