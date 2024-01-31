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


const TrainingList = ({ item, selected, setSelected, setVideoUrl, setLoadQuiz, setShowResult, diableQuizes }: any) => {

  useEffect(() => {
    //setVideoUrl(item[0]?.filePath);
    //console.log(item[0]?.filePath);
  }, [item])


  return (
    <div key={item.trainingId}
      className= {`flex items-center justify-between gap-1 p-1 text-center border rounded ${selected === item.studyId ? 'bg-red-100 border-red-700 shadow-red-300/50' : 'border-red-500 shadow-red-300/50'} shadow-inner leading-tight`}>
      <button
        className= {`text-center px-2 py-1 border rounded-sm  text-black bg-red-200 ${selected === item.studyId ? 'border-red-700 shadow-red-300/50' : 'border-red-500 shadow-red-300/50'} shadow-inner leading-tight`}
        type="button"
        onClick={() => { setVideoUrl(item.filePath); setLoadQuiz(false); setSelected(item.trainingId)}}
      >
        {item.trainingName}
      </button>
      {
        item.hasQuizAccess && !diableQuizes?.includes(item.trainingId) ? <QuizIcon className="cursor-pointer" onClick={() => 
          { 
            setLoadQuiz(true); 
            setSelected(item.trainingId);
            setShowResult(false); 
          }} /> : ""
      }
      {
        item.canDownloadCertificate ? <DownloadCertificateIcon className="cursor-pointer" onClick={() => { alert('downloading..'); setSelected(item.trainingId)}} /> : ""
      }
    </div>
  );
};

export default TrainingList;
