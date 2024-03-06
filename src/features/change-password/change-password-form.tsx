'use client';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useChangePasswordMutation, useMatchPasswordMutation } from "@/hooks/rq-hooks/self-hooks";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import Alert from "@/components/ui/alert";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prePassErrorMsg, setPrePassErrorMsg] = useState<string>('');
  const { mutate: changePasswordMutation } = useChangePasswordMutation();
  const { mutate: checkOldPassword } = useMatchPasswordMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, dirtyFields  },
    reset,
    watch
  } = useForm();

  const watchAllPasswordFields = watch(['old_password', 'password', 'retype_password']);

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

    if (prePassErrorMsg) {
      setError("old_password", {
        type: "manual",
        message: prePassErrorMsg,
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
        toast.error(err?.response?.data?.detail);
        
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
          setPrePassErrorMsg(data.message);
          setError("old_password", {
            type: "manual",
            message: data.message,
          });
        } else if (data?.isValidPassword) {
          setPrePassErrorMsg('');
          clearErrors("old_password");
        }
      }
    });
  };

  useEffect(() => {
    const [oldPass, newPass, reTypeNewPass] = watchAllPasswordFields;
    if(newPass === reTypeNewPass) {
      clearErrors('retype_password');
    }
    if(oldPass !== newPass) {
      clearErrors('password');
    }
  }, [watch]);

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
              type="password"
              placeholder="Enter Previous password"
              {...register("old_password", {
                required: "Old password is required!"
              })}
              onBlur={onChangeOldPassword}
            />
            {errors.old_password && (
              <span className="text-red-500 -mt-10">{errors.old_password.message as string}</span>
            )}
          </div>
          <div>
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              {...register("password", {
                required: "New Password is required!",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                  message: "Password must be at least 8 characters with atleast one numeric digit, one uppercase, one lowercase letter!"
                }
              })} />
            {errors.password && (
              <span className="text-red-500">{errors.password.message as string}</span>
            )}
          </div>
          <div>
            <Input
              label="Re-enter New Password"
              type="password"
              placeholder="Re-enter new password"
              {...register("retype_password", {
                required: "Confirmation password is required!",
                validate: (value) => {
                  const newPassword = watch("password");
                  if (value === newPassword) {
                    clearErrors("retype_password");
                    return true;
                  }
                  return "Passwords do not match";
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