import React from "react";
import { Button } from "./ui/button";

type AssignmentQuestionProps = {
  handleIsDoingMode: () => void;
};
const AssignmentQuestion = ({ handleIsDoingMode }: AssignmentQuestionProps) => {
  return (
    <div>
      <Button onClick={handleIsDoingMode}>Cross icon</Button>
    </div>
  );
};

export default AssignmentQuestion;
