"use client";

import AssignmentDetails from "@/components/assignment-details";
import Quiz from "@/components/assignment-question";
import {
  ActivityType,
  Question,
  QuestionType,
} from "@/components/question-card";
import { dummyQuestions } from "@/data/quiz";
import React, { useState } from "react";

export interface Assignment {
  id: number;
  title: string;
  surah: string;
  dueDate: string;
  progress: number;
  completionDate: string;
  accuracy: string;
  completedQuestions: number;
  totalQuestions: number;
  teacherInstructions: string;
  questions: Question[];
}

const assignmentData: Assignment = {
  id: 1,
  title: "Word Pronunciation Practice",
  surah: "Surah Al-Fatiha",
  completionDate: "2024-02-15",
  accuracy: "85%",
  teacherInstructions: "Complete all exercises. Focus on proper pronunciation.",
  totalQuestions: 10,
  questions: [
    {
      id: 1,
      type: QuestionType.FILL_BLANKS,
      title: "Complete the verse: بِسْمِ اللَّهِ ___ ___",
      status: "correct",
      activityType: ActivityType.LISTENING,
    },
    {
      id: 2,
      type: QuestionType.WORD_ARRANGEMENT,
      title: "Arrange the words: العالمين رب لله الحمد",
      status: "incorrect",
      activityType: ActivityType.READING,
    },
    {
      id: 3,
      type: QuestionType.VERSE_ARRANGEMENT,
      title:
        "Arrange verses 4-6 in order: نَسْتَعِينُ, إِيَّاكَ نَعْبُدُ, إِيَّاكَ",
      status: "correct",
      activityType: ActivityType.READING,
    },
    {
      id: 4,
      type: QuestionType.FILL_BLANKS,
      title: "Fill in: الرَّحْمَنِ ___ (ar-Rahman ar-Raheem)",
      status: "correct",
      activityType: ActivityType.LISTENING,
    },
    {
      id: 5,
      type: QuestionType.WORD_ARRANGEMENT,
      title: "Order the words: الدِّينِ يَوْمِ مَالِكِ",
      status: "incorrect",
      activityType: ActivityType.READING,
    },
    {
      id: 6,
      type: QuestionType.VERSE_ARRANGEMENT,
      title: "Arrange the final verses in sequence",
      status: "correct",
      activityType: ActivityType.LISTENING,
    },
    {
      id: 7,
      type: QuestionType.FILL_BLANKS,
      title: "Complete: اهْدِنَا ___ ___",
      status: "correct",
      activityType: ActivityType.READING,
    },
    {
      id: 8,
      type: QuestionType.WORD_ARRANGEMENT,
      title: "Arrange: عَلَيْهِمْ أَنْعَمْتَ الَّذِينَ صِرَاطَ",
      status: "correct",
      activityType: ActivityType.LISTENING,
    },
    {
      id: 9,
      type: QuestionType.VERSE_ARRANGEMENT,
      title: "Order verses: الضَّالِّينَ, عَلَيْهِمْ, وَلَا",
      status: "incorrect",
      activityType: ActivityType.READING,
    },
    {
      id: 10,
      type: QuestionType.FILL_BLANKS,
      title: "Complete the final verse: وَلَا ___ (wa lad-daalleen)",
      status: "correct",
      activityType: ActivityType.LISTENING,
    },
  ],
};

export default function AssignmentDetailsPage() {
  const [isDoing, setDoing] = useState(false);

  const handleIsDoingMode = () => {
    setDoing(!isDoing);
  };
  return (
    <div className="mx-auto">
      {isDoing ? (
        <Quiz
          handleIsDoingMode={handleIsDoingMode}
          questions={dummyQuestions}
        />
      ) : (
        <AssignmentDetails
          assignmentData={assignmentData}
          handleIsDoingMode={handleIsDoingMode}
        />
      )}
    </div>
  );
}
