"use client";

import { useState, use, startTransition } from "react";
import AddTask from "./add-task";
import { useTask } from "@/app/dashboard/[projectid]/edit/task-provider";
import {
  addTask,
  fetchTasks,
  onDeleteTask,
  onEditTask,
} from "@/app/lib/actions";

export default function TaskHandler({
  projectId,
}: {
  projectId: string;
}) {
  const { taskPromise } = useTask();
  const tasksInitial = use(taskPromise);
  const [tasks, setTasks] = useState(tasksInitial);

  async function addTaskAction(formData: FormData) {
    await addTask(formData);
    const newTasks = await fetchTasks(projectId);
    startTransition(() => {
      setTasks(newTasks);
    });
  }

  async function onEditAction(taskId: string, newTaskName: string) {
    await onEditTask(taskId, newTaskName);
    const newTasks = await fetchTasks(projectId);
    startTransition(() => {
      setTasks(newTasks);
    });
  }

  async function onDeleteAction(taskId: string) {
    await onDeleteTask(taskId);
    const newTasks = await fetchTasks(projectId);
    startTransition(() => {
      setTasks(newTasks);
    });
  }

  return (
    <div>
      <AddTask
        tasks={tasks!}
        projectId={projectId}
        addTaskAction={addTaskAction}
        deleteTaskAction={onDeleteAction}
        editTaskAction={onEditAction}
      />
    </div>
  );
}
