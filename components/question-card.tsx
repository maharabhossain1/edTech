// Type definitions for badge styles

import { BookOpen, Headphones, LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import QuestionStatusIndicator from "./question-status-indicator";

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
export type QuestionStatusType = "correct" | "incorrect" | "not-attempted";

// Interfaces with proper typing
export interface Question {
  id: number;
  type: QuestionType;
  title: string;
  status: QuestionStatusType;
  score?: number;
  activityType: ActivityType;
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

type QuestionCardProps = {
  question: Question;
  handleIsDoingMode: () => void;
};

const QuestionCard = ({ question, handleIsDoingMode }: QuestionCardProps) => {
  const getActivityIcon = (type: ActivityType): React.JSX.Element => {
    const icons: Record<ActivityType, LucideIcon> = {
      [ActivityType.LISTENING]: Headphones,
      [ActivityType.READING]: BookOpen,
    };
    const Icon = icons[type];
    return <Icon className="h-5 w-5 text-primary" />;
  };

  return (
    <Card className="hover:shadow-sm transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge className={QUESTION_TYPE_BADGES[question.type].color}>
                {QUESTION_TYPE_BADGES[question.type].label}
              </Badge>
              <div className="flex items-center gap-2 w-8 h-8 rounded-full bg-neutral-100 justify-center">
                {getActivityIcon(question.activityType)}
              </div>
              {question.score && (
                <span className="text-sm text-muted-foreground">
                  Score: {question.score}%
                </span>
              )}
            </div>
            <p className="font-medium">{question.title}</p>
          </div>
          <QuestionStatusIndicator
            question={question}
            handleIsDoingMode={handleIsDoingMode}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
