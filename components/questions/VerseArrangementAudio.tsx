"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Headphones,
  PlayCircle,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { ActivityType, type VerseArrangementQuestion } from "@/lib/types/quiz";
import { Badge } from "@/components/ui/badge";
import { useQuiz } from "@/contexts/QuizContext";

interface Props {
  question: VerseArrangementQuestion;
}

const AudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <Button
        onClick={handlePlayAudio}
        size="sm"
        className="gap-2 bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold disabled:opacity-50 transition-all duration-200"
      >
        <PlayCircle className="h-4 w-4" />
        Play Audio
      </Button>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

const ActivityIcon = ({ type }: { type: ActivityType }) => (
  <div className="flex items-center gap-2 w-8 h-8 rounded-full bg-neutral-100 justify-center">
    {type === ActivityType.LISTENING ? (
      <Headphones className="h-5 w-5 text-indigo-700" />
    ) : (
      <BookOpen className="h-5 w-5 text-indigo-700" />
    )}
  </div>
);

const FeedbackBanner = ({ isCorrect }: { isCorrect: boolean }) => (
  <div
    className={`flex items-center gap-2 p-4 rounded-lg mb-4 ${
      isCorrect
        ? "bg-green-50 border border-green-200"
        : "bg-red-50 border border-red-200"
    }`}
  >
    {isCorrect ? (
      <>
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <p className="text-sm text-green-800">
          Perfect! All verses are in the correct order.
        </p>
      </>
    ) : (
      <>
        <AlertCircle className="h-5 w-5 text-red-600" />
        <p className="text-sm text-red-800">
          Some verses are not in the correct position. Check the solution below.
        </p>
      </>
    )}
  </div>
);

export default function VerseArrangementQuestion({ question }: Props) {
  const { userAnswers, setUserAnswers, currentQuestionIndex, submitted } =
    useQuiz();
  const [verses, setVerses] = useState(
    [...question.verses].sort(() => Math.random() - 0.5)
  );

  const isSubmitted = submitted[currentQuestionIndex];
  const currentArrangement = verses.map(v => v.id);
  const isCorrect =
    JSON.stringify(currentArrangement) ===
    JSON.stringify(question.correctOrder);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    if (isSubmitted) return;
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    e.preventDefault();
    if (isSubmitted) return;

    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    const newVerses = [...verses];
    const [draggedVerse] = newVerses.splice(dragIndex, 1);
    newVerses.splice(dropIndex, 0, draggedVerse);
    setVerses(newVerses);

    // Update context
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = newVerses.map(v => v.id);
    setUserAnswers(newAnswers);
  };

  const handleMoveVerse = (index: number, direction: "up" | "down") => {
    if (
      isSubmitted ||
      (direction === "up" && index === 0) ||
      (direction === "down" && index === verses.length - 1)
    )
      return;

    const newVerses = [...verses];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newVerses[index], newVerses[swapIndex]] = [
      newVerses[swapIndex],
      newVerses[index],
    ];
    setVerses(newVerses);

    // Update context
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = newVerses.map(v => v.id);
    setUserAnswers(newAnswers);
  };

  const isCorrectPosition = (verse: (typeof verses)[0], index: number) =>
    isSubmitted && verse.id === question.correctOrder[index];

  return (
    <div>
      <CardContent className="space-y-6 p-0">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 justify-center">
            <ActivityIcon type={question.activityType} />
            <p className="font-semibold text-xl">
              {question.activityType === ActivityType.LISTENING
                ? "Listen and Arrange Verses"
                : "Read and Arrange Verses"}
            </p>
          </div>

          {question.activityType === ActivityType.LISTENING && (
            <AudioPlayer audioUrl="/path-to-your-audio-file.mp3" />
          )}
        </div>
        <p>{question.title}</p>

        {isSubmitted && <FeedbackBanner isCorrect={isCorrect} />}

        <div className="space-y-2">
          {verses.map((verse, index) => {
            const isInCorrectPosition = isCorrectPosition(verse, index);

            return (
              <div
                key={verse.id}
                draggable={!isSubmitted}
                onDragStart={e => handleDragStart(e, index)}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, index)}
                className={`p-4 bg-white border rounded-lg relative
                  ${
                    isSubmitted
                      ? isInCorrectPosition
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                  transition-colors`}
              >
                <div className="flex items-center gap-4">
                  {!isSubmitted && (
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        className="w-max h-max p-1.5"
                        onClick={() => handleMoveVerse(index, "up")}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-max h-max p-1.5"
                        onClick={() => handleMoveVerse(index, "down")}
                        disabled={index === verses.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {!isSubmitted && (
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      {isSubmitted && (
                        <div
                          className={`flex items-center gap-1 text-sm
                          ${
                            isInCorrectPosition
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {isInCorrectPosition ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-arabic text-right">
                      {verse.arabic}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isSubmitted && !isCorrect && (
          <div className="mt-6 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-gray-900">Correct Order:</h3>
            </div>
            <div className="space-y-3">
              {question.correctOrder.map((verseId, index) => {
                const verse = question.verses.find(v => v.id === verseId);
                if (!verse) return null;
                return (
                  <div
                    key={verseId}
                    className="p-3 bg-neutral border border-neutral-200 rounded-lg"
                  >
                    <Badge variant="success" className="mb-2">
                      Verse {index + 1}
                    </Badge>
                    <p className="text-xl font-arabic text-right mb-2">
                      {verse.arabic}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
}
