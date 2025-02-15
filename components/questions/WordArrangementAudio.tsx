"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Headphones,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { ActivityType, type WordArrangementQuestion } from "@/lib/types/quiz";
import { useQuiz } from "@/contexts/QuizContext";

interface Props {
  question: WordArrangementQuestion;
  isRTL?: boolean;
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
          Perfect! Words are in the correct order.
        </p>
      </>
    ) : (
      <>
        <AlertCircle className="h-5 w-5 text-red-600" />
        <p className="text-sm text-red-800">
          The order is not correct. Check the solution below.
        </p>
      </>
    )}
  </div>
);

export default function WordArrangementQuestion({
  question,
  isRTL = false,
}: Props) {
  const { userAnswers, setUserAnswers, currentQuestionIndex, submitted } =
    useQuiz();
  const [words] = useState([...question.words].sort(() => Math.random() - 0.5));
  const [selectedWords, setSelectedWords] = useState<(string | null)[]>(
    new Array(question.words.length).fill(null)
  );
  const [selectedWordIndices, setSelectedWordIndices] = useState(
    new Set<number>()
  );

  const isSubmitted = submitted[currentQuestionIndex];
  const isCorrect =
    JSON.stringify(selectedWords.filter(Boolean)) ===
    JSON.stringify(question.correctOrder);

  const findNextEmptySlot = () => {
    if (isRTL) {
      for (let i = selectedWords.length - 1; i >= 0; i--) {
        if (selectedWords[i] === null) return i;
      }
    } else {
      for (let i = 0; i < selectedWords.length; i++) {
        if (selectedWords[i] === null) return i;
      }
    }
    return -1;
  };

  const handleWordSelect = (word: string, wordIndex: number) => {
    if (isSubmitted || selectedWordIndices.has(wordIndex)) return;

    const nextSlot = findNextEmptySlot();
    if (nextSlot !== -1) {
      const newSelectedWords = [...selectedWords];
      newSelectedWords[nextSlot] = word;
      setSelectedWords(newSelectedWords);
      setSelectedWordIndices(new Set([...selectedWordIndices, wordIndex]));

      // Update context
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = newSelectedWords.filter(
        Boolean
      ) as string[];
      setUserAnswers(newAnswers);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    word: string,
    wordIndex: number
  ) => {
    if (isSubmitted || selectedWordIndices.has(wordIndex)) return;
    e.dataTransfer.setData("word", word);
    e.dataTransfer.setData("wordIndex", wordIndex.toString());
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    slotIndex: number
  ) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("word");
    const wordIndex = parseInt(e.dataTransfer.getData("wordIndex"));

    if (!selectedWords[slotIndex] && !selectedWordIndices.has(wordIndex)) {
      const newSelectedWords = [...selectedWords];
      newSelectedWords[slotIndex] = word;
      setSelectedWords(newSelectedWords);
      setSelectedWordIndices(new Set([...selectedWordIndices, wordIndex]));

      // Update context
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = newSelectedWords.filter(
        Boolean
      ) as string[];
      setUserAnswers(newAnswers);
    }
  };

  const handleSlotClick = (slotIndex: number) => {
    if (isSubmitted || !selectedWords[slotIndex]) return;

    const newSelectedWords = [...selectedWords];
    const removedWord = newSelectedWords[slotIndex];
    newSelectedWords[slotIndex] = null;
    setSelectedWords(newSelectedWords);

    const wordIndex = words.findIndex(w => w === removedWord);
    if (wordIndex !== -1) {
      const newIndices = new Set(selectedWordIndices);
      newIndices.delete(wordIndex);
      setSelectedWordIndices(newIndices);

      // Update context
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = newSelectedWords.filter(
        Boolean
      ) as string[];
      setUserAnswers(newAnswers);
    }
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <CardContent className="space-y-6 p-0">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 justify-center">
            <ActivityIcon type={question.activityType} />
            <p className="font-semibold text-xl">
              {"Arrange the Words in Correct Order"}
            </p>
          </div>

          {question.activityType === ActivityType.LISTENING &&
            question.audioUrl && <AudioPlayer audioUrl={question.audioUrl} />}
        </div>
        <p>{question.title}</p>

        {isSubmitted && <FeedbackBanner isCorrect={isCorrect} />}

        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500 mb-3">
            Available Words:
          </h3>
          <div className="flex flex-wrap gap-2">
            {words.map((word, index) => (
              <Button
                key={`${word}-${index}`}
                variant="outline"
                className={`${
                  selectedWordIndices.has(index)
                    ? "opacity-50"
                    : "hover:bg-neutral-100"
                }`}
                disabled={selectedWordIndices.has(index) || isSubmitted}
                onClick={() => handleWordSelect(word, index)}
                draggable={!selectedWordIndices.has(index) && !isSubmitted}
                onDragStart={e => handleDragStart(e, word, index)}
              >
                {word}
              </Button>
            ))}
          </div>
        </div>

        <div
          className={`bg-white border-2 rounded-lg p-6 ${
            isSubmitted
              ? isCorrect
                ? "border-green-500 bg-green-50/30"
                : "border-red-500 bg-red-50/30"
              : " border-neutral-200"
          } border-dashed`}
        >
          <h3 className="text-sm font-medium text-neutral-500 mb-3">
            {question.activityType === ActivityType.LISTENING
              ? "Arrange words in the order you hear them:"
              : "Arrange words in the correct order:"}
          </h3>
          <div
            className={`flex flex-wrap gap-4 justify-center ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {selectedWords.map((word, index) => {
              const isWordCorrect =
                isSubmitted && word === question.correctOrder[index];
              return (
                <div
                  key={index}
                  className={`h-12 min-w-24 flex items-center justify-center border-2 
                    ${
                      word
                        ? isSubmitted
                          ? isWordCorrect
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-green-500 bg-green-50 cursor-pointer hover:bg-green-100"
                        : "border-neutral-300 "
                    } 
                    rounded-lg transition-colors relative group`}
                  onClick={() => handleSlotClick(index)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => handleDrop(e, index)}
                >
                  {word || ""}
                </div>
              );
            })}
          </div>
        </div>

        {isSubmitted && !isCorrect && (
          <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-neutral-900">Correct Order:</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {question.correctOrder.map((word, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-neutral border border-neutral-200 rounded-lg text-neutral-800"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
}
