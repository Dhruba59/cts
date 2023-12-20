"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";

import { useEffect, useState } from "react";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Controller, useForm } from "react-hook-form";
import { IndicationQuery } from "@/model/indication";
import { useGetStudyProtocols } from "@/hooks/rq-hooks/training-material-hooks";
import { TrainingMaterialQuery } from "@/model/training-material";
import { json } from "stream/consumers";
import { DownloadCertificateIcon, QuizIcon } from "@/assets/icons";


const TrainingList = ({ item, setVideoUrl, setLoadQuiz }: any) => {

  useEffect(() => {
    //setVideoUrl(item[0]?.filePath);
    //console.log(item[0]?.filePath);
  }, [item])


  return (
    <div key={item.trainingId}
      className="flex items-center justify-between gap-1 p-1 text-center border rounded border-red-600 shadow-red-500/50 shadow-inner leading-tight">
      <button
        className="text-center px-2 py-1 border rounded-sm  text-white border-blue-500 bg-blue-500 shadow-blue-500/50 shadow-inner leading-tight"
        type="button"
        onClick={() => { setVideoUrl(item.filePath); setLoadQuiz(false)}}
      >
        {item.trainingName}
      </button>
      {
        item.hasQuizAccess ? <QuizIcon className="cursor-pointer" onClick={() => { setLoadQuiz(true) }} /> : ""
      }
      {
        item.canDownloadCertificate ? <DownloadCertificateIcon className="cursor-pointer" onClick={() => { alert('downloading..')}} /> : ""
      }
    </div>
  );
};

export default TrainingList;
