import Button from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import {
  useGetChangeReqSubjectDetails,
  useSaveChangeRequest,
} from "@/hooks/rq-hooks/change-request-hooks";
import {
  useAddSubjectMutation,
  useIsDetailsRequired,
  useValidateAgeBmi,
  useValidateSponsorSubjectId,
  useVerifySocialCode,
} from "@/hooks/rq-hooks/subject-hooks";
import { ChangeReqSubjectIdProps } from "@/model/change-request";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { checkDetailRequirement } from "@/service/subject-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { watch } from "fs";
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller, UseFormReturn, useForm } from "react-hook-form";
// import { getSiteStudyIdByStudyId } from "..";
import Alert from "@/components/ui/alert";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import InputFieldWithRegexValidation from "@/components/ui/inputfield-with-regex";
import ReprintPdf from "@/features/change-request/pdf/reprint-pdf";
import {
  MatchReportQueryParams,
  SubjectFieldValidationPayloadType,
} from "@/model/subject";
import { useQuery } from "react-query";
import { getSubjectMatchReport } from "@/service/report-service";
import { PDFViewer } from "@react-pdf/renderer";
import Spinner from "@/components/ui/spinner";
import { apiResponseToast } from "@/utils/toast";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import CustomDatepicker from "@/components/ui/custom-datepicker";

enum NATIONAL_ID_TYPE {
  PASSPORT = "2",
  SOCIAL_SECURITY = "1",
}

interface AgeBmiWarningDataType {
  submitPayload: any;
  message: string | null | undefined;
  isModalOpen: boolean;
}

interface AddSubjectFormProps {
  dropdowns: { [key: string]: DropDownItem[] | any };
  protocolId: string | undefined;
  subjectIdFormat: string;
  restSubjectIdFormat?: any;
  ids: ChangeReqSubjectIdProps | undefined;
  setSelectedProtocol: Dispatch<SetStateAction<SelectOptionType | undefined>>;
  setStudyType: Dispatch<SetStateAction<SelectOptionType | undefined>>;
  userId?: number | null;
  setUserId?: Dispatch<SetStateAction<number | null>>;
  protocolList: any;
}

const getSiteStudyIdByStudyId = (data: any, studyId: number | string) => {
  return data?.find((item: any) => item?.studyId == studyId)?.siteStudyId ?? "";
};

const addOffsetToDate = (date: string | Date) => {
  dayjs.extend(utc);
  return dayjs(date).utc(true).format("YYYY-MM-DD");
};

const AddSubjectForm = ({
  dropdowns,
  protocolId,
  subjectIdFormat,
  restSubjectIdFormat,
  setSelectedProtocol,
  protocolList,
  ids,
  setStudyType,
  userId,
  setUserId,
}: AddSubjectFormProps) => {
  const [heightUnitOptions, setHeightUnitOptions] =
    useState<SelectOptionType[]>();
  const [weightUnitOptions, setWeightUnitOptions] =
    useState<SelectOptionType[]>();
  const [isDetailsRequired, setIsDetailsRequired] = useState<boolean>(false);
  const [isIdWarningModalOpen, setIsIdWarningModalOpen] =
    useState<boolean>(false);
  const [showIdWarning, setShowIdWarning] = useState<boolean>(true);
  const [idWarningMessage, setIdWarningMessage] = useState<string>("");
  const [idOptions, setIdOptions] = useState<SelectOptionType[]>();
  const [genderOptions, setGenderOptions] = useState<SelectOptionType[]>();
  const [visitTypeOptions, setVisitTypeOptions] =
    useState<SelectOptionType[]>();
  const [nationalID, setNationalId] = useState<string>("");
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [matchReportQueryParams, setMatchReportQueryParams] =
    useState<MatchReportQueryParams>();

  const [ageBmiWarningData, setAgeBmiWarningData] =
    useState<AgeBmiWarningDataType>({
      isModalOpen: false,
      message: "",
      submitPayload: {},
    });

  const [studyId, setStudyId] = useState<string>("");
  const { mutate: addSubject, isLoading: isSubjectAddLoading } =
    useAddSubjectMutation();
  const {
    mutate: saveSubjectChangeRequest,
    isLoading: isLoadingChangeRequest,
  } = useSaveChangeRequest();
  const { mutate: validateSponsor } = useValidateSponsorSubjectId();
  const { mutate: validateDetailRequirement } = useIsDetailsRequired();
  const { mutate: verifySocialCode } = useVerifySocialCode();
  const { mutate: validateFields, isLoading: isValidatingFields } =
    useValidateAgeBmi();

  const { data: subjectMatchReport, isLoading: isLoadingSubjectMatchReport } =
    useQuery({
      queryFn: getSubjectMatchReport,
      queryKey: ["reportReprintSubjects", matchReportQueryParams],
      enabled: !!matchReportQueryParams,
    });

  const { data: subjectData, isLoading: isLoadingSubjectData } =
    useGetChangeReqSubjectDetails({
      SubjectId: ids?.subjectId ?? "",
      NationalTypeId: ids?.nationalIdType ?? "",
    });

  const subjectDetail = subjectData?.data.subjectDetail;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    watch,
    formState,
    formState: { errors },
    reset,
    getValues,
    setFocus,
  } = useForm();

  const openMatchReportModal = (subjectInfo: MatchReportQueryParams) => {
    setMatchReportQueryParams(subjectInfo);
    setIsReportModalOpen(true);
    console.log("report", subjectInfo, matchReportQueryParams);
  };

  const closeMatchReportModal = () => {
    setIsReportModalOpen(false);
  };

  const onBlurIdField = (e: any) => {
    if (e.target.value === "" || e.target.value === "0000") {
      setIsIdWarningModalOpen(true);
      setIdWarningMessage(
        `${e.target.value} not a valid entry. If subject does not have or does not know SSN / Passport number, enter XXXX.`
      );
      setValue("partialID", "");
      setNationalId("");
    } else if (
      e.target.value.toLowerCase() === "xxxx" ||
      nationalID === e.target.value
    ) {
      setNationalId(e.target.value);
      return;
    } else {
      setNationalId(e.target.value);
      verifyId();
    }
  };

  function CheckHeight(height: number, heightUnit: "IN" | "CM") {
    let high = 213.36,
      low = 91.44;
    var tempHeight = height;
    if (heightUnit == "IN") {
      tempHeight = tempHeight * 2.54;
    }

    if (tempHeight > high) {
      setError("height", {
        type: "custom",
        message: "Max height 7' (213.36 CM)",
      });
      return false;
    } else if (tempHeight < low) {
      setError("height", {
        type: "custom",
        message: "Min height 3' (91.44 CM)",
      });
      return false;
    } else {
      clearErrors("height");
      return true;
    }
  }

  function CheckWeight(weight: number, weightUnit: "KG" | "LBS") {
    let high = 200,
      low = 35;
    var tempWeight = weight;
    if (weightUnit == "LBS") {
      tempWeight = tempWeight / 2.2;
    }

    if (tempWeight > high) {
      setError("weight", {
        type: "custom",
        message: "Max weight 200 Kgs (440 Lbs)",
      });
      return false;
    } else if (tempWeight < low) {
      setError("weight", {
        type: "custom",
        message: "Min weight 35 Kgs (77 Lbs)",
      });
      return false;
    } else {
      clearErrors("weight");
      return true;
    }
  }

  const saveSubject = (payload: any) => {
    saveSubjectChangeRequest(payload, {
      onSuccess: (data) => {
        apiResponseToast(data?.data);
        router.push("/change-request/dashboard");
      },
      onError: (error: any) => {
        toast.error(error.response.data.detail);
      },
    });
  };

  const addNewSubject = (payload: any) => {
    addSubject(payload, {
      onSuccess: (data) => {
        apiResponseToast(data.data);
        reset();
        reset({
          dateOfBirth: undefined,
          heightUnit: heightUnitOptions?.[0].value ?? "",
          weightUnit: weightUnitOptions?.[0].value ?? "",
        });
        openMatchReportModal({
          SubjectId: data?.data?.data?.subjectId,
          NationalTypeId: payload?.idType,
        });
      },
      onError: (error: any) => {
        toast.error(error.response.data.details);
      },
    });
  };

  const submitData = (subjectPayload: any) => {
    if (ids) {
      saveSubject(subjectPayload);
      return;
    }
    addNewSubject(subjectPayload);
  };

  const verifyId = () => {
    const id = getValues("partialID");
    if (!!id) {
      const payload = {
        SocialCode: id,
      };
      verifySocialCode(payload, {
        onSuccess: (data) => {
          if (data.data.isValid === false) {
            setIsIdWarningModalOpen(true);
            setIdWarningMessage(data.data.message);
          }
        },
        onError: (error: any) => {
          toast.error(error.response.data.details);
        },
      });
    }
  };

  const onSubmit = async (values: any) => {
    if (
      !values?.middleNameInitials ||
      values?.middleNameInitials.length === 0
    ) {
      setError("middleNameInitials", {
        type: "custom",
        message: 'If you have not middle name then put a "-" on the field',
      });
    }

    delete values.zip;
    let payload = {
      ...values,
      idType: values?.idType?.value ?? values.idType,
      visitTypeId: values?.visitTypeId?.value ?? values?.visitTypeId,
      gender: values?.gender?.value ?? values?.gender,
      heightUnit: values?.heightUnit?.value ?? values.heightUnit,
      weightUnit: values?.weightUnit?.value ?? values.weightUnit,
      studyId: protocolId,
      siteStudyId:
        getSiteStudyIdByStudyId(protocolList, protocolId ?? "") ?? "",
    };
    if (ids) {
      (payload.userId = userId), (payload.subjectId = ids.subjectId);
      payload.lastSubjectEntryDate = new Date(
        values.lastSubjectEntryDate.startDate
      );
      payload.screenedDate = new Date(values.screenedDate.startDate);
      payload.requestNote = values.requestNote;
      payload.indicationDetail = values.indicationDetails;
    }

    if (dropdowns.partialDateAllowed) {
      payload.dateOfBirth = `01-Jan-${values?.dateOfBirth}`;
    }

    const validationPayload: SubjectFieldValidationPayloadType = {
      sponsorSubjectId: payload?.sponsorSubjectID,
      subjectId: ids?.subjectId ?? null,
      studyId: payload.studyId,
      dob: payload?.dateOfBirth,
      height: payload?.height,
      weight: payload?.weight,
      heightUnit: payload?.heightUnit,
      weightUnit: payload?.weightUnit,
    };

    const isValidHeight = CheckHeight(payload?.height, payload?.heightUnit);
    const isValidWeight = CheckWeight(payload?.weight, payload?.weightUnit);

    if (!isValidHeight || !isValidWeight) {
      return;
    }

    validateFields(validationPayload, {
      onSuccess: (data) => {
        if (data?.data?.sponsorSubjectId?.isValid === false) {
          setError("sponsorSubjectID", {
            type: "custom",
            message: data?.data?.sponsorSubjectId?.message,
          });
          return;
        } else {
          clearErrors("sponsorSubjectID");
        }
        if (data?.data?.ageAndBmi?.isValid === false) {
          setAgeBmiWarningData({
            submitPayload: payload,
            message: data?.data?.ageAndBmi?.message,
            isModalOpen: true,
          });
        } else {
          submitData(payload);
        }
      },
    });
  };

  // const handleReset = () => {
  //   if (ids) {
  //     updateFieldsWithSubjectData();
  //     return;
  //   }
  //   const zip = getValues("zip");
  //   reset();
  //   reset({
  //     dateOfBirth: undefined,
  //     zip: zip,
  //     weightUnit: weightUnitOptions?.[0].value,
  //     heightUnit: heightUnitOptions?.[0].value,
  //   });
  //   setValue("zip", zip);
  //   setValue("weightUnit", weightUnitOptions?.[0].value);
  // };

  const handleWeightUnit = (option: any) => {
    if (option.label.includes("cm")) {
      setValue("weightUnit", weightUnitOptions?.[0]);
    } else {
      setValue("weightUnit", weightUnitOptions?.[1]);
    }
  };

  const handleCancel = () => {
    router.push("/change-request/reprint");
  };

  useEffect(() => {
    setValue("zip", dropdowns?.zipCode);
    setWeightUnitOptions(convertTypeToSelectOption(dropdowns?.weightUnits));
    setHeightUnitOptions(convertTypeToSelectOption(dropdowns?.heightUnits));
    setGenderOptions(convertTypeToSelectOption(dropdowns?.genders));
    if (!ids) {
      setIdOptions(convertTypeToSelectOption(dropdowns?.idTypes));
    }
  }, [dropdowns]);

  useEffect(() => {
    if (heightUnitOptions && !ids && weightUnitOptions) {
      setValue("heightUnit", heightUnitOptions[0]);
      setValue("weightUnit", weightUnitOptions[0]);
    }
  }, [heightUnitOptions, weightUnitOptions]);

  useEffect(() => {
    if (protocolId) {
      validateDetailRequirement(
        { StudyId: protocolId },
        {
          onSuccess: (data) => {
            setIsDetailsRequired(data?.data);
          },
        }
      );
    }
  }, [protocolId]);

  const updateFieldsWithSubjectData = () => {
    if (subjectDetail) {
      setVisitTypeOptions(
        convertTypeToSelectOption(subjectData?.data?.visitTypes)
      );
      setStudyType({
        label: subjectDetail.studyType.text,
        value: subjectDetail.studyType.value,
      });
      const values = {
        sponsorSubjectID: subjectDetail.sponsorSubjectId,
        firstNameInitials: subjectDetail.firstInitial,
        middleNameInitials: subjectDetail.middleInitial,
        lastNameInitials: subjectDetail.lastInitial,
        dateOfBirth: dropdowns.partialDateAllowed
          ? new Date(subjectDetail?.dateOfBirth).getFullYear()
          : {
              startDate: addOffsetToDate(subjectDetail.dateOfBirth),
              endDate: addOffsetToDate(subjectDetail.dateOfBirth),
            },
        partialID: subjectDetail.nationalIdLastFourDigit,
        idType: subjectDetail.idType,
        gender: subjectDetail.gender,
        zip: subjectDetail.zipCode,
        height: subjectDetail.height,
        heightUnit: subjectDetail.heightUnit,
        weight: subjectDetail.weight,
        weightUnit: subjectDetail.weightUnit,
        indicationDetails: subjectDetail.indicationDetail,
        visitTypeId: subjectDetail.visitTypeId,
        lastSubjectEntryDate: {
          startDate: addOffsetToDate(subjectDetail.lastEntryDate),
          endDate: addOffsetToDate(subjectDetail.lastEntryDate),
        },
        screenedDate: {
          startDate: addOffsetToDate(subjectDetail.screenedDate),
          endDate: addOffsetToDate(subjectDetail.screenedDate),
        },
        requestNote: "",
      };
      setUserId?.(subjectDetail.userId);
      reset(values);
      setSelectedProtocol({
        value: subjectDetail.studyId,
        label: subjectDetail.protocolNumber,
      });

      setStudyId(subjectDetail.studyId);
    }
  };

  useEffect(() => {
    if (subjectDetail && subjectData) {
      updateFieldsWithSubjectData();
      setIdOptions(convertTypeToSelectOption(subjectData?.data?.idTypes));
    }
  }, [subjectDetail, subjectData]);

  useEffect(() => {
    restSubjectIdFormat(studyId);
  }, [studyId]);

  return (
    <>
      <form
        className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 lg:gap-x-6 gap-y-6 mt-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 sm:col-span-1">
          <Input
            label={`Sponsor Subject ID `}
            span={
              subjectIdFormat &&
              subjectIdFormat !== "" && (
                <span className="text-[12px] italic text-red-600">
                  (<span>Format: </span>
                  <span className="text-[10px]">{subjectIdFormat}</span>)
                </span>
              )
            }
            placeholder={subjectIdFormat}
            {...register("sponsorSubjectID", {
              required: "Sponsor id required.",
            })}
            disabled={!protocolId && !ids}
            onFocus={() => restSubjectIdFormat(studyId)}
          />
          {errors.sponsorSubjectID && (
            <span className="text-red-500 -mt-10">
              {errors.sponsorSubjectID.message as string}
            </span>
          )}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label label="Subject Initials" className="inline-block mb-2" />
          <div className="grid grid-cols-3 gap-2 2xl:gap-4">
            <div>
              <Controller
                control={control}
                name="firstNameInitials"
                rules={{
                  required: "Required!",
                  pattern: {
                    value: /^[a-zA-Z]$/,
                    message: "Only one alphabetic character allowed",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <InputFieldWithRegexValidation
                    placeholder="F"
                    maxLength={1}
                    disabled={!protocolId && !ids}
                    onChange={onChange}
                    value={value}
                    regex={/^[a-zA-Z]*$/}
                  />
                )}
              />
              {errors.firstNameInitials && (
                <span className="text-red-500 -mt-10">
                  {errors.firstNameInitials.message as string}
                </span>
              )}
            </div>
            <div>
              <Controller
                control={control}
                name="middleNameInitials"
                rules={{
                  required: "Put a '-' if you have no middle name",
                  pattern: {
                    value: /^[a-zA-Z-]$/,
                    message: "Only one alphabetic character allowed",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <InputFieldWithRegexValidation
                    placeholder="M"
                    maxLength={1}
                    disabled={!protocolId && !ids}
                    onChange={onChange}
                    value={value}
                    regex={/^[a-zA-Z-]*$/}
                  />
                )}
              />
              {errors.middleNameInitials && (
                <span className="text-red-500 -mt-10">
                  {errors.middleNameInitials.message as string}
                </span>
              )}
            </div>
            <div>
              <Controller
                control={control}
                name="lastNameInitials"
                rules={{
                  required: "Required!",
                  pattern: {
                    value: /^[a-zA-Z]$/,
                    message: "Only one alphabetic character allowed",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <InputFieldWithRegexValidation
                    placeholder="L"
                    maxLength={1}
                    disabled={!protocolId && !ids}
                    onChange={onChange}
                    value={value}
                    regex={/^[a-zA-Z]*$/}
                  />
                )}
              />
              {errors.lastNameInitials && (
                <span className="text-red-500 -mt-10">
                  {errors.lastNameInitials.message as string}
                </span>
              )}
            </div>
          </div>
        </div>

        {dropdowns.partialDateAllowed ? (
          <div className="col-span-1">
            <Input
              label="Date Of Birth (Year Only)"
              placeholder="Date Of Birth"
              {...register("dateOfBirth", {
                required: "Year of Birth required",
                validate: (value) =>
                  /^[0-9]{4}$/.test(value) || "Please enter a 4-digit year",
              })}
              type="number"
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 -mt-10">
                {errors.dateOfBirth.message as string}
              </span>
            )}
          </div>
        ) : (
          <div className="col-span-1">
            <Controller
              control={control}
              name="dateOfBirth"
              rules={{
                required: "DOB is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <CustomDatepicker
                  wrapperClassName="mt-[5px] space-y-[7px]"
                  onChange={onChange}
                  customLevel={
                    <span className="flex items-center gap-1">
                      <span className="text-sm">DOB</span>
                      <span className="text-[11px] italic text-red-600">{`(Format: DD-MMM-YYYY)`}</span>
                    </span>
                  }
                />
              )}
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 -mt-10">
                {errors.dateOfBirth.message as string}
              </span>
            )}
          </div>
        )}

        <div className="col-span-1">
          <Controller
            control={control}
            name="gender"
            rules={{
              required: "Gender is required!",
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                label="Sex"
                placeholder="Gender"
                onChange={onChange}
                options={genderOptions}
                value={value}
                isDisabled={!protocolId}
              />
            )}
          />
          {errors.gender && (
            <span className="text-red-500 -mt-10">
              {errors.gender.message as string}
            </span>
          )}
        </div>

        <div className="w-full col-span-1">
          <Label label="Last 4 SSN/NID" className="inline-block mb-2" />
          <Controller
            control={control}
            name="partialID"
            rules={{
              required: "ID is required!",
              pattern: {
                // value: /^\d{4}$/,
                value: /^(x{4}|\d{4})$/i,
                message: "Last four digits",
              },
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <InputFieldWithRegexValidation
                onBlur={onBlurIdField}
                maxLength={4}
                regex={/^(x{0,4}|X{0,4}|\d{0,4})$/i}
                disabled={!protocolId && !ids}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.partialID && (
            <span className="text-red-500 -mt-10">
              {errors.partialID.message as string}
            </span>
          )}
        </div>

        <div className="w-full col-span-1">
          <Label label="ID Type" className="inline-block mb-2" />
          <Controller
            control={control}
            name="idType"
            rules={{
              required: "ID is required!",
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                wrapperClassName="w-full"
                // label="Id Type"
                placeholder="ID Type"
                onChange={(option) => {
                  onChange(option);
                }}
                options={idOptions}
                value={value}
                isDisabled={!protocolId && !ids}
              />
            )}
          />
          {errors.idType && (
            <span className="text-red-500 -mt-10">
              {errors.idType.message as string}
            </span>
          )}
        </div>

        <div className="col-span-1">
          <Label label="Height" className="inline-block mb-2" />
          <Input
            type="number"
            step="0.01"
            placeholder="Enter Height"
            {...register("height", { required: "Height is required." })}
            disabled={!protocolId && !ids}
          />
          {errors.height && (
            <span className="text-red-500 -mt-10">
              {errors.height.message as string}
            </span>
          )}
        </div>
        <div className="col-span-1">
          <Label label="Height Unit" className="inline-block mb-2" />
          <Controller
            control={control}
            name="heightUnit"
            rules={{
              required: "Height Unit is required!",
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
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
            <span className="text-red-500 -mt-10">
              {errors.heightUnit.message as string}
            </span>
          )}
        </div>

        <div className="col-span-1">
          <Label label="Weight" className="inline-block mb-2" />
          <Input
            type="number"
            step="0.01"
            placeholder="Enter weight"
            {...register("weight", { required: "Weight is required." })}
            disabled={!protocolId && !ids}
          />
          {errors.weight && (
            <span className="text-red-500 -mt-10">
              {errors.weight.message as string}
            </span>
          )}
        </div>

        <div className="col-span-1">
          <Label label="Weight Unit" className="inline-block mb-2" />
          <Controller
            control={control}
            name="weightUnit"
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                onChange={onChange}
                options={weightUnitOptions}
                value={value}
                isDisabled={true}
              />
            )}
          />
          {errors.weightUnit && (
            <span className="text-red-500 -mt-10">
              {errors.weightUnit.message as string}
            </span>
          )}
        </div>

        {ids && (
          <div className="col-span-1">
            <Controller
              control={control}
              name="screenedDate"
              rules={{
                required: "Screened Date is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Datepicker
                  popoverDirection="down"
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
              <span className="text-red-500 -mt-10">
                {errors.screenedDate.message as string}
              </span>
            )}
          </div>
        )}

        {ids && parseInt(subjectDetail?.visitTypeId) !== 1 && (
          <div className="col-span-1">
            <Label label="Visit Type" className="inline-block mb-2" />
            <Controller
              control={control}
              name="visitTypeId"
              rules={{
                required: "Visit Type is required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select
                  onChange={onChange}
                  options={visitTypeOptions}
                  value={value}
                />
              )}
            />
            {errors.visitTypeId && (
              <span className="text-red-500 -mt-10">
                {errors.visitTypeId.message as string}
              </span>
            )}
          </div>
        )}

        {ids && parseInt(subjectDetail?.visitTypeId) !== 1 && (
          <div className="col-span-1">
            <Controller
              control={control}
              name="lastSubjectEntryDate"
              rules={{
                required: "Required!",
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Datepicker
                  popoverDirection="down"
                  value={value}
                  asSingle
                  useRange={false}
                  onChange={onChange}
                  label="Last Subject Entry"
                />
              )}
            />
            {errors.lastSubjectEntryDate && (
              <span className="text-red-500 -mt-10">
                {errors.lastSubjectEntryDate.message as string}
              </span>
            )}
          </div>
        )}

        {isDetailsRequired && (
          <div className="col-span-2">
            <Label label="Details" className="inline-block mb-2" />
            <Textarea
              className="min-h-10 h-10"
              placeholder="Enter Detail"
              {...register("indicationDetails", {
                required: "Detail is required.",
              })}
              disabled={!protocolId && !ids}
            />
            {errors.indicationDetails && (
              <span className="text-red-500 -mt-10">
                {errors.indicationDetails.message as string}
              </span>
            )}
          </div>
        )}

        {ids && (
          <div className="col-span-2">
            <Label label="Request Notes" className="inline-block mb-2" />
            <Textarea
              className="min-h-10 h-10"
              placeholder="Enter notes"
              {...register("requestNote", {})}
            />
            {errors.requestNote && (
              <span className="text-red-500 -mt-10">
                {errors.requestNote.message as string}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-center mt-4 gap-4 col-span-full">
          <Button
            className="px-8"
            type="submit"
            loading={
              isSubjectAddLoading ||
              isLoadingChangeRequest ||
              isValidatingFields
            }
            disabled={
              isSubjectAddLoading ||
              isLoadingChangeRequest ||
              isValidatingFields
            }
          >
            Submit
          </Button>
          <Button className="px-8" variant="outline" onClick={handleCancel}>
            Cancel
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
          setFocus("partialID");
          setValue("partialID", "");
          setNationalId("");
          // setIsIdWarningModalOpen(false);
        }}
      >
        {idWarningMessage}
      </Modal>
      <Modal
        containerClassName="bg-transparent max-h-full !h-full top-0 max-w-full !w-full"
        closeBtnClassName="bg-white rounded-full hover:scale-125 transition-all duration-200 right-8"
        open={isReportModalOpen}
        setOpen={setIsReportModalOpen}
        onClose={() => closeMatchReportModal}
      >
        <div className="h-full w-full mt-6">
          {isLoadingSubjectMatchReport ? (
            <div className="h-[85vh] flex items-center justify-center">
              <Spinner size="large" />{" "}
            </div>
          ) : (
            <PDFViewer className="w-full h-[85vh]">
              <ReprintPdf data={subjectMatchReport?.data} />
            </PDFViewer>
          )}
        </div>
      </Modal>
      <Modal
        // triggerProp={<Edit />}
        open={ageBmiWarningData.isModalOpen}
        // setOpen={(data: boolean) => setAgeBmiWarningData((val: AgeBmiWarningDataType) => ({...val, isModalOpen: data}))}
        title="Alert!"
        renderFooter={{
          onSave: () => {
            setAgeBmiWarningData((val: AgeBmiWarningDataType) => ({
              ...val,
              isModalOpen: false,
            }));
            submitData(ageBmiWarningData.submitPayload);
          },
          // onReject: () => setFocus('partialID'),
          submitButtonName: "OK",
          cancelButtonName: "Cancel",
        }}
        onClose={() => {
          // setIsAgeBmiWarningModalOpen(false);
          setAgeBmiWarningData((val: AgeBmiWarningDataType) => ({
            ...val,
            isModalOpen: false,
          }));
        }}
      >
        {ageBmiWarningData.message}
      </Modal>
    </>
  );
};

export default AddSubjectForm;
