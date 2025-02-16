import type { Metadata } from "next";
import {
  BookOpen,
  Activity,
  FileText,
  Clock,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Quran Learning Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 max-w-7xl mx-auto">
      {/* Header with Main Progress */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          Welcome to Your Learning Journey
        </h2>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Last Surah</CardTitle>
            <BookOpen className="h-5 w-5 text-neutral-700" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-semibold">Al-Baqarah</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Verse 75 of 286
                </span>
                <Button variant="secondary" size="sm">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Activity Score
            </CardTitle>
            <Activity className="h-5 w-5 text-neutral-700" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold">85%</div>
                <Badge variant="secondary">+5% this week</Badge>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Pending Tasks
            </CardTitle>
            <FileText className="h-5 w-5 text-neutral-700" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold">3</div>
                <Badge variant="secondary">Due soon</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                2 assignments due this week
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Assignments */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Recent Activities
              </CardTitle>
              <Badge variant="secondary">Last 7 days</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-lg border border-neutral-200"
                >
                  <div className="mr-4 p-2 rounded-full bg-neutral-100  dark:bg-gray-800">
                    {activityIcons[activity.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.name}</p>
                      <ActivityBadge type={activity.type} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Due Assignments
              </CardTitle>
              <Badge variant="secondary">
                {upcomingAssignments.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-neutral-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{assignment.name}</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{assignment.dueDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{assignment.type}</span>
                        </div>
                      </div>
                    </div>
                    <DueBadge date={assignment.dueDate} />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Progress
                      value={assignment.progress}
                      className="w-2/3 h-2"
                    />
                    <Button variant="outline" size="sm">
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const ActivityBadge = ({ type }) => {
  const variants = {
    reading: "secondary",
    listening: "secondary",
    assignment: "secondary",
  };
  const labels = {
    reading: "Reading",
    listening: "Listening",
    assignment: "Assignment",
  };
  return (
    <Badge variant={variants[type]} className="text-xs">
      {labels[type]}
    </Badge>
  );
};

const DueBadge = ({ date }) => {
  if (date === "Tomorrow") {
    return (
      <Badge
        variant="destructive"
        // className="text-xs bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
      >
        Due Tomorrow
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs">
      Upcoming
    </Badge>
  );
};

const recentActivities = [
  {
    type: "reading",
    name: "Reading Activity",
    description: "Completed Surah Al-Baqarah, Verses 1-5",
  },
  {
    type: "listening",
    name: "Listening Quiz",
    description: "Scored 85%",
  },
  {
    type: "assignment",
    name: "Vocabulary Exercise",
    description: "Submitted",
  },
];

const activityIcons = {
  reading: <BookOpen className="h-4 w-4 text-neutral-700" />,
  listening: <Activity className="h-4 w-4 text-neutral-700" />,
  assignment: <FileText className="h-4 w-4 text-neutral-700" />,
};

const upcomingAssignments = [
  {
    name: "Surah Al-Baqarah Quiz",
    dueDate: "Tomorrow",
    type: "Quiz",
    progress: 75,
  },
  {
    name: "Listening Comprehension",
    dueDate: "In 3 days",
    type: "Exercise",
    progress: 30,
  },
  {
    name: "Verse Memorization",
    dueDate: "Next week",
    type: "Practice",
    progress: 0,
  },
];
