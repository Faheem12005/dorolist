"use client";

import { Tables } from "@/database.types";
import { useOptimistic, useRef, startTransition } from "react";
import OptimisticTaskList from "./edit-tasks";

type AddTaskProps = {
  addTaskAction: (formData: FormData) => Promise<void>;
  editTaskAction: (taskId: string, newTaskName: string) => Promise<void>;
  deleteTaskAction: (taskId: string) => Promise<void>;
  tasks: Tables<'tasks'>[];
  projectId: string;
};

export default function AddTask(props: AddTaskProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function formAction(formData: FormData) {
    const pseudoTask: Tables<"tasks"> = {
      id: "optimistic-" + Date.now(),
      project_id: "optimistic-" + Date.now(),
      task: formData.get("taskName") as string,
      completed: false,
      created_at: new Date().toISOString(),
      duration: null,
    };
    addOptimisticTask(pseudoTask);
    if (formRef.current) {
      formRef.current.reset();
    }
    startTransition(async() => {
      await props.addTaskAction(formData);
    });
  }

  const [optimisticTask, addOptimisticTask] = useOptimistic(
    props.tasks,
    (state, newTask: Tables<"tasks">) => [newTask, ...state]
  );

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        className="bg-white p-8 rounded-xl shadow-sm flex gap-6 w-full items-center"
      >
        <input type="hidden" name="projectId" value={props.projectId} />
        <div className="flex flex-col gap-2 grow">
          <label htmlFor="name" className="text-sm text-gray-600">
            Task Name
          </label>
          <div className="w-full flex gap-5">
            <input
              id="name"
              name="taskName"
              minLength={5}
              maxLength={250}
              required
              className="border border-gray-200 grow rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-400 transition"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white rounded-md py-2 font-medium hover:bg-gray-700 transition p-4"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
      <OptimisticTaskList tasks={optimisticTask} editTaskAction={props.editTaskAction} deleteTaskAction={props.deleteTaskAction}/>
    </>
  );
}
