import { createClient } from "@supabase/supabase-js"
import { auth } from "@/auth"
import { Database } from "@/database.types"
import { projects, tasks } from "../lib/placeholder-data"

export async function GET() {
    // const session = await auth()
    // const { supabaseAccessToken } = session!

    // const supabase = createClient<Database>(
    //     process.env.SUPABASE_URL!,
    //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    //     {
    //         global: {
    //             headers: {
    //                 Authorization: `Bearer ${supabaseAccessToken}`,
    //             },
    //         },
    //     }
    // )

    // const { error: error1 } = await supabase.from('projects').insert(projects)
    // const { error: error2 } = await supabase.from('tasks').insert(tasks)
    return Response.json({ message: 'Database seeded successfully' });
}