"use client";
import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Headphones, BookOpen, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type ActivityType = "listening" | "reading";
type ActivityStatus = "not-started" | "in-progress" | "completed";

interface Activity {
  id: string;
  title: string;
  activityType: ActivityType;
  description: string;
  totalExercises: number;
  completedExercises: number;
  accuracy: string;
  status: ActivityStatus;
}

const activities: Activity[] = [
  {
    id: "fatiha-listening",
    title: "Surah Al-Fatiha Recitation",
    activityType: "listening",
    description: "Practice listening and pronunciation of verses",
    totalExercises: 10,
    completedExercises: 7,
    accuracy: "85%",
    status: "in-progress",
  },
  {
    id: "fatiha-reading",
    title: "Quranic Vocabulary Basics",
    activityType: "reading",
    description: "Learn to read and understand common Quranic terms",
    totalExercises: 8,
    completedExercises: 8,
    accuracy: "92%",
    status: "completed",
  },
  {
    id: "baqarah-listening",
    title: "Tajweed Rules Practice",
    activityType: "listening",
    description: "Master pronunciation rules through audio examples",
    totalExercises: 15,
    completedExercises: 3,
    accuracy: "78%",
    status: "in-progress",
  },
  {
    id: "baqarah-reading",
    title: "Surah Al-Baqarah Stories",
    activityType: "reading",
    description: "Explore the narratives and lessons in Surah Al-Baqarah",
    totalExercises: 12,
    completedExercises: 0,
    accuracy: "0%",
    status: "not-started",
  },
  {
    id: "dua-collection",
    title: "Essential Daily Duas",
    activityType: "listening",
    description: "Learn and practice everyday supplications",
    totalExercises: 8,
    completedExercises: 5,
    accuracy: "90%",
    status: "in-progress",
  },
  {
    id: "arabic-script",
    title: "Arabic Script Mastery",
    activityType: "reading",
    description: "Improve your Arabic handwriting and recognition skills",
    totalExercises: 10,
    completedExercises: 10,
    accuracy: "95%",
    status: "completed",
  },
];

const getStatusBadge = (status: ActivityStatus) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case "in-progress":
      return <Badge variant="secondary">In Progress</Badge>;
    case "not-started":
      return <Badge variant="outline">Not Started</Badge>;
    default:
      return null;
  }
};

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const progress = Math.round(
    (activity.completedExercises / activity.totalExercises) * 100
  );

  return (
    <Link href={`/activities/${activity.id}`}>
      <div className="h-auto rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-neutral-900">
                {activity.title}
              </h3>
            </div>
            <p className="text-neutral-600 text-sm">{activity.description}</p>
          </div>
          <div className="flex items-center gap-2 w-8 h-8 rounded-full bg-indigo-50 justify-center">
            {activity.activityType === "listening" ? (
              <Headphones className="h-4 w-4 text-indigo-700" />
            ) : (
              <BookOpen className="h-4 w-4 text-indigo-700" />
            )}
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">Progress</span>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {activity.status !== "not-started" && (
                <>
                  <CheckCircle className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-indigo-600 font-medium">
                    {activity.accuracy} accuracy
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(activity.status)}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <Badge
              variant="secondary"
              className="bg-neutral-100 text-neutral-700 font-normal"
            >
              {activity.completedExercises}/{activity.totalExercises} exercises
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function ActivitiesPage() {
  const [activityType, setActivityType] = useState<"all" | ActivityType>("all");

  const handleActivityTypeChange = (value: string) => {
    setActivityType(value as "all" | ActivityType);
  };

  const filteredActivities = activities.filter(activity => {
    const typeMatch =
      activityType === "all" || activity.activityType === activityType;
    return typeMatch;
  });

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-3xl font-semibold">Activities</h1>
        <p className="mt-1 text-neutral-600">
          Enhance your Quran learning through interactive exercises
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Tabs
          value={activityType}
          onValueChange={handleActivityTypeChange}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full sm:w-[300px] grid-cols-3 p-1 bg-neutral-100">
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
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="col-span-3 p-8 text-center text-neutral-500 bg-neutral-50 rounded-lg">
            No activities found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
