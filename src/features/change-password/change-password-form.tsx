'use client';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useChangePasswordMutation, useMatchPasswordMutation } from "@/hooks/rq-hooks/self-hooks";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { apiResponseToast } from "@/utils/toast";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";
import { toast } from "react-toastify";
import Alert from "@/components/ui/alert";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: changePasswordMutation } = useChangePasswordMutation();
  const { mutate: checkOldPassword } = useMatchPasswordMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (value) => {
    setIsLoading(true);
    const enteredOldPassword = value.old_password.trim() as string;
    const enteredNewPassword = value.password.trim() as string;
    const enteredRetypedPassword = value.retype_password.trim() as string;

    if (enteredOldPassword === enteredNewPassword) {
      setError("password", {
        type: "manual",
        message: "New password must be different from the old password."
      });
      setIsLoading(false);
      return;
    }

    if (enteredNewPassword !== enteredRetypedPassword) {
      setError("retype_password", {
        type: "manual",
        message: "New password and re-entered password must match."
      });
      setIsLoading(false);
      return;
    }

    const payload = {
      newPassword: value.password.trim() as string,
      confirmationPassword: value.retype_password.trim() as string,
      oldPassword: value.old_password.trim() as string
    }
    changePasswordMutation(payload, {
      onSuccess: ({ data }: any) => {
        reset();
        apiResponseToast(data);
        signOut();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.detai);
        
      },
      onSettled: () => {
        setIsLoading(false);
      }
    });
  };

  const onChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkOldPassword({ password: e.target.value.trim() as string }, {
      onSuccess: ({ data }: any) => {
        if (!data?.isValidPassword) {
          setError("old_password", {
            type: "manual",
            message: data.message,
          })
        } else if (data?.isValidPassword) {
          clearErrors("old_password");
        }
      }
    });
  };

  return (
    <div className="w-full">
    <Breadcrumbs title="Change Password" subTitle="Change Password" />
    <section className="wrapper">
      <h4 className="px-6 py-4">
        Change/Reset Password
      </h4>
      <hr />
      <div className="w-[450px] p-10">
        <Alert variant='warning' className="mb-6 p-2">
          Password length must be at least 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.
        </Alert>
        <form className="space-y-6 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Previous Password"
              placeholder="Enter Previous password"
              {...register("old_password", {
                required: "Old password is required!"
              })}
              onChange={onChangeOldPassword}
            />
            {errors.old_password && (
              <span className="text-red-500 -mt-10">{errors.old_password.message as string}</span>
            )}
          </div>
          <div>
            <Input
              label="New Password"
              placeholder="Enter new password"
              {...register("password", {
                required: "New Password is required!",
                pattern: {
                  value: /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$/,
                  message: "Password must be 8 characters with atleast one digit, one uppercase, one lowercase and one special character!"
                }
              })} />
            {errors.password && (
              <span className="text-red-500">{errors.password.message as string}</span>
            )}
          </div>
          <div>
            <Input
              label="Re-enter New Password"
              placeholder="Re-enter new password"
              {...register("retype_password", {
                required: "Confirmation password is required!",
                pattern: {
                  value: /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$/,
                  message: "Password must be 8 characters with atleast one digit, one uppercase, one lowercase and one special character!"
                }
              })}
            />{errors.retype_password && (
              <span className="text-red-500">{errors.retype_password.message as string}</span>
            )}
          </div>
          <Button className="!mt-10 w-fit" loading={isLoading} disabled={isLoading} type="submit">Save Changes</Button>
        </form>
      </div>
      </section>
    </div>
  )
}

export default ChangePasswordForm;