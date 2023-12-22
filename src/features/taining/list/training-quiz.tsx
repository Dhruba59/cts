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


const TrainingQuiz = ({ videoUrl }: any) => {
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

  const [questions, setQuestion] = useState<any>(quizQuestions)
  const [totalQuestion, setTotalQuestion] = useState(questions.length - 1)
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<any>()
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number| undefined>()
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  interface Answer {
    questionIndex?: number;
    answerIndex?: number;
  }
  
  const createObjectList = (size: number): Answer[] =>
    Array.from({ length: size }, (_, index) => ({
      questionIndex: index,
      answerIndex: undefined,
    }));
  
  const [givenAnswers, setGivenAnswers] = useState<Answer[]>(createObjectList(questions.length));
  const { question, answers } = questions[activeQuestion]

  const onClickNext = () => {
    setSelectedAnswerIndex(undefined)
    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onClickPrevious = () => {
    setSelectedAnswerIndex(0)
    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev - 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = ({ answer, index }: any) => {

    setSelectedAnswer(index);

    setGivenAnswers((prev) =>{
      const updatedObjects = [...prev];
      updatedObjects[activeQuestion] = { ...updatedObjects[activeQuestion], answerIndex: index };
      return updatedObjects;
    })

  }

  const addLeadingZero = (number: any) => (number > 9 ? number : `0${number}`)

  return (
    <div className="ml-4 mb-4 mr-auto">
      {!showResult ? (
        <div className="">
          <div>
            <span className="font-bold text-2xl">Quiz </span>
            <span className="text-red-700">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="text-red-300">/{addLeadingZero(questions.length)}</span>
          </div>
          <h3>{question}</h3>
          <ul>
            {answers.map((answer: any, index: number) => (
              <li
                onClick={() => onAnswerSelected({ answer, index})}
                key={answer}
                className={` border border-blue-300 rounded p-2 my-2 cursor-pointer ${index === givenAnswers[activeQuestion].answerIndex  ? 'border-red-700 bg-red-200' : null}`}>
                {answer}
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
            <Button variant="secondary" size="small" className="mx-1 outline-primary" onClick={onClickNext}>
              {activeQuestion === questions.length - 1 ?

                <div className="flex items-center gap-2">
                  <span>Finish</span>
                  <CheckmarkDoneOutlineIcon fill="white"  className="mt-1 text-white" />
                </div>
                :
                <div className="flex items-center gap-2">
                  <span>Next</span>
                  <RightArrowIcon fill={'white'} className="mt-1 text-white" />
                </div>
              }
            </Button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  )
};

export default TrainingQuiz;
