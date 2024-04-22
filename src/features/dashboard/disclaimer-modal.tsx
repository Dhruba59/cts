import View from "@/components/icons/view";
import Print from "@/components/icons/print";
import Modal from "@/components/modal";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import React, { useEffect, useState } from "react";
import { ChangeRequestAuditDetailQuery, ChangeRequestAuditQuery } from "@/model/change-request";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { SortingState } from "@tanstack/react-table";
import Pagination from "@/components/pagination";
import { useChangeRequestAuditDetail } from "@/hooks/rq-hooks/change-request-hooks";
import { useSession } from "next-auth/react";


const DisclaimerModal = ({ firstName, lastName, onAccept, onReject }: any) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        onReject();
      }}
      title="Disclaimer!"
      containerClassName="md:!w-[624px] overflow-auto"
      renderFooter={{
        submitButtonName: "Accept",
        cancelButtonName: "Decline",
        onSave: () => { setOpen(false); onAccept(); },
        onReject: () => { setOpen(false); onReject(); },
      }}
    >
      <div className="flex flex-col mx-2 md:mx-auto">
        <p className="text-center underline underline-offset-4 mb-4 text-lg font-semibold">CTSdatabase User Agreement</p>
        <p>I, <span className="text-sky-600">{firstName} {lastName}</span>, agree to explain to subjects the purpose of the subject registry
          and to have all subjects sign the current IRB-approved Subject Database Authorization prior to
          entering any subject data onto <a target="_blank" rel="noopener noreferrer" href="https://ctsdatabase.com" className="text-sky-600">www.ctsdatabase.com</a>. Only those partial identifiers which have been
          authorized in writing by the subject will be entered into the database or shared with other participating sites.
          I agree that login information will not be shared and that I will follow all applicable government
          regulations and ICH/GCP and HIPAA requirements.
        </p>
      </div>
    </Modal>
  );
};

export default DisclaimerModal;
