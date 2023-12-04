import Print from "@/components/icons/print";
import Modal from "@/components/modal";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import React from "react";

const PrintSubjectModal = () => {
  return (
    <Modal
      triggerProp={<Print />}
      title="Select Visit Type and Submit"
      renderFooter={{ onSave: () => {}, submitButtonName: "Submit" }}
    >
      <form className="space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Protocol No:" />
          <Input
            placeholder="Enter protocol no."
            className="w-[200px] md:w-[280px]"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Sponsor Subject ID:" />
          <Input
            placeholder="Enter subject id"
            className="w-[200px] md:w-[280px]"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Visa Type:" />
          <Select className="w-[200px] md:w-[280px]" />
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
