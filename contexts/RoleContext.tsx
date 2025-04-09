"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create context with default value
const RoleContext = createContext({
  role: "student",
  setRole: () => {},
  isTeacher: false,
  isStudent: true,
  toggleRole: () => {},
});

// Provider component that wraps our app and makes role data available to any child component
export function RoleProvider({ children }) {
  const [role, setRole] = useState("student");

  // Derived state
  const isTeacher = role === "teacher";
  const isStudent = role === "student";

  // Function to toggle between roles
  const toggleRole = () => {
    setRole(prevRole => (prevRole === "student" ? "teacher" : "student"));
  };

  // Save role to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", role);
    }
  }, [role]);

  // Load role from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("userRole");
      if (savedRole) {
        setRole(savedRole);
      }
    }
  }, []);

  // The value that will be available to consumers of this context
  const value = {
    role,
    setRole,
    isTeacher,
    isStudent,
    toggleRole,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

// Custom hook to access the role context
export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
