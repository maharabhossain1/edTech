"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Headphones,
  BookOpen,
  Trophy,
  Check,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const surahs = [
  { value: "al-fatiha", label: "Al-Fatiha" },
  { value: "al-baqarah", label: "Al-Baqarah" },
  { value: "al-imran", label: "Al-Imran" },
];

const activities = [
  {
    id: 1,
    type: "listening",
    surah: "al-fatiha",
    surahName: "Al-Fatiha",
    title: "Word Pronunciation",
    description: "Practice pronouncing individual words",
    progress: 65,
    timeSpent: "45m",
    accuracy: 80,
    totalExercises: 10,
  },
  {
    id: 2,
    type: "reading",
    surah: "al-baqarah",
    surahName: "Al-Baqarah",
    title: "Verse Arrangement",
    description: "Arrange verses in correct order",
    progress: 30,
    timeSpent: "20m",
    accuracy: 75,
    totalExercises: 8,
  },
  {
    id: 3,
    type: "listening",
    surah: "al-imran",
    surahName: "Al-Imran",
    title: "Tajweed Rules",
    description: "Learn and practice Tajweed rules",
    progress: 50,
    timeSpent: "30m",
    accuracy: 85,
    totalExercises: 12,
  },
  {
    id: 4,
    type: "reading",
    surah: "al-fatiha",
    surahName: "Al-Fatiha",
    title: "Memorization",
    description: "Memorize verses with spaced repetition",
    progress: 80,
    timeSpent: "1h",
    accuracy: 90,
    totalExercises: 15,
  },
];

const ActivityCard = ({ activity }) => (
  <div>
    <Card className="hover:shadow-md transition-all duration-300 group rounded-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              {activity.title}
            </CardTitle>
            <CardDescription className="mt-1">
              Surah {activity.surahName}
            </CardDescription>
          </div>
          <div className="rounded-full w-9 h-9 bg-neutral-100 p-1.5 flex justify-center items-center">
            {activity.type === "listening" ? (
              <Headphones className="h-5 w-5 group-hover:text-indigo-600" />
            ) : (
              <BookOpen className="h-5 w-5 group-hover:text-indigo-600" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{activity.description}</p>

          <div className="flex items-center gap-2">
            <Progress value={activity.progress} className="flex-1" />
            <span className="text-sm font-medium">{activity.progress}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>{activity.accuracy}% accuracy</span>
            </div>
            <Badge
              variant={activity.type === "listening" ? "secondary" : "outline"}
            >
              {activity.totalExercises} exercises
            </Badge>
          </div>
        </div>
      </CardContent>
      <div className="px-6 pb-4 text-right">
        <Button className="bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold">
          Continue <ChevronRight className="ml-1 h-6 w-6" />
        </Button>
      </div>
    </Card>
  </div>
);

export default function ActivitiesPage() {
  const [activityType, setActivityType] = useState("all");
  const [selectedSurah, setSelectedSurah] = useState("");
  const [open, setOpen] = useState(false);

  const filteredActivities = activities.filter(activity => {
    const typeMatch = activityType === "all" || activity.type === activityType;
    const surahMatch = !selectedSurah || activity.surah === selectedSurah;
    return typeMatch && surahMatch;
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
        <Tabs value={activityType} onValueChange={setActivityType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="listening">Listening</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
          </TabsList>
        </Tabs>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full sm:w-[200px] justify-between"
            >
              {selectedSurah
                ? surahs.find(surah => surah.value === selectedSurah)?.label
                : "Select Surah..."}
              <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Surah..." />
              <CommandList>
                <CommandEmpty>No Surah found.</CommandEmpty>
                <CommandGroup>
                  {surahs.map(surah => (
                    <CommandItem
                      key={surah.value}
                      value={surah.value}
                      onSelect={currentValue => {
                        setSelectedSurah(
                          currentValue === selectedSurah ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedSurah === surah.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {surah.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
