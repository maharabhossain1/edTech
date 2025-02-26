import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

export const ASSIGNMENT_STATUS = {
  completed: {
    badgeTitle: "Completed",
    colorVariant: "success",
  },
  "not-started": {
    badgeTitle: "Not Started",
    colorVariant: "outline",
  },
  overdue: {
    badgeTitle: "Overdue",
    colorVariant: "destructive",
  },
} as const;

export type AssignmentStatus = keyof typeof ASSIGNMENT_STATUS;
export type BadgeVariant =
  (typeof ASSIGNMENT_STATUS)[AssignmentStatus]["colorVariant"];

export interface Assignment {
  id: number;
  title: string;
  surah: string;
  status: AssignmentStatus;
  progress: number;
  accuracy: string;
  activities: number;
  completed: number;
  dueDate: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  handleIsDoingMode,
}) => {
  const statusConfig = ASSIGNMENT_STATUS[assignment.status];
  const isCompleted = assignment.status === "completed";

  return (
    <Card className="shadow-sm border hover:shadow-md transition-all duration-300 rounded-2xl h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1 line-clamp-1">
              {assignment.title}
            </h3>
            <p className="text-neutral-600 line-clamp-1">{assignment.surah}</p>
          </div>
          <Badge
            variant={statusConfig.colorVariant}
            className="ml-2 whitespace-nowrap"
          >
            {statusConfig.badgeTitle}
          </Badge>
        </div>

        <div className="flex-1 mb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full w-8 h-8 bg-neutral-100 flex justify-center items-center">
                <Calendar className="h-4 w-4 text-neutral-500" />
              </div>
              <span className="text-sm text-neutral-600">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2">
                <div className="rounded-full w-8 h-8 bg-neutral-100 flex justify-center items-center">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>
                <span className="text-sm text-neutral-600">
                  {assignment.accuracy} accuracy
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-100">
          {isCompleted ? (
            <p className="text-sm text-neutral-500">
              {assignment.activities} exercises
            </p>
          ) : (
            <p className="text-sm text-neutral-500">Ready to start</p>
          )}

          {isCompleted ? (
            <Link href={`/assignments/${assignment.id}`}>
              <Button className="bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold px-4 py-2">
                {"Review"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleIsDoingMode}
              className="bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold px-4 py-2"
            >
              {"Start"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
