"use client";

import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tables } from "@/database.types";
import { onEditTask, onDeleteTask } from "@/app/lib/actions";

type TaskListClientProps = {
  incompleteTasks: Tables<'tasks'>[];
  completedTasks: Tables<'tasks'>[];
};

export default function EditTaskList({
  incompleteTasks,
  completedTasks,
}: TaskListClientProps) {
  const [localIncompleteTasks, setLocalIncompleteTasks] = useState(incompleteTasks);
  const [localCompletedTasks, setLocalCompletedTasks] = useState(completedTasks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEditClick = (task: Tables<'tasks'>) => {
    setEditingId(task.id);
    setEditValue(task.task!);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = async (task: Tables<'tasks'>) => {
    if (editValue.trim() && editValue !== task.task && onEditTask) {
      await onEditTask(task.id, editValue.trim());
      setLocalIncompleteTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, task: editValue.trim() } : t
        )
      );
      setLocalCompletedTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, task: editValue.trim() } : t
        )
      );
    }
    setEditingId(null);
  };

  const handleEditKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    task: Tables<'tasks'>
  ) => {
    if (e.key === "Enter") {
      await handleEditSubmit(task);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  // Delete logic
  const handleDelete = async (taskId: string) => {
    if (onDeleteTask) {
      await onDeleteTask(taskId);
      setLocalIncompleteTasks((prev) => prev.filter((t) => t.id !== taskId));
      setLocalCompletedTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
    setDeleteId(null);
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      {/* Delete confirmation popup */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <p className="mb-4 text-gray-800">Are you sure you want to delete this task?</p>
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

      {localIncompleteTasks.length > 0 ? (
        localIncompleteTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between shadow-sm transition group hover:bg-gray-100 hover:border-gray-300"
          >
            <div className="flex items-center gap-3">
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
                  onChange={handleEditChange}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={(e) => handleEditKeyDown(e, task)}
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
              <button type="button" onClick={() => handleEditClick(task)} className="hover:cursor-pointer">
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setDeleteId(task.id)} className="hover:cursor-pointer">
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

      {localCompletedTasks.length > 0 && (
        <p className="text-xs text-gray-500 mt-4 mb-1 px-2">
          Completed Tasks
        </p>
      )}

      {localCompletedTasks.length > 0 &&
        localCompletedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between shadow-sm transition group opacity-70 hover:bg-gray-100 hover:border-gray-300"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                disabled
                checked={!!task.completed}
                className="accent-gray-800 h-5 w-5 rounded border-gray-300"
              />
              <p
                className={`text-base font-medium ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {task.task}
              </p>
              <button type="button" onClick={() => setDeleteId(task.id)}>
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}