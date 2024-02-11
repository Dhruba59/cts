'use client'

import ReactPlayer from 'react-player';
import { useEffect, useMemo, useState } from "react";
import TrainingList from "./training-list";
import { MainContainer } from "@/components/style-container";
import { useGetUserTrainings } from "@/hooks/rq-hooks/user-training-hooks";
import { DownloadCertificateIcon, QuizIcon } from '@/assets/icons';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import TrainingVideo from './training-video';
import TrainingQuiz from './training-quiz';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const UserTrainings = () => {

  const [trainingId, setTrainingId] = useState<number>();
  const [selected, setSelected] = useState<number | null>();
  const [userTrainings, setUserTrainings] = useState<any>([]);
  const [videoUrl, setVideoUrl] = useState<string>('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [loadQuiz, setLoadQuiz] = useState<boolean>(false);
  const [diableQuizes, setDiableQuizes] = useState([]);
  const [showResult, setShowResult] = useState(false)
  const { data: tainingData, error, isLoading, refetch: refetchTrainings
  } = useGetUserTrainings();

  const searchParams = useSearchParams();
  const studyId = searchParams.get('studyId');

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
        <h4 className=" text-neutral-black px-3 py-4">Training Modules</h4>
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
                : <TrainingQuiz trainigId={trainingId} setDiableQuizes={setDiableQuizes} showResult={showResult} setShowResult={setShowResult} refetchTrainings={refetchTrainings} />
            }
          </div>
        </div>
      </div>
    </main>
  );
};


export default UserTrainings;