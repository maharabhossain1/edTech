import React, { createContext, useContext, useState } from "react";
import { Question, QuestionFormat } from "@/lib/types/quiz";

interface QuizContextType {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  userAnswers: (string | string[] | number[] | null)[];
  setUserAnswers: React.Dispatch<
    React.SetStateAction<(string | string[] | number[] | null)[]>
  >;
  submitted: boolean[];
  setSubmitted: React.Dispatch<React.SetStateAction<boolean[]>>;
  validateAnswer: (questionIndex: number) => boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({
  children,
  questions,
}: {
  children: React.ReactNode;
  questions: Question[];
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    (string | string[] | number[] | null)[]
  >(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );

  const validateAnswer = (questionIndex: number): boolean => {
    const question = questions[questionIndex];
    const userAnswer = userAnswers[questionIndex];

    if (!userAnswer) return false;

    switch (question.format) {
      case QuestionFormat.FILL_IN_THE_BLANKS:
        return userAnswer === question.correctAnswer;
      case QuestionFormat.WORD_ARRANGEMENT:
        return (
          JSON.stringify(userAnswer) === JSON.stringify(question.correctOrder)
        );
      case QuestionFormat.VERSE_ARRANGEMENT:
        return (
          JSON.stringify(userAnswer) === JSON.stringify(question.correctOrder)
        );
      default:
        return false;
    }
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        userAnswers,
        setUserAnswers,
        submitted,
        setSubmitted,
        validateAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
