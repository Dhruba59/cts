"use client";
import { cn } from "@/libs/utils";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Button from "../ui/button";
import { CloseIcon, ErrorIcon, SuccessIcon, WarningIcon } from "@/assets/icons";
import Link from "next/link";
import { MODAL_TYPE_ENUM } from "@/model/enum";

interface Props {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  triggerProp?: React.JSX.Element;
  containerClassName?: string;
  closeBtnClassName?: string;
  titleClassName?: string;
  isLoading?: boolean;
  type?: MODAL_TYPE_ENUM;
  maskClosable?: boolean;
  renderFooter?: {
    onSave?: () => void;
    onReject?: () => void;
    submitButtonName?: string;
    rejectButtonName?: string;
    cancelButtonName?: string;
    privacyPolicyLink?: boolean;
    cancelButtonOnly?: boolean;
  };
}

const Modal = ({
  open,
  setOpen,
  onClose,
  title,
  triggerProp,
  containerClassName,
  closeBtnClassName,
  titleClassName,
  renderFooter,
  isLoading,
  children,
  maskClosable=false,
  type = MODAL_TYPE_ENUM.DEFAULT,
}: Props) => {
  const [visible, setVisible] = useState(open);

  const handleModalClose = () => {
    setVisible(false);
    setOpen?.(false);
    onClose?.();
  };

  const handleMaskClick = () => {
    if(maskClosable) {
      handleModalClose();
    }
    return;
  }

  const handleModalSave = () => {
    renderFooter?.onSave?.();
    // handleModalClose();
  };
  const handleModalReject = () => {
    renderFooter?.onReject?.();
    // handleModalClose();
  };
  useEffect(() => {
    setVisible(open);
  }, [open]);

  const renderModalIcon = () => {
    switch (type) {
      case MODAL_TYPE_ENUM.WARNING:
        return <WarningIcon />;
      case MODAL_TYPE_ENUM.ERROR:
        return <ErrorIcon />;
      case MODAL_TYPE_ENUM.SUCCESS:
        return <SuccessIcon />;
      default:
        return <></>;
    }
  };

  const handleTrigger = () => {
    setOpen?.(true);
    setVisible(true);
  };

  const renderModalHeader = () => {
    return title ? (
      <header className="flex items-center justify-between md:px-6 px-4 py-4 border-b dark:bg-dark-lightBlue">
        <div className="flex gap-3">
          {renderModalIcon()}
          <h5 className={cn("text-black/90 dark:text-white/90", titleClassName)}>{title}</h5>
        </div>

        <CloseIcon type="button" onClick={handleModalClose} className={closeBtnClassName} />
      </header>
    ) : (
      <button
        type="button"
        className={cn("absolute top-4 right-4 p-1", closeBtnClassName)}
        onClick={handleModalClose}>
        <CloseIcon fill="black"/>
      </button>
    );
  };

  const renderModalFooter = () => {
    const isPrivacyOpen = renderFooter?.privacyPolicyLink;
    const isCancelButtonOnly = renderFooter?.cancelButtonOnly;
    const isRejectButtonAvailable = renderFooter?.rejectButtonName;
    return renderFooter ? (
      <footer
        className={`flex ${isPrivacyOpen ? "justify-between" : "justify-end"
          } border-t p-2.5`}>
        {isPrivacyOpen && (
          <div>
            <Link href="https://ctsdatabase.com/privacy/" target="_blank">
              CTSdatabase Privacy Policy
            </Link>
          </div>
        )}
        <div className="flex justify-end gap-2.5">
          {!isCancelButtonOnly && (
            <div className="flex flex-row gap-2">
              <Button
                className="bg-blue-500"
                type="submit"
                size="small"
                onClick={handleModalSave}
                loading={isLoading}
                disabled={isLoading}>
                {renderFooter?.submitButtonName ?? "Save"}
              </Button>
              {isRejectButtonAvailable && (
                <Button
                  className=""
                  type="submit"
                  size="small"
                  onClick={handleModalReject}
                  loading={isLoading}
                  disabled={isLoading}>
                  {renderFooter?.rejectButtonName ?? "Reject"}
                </Button>
              )}
            </div>
          )}

          <Button
            className=" border-neutral-500 text-black/90"
            size="small"
            variant="outline"
            onClick={handleModalClose}>
            {renderFooter?.cancelButtonName ?? "Close"}
          </Button>
        </div>
      </footer>
    ) : null;
  };

  return (
    <>
      {triggerProp && <div onClick={handleTrigger}>{triggerProp}</div>}
      <div
        className={`fixed inset-0 text-black dark:text-white flex items-center justify-center transition-colors duration-200 ease-in z-[100]  ${visible ? "bg-black/50" : "invisible"
          }`}
        onClick={handleMaskClick}>
        <main
          className={cn(
            `bg-white dark:bg-dark-lightBlue rounded-lg shadow transition-all duration-200 ease-in-out max-h-[80vh] w-[80vw] sm:w-[70vw] lg:w-[50vw] ${visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`,
            containerClassName
          )}
          onClick={(e) => e.stopPropagation()}>
          {renderModalHeader()}
          <div className="p-2 md:p-4 lg:p-6">{children}</div>
          {renderModalFooter()}
        </main>
      </div>
    </>
  );
};

export default Modal;
