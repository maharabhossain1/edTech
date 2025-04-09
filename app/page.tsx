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
  Bookmark,
  Heart,
  Quote,
  Star,
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

interface Assignment {
  id: number;
  title: string;
  surah: string;
  dueDate: string;
  activities: number;
  completed: number;
  status: "completed" | "in-progress" | "not-started" | "overdue";
}

interface DailyReflection {
  id: string;
  date: string;
  surah: string;
  verse: string;
  arabicText: string;
  translation: string;
  reflection: string;
  theme: string;
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

      {/* Daily Reflection and Assignments */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Daily Reflection
              </CardTitle>
              <Badge variant="secondary">Today's Wisdom</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 flex flex-col">
              <div className="flex-grow p-4 rounded-lg border border-neutral-200 bg-gradient-to-br from-indigo-50 to-white">
                <div className="flex justify-end mb-2">
                  <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                    <Star className="h-3 w-3 mr-1" />
                    Patience & Perseverance
                  </Badge>
                </div>

                <div className="mb-4 flex gap-2 items-center">
                  <BookOpen className="h-4 w-4 text-indigo-700" />
                  <span className="text-sm font-medium text-indigo-800">
                    Surah Al-Baqarah, Verse 153
                  </span>
                </div>

                <div className="mb-4 text-right font-arabic text-xl leading-loose text-neutral-800">
                  يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ
                  وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ
                </div>

                <div className="mb-4 italic text-neutral-700 border-l-4 border-indigo-300 pl-3 py-1">
                  "O you who have believed, seek help through patience and
                  prayer. Indeed, Allah is with the patient."
                </div>

                <div className="text-neutral-600 text-sm">
                  <Quote className="h-4 w-4 text-indigo-400 inline mr-2" />
                  <span>
                    In today's reflection, we're reminded of the importance of
                    patience and prayer during difficult times. The verse
                    teaches us that when faced with challenges, we should turn
                    to these two powerful tools. Patience helps us maintain
                    composure and perspective, while prayer connects us to our
                    Creator for guidance and strength. This verse assures us
                    that Allah is with those who practice patience, offering
                    comfort and encouragement to persevere through hardship with
                    faith and resilience.
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/reflections">View Previous Reflections</Link>
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

// Daily Reflection data
const dailyReflection: DailyReflection = {
  id: "reflection-1",
  date: "Today",
  surah: "Al-Baqarah",
  verse: "153",
  arabicText:
    "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
  translation:
    "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
  reflection:
    "In today's reflection, we're reminded of the importance of patience and prayer during difficult times. The verse teaches us that when faced with challenges, we should turn to these two powerful tools. Patience helps us maintain composure and perspective, while prayer connects us to our Creator for guidance and strength. This verse assures us that Allah is with those who practice patience, offering comfort and encouragement to persevere through hardship with faith and resilience.",
  theme: "Patience & Perseverance",
};

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
