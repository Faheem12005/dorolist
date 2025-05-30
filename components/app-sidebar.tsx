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
                <AvatarImage src={session?.user?.image ?? ""} alt={session?.user?.name ?? "User"} />
                <AvatarFallback>{session?.user?.name?.[0] ?? "?"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">{session?.user?.name ?? "User"}</span>
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
            <DropdownMenuItem
              className="text-red-600 focus:text-red-700"
            >
              <button onClick={async() => {
                'use server'
                await signOut()
                redirect('/login')
              }}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(projects ?? []).map((project) => (
                <Collapsible key={project.id} className="group/collapsible">
                  <SidebarMenuItem className="flex items-center justify-between">
                    {/* Project Name Link (Clicking this navigates) */}
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/dashboard/${project.id}`}
                        className="flex-1 text-left"
                      >
                        {project.name}
                      </Link>
                    </SidebarMenuButton>

                    {/* Chevron (Clicking this toggles dropdown only) */}
                    <CollapsibleTrigger asChild>
                      <button className="ml-2 p-1 rounded hover:bg-muted">
                        <ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </button>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {(project.tasks ?? []).map((task) => (
                        <SidebarMenuSubItem
                          className="flex items-center justify-between"
                          key={task.id}
                        >
                          <SidebarMenuSubButton asChild>
                            <Link
                              className="flex-1 text-left"
                              href={`/dashboard/${project.id}?taskNo=${task.id}`}
                            >
                              {task.task}
                            </Link>
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