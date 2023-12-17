import Print from "@/components/icons/print";
import Modal from "@/components/modal";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import React, { useState } from "react";

const PrintSubjectModal = ({ protocolNo, sponsorSubjectId }: any) => {
  let visitTypeOptions: any = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
    { value: "orchestra", label: "Orchestra" },
    { value: "orchestra", label: "Orchestra" },
  ];
  const [visitType, setVisitType] = useState<string>('')
  return (
    <Modal
      triggerProp={<Print />}
      title="Select Visit Type and Submit"
      renderFooter={{ onSave: () => { }, submitButtonName: "Submit" }}
    >
      <form className="space-y-6 h-80">
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Protocol No:" />
          <Input
            placeholder="Enter protocol no."
            className="w-[200px] md:w-[280px]"
            value={protocolNo}
            disabled
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Sponsor Subject ID:" />
          <Input
            placeholder="Enter subject id"
            className="w-[200px] md:w-[280px]"
            value={sponsorSubjectId}
            disabled
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Visit Type:" />
          <Select className="w-[200px] md:w-[280px]"
            onChange={(option) => {
              if (option) {
                setVisitType(option);
              }
            }}
            value={visitType}
            options={visitTypeOptions}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Last Subject Entry Date:" />
          <Input
            type="text"
            placeholder="Start Date"
            className="w-[200px] md:w-[280px]"
            onChange={(e) => console.log(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
      </form>
    </Modal>
  );
};

export default PrintSubjectModal;
