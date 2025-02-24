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
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-${duration} ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div
                className={`w-full max-h-3/4 p-6 rounded-lg overflow-auto transform transition-transform duration-${duration} ${visible ? "scale-100" : "scale-95 pointer-events-none"
                    }`}
            >
                <div>{children}</div>
            </div>
        </div>
    );
}
