'use client'

import ReactPlayer from 'react-player';
import { useEffect, useMemo, useState } from "react";
import TrainingList from "./training-list";
import { MainContainer } from "@/components/style-container";
import { useGetUserTrainings } from "@/hooks/rq-hooks/user-training-hooks";
import { DownloadCertificateIcon, QuizIcon } from '@/assets/icons';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const UserTrainings = () => {

  const [userTrainings, setUserTrainings] = useState<any>([])
  const { data: tainingData, error, isLoading, refetch: refetchIndications
  } = useGetUserTrainings();

  useEffect(() => {
    setUserTrainings(tainingData?.data);
    console.log(tainingData)
  }, [tainingData])

  return (
    <MainContainer>
      <div className="wrapper mt-1">
        <Breadcrumbs title="Training List" subTitle="Training List" />
        <div className=" flex-wrap flex items-center justify-start gap-1 m-1">
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
                item.hasQuizAccess ? <QuizIcon className="cursor-pointer" onClick={() => { alert('OK') }} /> : ""
              }
              {
                item.canDownloadCertificate ? <DownloadCertificateIcon className="cursor-pointer" onClick={() => { alert('OK') }} /> : ""
              }
            </div>
          ))}
        </div>
      </div>
      <div className="wrapper -mt-2 flex items-start justify-center">
        <div className='flex-1 max-w-2xl xl:max-w-3xl 2xl:max-w-7xl p-1'>
          <div className="aspect-video">
            <ReactPlayer
              className='react-player'
              url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};


export default UserTrainings;