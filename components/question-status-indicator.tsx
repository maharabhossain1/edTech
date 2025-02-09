import { CheckCircle2, Play, XCircle } from "lucide-react";
import { Question } from "./question-card";
import { Button } from "./ui/button";

const STATUS_BADGES = {
  correct: {
    icon: CheckCircle2,
    text: "Completed",
    className: "bg-green-50 text-green-600",
  },
  incorrect: {
    icon: XCircle,
    text: "Incorrect",
    className: "bg-red-50 text-red-600",
  },
  "not-attempted": {
    icon: Play,
    text: "Not Started",
    className: "bg-gray-50 text-gray-600",
  },
} as const;

type QuestionStatusIndicatorProps = {
  question: Question;
  handleIsDoingMode: () => void;
};

const QuestionStatusIndicator = ({
  question,
  handleIsDoingMode,
}: QuestionStatusIndicatorProps) => {
  // For completed or incorrect attempts, show badge
  if (question.status === "correct" || question.status === "incorrect") {
    const config = STATUS_BADGES[question.status];
    const StatusIcon = config.icon;
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.className}`}
      >
        <StatusIcon className="h-5 w-5" />
        <span className="text-sm font-medium">{config.text}</span>
      </div>
    );
  }

  // For not-attempted questions, show start button
  return (
    <Button
      onClick={handleIsDoingMode}
      variant="outline"
      size="sm"
      className="rounded-full"
    >
      <Play className="h-4 w-4 mr-1" />
      Start
    </Button>
  );
};

export default QuestionStatusIndicator;
