import Link from "next/link";

const Modal = ({ children }: { children: React.ReactNode}) => {
    return (
        <div>
            <Link href="/" className="modal" />
            {children}
        </div>
    )
}

export default Modal