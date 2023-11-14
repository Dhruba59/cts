import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";

const SearchForm = () => {
  return (
    <form className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Indication Name: " className="hidden lg:block" />
        <Input placeholder="Enter indication name" className="md:w-48" />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1">
        <Label label="Code Type: " className="hidden lg:block" />
        <Select options={[]} placeholder="Select" className="md:w-48" />
      </div>
      <Button className="!h-10 mb-[1px]">Search</Button>
    </form>
  );
};

export default SearchForm;
