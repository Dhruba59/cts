import Button from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useAddSubjectMutation, useIsDetailsRequired, useValidateSponsorSubjectId, useVerifySocialCode } from "@/hooks/rq-hooks/subject-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { checkDetailRequirement } from "@/service/subject-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { watch } from "fs";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface AddSubjectFormProps {
  dropdowns: { [key: string]: DropDownItem[] | any };
  protocolId: string | undefined;
  subjectIdFormat: string;
}

const AddSubjectForm = ({ dropdowns, protocolId, subjectIdFormat }: AddSubjectFormProps) => {
  const [heightUnitOptions, setHeightUnitOptions] = useState<SelectOptionType[]>();
  const [weightUnitOptions, setWeightUnitOptions] = useState<SelectOptionType[]>();
  const [isDetailsRequired, setIsDetailsRequired] = useState<boolean>(false);
  const [idOptions, setIdOptions] = useState<SelectOptionType[]>();
  const [genderOptions, setGenderOptions] = useState<SelectOptionType[]>();
  const { mutate: addSubject, isLoading: isSubjectAddLoading } = useAddSubjectMutation();
  const { mutate: validateSponsor } = useValidateSponsorSubjectId();
  const { mutate: validateDetailRequirement } = useIsDetailsRequired();
  const { mutate: verifySocialCode } = useVerifySocialCode();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors },
    reset,
    getValues
  } = useForm();

  const onSubmit = async (values: any) => {
    //console.log(values);
    const validationPayload = {
      studyId: protocolId ?? '-1',
      sponsorSubjectId: values.sponsorSubjectID
    }

    const payload = {
      SocialCode: values.partialID
    }
    verifySocialCode(payload, {
      onSuccess: (data) => {
        if(data.data.isValid === true) {
          clearErrors('partialID');
          validateSponsor(validationPayload, {
            onSuccess: (data) => {
              if (data.data.isValid) {
                clearErrors('sponsorSubjectID');
                delete values.zip;
                const payload = {
                  ...values,
                  dateOfBirth: new Date(values.dateOfBirth.startDate),
                  idType: values.idType.value,
                  gender: values.gender.value,
                  heightUnit: values.heightUnit.value,
                  weightUnit: values.weightUnit.value,
                  studyId: protocolId
                }
                addSubject(payload, {
                  onSuccess: (data) => {
                    toast.success(data.data.details);
                    reset();
                  },
                  onError: (error: any) => {
                    toast.error(error.response.data.details);
                  }
                })
              }
              else {
                setError('sponsorSubjectID',  { type: 'custom', message: data.data.message });
              }
            },
            onError: (error: any) => {
              setError('sponsorSubjectID', { type: 'required', message: error?.response.data.details });
            }
          });
        }
        else if(data.data.isValid === false) {
          setError('partialID', { type: 'custom', message: data.data.message });
          toast.error(data.data.message);
        }
      },
      onError: (error: any) => {
        toast.error(error.response.data.details);
        console.log(error.response.data.title)
        setError('partialID', { type: 'custom', message: error.response.data.title } );
      }
    })
  };

  const handleReset = () => {
    const zip = getValues('zip');
    reset();
    reset({ dateOfBirth: { startDate: null, endDate: null } })
    setValue('zip', zip);
  };

  const handleWeightUnit = (option: any) => {
    setValue('weightUnit', option);
    if(option.label.includes('cm')) {
      setValue('weightUnit', weightUnitOptions?.[0])
    } else {
      setValue('weightUnit', weightUnitOptions?.[1])
    } 
  }

  // const validateId = () => {
  //   const payload = {
  //     SocialCode: getValues('partialID')
  //   }
  //   verifySocialCode(payload, {
  //     onSuccess: (data) => {
  //       if(data.data.isValid === false) {
  //         console.log(data.data.message);
  //         setError('partialID', data.data.message);
  //         toast.error(data.data.message);
  //       }
  //     },
  //     onError: (error: any) => {
  //       toast.error(error.response.data.details);
  //       console.log(error.response.data.title)
  //       setError('partialID', error.response.data.title);
  //       toast.error(error.response.data.title);
  //     }
  //   })
  // }

  useEffect(() => {
    setValue('zip', dropdowns?.zipCode);
    setWeightUnitOptions(convertTypeToSelectOption(dropdowns?.weightUnits));
    setHeightUnitOptions(convertTypeToSelectOption(dropdowns?.heightUnits));
    setIdOptions(convertTypeToSelectOption(dropdowns?.idTypes));
    setGenderOptions(convertTypeToSelectOption(dropdowns?.genders));
  }, [dropdowns]);

  useEffect(() => {
    //console.log('protocolid', protocolId);
    if (protocolId) {
      validateDetailRequirement({ StudyId: protocolId }, {
        onSuccess: (data) => {
          setIsDetailsRequired(data?.data);
        }
      });
    }
  }, [protocolId]);

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     //@ts-ignore
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target as any)) {
  //       // alert("You clicked outside of me!");
  //       validateId();
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [wrapperRef])

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input label="Sponsor Subject ID" placeholder={subjectIdFormat} {...register('sponsorSubjectID', { required: "Sponsor id required." })} disabled={!protocolId} />
        {errors.sponsorSubjectID && (
          <span className="text-red-500 -mt-10">{errors.sponsorSubjectID.message as string}</span>
        )}
      </div>
      <div>
        <Label label="Subject Initials" className="inline-block mb-2" />
        <div className="grid grid-cols-3 gap-6">
          <div>
            <Input
              placeholder="F"
              {...register('firstNameInitials', {
                required: "required", pattern: {
                  value: /^[a-zA-Z0-9]$/,
                  message: 'Only Single character allowed'
                }
              })}
              disabled={!protocolId} />
            {errors.firstNameInitials && (
              <span className="text-red-500 -mt-10">{errors.firstNameInitials.message as string}</span>
            )}
          </div>
          <div>
            <Input
              placeholder="M"
              {...register('middleNameInitials', {
                required: "required", pattern: {
                  value: /^[a-zA-Z0-9]$/,
                  message: 'Only Single character allowed'
                }
              })}
              disabled={!protocolId} />
            {errors.middleNameInitials && (
              <span className="text-red-500 -mt-10">{errors.middleNameInitials.message as string}</span>
            )}
          </div>
          <div>
            <Input
              placeholder="L"
              {...register('lastNameInitials', {
                required: "required", pattern: {
                  value: /^[a-zA-Z0-9]$/,
                  message: 'Only Single character allowed'
                }
              })}
              disabled={!protocolId} />
            {errors.lastNameInitials && (
              <span className="text-red-500 -mt-10">{errors.lastNameInitials.message as string}</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <Controller
          control={control}
          name='dateOfBirth'
          rules={{
            required: "Date is required!",
          }}
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              popoverDirection='down'
              value={value}
              asSingle
              useRange={false}
              onChange={onChange}
              placeholder="Date of birth"
              label="Date of Birth"
              disabled={!protocolId}
            />
          )}
        />
        {errors.dateOfBirth && (
          <span className="text-red-500 -mt-10">{errors.dateOfBirth.message as string}</span>
        )}
      </div>

      <div className="w-full">

        <div className="flex gap-x-6">
          <div className="w-full">
            <Label label="Last 4 SSN/National ID" className="inline-block mb-2" />
            <Input
              {...register('partialID', {
                required: "Id required", pattern: {
                  value: /^\d{4}$/,
                  message: 'Only four digits'
                }
              })}
              type="number"
              // onKeyUp={validateId}
              disabled={!protocolId} />
            {errors.partialID && (
              <span className="text-red-500 -mt-10">{errors.partialID.message as string}</span>
            )}
          </div>

          <div className="w-full">
            <Label label="ID Type" className="inline-block mb-2" />
            <Controller
              control={control}
              name='idType'
              rules={{
                required: 'ID is required!',
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select
                  wrapperClassName="w-full"
                  // label="Id Type" 
                  placeholder="ID Type"
                  onChange={onChange}
                  options={idOptions}
                  value={value}
                  isDisabled={!protocolId}
                />
              )}
            />
            {errors.idType && (
              <span className="text-red-500 -mt-10">{errors.idType.message as string}</span>
            )}
          </div>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Controller
            control={control}
            name='gender'
            rules={{
              required: 'Gender is required!',
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                // wrapperClassName="grow" 
                label="Sex"
                placeholder='Gender'
                onChange={onChange}
                options={genderOptions}
                value={value}
                isDisabled={!protocolId}
              />
            )}
          />
          {errors.gender && (
            <span className="text-red-500 -mt-10">{errors.gender.message as string}</span>
          )}
        </div>

        <Input label="Zip Code" placeholder="Enter zip" {...register('zip')} disabled />
      </div>
      <div>

        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <Label label="Height" className="inline-block mb-2" />
            <Input type="number" placeholder="Enter Height" {...register('height', { required: "Height is required." })} disabled={!protocolId} />
            {errors.height && (
              <span className="text-red-500 -mt-10">{errors.height.message as string}</span>
            )}
          </div>
          <div>
            <Label label="Height Unit" className="inline-block mb-2" />
            <Controller
              control={control}
              name='heightUnit'
              rules={{
                required: 'Height Unit is required!',
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select
                  // wrapperClassName="grow" 
                  onChange={(option) => {
                    onChange(option);
                    handleWeightUnit(option);
                  }}
                  options={heightUnitOptions}
                  value={value}
                  isDisabled={!protocolId}
                />
              )}
            />
            {errors.heightUnit && (
              <span className="text-red-500 -mt-10">{errors.heightUnit.message as string}</span>
            )}
          </div>


        </div>
      </div>


      <div className="grid grid-cols-2 gap-x-6">
        <div>
          <Label label="weight" className="inline-block mb-2" />
          <Input type="number" placeholder="Enter weight" {...register('Weight', { required: 'Weight is required.' })} disabled={!protocolId} />
          {errors.Weight && (
            <span className="text-red-500 -mt-10">{errors.Weight.message as string}</span>
          )}
        </div>

        <div>
          <Label label="Weight Unit" className="inline-block mb-2" />
          <Controller
            control={control}
            name='weightUnit'
            rules={{
              required: 'Weight Unit is required!',
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                // wrapperClassName="grow" 
                onChange={onChange}
                options={weightUnitOptions}
                value={value}
                // isDisabled={!protocolId}
                isDisabled={true}
              />
            )}
          />
          {errors.weightUnit && (
            <span className="text-red-500 -mt-10">{errors.weightUnit.message as string}</span>
          )}
        </div>

      </div>

      {isDetailsRequired &&
        <div>
          <Label label="Details" className="inline-block mb-2" />
          <Input type="textarea" placeholder="Enter Detail" {...register('indicationDetails', { required: "Detail is required." })} disabled={!protocolId} />
          {errors.detail && (
            <span className="text-red-500 -mt-10">{errors.detail.message as string}</span>
          )}
        </div>
      }

      <div className="flex items-center justify-center mt-10 gap-4 col-span-full">
        <Button className="px-8" type="submit" loading={isSubjectAddLoading} disabled={isSubjectAddLoading}>Submit</Button>
        <Button className="px-8" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default AddSubjectForm;
