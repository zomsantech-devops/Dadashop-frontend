import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const toggleBodyOverflow = () => {
      document.body.style.overflow = open ? "hidden" : "auto";
    };

    toggleBodyOverflow();

    return () => {
      toggleBodyOverflow();
    };
  }, [open]);

  return (
    // backdrop
    <div
      onClick={() => {
        onClose();
        navigate(`/ItemShop`);
      }}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-50 overflow-y-auto
        ${open ? "visible bg-black/10" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl py-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
