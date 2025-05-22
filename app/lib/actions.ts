'use server'

import { createClient } from "@supabase/supabase-js"
import { auth } from "@/auth"
import { Database } from "@/database.types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function createServerClient(supabaseAccessToken: string) {
    const supabase = createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${supabaseAccessToken}`,
                },
            },
        }
    )
    return supabase
}

export async function addTask(formData: FormData) {
    const rawFormData = {
        name: formData.get('taskName'),
        projectId: formData.get('projectId')

    }
    const session = await auth()
    const { supabaseAccessToken } = session!
    const supabase = createServerClient(supabaseAccessToken!)
    const { data, error } = await supabase.from('tasks')
        .insert([
            {
                completed: false,
                project_id: typeof rawFormData.projectId === 'string' ? rawFormData.projectId : null,
                task: typeof rawFormData.name === 'string' ? rawFormData.name : null,
            }
        ])
        .select()

    if (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to insert task into database.");
    }
    return data;
}


export async function createProjectAction(formData: FormData) {
    const rawFormData = {
        name: formData.get('projectName'),
        desc: formData.get('projectDesc'),
        deadline: formData.get('deadline'),
    }
    const session = await auth()
    const { supabaseAccessToken } = session!
    const supabase = createServerClient(supabaseAccessToken!)
    const { error } = await supabase.from('projects')
        .insert([
            {
                user_id: session?.user.id,
                name: rawFormData.name as string | null,
                description: rawFormData.desc as string | null,
                deadline: rawFormData.deadline as string | null
            }
        ])
    if (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch project information.");
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function fetchProjects() {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("No user id in session");
    }
    const { supabaseAccessToken } = session;
    const supabase = createServerClient(supabaseAccessToken!);
    const { data, error } = await supabase.from('users').select(`
        projects (
        *)`).eq('id', session.user.id);

    if (data) {
        return data;
    } else {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch project information.");
    }
}

export async function fetchTasks(projectId: string) {
    const session = await auth()
    const { supabaseAccessToken } = session!
    const supabase = createServerClient(supabaseAccessToken!)
    const { data, error } = await supabase.from('tasks').select('*'
    ).eq('project_id', projectId)

    if (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch project information.");
    }
    return data;
}

export async function onEditTask(taskId: string, newTask: string) {
    const session = await auth()
    const { supabaseAccessToken } = session!
    const supabase = createServerClient(supabaseAccessToken!)
    const { error } = await supabase.from('tasks')
        .update({ task: newTask })
        .eq('id', taskId)
    if (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to update task information.");
    }
}

export async function onDeleteTask(taskId: string) {
    const session = await auth()
    const { supabaseAccessToken } = session!
    const supabase = createServerClient(supabaseAccessToken!)
    const { error } = await supabase.from('tasks')
        .delete()
        .eq('id', taskId)
    if (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to delete task.");
    }
}

export async function onCompleteTask(taskId: string) {
    const session = await auth();
    if (!session) throw new Error("No session");
    const { supabaseAccessToken } = session;
    const supabase = createServerClient(supabaseAccessToken!);
    const { error } = await supabase.from('tasks')
        .update({ completed: true })
        .eq('id', taskId);
    if (error) {
        console.error("Database Error: ", error);
        throw new Error("failed to update task.");
    }
}

export async function deleteProject(projectId: string) {
    const session = await auth();
    if (!session) throw new Error("No session");
    const { supabaseAccessToken } = session;
    const supabase = createServerClient(supabaseAccessToken!);
    const { error } = await supabase.from('projects')
        .delete()
        .eq('id', projectId);
    if (error) {
        console.error("Database Error: ", error);
        throw new Error("failed to delete project.");
    }
}

export async function fetchProjectOnId(projectId: string) {
 const session = await auth();
    if (!session) throw new Error("No session");
    const { supabaseAccessToken } = session;
    const supabase = createServerClient(supabaseAccessToken!);
    const { data, error } = await supabase.from('projects')
        .select("*")
        .eq('id', projectId);
    if (error) {
        console.error("Database Error: ", error);
        throw new Error("failed to delete project.");
    }
    return data;
}