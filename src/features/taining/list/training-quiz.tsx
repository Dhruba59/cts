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


const TrainingQuiz = ({ videoUrl }: any) => {
  const questions: any = [
    {
      id: 1, question: 'Initials and Date of Birth entered in CTSdatabase are derived from:', answers: [
        'A photo ID',
        'What subject tells you',
        'Previous study records',
        'Any of the above'
      ],
      correctAnswer: 'A photo ID'
    },
    {
      id: 2, question: 'If the subject has no last 4 of SSN, Passport, or National ID, you should enter:', answers: [
        '1234',
        'XXXX',
        '0000',
        'X0X0'
      ],
      correctAnswer: '1234'
    },
    {
      id: 3, question: 'If an entry is made in error (e.g. incorrect date of birth)', answers: [
        'The entry is in the database and cannot be changed',
        'Re-enter the subject',
        'Submit a change request',
        'Any of the above'
      ],
      correctAnswer: 'Any of the above'
    }
  ]
  const [totalQuestion, setTotalQuestion] = useState(questions.length - 1)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<any>()
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(0)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const { question, answers, correctAnswer } = questions[activeQuestion]

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
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

  const onAnswerSelected = ({answer, index}: any) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number: any) => (number > 9 ? number : `0${number}`)

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions.length)}</span>
          </div>
          <h3>{question}</h3>
          <ul>
            {answers.map((answer: any, index: any) => (
              <li
                onClick={() => onAnswerSelected({answer, index})}
                key={answer}
                className={`${selectedAnswerIndex === index ? 'border-blue-500' : null}`}>
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-2">
            <button onClick={onClickPrevious} hidden={selectedAnswerIndex === 0}>
              {'Previous'}
            </button>
            <button onClick={onClickNext} disabled={selectedAnswerIndex === questions.length}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
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
