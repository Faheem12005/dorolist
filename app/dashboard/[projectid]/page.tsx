import { fetchTasks } from "@/app/lib/actions";
import TaskList from "@/app/ui/dashboard/task-list";
import Timer from "@/app/ui/dashboard/timer";
import Link from "next/link";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

export default async function Page({
  params,
}: {
  params: Promise<{ projectid: string }>;
}) {
  const { projectid } = await params;
  const tasks = await fetchTasks(projectid);
  return (
    <div className="w-full h-full flex flex-col">
      {/* <p className="text-3xl font-bold">{tasks?.projectName}</p> */}
      {/* <p>{tasks?.deadline ? new Date(tasks.deadline).toDateString() : "No deadline"}</p> */}
      <div className="w-full grid grid-cols-2 grow">
        <Timer tasks={tasks} />
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <div className="relative group">
              <Link
                href={`/dashboard/${projectid}/edit`}
                className="flex items-center rounded-lg transition-colors duration-200 group-hover:bg-gray-200 p-1"
              >
                <DocumentPlusIcon className="h-7 w-7" />
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-200 pointer-events-none whitespace-nowrap">
                  Edit Tasks
                </span>
              </Link>
            </div>
          </div>
          <TaskList tasks={tasks}/>
        </div>
      </div>
    </div>
  );
}
