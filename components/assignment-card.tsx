import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, AlertCircle, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

export const ASSIGNMENT_STATUS = {
  completed: {
    badgeTitle: "Completed",
    colorVariant: "success",
  },
  "in-progress": {
    badgeTitle: "In Progress",
    colorVariant: "secondary",
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

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const statusConfig = ASSIGNMENT_STATUS[assignment.status];

  return (
    <div>
      <Card className="shadow transition-all duration-300 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">{assignment.title}</h3>
              <p className="text-neutral-600">{assignment.surah}</p>
            </div>
            <Badge variant={statusConfig.colorVariant}>
              {statusConfig.badgeTitle}
            </Badge>
          </div>

          <Progress value={assignment.progress} className="mb-4" />

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full w-8 h-8 bg-neutral-100 flex justify-center items-center">
                <Trophy className="h-4 w-4 text-yellow-500" />
              </div>

              <span className="text-sm text-neutral-600">
                {assignment.accuracy}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full w-8 h-8 bg-neutral-100 flex justify-center items-center">
                <AlertCircle className="h-4 w-4 text-neutral-500" />
              </div>
              <span className="text-sm text-neutral-600">
                {assignment.completed}/{assignment.activities} exercises
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full w-8 h-8 bg-neutral-100 flex justify-center items-center">
                <Calendar className="h-4 w-4 text-neutral-500" />
              </div>
              <span className="text-sm text-neutral-600">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              Progress: {assignment.progress}%
            </p>
            <Link href={"/assignments/1"}>
              <Button className="bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold">
                {assignment.status === "completed" ? "Review" : "Continue"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentCard;
