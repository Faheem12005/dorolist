'use client'

import { Tables } from "@/database.types";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTransition } from "react";
import { deleteProject } from "@/app/lib/actions";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";

type ProjectListProps = {
  projects: Tables<'projects'>[]
}

export default function ProjectLinks({ projects }: ProjectListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (projectId: string) => {
    startTransition(() => {
      toast.promise(
        deleteProject(projectId).then(() => {
          if (pathname === `/dashboard/${projectId}`) {
            router.push("/dashboard");
          } else {
            router.refresh();
          }
        }),
        {
          pending: "Deleting project...",
          success: "Project deleted!",
          error: "Failed to delete project.",
        }
      );
    });
  };

  return (
    <div className="w-full flex flex-col">
      {projects.map((project) => (
        <div
          key={project.id}
          className="min-w-full w-full shrink-0 bg-primary-300 px-2 py-2 rounded-xs hover:bg-gray-200 group"
        >
          <div className="flex gap-4 items-center justify-between">
            <Link
              href={`/dashboard/${project.id}`}
              className="flex gap-4 items-center flex-1 hover:cursor-pointer"
            >
              <ChevronDownIcon className="h-4 w-4" />
              <p className="text-ellipsis overflow-hidden text-xs">{project.name}</p>
            </Link>
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:cursor-pointer"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(project.id);
              }}
              disabled={isPending}
              aria-label="Delete project"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}