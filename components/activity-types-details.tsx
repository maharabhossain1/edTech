import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import QuestionCard from "@/components/question-card";
import { QuestionType, ActivityType } from "@/components/question-card";
import { Button } from "./ui/button";

type ProgressSectionProps = {
  progress: number;
  completedQuestions: number;
  totalQuestions: number;
  accuracy: number;
};

const ProgressSection = ({
  progress,
  completedQuestions,
  totalQuestions,
  accuracy,
}: ProgressSectionProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Progress</p>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="w-48" />
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">
          Questions Completed
        </p>
        <p className="font-medium">
          {completedQuestions} / {totalQuestions}
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
        <div className="flex items-center gap-2">
          <div className="rounded-full w-8 h-8 bg-neutral-100 flex justify-center items-center">
            <Trophy className="h-4 w-4 text-yellow-500" />
          </div>
          <span className="text-sm text-neutral-600">{accuracy}%</span>
        </div>
      </div>
    </div>
  );
};

// Instead of accepting handleIsDoingMode as a prop, we'll use a URL parameter
export default function ActivityQuestions({
  activityId,
  handleIsDoingMode,
}: {
  activityId: string;
  handleIsDoingMode: () => void;
}) {
  // Mock data
  const activityData = {
    id: activityId,
    title: "Surah Al-Fatiha",
    type: ActivityType.LISTENING,
    description: "Practice listening and pronunciation of verses",
    progress: 40,
    completedQuestions: 2,
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        type: QuestionType.FILL_BLANKS,
        title: "Complete the Verse: بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        status: "correct" as const,
        activityType: ActivityType.LISTENING,
      },
      {
        id: 2,
        type: QuestionType.FILL_BLANKS,
        title: "Complete the Verse: ٱلْحَمْدُ لِلَّٰهِ رَبِّ ٱلْعَٰلَمِينَ",
        status: "correct" as const,
        activityType: ActivityType.LISTENING,
      },
      {
        id: 3,
        type: QuestionType.FILL_BLANKS,
        title: "Complete the Verse: ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        status: "not-attempted" as const,
        activityType: ActivityType.LISTENING,
      },
      {
        id: 4,
        type: QuestionType.FILL_BLANKS,
        title: "Complete the Verse: مَٰلِكِ يَوْمِ ٱلدِّينِ",
        status: "not-attempted" as const,
        activityType: ActivityType.LISTENING,
      },
      {
        id: 5,
        type: QuestionType.FILL_BLANKS,
        title: "Complete the Verse: إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        status: "not-attempted" as const,
        activityType: ActivityType.LISTENING,
      },
    ],
  };

  return (
    <div className="space-y-8 pb-16 pt-6">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <ProgressSection
              progress={activityData.progress}
              completedQuestions={activityData.completedQuestions}
              totalQuestions={activityData.totalQuestions}
              accuracy={80}
            />
            <div className="text-right">
              <Button
                onClick={handleIsDoingMode}
                className="bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold text-white"
              >
                Continue Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Questions</h2>
        <div className="space-y-4">
          {activityData.questions.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              handleIsDoingMode={handleIsDoingMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
