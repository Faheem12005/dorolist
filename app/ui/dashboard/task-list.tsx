"use client";

import { Tables } from "@/database.types";
import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { onCompleteTask } from "@/app/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type TaskListProps = {
  tasks: Tables<"tasks">[] | undefined;
};

export default function TaskList({ tasks }: TaskListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (id: string) => {
    startTransition(() => {
      toast.promise(
        onCompleteTask(id).then(() => router.refresh()),
        {
          pending: "Submitting...",
          success: "Task Submitted! 👌",
          error: "Something went Wrong! 🤯",
        }
      );
    });
  };

  const incompleteTasks = tasks && tasks.filter((task) => !task.completed);
  const completedTasks = tasks && tasks.filter((task) => !!task.completed);

  return (
    <div className="flex flex-col gap-2 my-2">
      {incompleteTasks && incompleteTasks.length > 0 ? (
        incompleteTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between shadow-sm hover:shadow transition group"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed!}
                onChange={() => handleToggle(task.id)}
                className="accent-gray-800 h-5 w-5 rounded border-gray-300 transition-all duration-200"
                aria-label="Toggle complete"
                disabled={isPending}
              />
              <Link
                href={`/dashboard/${task.project_id}/?taskNo=${task.id}`}
                className="flex-1"
              >
                <p
                  className={`text-base font-medium transition-colors duration-200 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.task}
                </p>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center flex-col opacity-40">
          <p>No tasks for the day!</p>
          <Image
            src={`/coffee.png`}
            width={200}
            height={200}
            alt="coffee cup"
          />
        </div>
      )}

      {completedTasks && completedTasks.length > 0 && (
        <p className="text-xs text-gray-500 mt-4 mb-1 px-2">Completed Tasks</p>
      )}

      {completedTasks && completedTasks.length > 0
        ? completedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between shadow-sm hover:shadow transition group opacity-70"
            >
              <div className="flex items-center gap-3">
                <input
                  disabled
                  type="checkbox"
                  checked={task.completed!}
                  className="accent-gray-800 h-5 w-5 rounded border-gray-300 transition-all duration-200"
                  aria-label="Toggle complete"
                />
                <p
                  className={`text-base font-medium transition-colors duration-200 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.task}
                </p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}