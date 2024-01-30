// Modal.tsx
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed top-[50px] left-0  w-full h-full flex items-center justify-center z-10 overflow-y-auto">
      <div className="absolute w-full h-full bg-gray-900 opacity-40" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-[30px] shadow-md overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {children}
      </div>
    </div>
  );
}
