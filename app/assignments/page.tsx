"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AssignmentCard, {
  Assignment,
  AssignmentStatus,
} from "@/components/assignment-card";
import Quiz from "@/components/assignment-question";
import { dummyQuestions } from "@/data/quiz";

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Word Pronunciation Practice",
    surah: "Surah Al-Fatiha",
    dueDate: "2024-02-15",
    progress: 65,
    activities: 10,
    completed: 6,
    accuracy: "80%",
    status: "not-started",
  },
  {
    id: 2,
    title: "Verse Arrangement Exercise",
    surah: "Surah Al-Baqarah",
    dueDate: "2024-02-20",
    progress: 30,
    activities: 8,
    completed: 2,
    accuracy: "75%",
    status: "not-started",
  },
  {
    id: 3,
    title: "Tajweed Rules Application",
    surah: "Surah Al-Imran",
    dueDate: "2024-02-10",
    progress: 100,
    activities: 15,
    completed: 15,
    accuracy: "95%",
    status: "completed",
  },
  {
    id: 4,
    title: "Memorization Challenge",
    surah: "Surah An-Nisa",
    dueDate: "2024-02-05",
    progress: 50,
    activities: 20,
    completed: 10,
    accuracy: "85%",
    status: "overdue",
  },
];

type FilterValue = AssignmentStatus | "all" | "pending";

const AssignmentsPage = () => {
  const [filter, setFilter] = useState<FilterValue>("all");

  // Type guard to ensure the value is a valid FilterValue
  const handleValueChange = (value: string) => {
    if (isValidFilterValue(value)) {
      setFilter(value);
    }
  };

  // Type guard function
  const isValidFilterValue = (value: string): value is FilterValue => {
    const validValues: FilterValue[] = [
      "all",
      "pending",
      "completed",
      "not-started",
      "overdue",
    ];
    return validValues.includes(value as FilterValue);
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === "all") return true;
    return assignment.status === filter;
  });

  const [isDoing, setDoing] = useState(false);

  const handleIsDoingMode = () => {
    setDoing(!isDoing);
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
            <h1 className="text-3xl font-semibold">Assignments</h1>
            <p className="mt-1 text-neutral-600">
              Track and complete your Quran learning assignments
            </p>
          </div>
          <Tabs
            value={filter}
            onValueChange={handleValueChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="not-started">Not Started</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value={filter} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAssignments.map(assignment => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    handleIsDoingMode={handleIsDoingMode}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default AssignmentsPage;
