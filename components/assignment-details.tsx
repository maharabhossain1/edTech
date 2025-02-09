import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Assignment } from "@/app/assignments/[assignmentId]/page";
import QuestionCard from "./question-card";
import ProgressSection from "./ProgressSection";

export default function AssignmentDetails({
  assignmentData,
  handleIsDoingMode,
}: {
  assignmentData: Assignment;
  handleIsDoingMode: () => void;
}) {
  return (
    <div>
      <Link
        href="/assignments"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Assignments
      </Link>

      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{assignmentData.title}</h1>
              <p className="text-muted-foreground">{assignmentData.surah}</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <ProgressSection
                progress={assignmentData.progress}
                completedQuestions={assignmentData.completedQuestions}
                totalQuestions={assignmentData.totalQuestions}
                dueDate={assignmentData.dueDate}
              />

              <div className="pt-4 border-t">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Teacher Instructions</p>
                    <p className="text-sm text-muted-foreground">
                      {assignmentData.teacherInstructions}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Questions</h2>
          <div className="space-y-3">
            {assignmentData.questions.map(question => (
              <QuestionCard
                key={question.id}
                question={question}
                handleIsDoingMode={handleIsDoingMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
