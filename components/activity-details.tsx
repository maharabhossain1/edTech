"use client";
import React from "react";
import Link from "next/link";
import {
  BookOpen,
  GripHorizontal,
  Boxes,
  CheckCircle,
  ChevronRight,
  Headphones,
  Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ActivityDetailProps {
  activityId: string;
}

interface QuestionType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  totalQuestions: number;
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
}) => {
  return (
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
                <h3 className="font-medium text-lg text-neutral-900">
                  {title}
                </h3>
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
};

export default function ActivityDetail({ activityId }: ActivityDetailProps) {
  // Mock data with progress tracking
  const activity = {
    id: activityId,
    title: "Surah Al-Fatiha",
    subtitle: "Listening Practice",
    type: "listening",
    description:
      "Practice listening and pronunciation of verses through interactive exercises.",
    totalQuestions: 10,
    completedQuestions: 6,
    accuracy: "85%",
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
    ] as QuestionType[],
  };

  const handleStartActivity = (questionTypeId: string) => {
    // Navigate to the specific question type
    console.log(`Starting activity ${questionTypeId}`);
  };

  const totalProgress = Math.round(
    (activity.completedQuestions / activity.totalQuestions) * 100
  );

  return (
    <div className="space-y-8 pb-16 pt-6">
      {/* Activity Header */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Activity Progress</h2>
              <Badge
                variant="outline"
                className="font-normal bg-neutral-100 text-neutral-700 "
              >
                {activity.completedQuestions}/{activity.totalQuestions}{" "}
                Questions Completed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">
                  Overall Progress
                </span>
                <span className="text-sm font-medium">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 border rounded-lg">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                  <CheckCircle className="h-5 w-5 text-indigo-700" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-600">
                    Accuracy
                  </p>
                  <p className="text-xl font-bold text-indigo-700">
                    {activity.accuracy}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 border rounded-lg">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                  <BookOpen className="h-5 w-5 text-indigo-700" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-600">
                    Questions
                  </p>
                  <p className="text-xl font-bold text-indigo-700">
                    {activity.totalQuestions}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 border rounded-lg">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                  <Trophy className="h-5 w-5 text-indigo-700" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-600">
                    Best Exercise
                  </p>
                  <p className="text-xl font-bold text-indigo-700">90%</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-600 pt-2">
              {activity.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Question type cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select Exercise Type</h2>
        <div className="grid gap-4">
          {activity.questionTypes.map(type => (
            <Link href={`/activities/${activityId}/${type.id}`} key={type.id}>
              <QuestionTypeCard
                icon={type.icon}
                title={type.title}
                description={type.description}
                totalQuestions={type.totalQuestions}
                completedQuestions={type.completedQuestions}
                accuracy={type.accuracy}
                onClick={() => handleStartActivity(type.id)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
