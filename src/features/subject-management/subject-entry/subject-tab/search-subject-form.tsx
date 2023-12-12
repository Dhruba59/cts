import Button from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { SearchLastSubjectsParams } from "@/model/subject";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";

interface SearchSubjectFormProps {
  protocolId: string | undefined;
  setQueryParams: Dispatch<SetStateAction<SearchLastSubjectsParams>>;
}

const SearchSubjectForm = ({ setQueryParams, protocolId }: SearchSubjectFormProps) => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (values: any) => {
    
    const params: SearchLastSubjectsParams = {
      StudyId: protocolId ? protocolId : '',
      SponsorSubjectId: values.sponsorSubjectID,
      DateOfBirth: values?.DateOfBirth?.startDate,
      FirstInitial: values.FirstInitial,
      MiddleInitial: values.MiddleInitial,
      LastInitial: values.LastInitial,
      FromDate: values.FromDate?.startDate,
      ToDate: values.ToDate?.startDate
    }
    setQueryParams(params);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
      <Input label="Sponsor Subject ID" placeholder="Enter subject ID" {...register('sponsorSubjectID')} disabled={!protocolId}/>
      <div>
        <Label label="Subject Initials" className="inline-block mb-2" />
        <div className="grid grid-cols-3 gap-6">
          <Input placeholder="-" {...register('FirstInitial')} disabled={!protocolId} />
          <Input placeholder="-" {...register('MiddleInitial')} disabled={!protocolId} />
          <Input placeholder="-" {...register('MiddleInitial')} disabled={!protocolId} />
        </div>
      </div>
      <Controller
        control={control}
        name='DateOfBirth'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Datepicker
            popoverDirection='down'
            value={value}
            asSingle
            useRange={false}
            onChange={onChange}
            placeholder="Date of birth"
            label="Date of Birth"
            disabled={!protocolId}
          />
        )}
      />
      <Controller
        control={control}
        name='FromDate'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Datepicker
            label="From Date"
            onChange={onChange}
            value={value}
            asSingle
            useRange={false}
            disabled={!protocolId}
          />
        )}
      />
      <Controller
        control={control}
        name='ToDate'
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Datepicker
            label="From Date"
            onChange={onChange}
            value={value}
            asSingle
            useRange={false}
            disabled={!protocolId}
          />
        )}
      />
      <div className="flex items-center justify-center !mt-10 gap-4 col-span-full">
        <Button className="px-8" type="submit">Search</Button>
        <Button className="px-8" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default SearchSubjectForm;






















// import Button from "@/components/ui/button";
// import Datepicker from "@/components/ui/datepicker";
// import Input from "@/components/ui/input";
// import Label from "@/components/ui/label";
// import React from "react";
// import { Controller, UseFormReturn, useForm } from "react-hook-form";

// interface SearchSubjectFormProps {
// }

// const SearchSubjectForm = ({ }: SearchSubjectFormProps) => {

//   return (
//     <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
//       <Input label="Sponsor Subject ID" placeholder="Enter subject ID" />
//       <div>
//         <Label label="Subject Initials" className="inline-block mb-2" />
//         <div className="grid grid-cols-3 gap-6">
//           <Input placeholder="-" />
//           <Input placeholder="-" />
//           <Input placeholder="-" />
//         </div>
//       </div>

//       <Controller
//         name='DateOfBirth'
//         rules={{
//           required: "Date is required!",
//         }}
//         render={({ field: { onChange, onBlur, value } }: any) => (
//           <Datepicker
//             popoverDirection='down'
//             value={value}
//             onChange={onChange}
//             placeholder="Date of birth"
//             label="Date of Birth"
//           />
//         )}
//       />

//       {/* <Datepicker
//         label="Date of Birth"
//         value={{ startDate: null, endDate: null }}
//         onChange={() => {}}
//         asSingle
//         placeholder="Select Date"
//         useRange={false}
//       /> */}

//       <Controller
//         name='DateOfBirth'
//         rules={{
//           required: "Date is required!",
//         }}
//         render={({ field: { onChange, onBlur, value } }: any) => (
//           <Datepicker
//             popoverDirection='down'
//             value={value}
//             onChange={onChange}
//             placeholder="Date of birth"
//             label="From Date"
//           />
//         )}
//       />
//       {/* <Datepicker
//         label="From Date"
//         value={{ startDate: null, endDate: null }}
//         onChange={() => {}}
//       /> */}

//       <div className="flex items-center justify-center !mt-10 gap-4 col-span-full">
//         <Button className="px-8">Search</Button>
//         <Button className="px-8" variant="outline">
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default SearchSubjectForm;
