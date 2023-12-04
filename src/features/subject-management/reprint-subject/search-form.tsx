import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";

const SearchForm = () => {
  return (
    <form className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden lg:block" />
        <Select className="md:w-48" />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1">
        <Label label="Subject ID: " className="hidden lg:block" />
        <Input placeholder="Enter subject id" className="md:w-48" />
      </div>
      <Button className="!h-10 mb-[1px]">Search</Button>
    </form>
  );
};

const AdvanceSearchForm = () => {
  return (
    <form className="hidden lg:block p-6 space-y-6">
      <div className="grid grid-col-1 md:grid-cols-3 gap-x-16">
        <div>
          <Label label="Subject Initials" className="inline-block mb-2" />
          <div className="grid grid-cols-3 gap-x-8">
            <Input placeholder="-" />
            <Input placeholder="-" />
            <Input placeholder="-" />
          </div>
        </div>
        <Datepicker
          label="Date of Birth"
          value={{ startDate: null, endDate: null }}
          onChange={() => {}}
          placeholder="Select Date"
          useRange={false}
          asSingle
        />
        <Datepicker
          label="Date"
          value={{ startDate: null, endDate: null }}
          onChange={() => {}}
          placeholder="Start Date   ⇀  End Date"
        />
      </div>
      <div className="flex items-center justify-center gap-4 !mt-10">
        <Button className="">Advance Search</Button>
        <Button className="px-8" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export { SearchForm, AdvanceSearchForm };
