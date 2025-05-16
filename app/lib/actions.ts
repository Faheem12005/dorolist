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


export async function createProjectAction(formData: FormData) {
    const rawFormData = {
      name: formData.get('projectName'),
      desc: formData.get('projectDesc'),
      deadline: formData.get('deadline'),
    }
    let deadline: string | null = null;
    if (rawFormData.deadline) {
        deadline = new Date(rawFormData.deadline as string + "T23:59:59Z").toISOString();
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

    revalidatePath('/dashboard');
    redirect('/dashboard');
    if(error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch project information.");  
    }
}

export async function fetchProjects() {
    const session = await auth()
    const { supabaseAccessToken } = session!
    const supabase = createServerClient(supabaseAccessToken!)
    const { data, error } = await supabase.from('users').select(`
        id,
        name,
        projects (
        *)`).eq('id', session?.user.id!)

    if (data) {
        return data;
    }
    else {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch project information.");
    }
}

export async function fetchTasks(projectId: string) {
    const session = await auth()
    const { supabaseAccessToken } = session!
    const supabase = createServerClient(supabaseAccessToken!)
    const { data, error } = await supabase.from('projects').select('name, deadline, tasks(*)'
    ).eq('tasks.project_id', projectId).eq('id', projectId).limit(1)

    if (data) {
        return data;
    }
    else {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch project information.");
    }
}