'use client'

import { createContext, useContext, ReactNode } from "react"
import { Tables } from "@/database.types"

type TaskContextType = {
    taskPromise: Promise<Tables<'tasks'>[] | null>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function useTask(): TaskContextType {
    const context = useContext(TaskContext)
    if(context === null) {
        throw new Error("useTask must be used with a valid provider!");
    }
    return context;
}

export function TaskProvider({
  children,
  taskPromise
}: {
  children: ReactNode;
  taskPromise: Promise<Tables<'tasks'>[] | null>;
}) {
  return (
    <TaskContext.Provider value={{ taskPromise }}>
      {children}
    </TaskContext.Provider>
  );
}