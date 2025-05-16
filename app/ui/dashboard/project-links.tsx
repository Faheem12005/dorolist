import { fetchProjects } from "@/app/lib/actions";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
export default async function ProjectLinks() {
  const projects = await fetchProjects();
  return (
    <div className="w-full flex flex-col">
      {projects[0].projects.map((project) => {
        return (
          <div
            key={project.id}
            className="min-w-full w-full shrink-0 bg-primary-300 px-2 py-2 rounded-xs hover:bg-gray-200 hover:cursor-pointer"
          >
            <Link
              className="flex gap-4 items-center"
              href={`/dashboard/${project.id}`}
            >
              <ChevronDownIcon className="h-4 w-4" />
              <p className="text-ellipsis overflow-hidden text-xs">{project.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
