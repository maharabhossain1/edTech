import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  Users,
  Plus,
  ArrowRight,
  Clock,
} from "lucide-react";
import { AddStudentDialog } from "@/components/teacher/add-student-dialog";

// Types for our data
type Student = {
  id: string;
  name: string;
  avatar?: string;
  joinedDate: string;
};

type Assignment = {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "ongoing" | "completed";
  submissionCount: number;
  totalStudents: number;
};

type DashboardStats = {
  totalStudents: number;
  activeAssignments: number;
  totalActivities: number;
  averageCompletion: number;
};

// Mock data
const stats: DashboardStats = {
  totalStudents: 45,
  activeAssignments: 3,
  totalActivities: 12,
  averageCompletion: 78,
};

const recentStudents: Student[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    avatar: "/placeholder.svg?height=32&width=32",
    joinedDate: "2 days ago",
  },
  {
    id: "2",
    name: "Fatima Ali",
    avatar: "/placeholder.svg?height=32&width=32",
    joinedDate: "3 days ago",
  },
  {
    id: "3",
    name: "Omar Khan",
    avatar: "/placeholder.svg?height=32&width=32",
    joinedDate: "5 days ago",
  },
];

const upcomingAssignments: Assignment[] = [
  {
    id: "1",
    title: "Surah Al-Fatiha Reading Practice",
    dueDate: "Tomorrow",
    status: "ongoing",
    submissionCount: 15,
    totalStudents: 45,
  },
  {
    id: "2",
    title: "Basic Tajweed Rules Quiz",
    dueDate: "Next Week",
    status: "pending",
    submissionCount: 0,
    totalStudents: 45,
  },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening in your classroom.
          </p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="mr-2 size-4" />
            New Assignment
          </Button>
          <AddStudentDialog />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assignments
            </CardTitle>
            <GraduationCap className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAssignments}</div>
            <p className="text-xs text-muted-foreground">Ongoing tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Activities
            </CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActivities}</div>
            <p className="text-xs text-muted-foreground">Learning materials</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recently Joined Students */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Students</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/teacher/students">
                  View All
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>
              New students who joined your class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map(student => (
                <div
                  key={student.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Joined {student.joinedDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Assignments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/teacher/assignments">
                  View All
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>
              Track assignment progress and due dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.map(assignment => (
                <div key={assignment.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-3" />
                        Due {assignment.dueDate}
                      </div>
                    </div>
                    <Badge
                      variant={
                        assignment.status === "ongoing"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                  <Progress
                    value={
                      (assignment.submissionCount / assignment.totalStudents) *
                      100
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {assignment.submissionCount} of {assignment.totalStudents}{" "}
                    submissions
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
