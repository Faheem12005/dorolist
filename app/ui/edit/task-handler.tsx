"use client";

import { useState, useEffect } from "react";
import AddTask from "./add-task";
import {
  addTask,
  fetchTasks,
  onDeleteTask,
  onEditTask,
  fetchProjectOnId,
} from "@/app/lib/actions";
import { Tables } from "@/database.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type TaskHandlerProps = {
  projectId: string;
};

export default function TaskHandler({ projectId }: TaskHandlerProps) {
  const [tasks, setTasks] = useState<Tables<"tasks">[]>([]);
  const [project, setProject] = useState<Tables<"projects">[]>([]);

  useEffect(() => {
    fetchTasks(projectId).then((data) => setTasks(data ?? []));
    fetchProjectOnId(projectId).then((data) => setProject(data ?? []));
  }, [projectId]);

  async function addTaskAction(formData: FormData) {
    const pseudoTask: Tables<"tasks"> = {
      id: "optimistic-" + Date.now(),
      project_id: projectId,
      task: formData.get("taskName") as string,
      completed: false,
      created_at: new Date().toISOString(),
      duration: null,
    };
    setTasks((prev) => [pseudoTask, ...prev]);
    await addTask(formData);
  }

  async function onEditAction(taskId: string, newTaskName: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, task: newTaskName } : task
      )
    );
    await onEditTask(taskId, newTaskName);
  }

  async function onDeleteAction(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    await onDeleteTask(taskId);
  }

  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            Add Task for {project[0]?.name ?? "Project"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-600 mb-2">{projectId}</p>
        </CardContent>
      </Card>
      <AddTask
        tasks={tasks}
        projectId={projectId}
        addTaskAction={addTaskAction}
        deleteTaskAction={onDeleteAction}
        editTaskAction={onEditAction}
      />
    </div>
  );
}