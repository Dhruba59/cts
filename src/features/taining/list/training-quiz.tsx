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
import { CheckmarkDoneOutlineIcon, DownloadCertificateIcon, QuizIcon } from "@/assets/icons";
import ReactPlayer from "react-player";
import LeftArrowIcon from "@/components/icons/leftArrowIcon";
import RightArrowIcon from "@/components/icons/rightArrowIcon";
import Button from "@/components/ui/button";
import { useAddQuizAnswer, useGetQuizByTrainingId } from "@/hooks/rq-hooks/user-training-hooks";
import { toast } from "react-toastify";


interface Answer {
  questionIndex?: number;
  questionId?: number;
  answerIndexes?: number[];
  givenAnswers?: number[]
}

const TrainingQuiz = ({ trainigId, setDiableQuizes, showResult, setShowResult, refetchTrainings }: any) => {
  const quizQuestions: any = [
    {
      id: 1, question: 'Initials and Date of Birth entered in CTSdatabase are derived from:', answers: [
        'A photo ID',
        'What subject tells you',
        'Previous study records',
        'Any of the above'
      ],
      answerGiven: ''
    },
    {
      id: 2, question: 'If the subject has no last 4 of SSN, Passport, or National ID, you should enter:', answers: [
        '1234',
        'XXXX',
        '0000',
        'X0X0'
      ],
      answerGiven: ''
    },
    {
      id: 3, question: 'If an entry is made in error (e.g. incorrect date of birth)', answers: [
        'The entry is in the database and cannot be changed',
        'Re-enter the subject',
        'Submit a change request',
        'Any of the above'
      ],
      answerGiven: ''
    }
  ]

  const { mutate: AddQuizAnswer, isLoading: savingQuizAnser } = useAddQuizAnswer();
  const { data: quizQuestionList, error, isLoading, refetch: refetchQuestions
  } = useGetQuizByTrainingId(trainigId as number);

  const [questions, setQuestions] = useState<any>([])
  const [question, setQuestion] = useState<any>()
  const [answers, setAnswers] = useState<any>([])
  const [totalQuestion, setTotalQuestion] = useState<number>(0)
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<any>()
  const [result, setResult] = useState({
    score: 0,
    details: "",
  })

  const [givenAnswers, setGivenAnswers] = useState<Answer[]>([]);

  const createObjectList = (size: number): Answer[] =>
    Array.from({ length: size }, (_, index) => ({
      questionIndex: index,
      questionId: undefined,
      answerIndexes: [],
      givenAnswers: []
    }));

  const onClickNext = () => {

    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          //correctAnswers: prev.correctAnswers + 1,
        }
        : {
          ...prev,
          //wrongAnswers: prev.wrongAnswers + 1 
        }
    )
    if (activeQuestion !== questions.length - 1) {

      setActiveQuestion((prev) => prev + 1)

    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onClickSubmit = () => {
    const newList = givenAnswers.map(item => ({
      questionId: item.questionId,
      givenAnswers: item.givenAnswers
    }));

    let quizAns = {
      trainingId: trainigId,
      givenQuizAnswers: newList
    }
    console.log('quizAns', quizAns);

    //AddQuizAnswer
    AddQuizAnswer(quizAns, {
      onSuccess: ({ data }: any) => {
        //reset();
        //console.log(data);
        setResult((prev) => {
          return {
            ...prev,
            score: data.totalMarksObtain,
            details: `${data.message} ${data.details}`
          }
        })
        toast.success(data.message, { position: "top-center" });
        if (data.message === "3rd Failed Attempt!") {
          setDiableQuizes((prev: any) => {
            return [
              ...prev,
              trainigId
            ]
          })
        }

        setShowResult(true);
        //refetch();
      },
      onError: (err: any) => {
        toast.warn(err?.response?.data?.title, { position: "top-center" });
        setShowResult(true);
      }
    })
  }

  const onClickPrevious = () => {
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1)
    } else {
      setActiveQuestion(0)
    }
  }

  const onAnswerSelected = (index: any, answerId: any) => {

    setSelectedAnswer(index);

    setGivenAnswers((prev) => {
      const updatedObjects = [...prev];
      updatedObjects[activeQuestion] = {
        ...updatedObjects[activeQuestion],
        questionId: questions[activeQuestion]?.questionId,
        answerIndexes: [index],
        givenAnswers: [answerId]
      };
      return updatedObjects;
    })

  }

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  const addLeadingZero = (number: any) => (number > 9 ? number : `0${number}`)

  useEffect(() => {
    setActiveQuestion(0);
    setShowResult(false);
  }, [trainigId]);

  useEffect(() => {
    //console.log(quizQuestionList?.data);
    setQuestions(quizQuestionList?.data);
    setTotalQuestion(quizQuestionList?.data?.length);
    setGivenAnswers(createObjectList(quizQuestionList?.data?.length));

    setShowResult(false);
    setActiveQuestion(0);

    setQuestion(quizQuestionList?.data[0]?.question);
    setAnswers(quizQuestionList?.data[0]?.answers);

  }, [quizQuestionList]);

  useEffect(() => {
    if (activeQuestion !== 0 && questions?.length) {
      setQuestion(questions[activeQuestion]?.question);
      setAnswers(questions[activeQuestion]?.answers);
    }
  }, [activeQuestion]);

  return (
    <div className="w-full ml-4 mb-4 mr-auto">
      {!showResult ? (
        <div className="">
          <div>
            <span className="font-bold text-2xl">Quiz </span>
            <span className="text-red-700">{totalQuestion === 0 ? activeQuestion : activeQuestion + 1}</span>
            <span className="text-red-300">/{totalQuestion}</span>
          </div>
          <h3>{question}</h3>
          <ul className="mr-4">
            {answers?.map((obj: any, index: number) => (
              <li
                onClick={() => onAnswerSelected(index, obj.answerId)}
                key={index}
                className={`w-full border border-blue-300 rounded p-2 my-2 cursor-pointer ${givenAnswers[activeQuestion]?.answerIndexes?.includes(index) ? 'border-red-700 bg-red-200' : null}`}>
                {obj.answer}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center">
            <Button variant="secondary" size="small" className={`mx-1 outline-primary ${activeQuestion === 0 ? 'hidden' : ''}`} onClick={onClickPrevious}>
              {
                <div className="flex items-center gap-2">
                  <LeftArrowIcon fill="white" className="mt-1 text-white" />
                  <span>Previous</span>
                </div>
              }
            </Button>
            {activeQuestion !== questions?.length - 1 ?
              <Button variant="secondary" size="small" className="mx-1 outline-primary" onClick={onClickNext}>
                <div className="flex items-center gap-2">
                  <span>Next</span>
                  <RightArrowIcon fill={'white'} className="mt-1 text-white" />
                </div>
              </Button>
              :
              <Button variant="secondary" size="small" className="mx-1 outline-primary" onClick={onClickSubmit}>
                <div className="flex items-center gap-2">
                  <span>Finish</span>
                  <CheckmarkDoneOutlineIcon fill="white" className="mt-1 text-white" />
                </div>
              </Button>
            }
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions?.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Details:<span> {result.details}</span>
          </p>
        </div>
      )}
    </div>
  )
};

export default TrainingQuiz;
