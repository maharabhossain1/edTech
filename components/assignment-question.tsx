"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import { Question, QuestionFormat } from "@/lib/types/quiz";
import FillBlanksQuestion from "./questions/FillBlanksQuestion";
import WordArrangementAudio from "./questions/WordArrangementAudio";
import VerseArrangementAudio from "./questions/VerseArrangementAudio";
import { QuizProvider, useQuiz } from "@/contexts/QuizContext";

interface QuizProps {
  questions: Question[];
  handleIsDoingMode: () => void;
}

function QuizContent({ questions, handleIsDoingMode }: QuizProps) {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    submitted,
    setSubmitted,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = userAnswers[currentQuestionIndex] !== null;
  const isCurrentQuestionSubmitted = submitted[currentQuestionIndex];

  const handleSubmit = () => {
    const newSubmitted = [...submitted];
    newSubmitted[currentQuestionIndex] = true;
    setSubmitted(newSubmitted);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.format) {
      case QuestionFormat.FILL_IN_THE_BLANKS:
        return <FillBlanksQuestion question={currentQuestion} />;
      case QuestionFormat.WORD_ARRANGEMENT:
        return <WordArrangementAudio question={currentQuestion} />;
      case QuestionFormat.VERSE_ARRANGEMENT:
        return <VerseArrangementAudio question={currentQuestion} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Top Navigation */}
      <div className="mb-8">
        <button
          onClick={handleIsDoingMode}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assignment
        </button>
      </div>

      {/* Question Counter */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Question {currentQuestionIndex + 1}
          </h1>
          <span className="text-sm font-medium text-gray-500">
            {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      <Card className="overflow-hidden border border-neutral-300 shadow rounded-2xl">
        <CardContent className="p-0">
          <div className="p-6 sm:p-8">{renderQuestion()}</div>
        </CardContent>

        <CardFooter className="border-t  px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              {isCurrentQuestionSubmitted ? (
                <Button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className={`
                bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold
                    disabled:opacity-50 
                    text-white
                  `}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isAnswered}
                  className={`
                     rounded-lg
                    text-sm font-semibold
                    ${
                      isAnswered
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-200 text-gray-400"
                    }
                  `}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <p className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-indigo-600" />
          Take your time to answer carefully
        </p>
        {!isCurrentQuestionSubmitted && (
          <p>
            {questions.length - currentQuestionIndex - 1} questions remaining
          </p>
        )}
      </div>
    </div>
  );
}

export default function Quiz(props: QuizProps) {
  return (
    <QuizProvider questions={props.questions}>
      <QuizContent {...props} />
    </QuizProvider>
  );
}
