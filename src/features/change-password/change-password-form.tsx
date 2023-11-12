'use client';
import { toast } from "react-toastify";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useChangePasswordMutation, useMatchPasswordMutation } from "@/hooks/rq-hooks/self-hooks";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: changePasswordMutation } = useChangePasswordMutation();
  const { mutate: checkOldPassword} = useMatchPasswordMutation();
  const router = useRouter();

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
      onSuccess: ({ data, error }: any) => {
        if (data) {
          reset();
          toast.success(data.message, { position: "top-center" });
          signOut();
        } else if (error) {
          toast.warn(error?.detail, { position: "top-center" });
        }
      },
      //TODO
      // onError: (err: any) => {
      //   toast.warn(err?.error?.message, {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     theme: "dark"
      //   });
      // },
      onSettled: () => {
        setIsLoading(false);
      }
    });
  };

  const onChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkOldPassword({ password: e.target.value.trim() as string },{
      onSettled: (res) => {
        const {data, error}: any = res;
        if(!data?.isValidPassword) {
          setError("old_password", {
            type: "manual",
            message: data.message,
          })
        } else if(data?.isValidPassword){
          clearErrors("old_password");
        }
      }
    });
  };

  return (
    <div>
      <div className="w-[450px] p-10">
        <h2 className="mb-6">Reset Password</h2>
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

        {/* <div className="text-sm text-secondary flex items-center gap-8 mt-6">
          <Link href="#">CTSdatabase Privacy Policy</Link>
        </div> */}
      </div>
    </div>
  )
}

export default ChangePasswordForm