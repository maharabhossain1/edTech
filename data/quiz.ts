import { ActivityType, QuestionFormat, type Question } from "@/lib/types/quiz"

export const dummyQuestions: Question[] = [
    {
        id: "1",
        activityType: ActivityType.LISTENING,
        format: QuestionFormat.FILL_IN_THE_BLANKS,
        title: "بِسْمِ اللَّهِ ___ الرَّحِيمِ",
        words: [
            { id: "1", arabic: "الرَّحْمَٰنِ" },
            { id: "2", arabic: "العَظِيمِ" },
            { id: "3", arabic: "الكَرِيمِ" },
            { id: "4", arabic: "القَدِيرِ" }
        ],
        correctAnswer: "الرَّحْمَٰنِ",
    },
    {
        id: "2",
        activityType: ActivityType.LISTENING,
        format: QuestionFormat.WORD_ARRANGEMENT,
        words: ["Bismillah", "ar", "Rahman", "ar", "Raheem"],
        correctOrder: ["Bismillah", "ar", "Rahman", "ar", "Raheem"],
        audioUrl: "/api/audio/bismillah",
    },
    {
        id: "3",
        activityType: ActivityType.LISTENING,
        format: QuestionFormat.VERSE_ARRANGEMENT,
        verses: [
            {
                id: 1,
                arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                translation: "In the name of Allah, the Most Gracious, the Most Merciful",
                audioUrl: "/api/audio/verse1",
            },
            {
                id: 2,
                arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
                translation: "All praise is due to Allah, Lord of the worlds",
                audioUrl: "/api/audio/verse2",
            },
            {
                id: 3,
                arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
                translation: "The Most Gracious, the Most Merciful",
                audioUrl: "/api/audio/verse3",
            },
        ],
        correctOrder: [1, 2, 3],
    },
    {
        id: "4",
        activityType: ActivityType.READING,
        format: QuestionFormat.FILL_IN_THE_BLANKS,
        title: "قُلْ هُوَ اللَّهُ ___ لَمْ يَلِدْ وَلَمْ يُولَدْ",
        words: [
            { id: "1", arabic: "أَحَدٌ" },
            { id: "2", arabic: "الصَّمَدُ" },
            { id: "3", arabic: "الْوَاحِدُ" },
            { id: "4", arabic: "الْعَظِيمُ" }
        ],
        correctAnswer: "أَحَدٌ",
    },
    {
        id: "5",
        activityType: ActivityType.READING,
        format: QuestionFormat.WORD_ARRANGEMENT,
        title: "Read and arrange the following words to form the first verse of Surah Al-Falaq:",
        words: [
            "قُلْ",
            "أَعُوذُ",
            "بِرَبِّ",
            "الْفَلَقِ"
        ],
        correctOrder: [
            "قُلْ",
            "أَعُوذُ",
            "بِرَبِّ",
            "الْفَلَقِ"
        ],
    },
    {
        id: "6",
        activityType: ActivityType.READING,
        format: QuestionFormat.VERSE_ARRANGEMENT,
        title: "Read and arrange the following verses in the correct order from Surah An-Nas:",
        verses: [
            {
                id: 1,
                arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
                translation: "Say: I seek refuge with the Lord of mankind",
            },
            {
                id: 2,
                arabic: "مَلِكِ النَّاسِ",
                translation: "The King of mankind",
            },
            {
                id: 3,
                arabic: "إِلَٰهِ النَّاسِ",
                translation: "The God of mankind",
            }
        ],
        correctOrder: [1, 2, 3],
    },
    {
        id: "7",
        activityType: ActivityType.READING,
        format: QuestionFormat.FILL_IN_THE_BLANKS,
        title: "وَمِن شَرِّ ___ إِذَا وَقَبَ",
        words: [
            { id: "1", arabic: "غَاسِقٍ" },
            { id: "2", arabic: "حَاسِدٍ" },
            { id: "3", arabic: "النَّفَّاثَاتِ" },
            { id: "4", arabic: "الْوَسْوَاسِ" }
        ],
        correctAnswer: "غَاسِقٍ",
    }
]

