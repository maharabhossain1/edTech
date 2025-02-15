"use client";

import ActivityQuestions from "@/components/activity-types-details";
import Quiz from "@/components/assignment-question";
import { dummyQuestions } from "@/data/quiz";
import { useState } from "react";

const Page = () => {
  const [isDoing, setDoing] = useState(false);

  const handleIsDoingMode = () => {
    setDoing(!isDoing);
  };
  return (
    <div>
      {isDoing ? (
        <Quiz
          handleIsDoingMode={handleIsDoingMode}
          questions={dummyQuestions}
        />
      ) : (
        <ActivityQuestions
          activityId="listening"
          handleIsDoingMode={handleIsDoingMode}
        />
      )}
    </div>
  );
};

export default Page;
