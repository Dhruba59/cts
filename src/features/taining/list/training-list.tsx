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
import Modal from "@/components/modal";
import Spinner from "@/components/ui/spinner";
import { PDFViewer } from "@react-pdf/renderer";
import CertificatePdf from "@/features/taining-material/certificate/pdf";
import { TrainingCertificateQueryParams } from "@/model/training";
import { getUserTrainingCertificate } from "@/service/user-training-service";
import { useQuery } from "react-query";


const TrainingList = ({ item, trainingId, setTrainingId,selected, setSelected, setVideoUrl, setLoadQuiz, setShowResult, diableQuizes }: any) => {

  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [certificateQueryParams, setCertificateQueryParams] =
  useState<TrainingCertificateQueryParams>();
  const [subItem, setSubItem] = useState<string>('module');

  const { data: certificateData, isLoading: isLoadingCertificate } =
  useQuery({
    queryFn: getUserTrainingCertificate,
    queryKey: ["user-training-certificate", certificateQueryParams],
    enabled: !!certificateQueryParams,
  });

  const showCertificate = (id: number) => {
    setIsCertificateModalOpen(true);
    setCertificateQueryParams({
      TrainingId: id
    });
  }

  const onCloseModal = () => {
    setIsCertificateModalOpen(false);
  };
  
  useEffect(() => {
    //setVideoUrl(item[0]?.filePath);
    //console.log(item[0]?.filePath);
  }, [item])


  return (
    <div key={item.trainingId}
      className={`flex flex-col gap-1 ml-2 p-1  border rounded ${selected === item.studyId ? ' border-red-700  shadow-red-300/50' : 'border-red-500 dark:border-white/50 shadow-red-300/50'} shadow-inner leading-tight`}>
        <details className="group" open ={selected === item.studyId ? true : false}>
          <summary className="font-medium cursor-pointer list-none">
            <div className="flex justify-between items-center font-medium cursor-pointer list-none">
              <div className="text-left">{item.trainingName}</div>
              <div className="text-right transition group-open:rotate-180">
                <svg fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>
            </div>
          </summary>
          <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
            <div className="flex flex-col gap-1">
              <button
                className={`px-2 text-left py-1 border border-sky-900 dark:border-white/50 rounded-sm shadow-inner leading-tight ${trainingId === item.trainingId &&  subItem === 'module'? 'bg-red-100 dark:bg-slate-900 border-red-700 shadow-red-300/50' : 'border-red-500 shadow-red-300/50'}`}
                type="button"
                onClick={() => { 
                  setVideoUrl(item.filePath); 
                  setLoadQuiz(false); 
                  setSelected(item.studyId);
                  setTrainingId(item.trainingId);
                  setSubItem('module'); }}
              >
                {'Study Subject Module'}
              </button>
              {item.hasQuizAccess && !diableQuizes?.includes(item.trainingId) ?

                <button
                  className={`px-2 text-left py-1 border border-sky-900 rounded-sm subItem dark:border-white/50 shadow-inner leading-tight ${trainingId === item.trainingId &&  subItem === 'quiz'? 'bg-red-100 dark:bg-slate-900 border-red-700 shadow-red-300/50' : 'border-red-500 shadow-red-300/50'}`}
                  type="button"
                  onClick={() => {
                    setLoadQuiz(true);
                    setSelected(item.studyId);
                    setShowResult(false);
                    setTrainingId(item.trainingId);
                    setSubItem('quiz');
                  }}
                >
                  {'Complete Quiz'}
                </button>
                : ""}
              {
                item.canDownloadCertificate ?

                  <button
                    className={`px-2 text-left py-1 border border-sky-900 rounded-sm dark:border-white/50 shadow-inner leading-tight ${trainingId === item.trainingId &&  subItem === 'certificate'? 'bg-red-100 dark:bg-slate-900 border-red-700 shadow-red-300/50' : 'border-red-500 shadow-red-300/50'}`}
                    type="button"
                    onClick={() => {
                      setSelected(item.studyId);
                      setTrainingId(item.trainingId);
                      setSubItem('certificate');
                      showCertificate(item?.trainingId);
                    }}
                  >
                    {'Download Certificate'}
                  </button>
                  : ""
              }
            </div>
          </div>
        </details>
        <Modal
          containerClassName="bg-transparent max-h-full !h-full top-0 max-w-full !w-full"
          closeBtnClassName="bg-white rounded-full hover:scale-125 transition-all duration-200 right-8"
          open={isCertificateModalOpen}
          setOpen={setIsCertificateModalOpen}
          onClose={() => onCloseModal}>
          <div className="h-full w-full mt-6">
            {isLoadingCertificate ? (
              <div className="h-[85vh] flex items-center justify-center">
                <Spinner size="large" />{" "}
              </div>
            ) : (
              <PDFViewer className="w-full h-[85vh]">
                <CertificatePdf
                  data={certificateData?.data}
                />
              </PDFViewer>
            )}
          </div>
        </Modal>
    </div>
  );
};

export default TrainingList;
