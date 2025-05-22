import { fetchTasks } from "@/app/lib/actions";
import { addTask } from "@/app/lib/actions";
import EditTaskList from "@/app/ui/edit/edit-tasks";
import { Tables } from "@/database.types";

export default async function Page({
  params,
}: {
  params: Promise<{ projectid: string }>;
}) {
  const { projectid } = await params;
  const [tasks] = await fetchTasks(projectid);

  const incompleteTasks = tasks.tasks.filter((task: Tables<"tasks">) => !task.completed);
  const completedTasks = tasks.tasks.filter((task: Tables<"tasks">) => !!task.completed);

  return (
    <div className="min-h-screen flex flex-col p-5 w-full">
      <p className="text-xs text-gray-600">{projectid}</p>
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Add Task for {tasks.name}
      </h1>
      <form
        action={addTask}
        className="bg-white p-8 rounded-xl shadow-sm flex gap-6 w-full items-center"
      >
        <input type="hidden" name="projectId" value={projectid} />
        <div className="flex flex-col gap-2 grow">
          <label htmlFor="name" className="text-sm text-gray-600">
            Task Name
          </label>
          <div className="w-full flex gap-5">
            <input
              id="name"
              name="taskName"
              minLength={5}
              maxLength={30}
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
      <EditTaskList
        incompleteTasks={incompleteTasks}
        completedTasks={completedTasks}
      />
    </div>
  );
}
