import type { Metadata } from "next";
import {
  BookOpen,
  Activity,
  FileText,
  Clock,
  ArrowRight,
  Calendar,
  Headphones,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Quran Learning Dashboard",
};

// Activity type definitions to match your updated structure
type ActivityType = "listening" | "reading";

interface RecentActivity {
  id: string;
  title: string;
  activityType: ActivityType;
  description: string;
  accuracy: string;
  date: string;
}

interface Assignment {
  id: number;
  title: string;
  surah: string;
  dueDate: string;
  activities: number;
  completed: number;
  status: "completed" | "in-progress" | "not-started" | "overdue";
}

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
                <div key={index}>
                  <div className="flex space-x-4 p-4 rounded-lg border border-neutral-200">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                      {activity.activityType === "listening" ? (
                        <Headphones className="h-5 w-5 text-indigo-700" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-indigo-700" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.title}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Trophy className="h-4 w-4 text-indigo-600" />
                            <span className="text-indigo-600">
                              {activity.accuracy}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-600">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-neutral-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span> {activity.date}</span>
                        </div>
                        <div className="flex justify-end">
                          <Link
                            href={`/activities/${activity.id}`}
                            className="mt-4"
                          >
                            <Button variant="outline" size="sm">
                              Continue
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/activities">View All Activities</Link>
                </Button>
              </div>
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
                  className="p-4 rounded-lg border border-neutral-200"
                  key={index}
                >
                  <div className="">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-neutral-600">
                          {assignment.surah}
                        </p>
                      </div>
                      <StatusBadge status={assignment.status} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-sm text-neutral-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{assignment.dueDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-neutral-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{assignment.activities} exercises</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href={`/assignments/${assignment.id}`}
                          className="mt-4"
                        >
                          <Button variant="outline" size="sm">
                            Continue
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/assignments">View All Assignments</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }) => {
  switch (status) {
    case "in-progress":
      return <Badge variant="secondary">In Progress</Badge>;
    case "not-started":
      return <Badge variant="outline">Not Started</Badge>;
    case "overdue":
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return null;
  }
};

// Updated recent activities to match your new data structure
const recentActivities: RecentActivity[] = [
  {
    id: "fatiha-listening",
    title: "Surah Al-Fatiha Recitation",
    activityType: "listening",
    description: "Practiced listening and pronunciation of verses",
    accuracy: "85%",
    date: "Today",
  },
  {
    id: "arabic-script",
    title: "Arabic Script Mastery",
    activityType: "reading",
    description: "Completed handwriting practice exercise",
    accuracy: "92%",
    date: "Yesterday",
  },
  {
    id: "tajweed-rules",
    title: "Tajweed Rules Practice",
    activityType: "listening",
    description: "Learned pronunciation rules through audio examples",
    accuracy: "78%",
    date: "2 days ago",
  },
];

// Updated upcoming assignments to match your new data structure
const upcomingAssignments: Assignment[] = [
  {
    id: 1,
    title: "Word Pronunciation Practice",
    surah: "Surah Al-Fatiha",
    dueDate: "Tomorrow",
    activities: 10,
    completed: 6,
    status: "in-progress",
  },
  {
    id: 2,
    title: "Verse Arrangement Exercise",
    surah: "Surah Al-Baqarah",
    dueDate: "In 3 days",
    activities: 8,
    completed: 2,
    status: "not-started",
  },
  {
    id: 4,
    title: "Memorization Challenge",
    surah: "Surah An-Nisa",
    dueDate: "Yesterday",
    activities: 20,
    completed: 10,
    status: "overdue",
  },
];
