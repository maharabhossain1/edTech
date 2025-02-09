import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookOpen } from "lucide-react";
import { Progress } from "./ui/progress";

// Dummy data
const userData = {
  name: "Ahmed Khan",
  overallProgress: 75,
  assignments: [
    {
      id: 1,
      title: "Surah Al-Fatiha Practice",
      dueDate: "2025-02-10",
      progress: 60,
    },
    {
      id: 2,
      title: "Surah Al-Baqarah Part 1",
      dueDate: "2025-02-15",
      progress: 30,
    },
    { id: 3, title: "Revision Assignment", dueDate: "2025-02-20", progress: 0 },
  ],
  recentActivity: [
    {
      id: 1,
      surah: "Al-Fatiha",
      activity: "Completed listening exercise",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      surah: "Al-Baqarah",
      activity: "Started new assignment",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      surah: "Al-Fatiha",
      activity: "Completed word arrangement",
      timestamp: "2 days ago",
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {userData.name}
          </h2>
          <p className="text-gray-600 mt-1">
            Continue your Quran learning journey
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Progress value={userData.overallProgress} className="h-2" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {userData.overallProgress}%
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.assignments.map(assignment => (
                <div
                  key={assignment.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200  dark:border-neutral-800"
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-gray-900">
                      {assignment.title}
                    </p>
                    <span className="text-sm text-gray-500">
                      Due: {assignment.dueDate}
                    </span>
                  </div>
                  <Progress value={assignment.progress} className="h-2 mb-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {assignment.progress}% complete
                    </span>
                    <Button variant="outline" size="sm">
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.recentActivity.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.surah}
                    </p>
                    <p className="text-sm text-gray-500">{activity.activity}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
