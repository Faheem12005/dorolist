import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { Tables } from "@/database.types";
import { fetchProjectsAndTasks } from "@/app/lib/actions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type ProjectWithTasks = Tables<"projects"> & {
  tasks: Tables<"tasks">[];
};

export async function AppSidebar() {
  const result = await fetchProjectsAndTasks();
  const projects: ProjectWithTasks[] = result.flatMap(
    (item: { projects: ProjectWithTasks[] }) => item.projects ?? []
  );
  const session = await auth();
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 px-2 py-1.5"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? "User"}
                />
                <AvatarFallback>
                  {session?.user?.name?.[0] ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">
                  {session?.user?.name ?? "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {session?.user?.email ?? ""}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="font-medium">
              Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <button
                className="w-full hover:cursor-pointer text-left px-3 py-2 rounded flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-200"
                onClick={async () => {
                  "use server";
                  await signOut();
                  redirect("/login");
                }}
              >
                <svg
                  className="w-4 h-4 mr-2 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                  />
                </svg>
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Button
                asChild
                className="w-full mb-3 justify-start px-3 py-2 font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Link href="/dashboard/create">+ New Project</Link>
              </Button>
              {(projects ?? []).map((project) => (
                <Collapsible key={project.id} className="group/collapsible">
                  <SidebarMenuItem className="flex items-center justify-between">
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/dashboard/${project.id}`}
                        className="flex-1 text-left"
                      >
                        {project.name}
                      </Link>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <button className="ml-2 p-1 rounded hover:bg-muted">
                        <ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </button>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {(project.tasks ?? []).map((task) => (
                        <SidebarMenuSubItem key={task.id}>
                          <SidebarMenuSubButton asChild>
                            <div className="w-full overflow-hidden">
                              <Link
                                href={`/dashboard/${project.id}?taskNo=${task.id}`}
                                className="block overflow-hidden whitespace-nowrap truncate text-left max-w-full"
                              >
                                {task.task}
                              </Link>
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
