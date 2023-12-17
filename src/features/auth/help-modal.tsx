"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";

import Modal from "@/components/modal";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { useHelpMutation } from "@/hooks/rq-hooks/help-hooks";
import { useSession } from "next-auth/react";

interface HelpModalProps {
  open: boolean;
  setOpen: Function;
}

const HelpModal = ({ open, setOpen }: HelpModalProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<any>(session?.user?.email);
  const { mutate } = useHelpMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    control,
    setValue
  } = useForm();

  // const emailField = useWatch({
  //   control,
  //   name: 'email'
  // });

  useEffect(() => {
    if(email){
      setValue('email', email);
    }   
  }, [])

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
      isLoading={isLoading}
      containerClassName="!w-[624px]"
      renderFooter={{
        onSave: handleSubmit(onSubmit),
        submitButtonName: "Send",
        cancelButtonName: "Close",
        privacyPolicyLink: true,
      }}
    >
      <div className="text-black text-base px-1 md:px-3 lg:px-6 py-2">
        <p>
          If you need any help regarding our services, please contact our
          Customer Service team at any time. They will attempt to resolve your
          concerns fairly and in a timely manner.
        </p>
        <form className="space-y-6 mt-10 mb-6 mx-1 md:px-3 lg:px-6">
          <Input
            wrapperClassName="[&>*:first-child]:mb-0 [&>*:first-child]:w-20"
            label="Email:"
            required
            disabled={email === '' ? false : true}
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
            wrapperClassName="[&>*:first-child]:mb-0 [&>*:first-child]:w-20"
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
            wrapperClassName="[&>*:first-child]:mb-0 [&>*:first-child]:w-20"
            label="Query:"
            required
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


