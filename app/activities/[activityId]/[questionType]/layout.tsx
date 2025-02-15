import React from "react";

const ActivityQuestionLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div>{children}</div>;
};

export default ActivityQuestionLayout;

export function generateStaticParams() {
  return [
    { activityId: "fatiha-listening", questionType: "1" },
    { activityId: "fatiha-reading", questionType: "1" },
    { activityId: "baqarah-reading", questionType: "1" },
    { activityId: "baqarah-listening", questionType: "1" },
  ];
}
