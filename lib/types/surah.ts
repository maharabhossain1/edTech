export interface Surah {
    number: number
    name: string
    englishName: string
    englishNameTranslation: string
    arabicText: string
    revelation: number;
    verses: number
}


export interface LastRead {
    surah: string
    verse: string
}

export interface QuickLink {
    name: string
    href: string
}

export interface SurahPosition {
    surah: Surah;
    startIndex: number;
}

