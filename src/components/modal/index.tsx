"use client";
import { cn } from "@/libs/utils";
import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import { CloseIcon } from "@/assets/icons";
import Link from "next/link";
interface Props {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  triggerProp?: React.JSX.Element;
  containerClassName?: string;
  titleClassName?: string;
  renderFooter?: {
    onSave: () => void;
    submitButtonName?: string;
    cancelButtonName?: string;
  };
}

const Modal = ({
  open,
  onClose,
  title,
  triggerProp,
  containerClassName,
  titleClassName,
  renderFooter,
  children,
}: Props) => {
  const [visible, setVisible] = useState(open);

  const handleModalClose = () => {
    setVisible(false);
    onClose?.();
  };

  const handleModalSave = () => {
    renderFooter?.onSave?.();
    // handleModalClose();
  };

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const renderModalHeader = () => {
    return title ? (
      <header className="flex items-center justify-between md:px-6 px-4 py-4 border-b">
        <h5 className={cn("text-black/90", titleClassName)}>{title}</h5>
        <CloseIcon onClick={handleModalClose} />
      </header>
    ) : (
      <button className="absolute top-4 right-4 p-1" onClick={handleModalClose}>
        <CloseIcon />
      </button>
    );
  };

  const renderModalFooter = () => {
    return renderFooter ? (
      <footer className="flex justify-between border-t p-2.5">
        <div>
          <Link href="https://ctsdatabase.com/privacy/">CTSdatabase Privacy Policy</Link>
        </div>
        <div className="flex justify-end gap-2.5">
          <Button className="" type="submit" size="small" onClick={handleModalSave}>
            {renderFooter?.submitButtonName ?? "Save"}
          </Button>
          <Button
            className=" border-neutral-500 text-black/90"
            size="small"
            variant="outline"
            onClick={handleModalClose}
          >
            {renderFooter?.cancelButtonName ?? "Close"}
          </Button>
        </div>
        
      </footer>
    ) : null;
  };

  return (
    <>
      {triggerProp && <div onClick={() => setVisible(true)}>{triggerProp}</div>}
      <div
        className={`fixed inset-0 flex items-center justify-center transition-colors duration-200 ease-in z-[100] ${
          visible ? "bg-black/50" : "invisible"
        }`}
        onClick={handleModalClose}
      >
        <main
          className={cn(
            `bg-white rounded-lg shadow transition-all duration-200 ease-in-out max-h-[80vh] overflow-y-auto w-[80vw] sm:w-[70vw] lg:w-[50vw] ${
              visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`,
            containerClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {renderModalHeader()}
          <div className="p-4 md:p-6">{children}</div>
          {renderModalFooter()}
        </main>
      </div>
    </>
  );
};

export default Modal;
