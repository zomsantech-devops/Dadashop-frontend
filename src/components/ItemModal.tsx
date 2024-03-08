import { useEffect } from "react";
import { ModalProps } from "../types";

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    const toggleBodyOverflow = () => {
      document.body.style.overflow = open ? "hidden" : "auto";
    };

    toggleBodyOverflow();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center screen_1250:items-start screen_1250:py-10 screen_910:py-0 transition-colors z-50 overflow-y-auto
        ${open ? "visible bg-black/10" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl py-6 transition-all screen_610:w-full
          ${open ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
