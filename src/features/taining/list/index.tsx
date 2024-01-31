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
    setSelected(studyId ? parseInt(studyId) : null);
  }, [tainingData])

  return (
    <main>
      <div className="wrapper mt-1">
        <Breadcrumbs title="Training List" subTitle="Training List" />
        <div className=" flex-wrap flex items-center justify-start gap-1 m-1">
          {userTrainings?.map((item: any) => (
            <TrainingList key={item.trainingId} item={item} selected={selected} setSelected={setSelected} setVideoUrl={setVideoUrl} setLoadQuiz={setLoadQuiz} setShowResult={setShowResult} diableQuizes={diableQuizes}/>
          ))}
        </div>
      </div>
      <div className="wrapper -mt-2 flex items-center justify-center">
        {
          !loadQuiz ? <TrainingVideo videoUrl={videoUrl} />
            : <TrainingQuiz trainigId={selected} setDiableQuizes={setDiableQuizes} showResult={showResult} setShowResult={setShowResult}  refetchTrainings={refetchTrainings}/>
        }
      </div>
    </main>
  );
};


export default UserTrainings;