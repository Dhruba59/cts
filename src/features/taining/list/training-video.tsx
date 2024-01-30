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
import ReactPlayer from "react-player";


const TrainingVideo = ({ videoUrl }: any) => {

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl])


  return (
    <div className='flex-1 max-w-2xl xl:max-w-3xl 2xl:max-w-7xl p-1'>
      <div className="aspect-video">
        <ReactPlayer
          className='react-player'
          url={videoUrl}
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
    </div>
  );
};

export default TrainingVideo;
