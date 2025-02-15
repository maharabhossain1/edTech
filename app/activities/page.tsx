"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Headphones, BookOpen, Check, ChevronRight } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

type ActivityType = "listening" | "reading";

interface Activity {
  id: string;
  title: string;
  activityType: ActivityType;
  description: string;
  totalExercises: number;
}

const activities: Activity[] = [
  {
    id: "fatiha-listening",
    title: "Surah Al-Fatiha",
    activityType: "listening",
    description: "Practice listening and pronunciation of verses",
    totalExercises: 10,
  },
  {
    id: "fatiha-reading",
    title: "Surah Al-Fatiha",
    activityType: "reading",
    description: "Learn to read and understand the verses",
    totalExercises: 8,
  },
  {
    id: "baqarah-listening",
    title: "Surah Al-Baqarah",
    activityType: "listening",
    description: "Practice listening and pronunciation of verses",
    totalExercises: 15,
  },
  {
    id: "baqarah-reading",
    title: "Surah Al-Baqarah",
    activityType: "reading",
    description: "Learn to read and understand the verses",
    totalExercises: 12,
  },
];

const surahs = [
  { value: "al-fatiha", label: "Al-Fatiha" },
  { value: "al-baqarah", label: "Al-Baqarah" },
];

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => (
  <Link href={`/activities/${activity.id}`}>
    <div className="h-[180px] rounded-2xl border border-neutral-300 bg-white p-6 hover:shadow transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900">
            {activity.title}
          </h3>
          <p className="text-neutral-600 text-sm">{activity.description}</p>
        </div>
        <div className=" flex items-center gap-2 w-8 h-8 rounded-full bg-indigo-50 justify-center">
          {activity.activityType === "listening" ? (
            <Headphones className="h-5 w-5 text-indigo-700" />
          ) : (
            <BookOpen className="h-5 w-5 text-indigo-700" />
          )}
        </div>
      </div>
      <div className="mt-6">
        <Badge variant="secondary"> {activity.totalExercises} exercises</Badge>
      </div>
    </div>
  </Link>
);

export default function ActivitiesPage() {
  const [activityType, setActivityType] = useState<"all" | ActivityType>("all");
  const [selectedSurah, setSelectedSurah] = useState("");
  const [open, setOpen] = useState(false);

  const handleActivityTypeChange = (value: string) => {
    setActivityType(value as "all" | ActivityType);
  };

  const filteredActivities = activities.filter(activity => {
    const typeMatch =
      activityType === "all" || activity.activityType === activityType;
    const surahMatch =
      !selectedSurah ||
      activity.title.toLowerCase().includes(selectedSurah.toLowerCase());
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
