import { Progress } from "./ui/progress";

type ProgressSectionProps = {
  progress: number;
  completedQuestions: number;
  totalQuestions: number;
  dueDate: string;
};

const ProgressSection = ({
  progress,
  completedQuestions,
  totalQuestions,
  dueDate,
}: ProgressSectionProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Progress</p>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="w-[200px]" />
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
        <p className="text-sm text-muted-foreground mb-1">Due Date</p>
        <p className="font-medium">{dueDate}</p>
      </div>
    </div>
  );
};

export default ProgressSection;
