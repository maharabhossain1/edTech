"use client";

import Quiz from "@/components/assignment-question";
import { dummyQuestions } from "@/data/quiz";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const backToPreviousNav = () => {
    router.back();
  };
  return (
    <div>
      <Quiz handleIsDoingMode={backToPreviousNav} questions={dummyQuestions} />
    </div>
  );
};

export default Page;
