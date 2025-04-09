"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Mail,
  Calendar,
  Clock,
  User,
  Award,
  Activity,
  BookOpen,
  FileText,
  BarChart2,
  CheckCircle2,
  XCircle,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Edit,
  Headphones,
  BookText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for the student profile
const studentData = {
  id: "STD12345",
  name: "Abdullah Ahmed",
  username: "abdullah123",
  email: "abdullah@example.com",
  avatarUrl: "/path-to-avatar.jpg",
  createdAt: "2023-09-01",
  lastActive: "2025-03-08T14:32:00",
  groups: ["Advanced Quran Class", "Tajweed Special Group"],
  overallProgress: 68,
  timeSpent: 34.5, // hours
  learningStreak: 12, // days
  averageAccuracy: 75,
  strongestActivity: "Listening",
  weakestActivity: "Word Arrangement",
  assignments: {
    total: 24,
    completed: 18,
    pending: 6,
    onTime: 16,
    late: 2,
  },
};

// Mock data for progress chart
const progressHistory = [
  { month: "Oct", progress: 42 },
  { month: "Nov", progress: 48 },
  { month: "Dec", progress: 52 },
  { month: "Jan", progress: 58 },
  { month: "Feb", progress: 63 },
  { month: "Mar", progress: 68 },
];

// Mock data for surah progress
const surahProgress = [
  { id: 1, name: "Al-Fatiha", progress: 100, accuracy: 92, timeSpent: 2.4 },
  { id: 2, name: "Al-Baqarah", progress: 65, accuracy: 78, timeSpent: 18.6 },
  { id: 3, name: "Al-Imran", progress: 40, accuracy: 81, timeSpent: 8.2 },
  { id: 4, name: "An-Nisa", progress: 25, accuracy: 68, timeSpent: 5.3 },
];

// Mock data for recent assignments
const recentAssignments = [
  {
    id: "ASG001",
    title: "Al-Baqarah Verses 1-5",
    dueDate: "2025-03-05",
    status: "completed",
    submittedDate: "2025-03-04",
    score: 85,
    feedback: "Good work on pronunciation",
  },
  {
    id: "ASG002",
    title: "Al-Imran Listening Practice",
    dueDate: "2025-03-10",
    status: "completed",
    submittedDate: "2025-03-07",
    score: 92,
    feedback: "Excellent progress, very accurate",
  },
  {
    id: "ASG003",
    title: "An-Nisa Word Arrangement",
    dueDate: "2025-03-15",
    status: "pending",
    submittedDate: null,
    score: null,
    feedback: null,
  },
];

// Mock data for activity breakdown
const activityBreakdown = [
  { type: "Fill in Blanks", completed: 28, accuracy: 82 },
  { type: "Word Arrangement", completed: 22, accuracy: 64 },
  { type: "Verse Arrangement", completed: 18, accuracy: 79 },
];

// Mock comparative data
const comparativeData = {
  classAvgProgress: 61,
  classAvgAccuracy: 72,
  positionInClass: 3,
  totalStudents: 15,
};

// Mock teacher notes
const teacherNotes = [
  {
    id: 1,
    date: "2025-03-01",
    content:
      "Abdullah is showing excellent progress in listening activities. Should focus more on word arrangement exercises.",
  },
  {
    id: 2,
    date: "2025-02-15",
    content:
      "Discussed pronunciation challenges with long vowels. Recommended additional practice resources.",
  },
];

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Format relative time
  const formatRelativeTime = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${Math.floor(diffHours)} hours ago`;

    const diffDays = diffHours / 24;
    if (diffDays < 2) return "Yesterday";
    if (diffDays < 7) return `${Math.floor(diffDays)} days ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Calculate performance indicators
  const calculateTrend = (value, benchmark) => {
    const diff = value - benchmark;
    return {
      value: Math.abs(diff),
      direction: diff >= 0 ? "up" : "down",
      positive: diff >= 0,
    };
  };

  const progressTrend = calculateTrend(
    studentData.overallProgress,
    comparativeData.classAvgProgress
  );
  const accuracyTrend = calculateTrend(
    studentData.averageAccuracy,
    comparativeData.classAvgAccuracy
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back button and header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <Link
            href="/students"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Students
          </Link>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send Message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Student Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Assignment
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Student basic info card */}
      <Card className="mb-6 border border-neutral-300 rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20 border-2 border-indigo-100">
              <AvatarImage src={studentData.avatarUrl} alt={studentData.name} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl">
                {studentData.name
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{studentData.name}</h2>
                  <p className="text-neutral-600">
                    {studentData.username} • {studentData.id}
                  </p>
                </div>
                <Badge className="h-fit" variant="secondary">
                  Active Student
                </Badge>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-600">
                  <User className="h-4 w-4" />
                  <span>
                    Member since{" "}
                    {new Date(studentData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    Last active {formatRelativeTime(studentData.lastActive)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Mail className="h-4 w-4" />
                  <span>{studentData.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {studentData.groups.map((group, index) => (
                  <Badge key={index} variant="outline">
                    {group}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border border-neutral-300 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-neutral-600">Overall Progress</p>
                <div className="flex items-end gap-1">
                  <p className="text-2xl font-bold">
                    {studentData.overallProgress}%
                  </p>
                  <div
                    className={`flex items-center text-xs ${
                      progressTrend.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {progressTrend.positive ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    <span>{progressTrend.value}%</span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <BarChart2 className="h-5 w-5 text-indigo-700" />
              </div>
            </div>
            <Progress
              value={studentData.overallProgress}
              className="h-2 mt-4"
            />
            <p className="text-xs text-neutral-500 mt-2">
              Class average: {comparativeData.classAvgProgress}%
            </p>
          </CardContent>
        </Card>

        <Card className="border border-neutral-300 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-neutral-600">Average Accuracy</p>
                <div className="flex items-end gap-1">
                  <p className="text-2xl font-bold">
                    {studentData.averageAccuracy}%
                  </p>
                  <div
                    className={`flex items-center text-xs ${
                      accuracyTrend.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {accuracyTrend.positive ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    <span>{accuracyTrend.value}%</span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Award className="h-5 w-5 text-indigo-700" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Class Rank:</span>
                <span className="font-medium">
                  {comparativeData.positionInClass} of{" "}
                  {comparativeData.totalStudents}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Best Activity:</span>
                <span className="font-medium">
                  {studentData.strongestActivity}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-neutral-300 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-neutral-600">Time Spent Learning</p>
                <p className="text-2xl font-bold">
                  {studentData.timeSpent}
                  <span className="text-lg font-normal"> hrs</span>
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-indigo-700" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Learning Streak:</span>
                <span className="font-medium">
                  {studentData.learningStreak} days
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Session Avg:</span>
                <span className="font-medium">25 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-neutral-300 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-neutral-600">Assignments</p>
                <p className="text-2xl font-bold">
                  {studentData.assignments.completed}/
                  {studentData.assignments.total}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-indigo-700" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pending:</span>
                <span className="font-medium">
                  {studentData.assignments.pending}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Submission Rate:</span>
                <span className="font-medium">
                  {Math.round(
                    (studentData.assignments.onTime /
                      studentData.assignments.completed) *
                      100
                  )}
                  % on time
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for detailed information */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-neutral-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="notes">Notes & Feedback</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Chart */}
            <Card className="border border-neutral-300 rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Progress History</CardTitle>
                <CardDescription>6-month learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end justify-between gap-2">
                  {progressHistory.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-12 bg-indigo-600 rounded-t-sm transition-all"
                        style={{ height: `${item.progress * 1.6}px` }}
                      ></div>
                      <span className="text-xs">{item.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Breakdown */}
            <Card className="border border-neutral-300 rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Activity Breakdown</CardTitle>
                <CardDescription>Performance by exercise type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activityBreakdown.map((activity, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {activity.type}
                      </span>
                      <span className="text-sm text-neutral-600">
                        {activity.accuracy}% accuracy
                      </span>
                    </div>
                    <Progress value={activity.accuracy} className="h-2" />
                    <p className="text-xs text-neutral-500 mt-1">
                      {activity.completed} exercises completed
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Surah Progress */}
          <Card className="border border-neutral-300 rounded-xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Surah Progress</CardTitle>
              <CardDescription>
                Progress across different Surahs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {surahProgress.map(surah => (
                  <div
                    key={surah.id}
                    className="p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="font-semibold text-indigo-700">
                            {surah.id}
                          </span>
                        </div>
                        <h3 className="font-medium">{surah.name}</h3>
                      </div>
                      <Badge
                        variant={
                          surah.progress === 100 ? "success" : "secondary"
                        }
                      >
                        {surah.progress}% Complete
                      </Badge>
                    </div>
                    <Progress value={surah.progress} className="h-2 mb-3" />
                    <div className="flex flex-wrap gap-x-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span>{surah.accuracy}% accuracy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-neutral-500" />
                        <span>{surah.timeSpent} hrs spent</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab Content */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="border border-neutral-300 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <Headphones className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Listening Comprehension</p>
                    <p className="text-sm text-neutral-600">
                      Excellent at understanding audio recitations with 92%
                      accuracy
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Surah Al-Fatiha</p>
                    <p className="text-sm text-neutral-600">
                      Complete mastery demonstrated with perfect scores
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <Activity className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Assignment Completion</p>
                    <p className="text-sm text-neutral-600">
                      Consistently completes assignments before deadlines
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="border border-neutral-300 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <BookText className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Word Arrangement</p>
                    <p className="text-sm text-neutral-600">
                      Struggles with correct word order in verses (64% accuracy)
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <Activity className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Surah An-Nisa</p>
                    <p className="text-sm text-neutral-600">
                      Lower accuracy (68%) compared to other Surahs
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Practice Consistency</p>
                    <p className="text-sm text-neutral-600">
                      Irregular practice pattern with gaps between sessions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparative Performance */}
          <Card className="border border-neutral-300 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Class Comparison</CardTitle>
              <CardDescription>
                Student performance relative to class average
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium">Overall Progress</p>
                      <p className="text-sm text-neutral-600">
                        Student vs. Class Average
                      </p>
                    </div>
                    <div className="flex items-end gap-3">
                      <p className="text-xl font-bold text-indigo-700">
                        {studentData.overallProgress}%
                      </p>
                      <p className="text-neutral-600">vs</p>
                      <p className="text-neutral-600">
                        {comparativeData.classAvgProgress}%
                      </p>
                    </div>
                  </div>
                  <div className="relative h-8 bg-neutral-100 rounded-md">
                    <div
                      className="absolute left-0 top-0 h-full bg-indigo-600 rounded-l-md"
                      style={{ width: `${studentData.overallProgress}%` }}
                    ></div>
                    <div
                      className="absolute top-0 h-full w-px bg-neutral-400"
                      style={{ left: `${comparativeData.classAvgProgress}%` }}
                    ></div>
                    <div
                      className="absolute top-full mt-1 text-xs text-neutral-600"
                      style={{
                        left: `${comparativeData.classAvgProgress}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      Class Avg
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium">Accuracy</p>
                      <p className="text-sm text-neutral-600">
                        Student vs. Class Average
                      </p>
                    </div>
                    <div className="flex items-end gap-3">
                      <p className="text-xl font-bold text-indigo-700">
                        {studentData.averageAccuracy}%
                      </p>
                      <p className="text-neutral-600">vs</p>
                      <p className="text-neutral-600">
                        {comparativeData.classAvgAccuracy}%
                      </p>
                    </div>
                  </div>
                  <div className="relative h-8 bg-neutral-100 rounded-md">
                    <div
                      className="absolute left-0 top-0 h-full bg-indigo-600 rounded-l-md"
                      style={{ width: `${studentData.averageAccuracy}%` }}
                    ></div>
                    <div
                      className="absolute top-0 h-full w-px bg-neutral-400"
                      style={{ left: `${comparativeData.classAvgAccuracy}%` }}
                    ></div>
                    <div
                      className="absolute top-full mt-1 text-xs text-neutral-600"
                      style={{
                        left: `${comparativeData.classAvgAccuracy}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      Class Avg
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 pt-4 border-t border-neutral-200">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-700">
                      {comparativeData.positionInClass}
                    </p>
                    <p className="text-sm text-neutral-600">Rank in Class</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-700">
                      {studentData.learningStreak}
                    </p>
                    <p className="text-sm text-neutral-600">Day Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-700">+7%</p>
                    <p className="text-sm text-neutral-600">Monthly Growth</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab Content */}
        <TabsContent value="notes" className="space-y-6">
          <Card className="border border-neutral-300 rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Teacher Notes</CardTitle>
                <CardDescription>
                  Private notes and observations
                </CardDescription>
              </div>
              <Button>Add New Note</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherNotes.map(note => (
                  <div
                    key={note.id}
                    className="p-4 border border-neutral-200 rounded-lg"
                  >
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-neutral-500">
                        {new Date(note.date).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-neutral-700">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-neutral-300 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Learning Recommendations</CardTitle>
              <CardDescription>
                Suggested activities based on performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-neutral-200 rounded-lg bg-indigo-50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <BookText className="h-4 w-4 text-indigo-700" />
                    Word Arrangement Practice
                  </h3>
                  <p className="text-sm text-neutral-700 mb-3">
                    Based on performance data, Abdullah would benefit from
                    additional practice with word arrangement exercises,
                    particularly in Surah An-Nisa.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-indigo-700 hover:bg-indigo-800"
                    >
                      Assign Exercise
                    </Button>
                    <Button size="sm" variant="outline">
                      View Resources
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg bg-indigo-50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-indigo-700" />
                    Advanced Listening Challenge
                  </h3>
                  <p className="text-sm text-neutral-700 mb-3">
                    Abdullah excels in listening activities. Consider assigning
                    more advanced listening exercises to maintain engagement and
                    challenge.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-indigo-700 hover:bg-indigo-800"
                    >
                      Assign Exercise
                    </Button>
                    <Button size="sm" variant="outline">
                      View Resources
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments" className="space-y-6">
          <Card className="border border-neutral-300 rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>
                  Recent and pending assignments
                </CardDescription>
              </div>
              <Button>Assign New Task</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentAssignments.map(assignment => (
                  <div
                    key={assignment.id}
                    className={`p-4 border rounded-lg ${
                      assignment.status === "pending"
                        ? "border-yellow-300 bg-yellow-50"
                        : "border-neutral-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{assignment.title}</h3>
                          {assignment.status === "completed" ? (
                            <Badge variant="success">Completed</Badge>
                          ) : (
                            <Badge variant="warning">Pending</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Due:{" "}
                              {new Date(
                                assignment.dueDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {assignment.submittedDate && (
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <span>
                                Submitted:{" "}
                                {new Date(
                                  assignment.submittedDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {assignment.score && (
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-yellow-600" />
                              <span>Score: {assignment.score}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>

                    {assignment.feedback && (
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <p className="text-sm text-neutral-600">
                          <span className="font-medium">Feedback:</span>{" "}
                          {assignment.feedback}
                        </p>
                      </div>
                    )}

                    {assignment.status === "pending" && (
                      <div className="mt-3 flex justify-end">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button
                              variant="link"
                              className="text-xs text-indigo-600 p-0 h-auto"
                            >
                              Send reminder
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold">
                                Send Assignment Reminder
                              </h4>
                              <p className="text-xs text-neutral-600">
                                This will send an email notification to the
                                student reminding them about the upcoming
                                deadline.
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
