import React from "react";

const AssignmentDetailsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div>{children}</div>;
};

export default AssignmentDetailsLayout;

export function generateStaticParams() {
  return [{ assignmentId: "1" }];
}
