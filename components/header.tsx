"use client";
import {
  User,
  Settings,
  UserCircle,
  LogOut,
  School,
  CircuitBoard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRole } from "@/contexts/RoleContext";

export function Header() {
  const router = useRouter();
  const { role, isTeacher, toggleRole } = useRole();

  const handleNavigation = path => {
    router.push(path);
  };

  const handleLogout = async () => {
    // Add your logout logic here
    // For example:
    // await signOut();
    // router.push('/login');
  };

  // Determine where to navigate based on role
  const navigateToSettings = () => {
    if (isTeacher) {
      handleNavigation("/teacher/dashboard");
    } else {
      handleNavigation("/settings/quran");
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white shadow-sm border-b border-neutral-200 z-30 transition-all duration-300">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Role switcher */}
        <div className="flex items-center space-x-2">
          {/* <div className="flex items-center gap-2 px-2 py-1 border rounded-md bg-neutral-50">
            <School
              className={`h-4 w-4 ${
                !isTeacher ? "text-indigo-600" : "text-neutral-400"
              }`}
            />
            <Switch
              checked={isTeacher}
              onCheckedChange={toggleRole}
              id="role-switch"
            />
            <CircuitBoard
              className={`h-4 w-4 ${
                isTeacher ? "text-indigo-600" : "text-neutral-400"
              }`}
            />
          </div>
          <Label htmlFor="role-switch" className="text-sm font-medium">
            {isTeacher ? "Teacher Mode" : "Student Mode"}
          </Label> */}
        </div>

        {/* User menu */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account ({role})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleNavigation("/settings/account")}
                className="cursor-pointer"
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={navigateToSettings}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
