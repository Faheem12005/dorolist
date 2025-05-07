import LoginForm from "../ui/login/LoginForm"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function LoginPage() {
    const session = await auth()
    if (session?.user) {
        console.log(session.user)
        redirect('/dashboard')
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <LoginForm/>
        </main>
    )
}