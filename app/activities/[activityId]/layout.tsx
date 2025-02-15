import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones } from "lucide-react";
import React from "react";

const activity = {
  title: "Surah Al-Fatiha",
  type: "listening", // or "reading"
  description:
    "Practice listening and pronunciation of verses through interactive exercises.",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="space-y-6">
        {/* Activity header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-neutral-900">
              {activity.title}
            </h1>
            <Badge variant="secondary" className="flex items-center gap-1.5">
              {activity.type === "listening" ? (
                <>
                  <Headphones className="h-3.5 w-3.5" />
                  <span>Listening</span>
                </>
              ) : (
                <>
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Reading</span>
                </>
              )}
            </Badge>
          </div>
          <p className="text-neutral-600 max-w-2xl">{activity.description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
