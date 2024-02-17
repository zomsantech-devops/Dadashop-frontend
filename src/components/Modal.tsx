import { ModalProps } from "../types";

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors w-full h-full z-20 overflow-y-auto
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl p-6 transition-all overflow-y-auto
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        style={{ maxHeight: "calc(100vh - 125px)" }}
      >
        {children}
      </div>
    </div>
  );
}
