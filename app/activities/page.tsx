"use client";
import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Headphones, BookOpen, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Quiz from "@/components/assignment-question";
import { dummyQuestions } from "@/data/quiz";

type ActivityType = "listening" | "reading";
type ActivityStatus = "not-started" | "in-progress" | "completed";

interface Activity {
  id: string;
  surahName: string;
  surahNumber: number;
  activityType: ActivityType;
  description: string;
  totalExercises: number;
  status: ActivityStatus;
}

const activities: Activity[] = [
  {
    id: "al-fatiha-reading",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    activityType: "reading",
    description: "Learn to read and understand Surah Al-Fatiha",
    totalExercises: 7,
    status: "completed",
  },
  {
    id: "al-fatiha-listening",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    activityType: "listening",
    description: "Practice listening and pronunciation of Surah Al-Fatiha",
    totalExercises: 7,
    status: "completed",
  },
  {
    id: "al-baqarah-reading",
    surahName: "Al-Baqarah",
    surahNumber: 2,
    activityType: "reading",
    description: "Learn to read and understand Surah Al-Baqarah",
    totalExercises: 10,
    status: "not-started",
  },
  {
    id: "al-baqarah-listening",
    surahName: "Al-Baqarah",
    surahNumber: 2,
    activityType: "listening",
    description: "Practice listening and tajweed of Surah Al-Baqarah",
    totalExercises: 10,
    status: "in-progress",
  },
  {
    id: "al-imran-reading",
    surahName: "Al-Imran",
    surahNumber: 3,
    activityType: "reading",
    description: "Learn to read and understand Surah Al-Imran",
    totalExercises: 8,
    status: "not-started",
  },
  {
    id: "al-imran-listening",
    surahName: "Al-Imran",
    surahNumber: 3,
    activityType: "listening",
    description: "Practice listening and tajweed of Surah Al-Imran",
    totalExercises: 8,
    status: "not-started",
  },
  {
    id: "an-nisa-reading",
    surahName: "An-Nisa",
    surahNumber: 4,
    activityType: "reading",
    description: "Learn to read and understand Surah An-Nisa",
    totalExercises: 12,
    status: "not-started",
  },
  {
    id: "an-nisa-listening",
    surahName: "An-Nisa",
    surahNumber: 4,
    activityType: "listening",
    description: "Practice listening and tajweed of Surah An-Nisa",
    totalExercises: 12,
    status: "not-started",
  },
];

// Get appropriate status badge based on activity status
const getStatusBadge = (status: ActivityStatus) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case "in-progress":
      return <Badge className="bg-blue-50 text-blue-600">In Progress</Badge>;
    case "not-started":
      return <Badge className="bg-gray-100 text-gray-600">Not Started</Badge>;
    default:
      return null;
  }
};

// Group activities by Surah
const groupBySurah = (activities: Activity[]) => {
  const grouped = new Map<
    string,
    {
      surahName: string;
      surahNumber: number;
      reading?: Activity;
      listening?: Activity;
    }
  >();

  activities.forEach(activity => {
    const key = activity.surahName;
    if (!grouped.has(key)) {
      grouped.set(key, {
        surahName: activity.surahName,
        surahNumber: activity.surahNumber,
      });
    }

    const group = grouped.get(key)!;
    if (activity.activityType === "reading") {
      group.reading = activity;
    } else {
      group.listening = activity;
    }
  });

  return Array.from(grouped.values()).sort(
    (a, b) => a.surahNumber - b.surahNumber
  );
};

// Component for displaying a specific activity (for reading or listening tabs)
interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <div className="h-auto rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              Surah {activity.surahName}
            </h3>
            {getStatusBadge(activity.status)}
          </div>
          <p className="text-neutral-600 text-sm mt-2">
            {activity.description}
          </p>
        </div>
        <div className="flex items-center justify-center">
          {activity.activityType === "listening" ? (
            <Headphones className="h-5 w-5 text-indigo-700" />
          ) : (
            <BookOpen className="h-5 w-5 text-indigo-700" />
          )}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="pt-2 border-t border-neutral-100">
          <Badge
            variant="secondary"
            className="bg-neutral-100 text-neutral-700 font-normal"
          >
            10 exercises
          </Badge>
        </div>
      </div>
    </div>
  );
};

// Component for the "All" tab that aggregates reading and listening
interface SurahCardProps {
  surah: {
    surahName: string;
    surahNumber: number;
    reading?: Activity;
    listening?: Activity;
  };
}

const SurahCard = ({ surah }: SurahCardProps) => {
  // Calculate overall progress for the surah
  const getOverallStatus = () => {
    let completedCount = 0;
    let startedCount = 0;
    let totalCount = 0;

    if (surah.reading) {
      totalCount++;
      if (surah.reading.status === "completed") completedCount++;
      if (surah.reading.status === "in-progress") startedCount++;
    }

    if (surah.listening) {
      totalCount++;
      if (surah.listening.status === "completed") completedCount++;
      if (surah.listening.status === "in-progress") startedCount++;
    }

    if (completedCount === totalCount && totalCount > 0) {
      return "completed";
    } else if (completedCount > 0 || startedCount > 0) {
      return "in-progress";
    } else {
      return "not-started";
    }
  };

  const calculateProgress = () => {
    let completedCount = 0;
    let totalCount = 0;

    if (surah.reading) {
      totalCount++;
      if (surah.reading.status === "completed") completedCount++;
      else if (surah.reading.status === "in-progress") completedCount += 0.5;
    }

    if (surah.listening) {
      totalCount++;
      if (surah.listening.status === "completed") completedCount++;
      else if (surah.listening.status === "in-progress") completedCount += 0.5;
    }

    return totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  };

  const status = getOverallStatus();
  const progress = calculateProgress();

  return (
    <div className="h-auto rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              Surah {surah.surahName}
            </h3>
            {getStatusBadge(status as ActivityStatus)}
          </div>
          <p className="text-neutral-600 text-sm mt-2">
            Master reading and listening exercises for Surah {surah.surahName}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Book className="h-5 w-5 text-indigo-700" />
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Overall Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-neutral-100" />
        </div>

        <div className="pt-2 border-t border-neutral-100">
          <Badge
            variant="secondary"
            className="bg-neutral-100 text-neutral-700 font-normal"
          >
            10 exercises
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default function ActivitiesPage() {
  const [activityType, setActivityType] = useState<"all" | ActivityType>("all");
  const [isDoing, setDoing] = useState(false);

  const handleIsDoingMode = () => {
    setDoing(!isDoing);
  };

  const handleActivityTypeChange = (value: string) => {
    setActivityType(value as "all" | ActivityType);
  };

  // Group activities by Surah for the "all" tab or filter for specific tabs
  const renderActivities = () => {
    if (activityType === "all") {
      const groupedActivities = groupBySurah(activities);

      return (
        <>
          {groupedActivities.length > 0 ? (
            groupedActivities.map(surah => (
              <div
                onClick={handleIsDoingMode}
                key={surah.surahName}
                className="cursor-pointer"
              >
                <SurahCard surah={surah} />
              </div>
            ))
          ) : (
            <div className="col-span-3 p-8 text-center text-neutral-500 bg-neutral-50 rounded-lg">
              No Surahs found.
            </div>
          )}
        </>
      );
    } else {
      // For reading or listening tabs
      const specificActivities = activities
        .filter(activity => activity.activityType === activityType)
        .sort((a, b) => a.surahNumber - b.surahNumber);

      return (
        <>
          {specificActivities.length > 0 ? (
            specificActivities.map(activity => (
              <div
                onClick={handleIsDoingMode}
                key={activity.id}
                className="cursor-pointer"
              >
                <ActivityCard activity={activity} />
              </div>
            ))
          ) : (
            <div className="col-span-3 p-8 text-center text-neutral-500 bg-neutral-50 rounded-lg">
              No {activityType} activities found.
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      {isDoing ? (
        <Quiz
          handleIsDoingMode={handleIsDoingMode}
          questions={dummyQuestions}
        />
      ) : (
        <div className="space-y-6 pb-16">
          <div>
            <h1 className="text-3xl font-semibold">Surah Activities</h1>
            <p className="mt-1 text-neutral-600">
              Enhance your Quran learning through Surah-based exercises
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Tabs
              value={activityType}
              onValueChange={handleActivityTypeChange}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full sm:w-[300px] grid-cols-3 p-1">
                <TabsTrigger value="all" className="rounded-md">
                  All
                </TabsTrigger>
                <TabsTrigger value="listening" className="rounded-md">
                  Listening
                </TabsTrigger>
                <TabsTrigger value="reading" className="rounded-md">
                  Reading
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderActivities()}
          </div>
        </div>
      )}
    </>
  );
}
