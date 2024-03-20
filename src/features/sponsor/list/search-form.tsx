
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { Fragment } from "react";


export function SearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { register } = form;

  return (
    <Fragment>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Sponsor Name: " className="hidden lg:block" />
        <Input
          placeholder="Enter sponsor name"
          className="md:w-48"
          {...register("sponsorName")}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Zip: " className="hidden lg:block" />
        <Input
          placeholder="Enter zip code"
          className="md:w-48"
          {...register("zip")}
        />
      </div>
    </Fragment>
  );
}

export function AdvanceSearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { register } = form;

  return (
    <Fragment>
      <div>
        <Input
          label="City"
          placeholder="Enter city"
          className=""
          {...register("city")}
        />
      </div>
      <div>
        <Input
          label="State"
          placeholder="Enter state"
          wrapperClassName=""
          {...register("state")}
        />
      </div>
      <div>
        <Textarea
          className="min-h-10"
          label="Address One"
          placeholder="Enter address one"
          {...register("address1", {})}
        />
      </div>
      <div>
        <Textarea
          className="min-h-10"
          label="Address Two"
          placeholder="Enter address two"
          {...register("address2", {})}
        />
      </div>
    </Fragment>
  );
}

export const TabSearchBarContent = ({ form }: BasicTabSearchBarContentsProps) => {
  const { register } = form;

  return (
    <Fragment>
      <Input
        placeholder="Enter sponsor name"
        className="md:w-48"
        {...register("sponsorName")}
      />
      <Input
        placeholder="Enter zip code"
        className="md:w-48"
        {...register("zip")}
      />
      <Input placeholder="Enter city" className="" {...register("city")} />
      <Input
        placeholder="Enter state"
        wrapperClassName=""
        {...register("state")}
      />
      <Textarea className="min-h-10" placeholder="Enter address one" {...register("address1")} />
      <Textarea className="min-h-10" placeholder="Enter address two" {...register("address2")} />
    </Fragment>
  );
}


      {/* <div className="flex items-center justify-end gap-4 mt-8 md:mt-14">
          <Button type="submit" className="px-8">
            Search
          </Button>
          <Button type="button" className="px-8" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
      </div> */}