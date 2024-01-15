import Edit from "@/components/icons/edit";
import Modal from "@/components/modal";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { RadioButton, RadioGroup } from "@/components/ui/radio";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

enum SEND_REQ_OPTION_ENUM {
  PRINT_SUBJECT = 'print_subject',
  EDIT_SUBJECT = 'edit_subject',
  DELETE_SUBJECT_ENTRY = 'delete_subject'
}

const ChangeRequestModal = ({ id }: any) => {
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();

  const handleRadioChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const onSave = () => {
    if (selectedOption === SEND_REQ_OPTION_ENUM.EDIT_SUBJECT) {
      router.push(`/study-subject-edit/${id}`);
    }
  }

  return (
    <Modal
      triggerProp={<Edit />}
      title="Subject request for"
      renderFooter={{ onSave: onSave, submitButtonName: "Submit" }}
    >
      <form className="flex flex-col gap-6 mx-4" >
        <RadioGroup name="send-req-option" label="Please Select below option:" rootClassName="flex flex-col" selectedValue={selectedOption} onChange={handleRadioChange}>
          <RadioButton id='1' value={SEND_REQ_OPTION_ENUM.PRINT_SUBJECT}>Print Subject</RadioButton>
          <RadioButton id='2' value={SEND_REQ_OPTION_ENUM.EDIT_SUBJECT}>Edit Subject</RadioButton>
          <RadioButton id='3' value={SEND_REQ_OPTION_ENUM.PRINT_SUBJECT}>Delete Subject Entry</RadioButton>
        </RadioGroup>
        <div className="flex flex-col gap-3">
          <Label className="w-40" label="Request Description:" />
          <Input
            placeholder="Enter subject id"
            className="w-[200px] md:w-[280px]"
          />
        </div>
      </form>
    </Modal>
  );
};

export default ChangeRequestModal;
