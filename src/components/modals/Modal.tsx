import React, { type ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaXmark } from "react-icons/fa6";
interface props {
    className?: "max-w-2xl" | "max-w-3xl" | "max-w-4xl" | "min-w-4xl" | "pointer-events-none bg-opacity-100 animate-pulse" | ""
    children: ReactNode;
    title?: string | ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal: React.FC<props> = ({
    className,
    children,
    title,
    isOpen,
    setIsOpen,
}) => {
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 " onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel   className={`
    ${className}
    w-full max-w-4xl transform overflow-hidden
    rounded-2xl
    bg-white/80 dark:bg-gray-800/80
    backdrop-blur-md
    text-gray-900 dark:text-gray-100
    p-6 text-start align-middle
    shadow-xl transition-all
  `}>
                                    <div className="flex justify-end ">

                                        <Dialog.Title
                                            as="p"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                title="Cancel"
                                                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-all duration-300 hover:rotate-90 active:scale-95 shadow-sm"
                                            >
                                                <FaXmark className="text-lg" />
                                            </button>
                                        </Dialog.Title>
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                                    >
                                        {title}
                                    </Dialog.Title>


                                    <div className="mt-2">{children}</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
export default Modal