// AssignmentDetails.tsx
import {
  AlertCircle,
  BookOpen,
  Headphones,
  LucideIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

// Enums for better type safety
export enum QuestionType {
  FILL_BLANKS = "fill-blanks",
  WORD_ARRANGEMENT = "word-arrangement",
  VERSE_ARRANGEMENT = "verse-arrangement",
}

export enum ActivityType {
  LISTENING = "listening",
  READING = "reading",
}

// Using type instead of enum to avoid naming conflicts
export type QuestionStatusType = "correct" | "incorrect";

// Interfaces with proper typing
export interface Question {
  id: number;
  type: QuestionType;
  title: string;
  status: QuestionStatusType;
  score: number;
  activityType: ActivityType;
}

export interface CompletedAssignment {
  id: number;
  title: string;
  surah: string;
  completionDate: string;
  accuracy: string;
  teacherInstructions: string;
  questions: Question[];
  totalQuestions: number;
}

interface QuestionTypeBadgeStyle {
  label: string;
  color: string;
}

type QuestionTypeBadgeStyles = {
  [key in QuestionType]: QuestionTypeBadgeStyle;
};

const QUESTION_TYPE_BADGES: QuestionTypeBadgeStyles = {
  [QuestionType.FILL_BLANKS]: {
    label: "Fill in Blanks",
    color: "bg-blue-100 text-blue-800",
  },
  [QuestionType.WORD_ARRANGEMENT]: {
    label: "Word Arrangement",
    color: "bg-purple-100 text-purple-800",
  },
  [QuestionType.VERSE_ARRANGEMENT]: {
    label: "Verse Arrangement",
    color: "bg-green-100 text-green-800",
  },
};

export default function AssignmentDetails({
  assignmentData,
}: {
  assignmentData: CompletedAssignment;
}) {
  // Get total correct questions
  const correctQuestions = assignmentData.questions.filter(
    q => q.status === "correct"
  ).length;

  const getActivityIcon = (type: ActivityType): React.JSX.Element => {
    const icons: Record<ActivityType, LucideIcon> = {
      [ActivityType.LISTENING]: Headphones,
      [ActivityType.READING]: BookOpen,
    };
    const Icon = icons[type];
    return <Icon className="h-5 w-5 text-primary" />;
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{assignmentData.title}</h1>
              <p className="text-muted-foreground">{assignmentData.surah}</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Completed</Badge>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              {/* Summary Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 border border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                    <CheckCircle className="h-5 w-5 text-indigo-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-indigo-800">
                      Accuracy
                    </p>
                    <p className="text-xl font-bold text-indigo-700">
                      {assignmentData.accuracy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 border border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                    <CheckCircle className="h-5 w-5 text-indigo-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-indigo-800">
                      Questions
                    </p>
                    <p className="text-xl font-bold text-indigo-700">
                      {correctQuestions}/{assignmentData.totalQuestions} correct
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 border border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                    <CheckCircle className="h-5 w-5 text-indigo-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-indigo-800">
                      Completed
                    </p>
                    <p className="text-xl font-bold text-indigo-700">
                      {new Date(
                        assignmentData.completionDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end pt-4 border-t">
                <div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Teacher Instructions</p>
                      <p className="text-sm text-muted-foreground">
                        {assignmentData.teacherInstructions}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Link href="/assignments">
                    <Button className="bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold text-white">
                      Back to Assignments
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Questions</h2>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y">
                {assignmentData.questions.map(question => (
                  <div key={question.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              QUESTION_TYPE_BADGES[question.type].color
                            }
                          >
                            {QUESTION_TYPE_BADGES[question.type].label}
                          </Badge>
                          <div className="flex items-center gap-2 w-8 h-8 rounded-full bg-neutral-100 justify-center">
                            {getActivityIcon(question.activityType)}
                          </div>
                        </div>
                        <p className="font-medium">{question.title}</p>
                      </div>
                      <div>
                        {question.status === "correct" ? (
                          <Badge className="bg-green-100 text-green-800 flex gap-1 items-center">
                            <CheckCircle className="h-4 w-4" />
                            Correct
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 flex gap-1 items-center">
                            <XCircle className="h-4 w-4" />
                            Incorrect
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
