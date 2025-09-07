import ReactDOM from "react-dom";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const modalRoot = document.querySelector(".modal-container");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={onClose}
      />
      <div className="relative w-11/12 max-w-lg bg-white rounded-2xl p-6 shadow-l">
        <div className="flex flex-col gap-4">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
