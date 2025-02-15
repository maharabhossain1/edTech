"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, GripHorizontal, Boxes } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActivityDetailProps {
  activityId: string;
}

const QuestionTypeCard = ({
  icon: Icon,
  title,
  description,
  totalQuestions,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  totalQuestions: number;
  onClick: () => void;
}) => (
  <Card
    onClick={onClick}
    className="cursor-pointer group hover:border-indigo-500 hover:shadow-md transition-all duration-300"
  >
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors shrink-0">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <h3 className="font-medium text-lg text-neutral-900">{title}</h3>
              <p className="text-sm text-neutral-600">{description}</p>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {totalQuestions} questions
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ActivityDetail({ activityId }: ActivityDetailProps) {
  const activity = {
    id: activityId,
    title: "Surah Al-Fatiha",
    type: "listening",
    description:
      "Practice listening and pronunciation of verses through interactive exercises.",
    questionTypes: [
      {
        id: "fill_in_the_blanks",
        title: "Fill in the Blanks",
        description:
          "Complete verses by selecting the missing words from multiple choices",
        icon: BookOpen,
        totalQuestions: 5,
      },
      {
        id: "word_arrangement",
        title: "Word Arrangement",
        description:
          "Arrange words in the correct order to form complete verses",
        icon: GripHorizontal,
        totalQuestions: 3,
      },
      {
        id: "verse_arrangement",
        title: "Verse Arrangement",
        description:
          "Put verses in their proper sequence to complete the passage",
        icon: Boxes,
        totalQuestions: 2,
      },
    ],
  };

  const handleStartActivity = (questionTypeId: string) => {
    // Navigate to the specific question type
    console.log(`Starting activity ${questionTypeId}`);
  };

  return (
    <div className="space-y-8 pb-16 pt-6">
      {/* Question type cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select Exercise Type</h2>
        <div className="grid gap-4">
          {activity.questionTypes.map(type => (
            <Link href="/activities/fatiha-listening/1" key={type.id}>
              <QuestionTypeCard
                icon={type.icon}
                title={type.title}
                description={type.description}
                totalQuestions={type.totalQuestions}
                onClick={() => handleStartActivity(type.id)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
