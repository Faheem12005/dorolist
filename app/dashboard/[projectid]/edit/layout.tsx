import { TaskProvider } from "./task-provider";
import { fetchTasks } from "@/app/lib/actions";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectid: string }>;
}) {
    const { projectid } = await params;
    const taskPromise = fetchTasks(projectid);
    
    
    return (
        <TaskProvider taskPromise={taskPromise}>
            {children}
        </TaskProvider>
    )
}