"use client";

import { PlayCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import Word from "./word";

const VerseDisplayCard = ({ verse }) => {
  const showByWords = true;

  return (
    <div
      className="p-4 border border-neutral-300 bg-neutral rounded-2xl"
      data-verse={verse.verse_key}
      data-words={verse.words.length}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className=" w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
          <p className="text-neutral-700 font-semibold p-0 text-sm">
            {verse.no}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" className="w-max h-max rounded-full p-2">
            <PlayCircleIcon className="text-neutral-700" />
          </Button>
        </div>
      </div>
      <div className="text-right font-lateef" dir="rtl">
        <div
          className={`inline ${
            showByWords
              ? "leading-[50px] md:leading-[100px]"
              : "leading-[30px] md:leading-[60px]"
          }`}
        >
          {verse.words.map(word => (
            <Word key={word.id} word={word} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerseDisplayCard;
