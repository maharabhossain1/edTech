export enum ActivityType {
    LISTENING = "listening",
    READING = "reading",
}

export enum QuestionFormat {
    FILL_IN_THE_BLANKS = "fill_in_the_blanks",
    WORD_ARRANGEMENT = "word_arrangement",
    VERSE_ARRANGEMENT = "verse_arrangement",
}

export interface BaseQuestion {
    id: string
    activityType: ActivityType
    format: QuestionFormat
    title?: string // Added to base question since all formats now need a title
}

export interface FillBlanksQuestion extends BaseQuestion {
    format: QuestionFormat.FILL_IN_THE_BLANKS
    words: { id: string; arabic: string }[]
    correctAnswer: string
}

export interface WordArrangementQuestion extends BaseQuestion {
    format: QuestionFormat.WORD_ARRANGEMENT
    words: string[]
    correctOrder: string[]
    audioUrl?: string // Made optional since reading questions won't have audio
}

export interface VerseArrangementQuestion extends BaseQuestion {
    format: QuestionFormat.VERSE_ARRANGEMENT
    verses: {
        id: number
        arabic: string
        translation: string
        audioUrl?: string // Made optional since reading questions won't have audio
    }[]
    correctOrder: number[]
}

export type Question = FillBlanksQuestion | WordArrangementQuestion | VerseArrangementQuestion