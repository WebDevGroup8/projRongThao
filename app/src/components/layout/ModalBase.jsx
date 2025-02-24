import { useEffect, useState } from "react";

export default function ModalBase({ children, isOpen, setIsOpen, countDown }) {
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const duration = 200;
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => setVisible(true), 10); // Small delay to trigger the transition
      if (countDown) {
        countDown();
      }
    } else {
      setVisible(false);
      setTimeout(() => setShowModal(false), duration); // Match the duration of the animation
    }
  }, [isOpen, countDown]);

  if (!showModal) return null;

  const handleClose = () => {
    setVisible(false);
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleClose}
      className={`bg-opacity-50 fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black transition-opacity duration-${duration} ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`max-h-3/4 w-full transform overflow-auto rounded-lg p-6 transition-transform duration-${duration} ${
          visible ? "scale-100" : "pointer-events-none scale-95"
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
