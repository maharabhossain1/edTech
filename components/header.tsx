"use client";

import { User } from "lucide-react";
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

export function Header() {
  const router = useRouter();

  const handleNavigation = path => {
    router.push(path);
  };

  const handleLogout = async () => {
    // Add your logout logic here
    // For example:
    // await signOut();
    // router.push('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-neutral shadow-sm border-b border-neutral-300 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-end items-center">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleNavigation("/settings/account")}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigation("/settings/quran")}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
