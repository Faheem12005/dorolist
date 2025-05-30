"use client";

import { Tables } from "@/database.types";
import Link from "next/link";
import Image from "next/image";
import { useTransition, useState, useMemo } from "react";
import { onCompleteTask } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

type TaskListProps = {
  tasks: Tables<"tasks">[] | undefined;
};

const PAGE_SIZE = 4;

export default function TaskList({ tasks }: TaskListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);

  const incompleteTasks = useMemo(
    () => (tasks ?? []).filter((task) => !task.completed),
    [tasks]
  );
  const completedTasks = useMemo(
    () => (tasks ?? []).filter((task) => !!task.completed),
    [tasks]
  );

  // Pagination logic for incomplete and completed tasks
  const totalPages = Math.ceil((incompleteTasks.length || 1) / PAGE_SIZE);
  const paginatedTasks = incompleteTasks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const completedTotalPages = Math.ceil((completedTasks.length || 1) / PAGE_SIZE);
  const paginatedCompletedTasks = completedTasks.slice(
    (completedPage - 1) * PAGE_SIZE,
    completedPage * PAGE_SIZE
  );

  const handleToggle = async (id: string) => {
    startTransition(() => {
      onCompleteTask(id).then(() => router.refresh());
    });
  };

  return (
    <div className="flex flex-col gap-6 my-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Tasks</span>
            <Badge variant="secondary">{incompleteTasks.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paginatedTasks.length > 0 ? (
            paginatedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0 group"
              >
                <div className="flex items-center gap-3 w-full">
                  <Checkbox
                    checked={!!task.completed}
                    onCheckedChange={() => handleToggle(task.id)}
                    disabled={isPending}
                    className="h-5 w-5"
                    aria-label="Toggle complete"
                  />
                  <Link
                    href={`/dashboard/${task.project_id}/?taskNo=${task.id}`}
                    className="flex-1"
                  >
                    <p
                      className={`text-base font-medium transition-colors duration-200 ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800 group-hover:text-primary"
                      }`}
                    >
                      {task.task}
                    </p>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center flex-col opacity-40 py-8">
              <p>No tasks for the day!</p>
              <Image
                src={`/coffee.png`}
                width={120}
                height={120}
                alt="coffee cup"
                className="mt-2"
              />
            </div>
          )}
        </CardContent>
        {totalPages > 1 && (
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-disabled={page === 1}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-xs px-2">
                    Page {page} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    aria-disabled={page === totalPages}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>

      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Completed Tasks
              <Badge variant="outline">{completedTasks.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paginatedCompletedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0 opacity-70"
              >
                <div className="flex items-center gap-3 w-full">
                  <Checkbox
                    checked={!!task.completed}
                    disabled
                    className="h-5 w-5"
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
            ))}
          </CardContent>
          {completedTotalPages > 1 && (
            <CardFooter>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCompletedPage((p) => Math.max(1, p - 1))}
                      aria-disabled={completedPage === 1}
                      className={completedPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="text-xs px-2">
                      Page {completedPage} of {completedTotalPages}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCompletedPage((p) => Math.min(completedTotalPages, p + 1))}
                      aria-disabled={completedPage === completedTotalPages}
                      className={completedPage === completedTotalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}