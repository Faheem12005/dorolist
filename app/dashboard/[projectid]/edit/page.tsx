import TaskHandler from "@/app/ui/edit/task-handler";

export default async function Page({
  params,
}: {
  params: { projectid: string };
}) {
  const { projectid } = params;

  return (
    <div className="min-h-screen flex flex-col p-5 w-full">
      <TaskHandler projectId={projectid} />
    </div>
  );
}