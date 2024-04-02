'use client'

import { useEffect, useState } from "react";
import TrainingList from "./training-list";
import { useGetUserTrainings } from "@/hooks/rq-hooks/user-training-hooks";
import Breadcrumbs from '@/components/ui/breadcrumbs';
import TrainingVideo from './training-video';
import TrainingQuiz from './training-quiz';
import { useSearchParams } from 'next/navigation';

const UserTrainings = () => {

  const [trainingId, setTrainingId] = useState<number>();
  const [selected, setSelected] = useState<number | null>();
  const [userTrainings, setUserTrainings] = useState<any>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loadQuiz, setLoadQuiz] = useState<boolean>(false);
  const [diableQuizes, setDiableQuizes] = useState([]);
  const [showResult, setShowResult] = useState(false)
  const { data: tainingData, error, isLoading, refetch: refetchTrainings
  } = useGetUserTrainings();

  const searchParams = useSearchParams();
  const studyId = searchParams.get('studyId');

  const setDownloadCertificateTrue = () => {    
    let tempUserTrainings = [...userTrainings]
    for (let i = 0; i < tempUserTrainings.length; i++) {
      if (tempUserTrainings[i].trainingId === trainingId) {
        // Update the desired properties
        tempUserTrainings[i].canDownloadCertificate = true;
        tempUserTrainings[i].trainingAccess = false;
        break;
      }
    }
    setUserTrainings(tempUserTrainings)
  }

  useEffect(() => {
    setUserTrainings(tainingData?.data);
    setVideoUrl(tainingData?.data[0]?.filePath);
    setSelected(studyId ? parseInt(studyId) : tainingData?.data[0]?.studyId);
    setTrainingId(studyId ? tainingData?.data?.find((item: any) => item.studyId === studyId)?.trainingId : tainingData?.data[0]?.trainingId);
  }, [tainingData])

  return (
    <main>
      <div className="wrapper mt-1">
        <Breadcrumbs title="Training List" subTitle="Training List" />
        <h4 className="px-3 py-4">Training Modules</h4>
        <div className="flex flex-row gap-1">
          <div className="flex-none w-1/6 gap-1">           
            <div className='flex flex-col gap-1'>
              {userTrainings?.map((item: any) => (
                <TrainingList key={item.trainingId} item={item} trainingId={trainingId} setTrainingId={setTrainingId} selected={selected} setSelected={setSelected} setVideoUrl={setVideoUrl} setLoadQuiz={setLoadQuiz} setShowResult={setShowResult} diableQuizes={diableQuizes} />
              ))}
            </div>
          </div>
          <div className="wrapper mt-0 flex w-5/6  justify-center">
            {
              !loadQuiz ? <TrainingVideo videoUrl={videoUrl} />
                : <TrainingQuiz trainigId={trainingId} setDiableQuizes={setDiableQuizes} showResult={showResult} setShowResult={setShowResult} refetchTrainings={refetchTrainings} setDownloadCertificateTrue={setDownloadCertificateTrue} />
            }
          </div>
        </div>
      </div>
    </main>
  );
};


export default UserTrainings;