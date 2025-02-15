"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { BookOpen, Headphones, PlayCircle } from "lucide-react";
import {
  type FillBlanksQuestion as FillBlanksQuestionType,
  ActivityType,
} from "@/lib/types/quiz";
import { useQuiz } from "@/contexts/QuizContext";

type Word = { id: string; arabic: string };

interface Props {
  question: FillBlanksQuestionType;
}

const AudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
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
  <div className="flex items-center gap-2 w-8 h-8 rounded-full bg-indigo-50 justify-center">
    {type === ActivityType.LISTENING ? (
      <Headphones className="h-5 w-5 text-indigo-700" />
    ) : (
      <BookOpen className="h-5 w-5 text-indigo-700" />
    )}
  </div>
);

export default function FillBlanksQuestion({ question }: Props) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const [beforeBlank, afterBlank = ""] = (question.title ?? "")
    .split("___")
    .map(part => part.trim());

  const { userAnswers, setUserAnswers, currentQuestionIndex, submitted } =
    useQuiz();

  const isSubmitted = submitted[currentQuestionIndex];
  const handleWordSelect = (word: Word) => {
    if (isSubmitted) return;

    setSelectedWord(word);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = word.arabic;
    setUserAnswers(newAnswers);
  };

  // Update rendering to show correct/incorrect states
  const getWordButtonStyle = (word: Word) => {
    if (!isSubmitted) {
      return selectedWord?.id === word.id
        ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-100"
        : "";
    }

    if (word.arabic === question.correctAnswer) {
      return "bg-green-100 text-green-700 border-green-500";
    }

    if (
      selectedWord?.id === word.id &&
      word.arabic !== question.correctAnswer
    ) {
      return "bg-red-100 text-red-700 border-red-600";
    }

    return "opacity-50";
  };

  return (
    <div>
      <CardContent className="p-0 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 justify-center">
            <ActivityIcon type={question.activityType} />
            <p className="font-semibold text-xl">Fill In the Blanks</p>
          </div>

          {question.activityType === ActivityType.LISTENING && (
            <AudioPlayer audioUrl="/path-to-your-audio-file.mp3" />
          )}
        </div>

        <div className="flex items-center gap-4 text-2xl justify-end">
          <span className="font-arabic text-3xl">{beforeBlank}</span>
          <span>____</span>
          {afterBlank && (
            <span className="font-arabic text-3xl">{afterBlank}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {question.words.map(word => (
            <Button
              key={word.id}
              onClick={() => handleWordSelect(word)}
              variant={selectedWord?.id === word.id ? "default" : "outline"}
              className={`font-arabic font-semibold text-2xl h-16 ${getWordButtonStyle(
                word
              )}`}
              disabled={isSubmitted}
            >
              {word.arabic}
            </Button>
          ))}
        </div>
      </CardContent>
    </div>
  );
}
