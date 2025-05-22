"use client";

import { useOptimistic, startTransition } from "react";
import { Tables } from "@/database.types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type OptimisticTaskListProps = {
  editTaskAction: (taskId: string, newTaskName: string) => Promise<void>;
  deleteTaskAction: (taskId: string) => Promise<void>;
  tasks: Tables<"tasks">[];
};

export default function OptimisticTaskList({ tasks, editTaskAction, deleteTaskAction }: OptimisticTaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    (
      state,
      action: { type: "edit" | "delete"; id: string; value?: string }
    ) => {
      if (action.type === "edit" && action.value) {
        return state.map((task) =>
          task.id === action.id ? { ...task, task: action.value ?? null } : task
        );
      }
      if (action.type === "delete") {
        return state.filter((task) => task.id !== action.id);
      }
      return state;
    }
  );

  // Edit logic
  const handleEdit = (task: Tables<"tasks">) => {
    setEditingId(task.id);
    setEditValue(task.task ?? "");
  };

  const handleEditSubmit = async (task: Tables<"tasks">) => {
    if (editValue.trim() && editValue !== task.task) {
      startTransition(() => {
        updateOptimisticTasks({
          type: "edit",
          id: task.id,
          value: editValue.trim(),
        });
      });
      setEditingId(null);
      startTransition(async () => {
        await editTaskAction(task.id, editValue.trim());
      });
    } else {
      setEditingId(null);
    }
  };

  const handleDelete = async (taskId: string) => {
    startTransition(() => {
      updateOptimisticTasks({ type: "delete", id: taskId });
    });
    setDeleteId(null);
    startTransition(async () => {
      await deleteTaskAction(taskId);

    });
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this task?
            </p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {optimisticTasks.length > 0 ? (
        optimisticTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between shadow-sm transition group hover:bg-gray-100 hover:border-gray-300"
          >
            <div className="flex items-center gap-5">
              <input
                type="checkbox"
                disabled
                checked={!!task.completed}
                className="accent-gray-800 h-5 w-5 rounded border-gray-300"
              />
              {editingId === task.id ? (
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-base font-medium"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSubmit(task);
                    else if (e.key === "Escape") setEditingId(null);
                  }}
                  autoFocus
                />
              ) : (
                <p
                  className={`text-base font-medium ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.task}
                </p>
              )}
              <button
                type="button"
                onClick={() => handleEdit(task)}
                className="hover:cursor-pointer"
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteId(task.id)}
                className="hover:cursor-pointer"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-gray-600 text-xs">Add a task to get started!</p>
        </div>
      )}
    </div>
  );
}
