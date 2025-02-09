export interface Surah {
    number: number
    name: string
    englishName: string
    englishNameTranslation: string
    arabicText: string
}

export interface LastRead {
    surah: string
    verse: string
}

export interface QuickLink {
    name: string
    href: string
}

