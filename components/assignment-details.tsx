import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import QuestionCard from "./question-card";
import ProgressSection from "./ProgressSection";
import { Assignment } from "@/app/assignments/[assignmentId]/page";
import { Button } from "./ui/button";

export default function AssignmentDetails({
  assignmentData,
  handleIsDoingMode,
}: {
  assignmentData: Assignment;
  handleIsDoingMode: () => void;
}) {
  return (
    <div>
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
              <div className="flex justify-between items-end pt-4  border-t">
                <div>
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
                <div>
                  <Button
                    onClick={handleIsDoingMode}
                    className=" bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold
                    disabled:opacity-50 transition-all duration-200
                    text-white"
                  >
                    Continue Assignment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Questions</h2>
          <div className="space-y-4">
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
