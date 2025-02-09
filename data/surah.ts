import { LastRead, QuickLink, Surah } from "@/lib/types/surah"


export const lastReadVerses: LastRead[] = [
  { surah: "AS-SAFFAT", verse: "37:3" },
  { surah: "FATIR", verse: "35:14" },
  { surah: "AL-FATIHAH", verse: "1:7" },
  { surah: "AL BAQARA", verse: "2:7" },
]

export const quickLinks: QuickLink[] = [
  { name: "YA SIN", href: "/surah/36" },
  { name: "AL-KAHF", href: "/surah/18" },
  { name: "AL-MULK", href: "/surah/67" },
  { name: "AYATUL KURSI", href: "/surah/2/255" },
]

export const surahs: Surah[] = [
  {
    number: 1,
    name: "Al-Fatihah",
    englishName: "The Opening",
    englishNameTranslation: "The Opening",
    arabicText: "الفاتحة",
  },
  {
    number: 2,
    name: "Al-Baqarah",
    englishName: "The Cow",
    englishNameTranslation: "The Cow",
    arabicText: "البقرة",
  },
  {
    number: 3,
    name: "Aal-e-Imran",
    englishName: "The Family of Imran",
    englishNameTranslation: "The Family of Imran",
    arabicText: "آل عمران",
  },
  {
    number: 4,
    name: "An-Nisa",
    englishName: "The Women",
    englishNameTranslation: "The Women",
    arabicText: "النساء",
  },
  {
    number: 5,
    name: "Al-Ma'idah",
    englishName: "The Table",
    englishNameTranslation: "The Table",
    arabicText: "المائدة",
  },
  {
    number: 6,
    name: "Al-An'am",
    englishName: "The Cattle",
    englishNameTranslation: "The Cattle",
    arabicText: "الأنعام",
  },
  {
    number: 7,
    name: "Al-A'raf",
    englishName: "The Heights",
    englishNameTranslation: "The Heights (or The Wall with Elevations)",
    arabicText: "الأعراف",
  },
  {
    number: 8,
    name: "Al-Anfal",
    englishName: "The Spoils of War",
    englishNameTranslation: "The Spoils of War",
    arabicText: "الأنفال",
  },
  {
    number: 9,
    name: "At-Tawbah",
    englishName: "The Repentance",
    englishNameTranslation: "The Repentance",
    arabicText: "التوبة",
  },
  {
    number: 10,
    name: "Yunus",
    englishName: "Jonah",
    englishNameTranslation: "Jonah",
    arabicText: "يونس",
  },
  {
    number: 11,
    name: "Hud",
    englishName: "Hud",
    englishNameTranslation: "Hud",
    arabicText: "هود",
  },
  {
    number: 12,
    name: "Yusuf",
    englishName: "Joseph",
    englishNameTranslation: "Joseph",
    arabicText: "يوسف",
  },
]

