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

const UserTrainings = () => {

  const [trainingId, setTrainingId] = useState<number>();
  const [selected, setSelected] = useState<number>();
  const [userTrainings, setUserTrainings] = useState<any>([]);
  const [videoUrl, setVideoUrl] = useState<string>('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [loadQuiz, setLoadQuiz] = useState<boolean>(false);
  const { data: tainingData, error, isLoading, refetch: refetchIndications
  } = useGetUserTrainings();

  useEffect(() => {
    setUserTrainings(tainingData?.data);
    setVideoUrl(tainingData?.data[0]?.filePath);
    setSelected(tainingData?.data[0]?.trainingId)
  }, [tainingData])

  return (
    <MainContainer>
      <div className="wrapper mt-1">
        <Breadcrumbs title="Training List" subTitle="Training List" />
        <div className=" flex-wrap flex items-center justify-start gap-1 m-1">
          {userTrainings?.map((item: any) => (
            <TrainingList key={item.trainingId} item={item} selected={selected} setSelected={setSelected} setVideoUrl={setVideoUrl} setLoadQuiz={setLoadQuiz}/>
          ))}
        </div>
      </div>
      <div className="wrapper -mt-2 flex items-start justify-center">
        {
          !loadQuiz ? <TrainingVideo videoUrl={videoUrl} />
            : <TrainingQuiz trainigId={selected} />
        }


      </div>
    </MainContainer>
  );
};


export default UserTrainings;