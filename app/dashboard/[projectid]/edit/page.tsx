import { fetchProjectOnId } from "@/app/lib/actions";
import TaskHandler from "@/app/ui/edit/task-handler";

export default async function Page({
  params,
}: {
  params: Promise<{ projectid: string }>;
}) {
  const { projectid } = await params;
  const project = await fetchProjectOnId(projectid);

  return (
    <div className="min-h-screen flex flex-col p-5 w-full">
      <h1 className="text-3xl font-semibold text-gray-800">
        Add Task for {project[0].name}
      </h1>
      <p className="text-xs text-gray-600 mb-8">{projectid}</p>
      <TaskHandler projectId={projectid} />
    </div>
  );
}
