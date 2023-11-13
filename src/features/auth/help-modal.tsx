"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import Modal from "@/components/modal";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { useHelpMutation } from "@/hooks/rq-hooks/help-hooks";

interface HelpModalProps {
  open: boolean;
  setOpen: Function;
}

const HelpModal = ({ open, setOpen }: HelpModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate } = useHelpMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: ({ data }: any) => {
        reset();
        setOpen(false);
        toast.success(data?.message, { position: "top-center" });
      },
      onError: (err: any) => {
        toast.warn(err?.response.data?.title, { position: "top-center" });
      },
      onSettled: () => {
        setIsLoading(false);
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Submit Query"
      // triggerProp={
      //   <div className="text-secondary text-sm cursor-pointer">Help</div>
      // }
      isLoading={isLoading}
      containerClassName="!w-[624px]"
      renderFooter={{
        onSave: handleSubmit(onSubmit),
        submitButtonName: "Send",
        cancelButtonName: "Close"
      }}
    >
      <div className="text-black text-base px-6 py-2">
        <p>
          If you need any help regarding our services, please contact our
          Customer Service team at any time. They will attempt to resolve your
          concerns fairly and in a timely manner.
        </p>
        <form className="space-y-6 mt-10 mb-6 px-8">
          <Input
            wrapperClassName="grow flex items-center justify-between [&>*:first-child]:mb-0 [&>*:first-child]:w-20"
            label="Email:"
            required
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format"
              }
            })}
          />
          {errors.email && (
            <span className="text-red-500 ml-20">
              {errors.email.message as string}
            </span>
          )}

          <Input
            wrapperClassName="grow flex items-center justify-between [&>*:first-child]:mb-0 [&>*:first-child]:w-20"
            label="Subject:"
            required
            {...register("subject", {
              required: "Subject is required",
              pattern: {
                value: /.+/,
                message: "subject field required"
              }
            })}
          />
          {errors.subject && (
            <span className="text-red-500 ml-20">
              {errors.subject.message as string}
            </span>
          )}

          <Textarea
            wrapperClassName="grow flex items-center justify-between [&>*:first-child]:mb-0 [&>*:first-child]:w-20 [&>*:first-child]:ml-3"
            label="Query:"
            {...register("query", {
              required: "Query is required",
              pattern: {
                value: /.+/,
                message: "Query is required."
              }
            })}
          />
          {errors.query && (
            <span className="text-red-500 ml-20">
              {errors.query.message as string}
            </span>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default HelpModal;
