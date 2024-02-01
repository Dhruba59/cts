import Button from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { useGetChangeReqSubjectDetails, useSaveChangeRequest } from "@/hooks/rq-hooks/change-request-hooks";
import { useAddSubjectMutation, useIsDetailsRequired, useValidateSponsorSubjectId, useVerifySocialCode } from "@/hooks/rq-hooks/subject-hooks";
import { ChangeReqSubjectIdProps } from "@/model/change-request";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { checkDetailRequirement } from "@/service/subject-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { watch } from "fs";
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import { getSiteStudyIdByStudyId } from "..";
import Alert from "@/components/ui/alert";
import Modal from "@/components/modal";

enum NATIONAL_ID_TYPE {
  PASSPORT = '2',
  SOCIAL_SECURITY = '1'
}

interface AddSubjectFormProps {
  dropdowns: { [key: string]: DropDownItem[] | any };
  protocolId: string | undefined;
  subjectIdFormat: string;
  ids: ChangeReqSubjectIdProps | undefined;
  setSelectedProtocol: Dispatch<SetStateAction<SelectOptionType | undefined>>;
  setStudyType: Dispatch<SetStateAction<SelectOptionType | undefined>>;
  userId?: number | null;
  setUserId?: Dispatch<SetStateAction<number | null>>
  protocolList: any;
}

const getSiteStudyIdByStudyId = (data: any, studyId: number | string) => {
  console.log('study', data, studyId);
  return data?.find((item: any) => item?.studyId == studyId)?.siteStudyId ?? '';
}

const AddSubjectForm = ({ dropdowns, protocolId, subjectIdFormat, setSelectedProtocol, protocolList, ids, setStudyType, userId, setUserId }: AddSubjectFormProps) => {
  const [heightUnitOptions, setHeightUnitOptions] = useState<SelectOptionType[]>();
  const [weightUnitOptions, setWeightUnitOptions] = useState<SelectOptionType[]>();
  const [isDetailsRequired, setIsDetailsRequired] = useState<boolean>(false);
  const [isIdWarningModalOpen, setIsIdWarningModalOpen] = useState<boolean>(false);
  const [showIdWarning, setShowIdWarning] = useState<boolean>(true);
  const [idWarningMessage, setIdWarningMessage] = useState<string>('');
  const [idOptions, setIdOptions] = useState<SelectOptionType[]>();
  const [genderOptions, setGenderOptions] = useState<SelectOptionType[]>();
  const [visitTypeOptions, setVisitTypeOptions] = useState<SelectOptionType[]>();
  const { mutate: addSubject, isLoading: isSubjectAddLoading } = useAddSubjectMutation();
  const { mutate: saveSubjectChangeRequest, isLoading: isLoadingChangeRequest } = useSaveChangeRequest();
  const { mutate: validateSponsor } = useValidateSponsorSubjectId();
  const { mutate: validateDetailRequirement } = useIsDetailsRequired();
  const { mutate: verifySocialCode } = useVerifySocialCode();

  const { data: subjectData, isLoading: isLoadingSubjectData } = useGetChangeReqSubjectDetails({
    SubjectId: ids?.subjectId ?? '',
    NationalTypeId: ids?.nationalIdType ?? ''
  });
  const subjectDetail = subjectData?.data.subjectDetail;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    reset,
    getValues,
    setFocus
  } = useForm();

  const onBlurIdField = (e: any) => {
    if(e.target.value === '' || e.target.value === '0000') {
      setIsIdWarningModalOpen(true);
      setIdWarningMessage(`${e.target.value} not a valid entry. If subject does not have or does not know SSN / Passport number, enter XXXX.`);
      setValue('partialID', '');
    } else if(e.target.value.toLowerCase() === 'xxxx') {
      return;
    }
     else {
      verifyId();
    }
  }

  const verifyId = () => {
    // const payload = {
    //   SocialCode: e.target.value
    // }
    const id = getValues('partialID');
    const idType = getValues('idType');
    if(!!id) {
      const payload = {
        SocialCode: id
      }
      verifySocialCode(payload, {
        onSuccess: (data) => {
          if (data.data.isValid === false) {
            setIsIdWarningModalOpen(true);
            setIdWarningMessage(data.data.message);
          }
        },
        onError: (error: any) => {
          toast.error(error.response.data.details);
        }
      })
    }

    // verifySocialCode(payload, {
    //   onSuccess: (data) => {
    //     if (data.data.isValid === false) {
    //       setIsIdWarningModalOpen(true);
    //       setIdWarningMessage(data.data.message);
    //     }
    //   },
    //   onError: (error: any) => {
    //     toast.error(error.response.data.details);
    //   }
    // })
  };

  const onSubmit = async (values: any) => {
    //console.log(values);
    const validationPayload = {
      studyId: protocolId ?? '-1',
      sponsorSubjectId: values.sponsorSubjectID
    }

    if(!values?.middleNameInitials || values?.middleNameInitials.length === 0) {
      setError('middleNameInitials', {type: 'custom', message:  'If you have not middle name then put a "-" on the field' });
    }

    validateSponsor(validationPayload, {
      onSuccess: (data) => {
        if (data.data.isValid) {
          clearErrors('sponsorSubjectID');
          delete values.zip;
          let payload = {
            ...values,
            dateOfBirth: new Date(values.dateOfBirth.startDate),
            idType: values?.idType?.value ?? values.idType,
            visitTypeId: values?.visitTypeId?.value ?? values?.visitTypeId,
            gender: values?.gender?.value ?? values?.gender,
            heightUnit: values?.heightUnit?.value ?? values.heightUnit,
            weightUnit: values?.weightUnit?.value ?? values.weightUnit,
            studyId: protocolId,
            siteStudyId: getSiteStudyIdByStudyId(protocolList, protocolId ?? '') ?? ''
          }
          if (ids) {
            payload.userId = userId,
              payload.subjectId = ids.subjectId;
            payload.lastSubjectEntryDate = new Date(values.lastSubjectEntryDate.startDate);
            payload.screenedDate = new Date(values.screenedDate.startDate);
            payload.requestNote = values.requestNote;
            payload.indicationDetail = values.indicationDetail;

            saveSubjectChangeRequest(payload, {
              onSuccess: (data) => {
                toast.success(data.data.details);
                reset();
              },
              onError: (error: any) => {
                toast.error(error.response.data.detail);
              }
            });
            return;
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
          setError('sponsorSubjectID', { type: 'custom', message: data.data.message });
        }
      },
      onError: (error: any) => {
        setError('sponsorSubjectID', { type: 'required', message: error?.response.data.details });
      }
    });
  };

  const handleReset = () => {
    const zip = getValues('zip');
    reset();
    reset({ dateOfBirth: { startDate: null, endDate: null }, zip: zip, weightUnit: weightUnitOptions?.[0].value, heightUnit: heightUnitOptions?.[0].value })
    setValue('zip', zip);
    setValue('weightUnit', weightUnitOptions?.[0].value);
  };

  const handleWeightUnit = (option: any) => {
    if (option.label.includes('cm')) {
      setValue('weightUnit', weightUnitOptions?.[0])
    } else {
      setValue('weightUnit', weightUnitOptions?.[1])
    }
  }

  useEffect(() => {
    setValue('zip', dropdowns?.zipCode);
    setWeightUnitOptions(convertTypeToSelectOption(dropdowns?.weightUnits));
    setHeightUnitOptions(convertTypeToSelectOption(dropdowns?.heightUnits));
    setIdOptions(convertTypeToSelectOption(dropdowns?.idTypes));
    setGenderOptions(convertTypeToSelectOption(dropdowns?.genders));
  }, [dropdowns]);

  useEffect(() => {
    if(heightUnitOptions && !ids && weightUnitOptions) {
      setValue('heightUnit', heightUnitOptions[0]);
      setValue('weightUnit', weightUnitOptions[0]);
    }
  }, [heightUnitOptions, weightUnitOptions])

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

  useEffect(() => {
    if (subjectDetail) {
      setVisitTypeOptions(convertTypeToSelectOption(subjectData?.data?.visitTypes));
      setStudyType({
        label: subjectDetail.studyType.text,
        value: subjectDetail.studyType.value
      });
      const values = {
        sponsorSubjectID: subjectDetail.sponsorSubjectId,
        firstNameInitials: subjectDetail.firstInitial,
        middleNameInitials: subjectDetail.middleInitial,
        lastNameInitials: subjectDetail.lastInitial,
        dateOfBirth: {
          startDate: new Date(subjectDetail.dateOfBirth),
          endDate: new Date(subjectDetail.dateOfBirth)
        },
        partialID: subjectDetail.nationalIdLastFourDigit,
        idType: subjectDetail.idType,
        gender: subjectDetail.gender,
        zip: subjectDetail.zipCode,
        height: subjectDetail.height,
        heightUnit: subjectDetail.heightUnit,
        Weight: subjectDetail.weight,
        weightUnit: subjectDetail.weightUnit,
        visitTypeId: subjectDetail.visitType,
        lastSubjectEntryDate: {
          startDate: new Date(subjectDetail.lastEntryDate),
          endDate: new Date(subjectDetail.lastEntryDate)
        },
        screenedDate: {
          startDate: new Date(subjectDetail.screenedDate),
          endDate: new Date(subjectDetail.screenedDate)
        }
      };
      setUserId?.(subjectDetail.userId);
      reset(values);
      setSelectedProtocol({
        value: subjectDetail.studyId,
        label: subjectDetail.protocolNumber
      })
    }
  }, [subjectData]);

  return (
    <>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input label="Sponsor Subject ID" placeholder={subjectIdFormat} {...register('sponsorSubjectID', { required: "Sponsor id required." })} disabled={!protocolId && !ids} />
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
                disabled={!protocolId && !ids} />
              {errors.firstNameInitials && (
                <span className="text-red-500 -mt-10">{errors.firstNameInitials.message as string}</span>
              )}
            </div>
            <div>
              <Input
                placeholder="M"
                {...register('middleNameInitials', {
                  required: "Put '-' if you have no middle name", pattern: {
                    value: /^[a-zA-Z0-9-]$/,
                    message: 'Only Single character allowed'
                  }
                })}
                disabled={!protocolId && !ids} />
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
                disabled={!protocolId && !ids} />
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
                disabled={!protocolId && !ids}
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
                    // value: /^\d{4}$/,
                    value: /^(x{4}|\d{4})$/i,
                    message: 'Only four digits'
                  }
                })}
                onBlur={onBlurIdField}
                // type="number"
                // onKeyUp={validateId}
                disabled={!protocolId && !ids} />
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
                    onChange={(option) => {
                      onChange(option);
                      verifyId();
                    }}
                    options={idOptions}
                    value={value}
                    isDisabled={!protocolId && !ids}
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
              <Input type="number" step="0.01" placeholder="Enter Height" {...register('height', { required: "Height is required." })} disabled={!protocolId && !ids} />
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
                    isDisabled={!protocolId && !ids}
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
            <Input type="number" step="0.01" placeholder="Enter weight" {...register('Weight', { required: 'Weight is required.' })} disabled={!protocolId && !ids} />
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
                // required: 'Weight Unit is required!',
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
            <Input type="textarea" placeholder="Enter Detail" {...register('indicationDetails', { required: "Detail is required." })} disabled={!protocolId && !ids} />
            {errors.detail && (
              <span className="text-red-500 -mt-10">{errors.detail.message as string}</span>
            )}
          </div>
        }

        {ids &&
          <div>
            <Label label="Visit Type" className="inline-block mb-2" />
            <Controller
              control={control}
              name='visitTypeId'
              rules={{
                required: 'Visit Type is required!',
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select
                  // wrapperClassName="grow" 
                  onChange={onChange}
                  options={visitTypeOptions}
                  value={value}
                />
              )}
            />
            {errors.visitTypeId && (
              <span className="text-red-500 -mt-10">{errors.visitTypeId.message as string}</span>
            )}
          </div>
        }

        {ids &&
          <div>
            <Controller
              control={control}
              name='lastSubjectEntryDate'
              rules={{
                required: "Last Subject Entry Date is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Datepicker
                  popoverDirection='down'
                  value={value}
                  asSingle
                  useRange={false}
                  onChange={onChange}
                  // placeholder=""
                  label="Last Subject Entry Date"
                />
              )}
            />
            {errors.lastSubjectEntryDate && (
              <span className="text-red-500 -mt-10">{errors.lastSubjectEntryDate.message as string}</span>
            )}
          </div>}

        {ids &&
          <div>
            <Controller
              control={control}
              name='screenedDate'
              rules={{
                required: "Screened Date is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Datepicker
                  popoverDirection='down'
                  value={value}
                  asSingle
                  useRange={false}
                  onChange={onChange}
                  // placeholder=""
                  label="Screened Date"
                />
              )}
            />
            {errors.screenedDate && (
              <span className="text-red-500 -mt-10">{errors.screenedDate.message as string}</span>
            )}
          </div>}

        {ids &&
          <div>
            <Label label="Request Notes" className="inline-block mb-2" />
            <Textarea placeholder="Enter notes" {...register('requestNote', { required: "Detail is required." })} />
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
      <Modal
        // triggerProp={<Edit />}
        open={isIdWarningModalOpen}
        setOpen={setIsIdWarningModalOpen}
        title="Alert!"
        renderFooter={{
          onSave: () => { 
            setIsIdWarningModalOpen(false);
            setShowIdWarning(false);
          },
          // onReject: () => setFocus('partialID'),
          submitButtonName: "Continue",
          cancelButtonName: "Edit",
        }}
        onClose={() => {
          setFocus('partialID');
          setValue('partialID', '');
          // setIsIdWarningModalOpen(false);
        }}
      >
        {idWarningMessage}
      </Modal>
    </>

  );
};

export default AddSubjectForm;
