'use server'

import { createClient } from "@supabase/supabase-js"
import { auth } from "@/auth"

export async function authenthicate(formData: FormData) {
    console.log(formData)
}

export async function getUser() {
    const session = await auth()
    const { supabaseAccessToken } = session!

    const supabase = createClient(
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
    const { data, error } = await supabase
        .from('users')
        .select('*')

    console.log(data)
}