import { useEffect } from "react";
import { ModalProps } from "../types";
import { IoMdClose } from "react-icons/io";

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
        <div
          className="absolute top-2 right-2 cursor-pointer screen_1170:top-3 screen_1170:right-3 screen_443:top-2 screen_443:right-2 z-[99999]"
          onClick={onClose}
        >
          <IoMdClose className="hover:bg-black/20 rounded-xl w-10 h-10 p-0.5 screen_443:w-8 screen_443:h-8" />
        </div>
        {children}
      </div>
    </div>
  );
}
