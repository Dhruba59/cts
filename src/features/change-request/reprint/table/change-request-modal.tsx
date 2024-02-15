import Edit from "@/components/icons/edit";
import Modal from "@/components/modal";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { RadioButton, RadioGroup } from "@/components/ui/radio";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { useChangeRequestChangeOperation, useGetChangeReqVisitTypes } from "@/hooks/rq-hooks/change-request-hooks";
import { SelectOptionType } from "@/model/drop-down-list";
import { USER_ROLE_ENUM } from "@/model/enum";
import { MatchReportQueryParams } from "@/model/subject";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

enum SEND_REQ_OPERATION_TYPE_ENUM {
  PRINT_SUBJECT = 5,
  EDIT_SUBJECT = 4,
  DELETE_SUBJECT_ENTRY = 1,
  ENTER_LAST_SUBJECT_CONTACT = 3,
  DELETE_LAST_VISIT_ENTRY = 2
}

const ChangeRequestModal = ({ id, visitTypeId, isPreScreen, onPrintClick, onHideChangeRequestModal, refetchList }: any) => {
  const [open, setOpen] = useState<boolean>(true);
  const [selectedOperation, setSelectedOperation] = useState();
  const [showError, setShowError] = useState<boolean>(false);
  const [visitTypeOption, setVisitTypeOption] = useState<SelectOptionType[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate: postChangeOperation, isLoading: isLoadingChangeOperation } = useChangeRequestChangeOperation();
  const { data: visitTypeData } = useGetChangeReqVisitTypes();
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
    defaultValues: {
      lastEntryDate: {
        startDate: null,
        endDate: null
      },
      visitType: null,
      requestDescription: null
    }
  });

  // @ts-ignore
  const isSiteUser = session?.user.currentRole.roleId == USER_ROLE_ENUM.SITE_USER;

  const handleRadioChange = (event: any) => {
    setSelectedOperation(event.target.value);
    setShowError(false);
  };

  const onSubmit = (values: any) => {
    if(!selectedOperation) {
      setShowError(true);
      return;
    }
    if (selectedOperation == SEND_REQ_OPERATION_TYPE_ENUM.EDIT_SUBJECT) {
      router.push(`/study-subject-edit/${id}`);
    }
    else if (selectedOperation == SEND_REQ_OPERATION_TYPE_ENUM.PRINT_SUBJECT) {
      onPrintClick();
      setOpen(false);
      onHideChangeRequestModal();
    }
    else {
      const [subjectId, nationalTypeId] = id.split('_');
      const payload = {
        subjectId: subjectId,
        nationalTypeId: nationalTypeId,
        visitType: values?.visitType?.value,
        requestNote: values?.requestDescription,
        operationType: selectedOperation,
        lastEntryDate: values?.lastEntryDate?.startDate
      }
      postChangeOperation(payload, {
        onSuccess: (data) => {
          toast.success(data?.data.details);
          setOpen(false);
          onHideChangeRequestModal();
          refetchList();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data.detail);
        }
      });
    };
  }

  const onCloseModal = () => {
    reset();
    onHideChangeRequestModal();
  }

  useEffect(() => {
    if(visitTypeData) {
      setVisitTypeOption(convertTypeToSelectOption(visitTypeData?.data));
    }
  }, [visitTypeData])

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Subject request for"
      containerClassName="max-w-[500px]"
      renderFooter={{
        onSave: handleSubmit(onSubmit),
        submitButtonName: "Submit",
      }}
      onClose={onCloseModal}
      isLoading={isLoadingChangeOperation}>
      <form
        className="flex flex-col gap-6 mx-4 md:w-1/2"
        onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup
          name="send-req-option"
          label="Please Select below option:"
          rootClassName="flex flex-col"
          className="flex flex-col gap-2"
          selectedValue={selectedOperation}
          onChange={handleRadioChange}>
          <RadioButton
            id="1"
            value={SEND_REQ_OPERATION_TYPE_ENUM.PRINT_SUBJECT}>
            Print Subject
          </RadioButton>
          <RadioButton id="2" value={SEND_REQ_OPERATION_TYPE_ENUM.EDIT_SUBJECT}>
            Edit Subject
          </RadioButton>
          <RadioButton
            id="4"
            value={SEND_REQ_OPERATION_TYPE_ENUM.DELETE_SUBJECT_ENTRY}>
            Delete Subject Entry
          </RadioButton>
          {!isSiteUser && parseInt(visitTypeId) < 1 && !isPreScreen && (
            <RadioButton
              id="3"
              value={SEND_REQ_OPERATION_TYPE_ENUM.ENTER_LAST_SUBJECT_CONTACT}>
              Enter Last Subject Contact
            </RadioButton>
          )}
          {parseInt(visitTypeId) >= 1 && !isPreScreen && (
            <RadioButton
              id="5"
              value={SEND_REQ_OPERATION_TYPE_ENUM.DELETE_LAST_VISIT_ENTRY}>
              Delete Last Visit Entry
            </RadioButton>
          )}
        </RadioGroup>
        {selectedOperation ==
          SEND_REQ_OPERATION_TYPE_ENUM.ENTER_LAST_SUBJECT_CONTACT && (
          <>
            <Controller
              control={control}
              name="visitType"
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select
                  className=""
                  label="Visit Type"
                  onChange={onChange}
                  options={visitTypeOption}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="lastEntryDate"
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Datepicker
                  label="Last entry date"
                  containerClassName=""
                  // label="Date Of Birth"
                  value={value}
                  onChange={onChange}
                  // popoverDirection=""
                  placeholder="Select Date"
                  useRange={false}
                  asSingle
                />
              )}
            />
          </>
        )}
        {selectedOperation ==
          SEND_REQ_OPERATION_TYPE_ENUM.DELETE_SUBJECT_ENTRY && (
          <div className="flex flex-col gap-3">
            <Label className="w-40" label="Request Description" />
            <Textarea
              {...register("requestDescription")}
              placeholder="Enter Description"
              // className="w-[200px] md:w-[280px]"
            />
          </div>
        )}
        
        {showError && <span className="text-red-500">Select a operation</span>}
      </form>
    </Modal>
  );
};

export default ChangeRequestModal;
