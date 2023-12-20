"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useEffect, useState } from "react";
import { SearchForm, AdvanceSearchForm } from "./search-form";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { IndicationQuery } from "@/model/indication";
import { useGetStudyProtocols } from "@/hooks/rq-hooks/training-material-hooks";
import { TrainingMaterialQuery } from "@/model/training-material";
import { json } from "stream/consumers";
import { DownloadCertificateIcon, QuizIcon } from "@/assets/icons";


const TrainingList = ({ userTrainings }: any) => {

  useEffect(() => {
    console.log(userTrainings);
  }, [userTrainings])


  return (
    <div className="wrapper">
      <Breadcrumbs title="Training List" subTitle="Training List" />
      <div className=" flex-wrap flex items-center justify-start gap-1 m-2">
        {userTrainings?.map((item: any) => (
          <div key={item.trainingId}
            className="flex items-center justify-between gap-1 p-2 text-center border rounded border-red-600 shadow-red-500/50 shadow-inner leading-tight">
            <button
              className="text-center px-2 py-1 border rounded-sm  text-white border-blue-500 bg-blue-500 shadow-blue-500/50 shadow-inner leading-tight"
              type="button"
              onClick={() => { }}
            >
              {item.trainingName}
            </button>
            {
              item.hasQuizAccess ? <QuizIcon className="cursor-pointer" onClick={() => {alert('OK')}}/> : ""
            }
            {
              item.canDownloadCertificate ? <DownloadCertificateIcon className="cursor-pointer" onClick={() => {alert('OK')}} /> : ""
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingList;
