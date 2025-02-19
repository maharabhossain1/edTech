"use client";

import VerseDisplayCard from "./verse-display-card";
import KabaIcon from "@/icons/kaba-icon.svg";

const dummyData = [
  {
    verse_key: "1:1",
    no: 1,
    words: [
      {
        id: 1,
        text_uthmani: "بِسْمِ",
        translation: { text: "In (the) name" },
      },
      {
        id: 2,
        text_uthmani: "ٱللَّهِ",
        translation: { text: "(of) Allah" },
      },
      {
        id: 3,
        text_uthmani: "ٱلرَّحْمَـٰنِ",
        translation: { text: "the Most Gracious" },
      },
      {
        id: 4,
        text_uthmani: "ٱلرَّحِيمِ",
        translation: { text: "the Most Merciful" },
      },
    ],
  },
  {
    verse_key: "1:2",
    no: 2,
    words: [
      {
        id: 1130,
        text_uthmani: "ٱلْحَمْدُ",
        translation: { text: "All praises and thanks" },
      },
      {
        id: 1131,
        text_uthmani: "لِلَّهِ",
        translation: { text: "(be) to Allah" },
      },
      {
        id: 1132,
        text_uthmani: "رَبِّ",
        translation: { text: "the Lord" },
      },
      {
        id: 1133,
        text_uthmani: "ٱلْعَـٰلَمِينَ",
        translation: { text: "of the universe" },
      },
    ],
  },
  {
    verse_key: "1:3",
    no: 3,
    words: [
      {
        id: 2953,
        text_uthmani: "ٱلرَّحْمَـٰنِ",
        translation: { text: "The Most Gracious" },
      },
      {
        id: 2954,
        text_uthmani: "ٱلرَّحِيمِ",
        translation: { text: "the Most Merciful" },
      },
    ],
  },
  {
    verse_key: "1:4",
    no: 4,
    words: [
      {
        id: 3252,
        text_uthmani: "مَـٰلِكِ",
        translation: { text: "(The) Master" },
      },
      {
        id: 3253,
        text_uthmani: "يَوْمِ",
        translation: { text: "(of the) Day" },
      },
      {
        id: 3254,
        text_uthmani: "ٱلدِّينِ",
        translation: { text: "(of the) Judgment" },
      },
    ],
  },
  {
    verse_key: "1:5",
    no: 5,
    words: [
      {
        id: 5334,
        text_uthmani: "إِيَّاكَ",
        translation: { text: "You Alone" },
      },
      {
        id: 5335,
        text_uthmani: "نَعْبُدُ",
        translation: { text: "we worship" },
      },
      {
        id: 5336,
        text_uthmani: "وَإِيَّاكَ",
        translation: { text: "and You Alone" },
      },
      {
        id: 5337,
        text_uthmani: "نَسْتَعِينُ",
        translation: { text: "we ask for help" },
      },
    ],
  },
  {
    verse_key: "1:6",
    no: 6,
    words: [
      {
        id: 6844,
        text_uthmani: "ٱهْدِنَا",
        translation: { text: "Guide us" },
      },
      {
        id: 6845,
        text_uthmani: "ٱلصِّرَٰطَ",
        translation: { text: "(to) the path" },
      },
      {
        id: 6846,
        text_uthmani: "ٱلْمُسْتَقِيمَ",
        translation: { text: "the straight" },
      },
    ],
  },
  {
    verse_key: "1:7",
    no: 7,
    words: [
      {
        id: 8411,
        text_uthmani: "صِرَٰطَ",
        translation: { text: "(The) path" },
      },
      {
        id: 8412,
        text_uthmani: "ٱلَّذِينَ",
        translation: { text: "(of) those" },
      },
      {
        id: 8413,
        text_uthmani: "أَنْعَمْتَ",
        translation: { text: "You have bestowed (Your) Favors" },
      },
      {
        id: 8414,
        text_uthmani: "عَلَيْهِمْ",
        translation: { text: "on them" },
      },
      {
        id: 8415,
        text_uthmani: "غَيْرِ",
        translation: { text: "not (of)" },
      },
      {
        id: 8416,
        text_uthmani: "ٱلْمَغْضُوبِ",
        translation: { text: "those who earned (Your) wrath" },
      },
      {
        id: 8417,
        text_uthmani: "عَلَيْهِمْ",
        translation: { text: "on themselves" },
      },
      {
        id: 8418,
        text_uthmani: "وَلَا",
        translation: { text: "and not" },
      },
      {
        id: 8419,
        text_uthmani: "ٱلضَّآلِّينَ",
        translation: { text: "(of) those who go astray" },
      },
    ],
  },
];

const TranslationView = ({}) => {
  return (
    <div className="space-y-4">
      <div className="mt-4 flex items-center justify-between rounded-2xl border p-4 md:mt-6 bg-neutral border-neutral-300 shadow">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Al-Fatihah</h1>
          <div className="flex gap-2">
            <div className="bg-neutral-100 h-max w-max rounded-lg p-1">
              <KabaIcon className="text-control-normal text-2xl" />
            </div>
            <div>
              <p className="text-sm">Meccan</p>
              <p className="text-text-color-light text-xs">7 Ayahs</p>
            </div>
          </div>
        </div>
        {/* <p
          className="theme-palette-normal bismillah text-sm font-semibold text-neutral-500 md:text-2xl"
          dir="rtl"
          style={{
            fontFamily: "var(--font-bismillah)",
            filter: "brightness(0)",
          }}
        >
          ﲪﲫﲮﲴ
        </p> */}
      </div>

      {dummyData.map(verse => (
        <VerseDisplayCard key={verse.verse_key} verse={verse} />
      ))}
    </div>
  );
};

export default TranslationView;
