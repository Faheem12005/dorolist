import { authenthicate } from "@/app/lib/actions"
import { signIn } from "@/auth"

export default function LoginForm() {
    return (
        <div className="flex items-center flex-col">
            <form action={authenthicate} className="space-y-2 space-x-2">
                <div className="w-full">
                    <label htmlFor="username">Username: </label>
                    <input placeholder="Username" id="username" name="username"></input>
                </div>
                <div className="mt-10">
                    <label htmlFor="username">Password: </label>
                    <input placeholder="Password" id="password" name="password" type="password"></input>
                </div>
                <button className=" w-full hover:cursor-pointer hover:bg-neutral-600 transition-all ease-in-out rounded-sm bg-black text-white px-6 py-3 mt-2" type="submit">Submit</button>
            </form>

            <form action={async () => {
                'use server'
                await signIn("github", { redirectTo: '/dashboard'})
            }}>
                <button className="hover:cursor-pointer hover:bg-neutral-600 transition-all w-full ease-in-out rounded-sm bg-black text-white px-6 py-3 mt-2" type="submit">Signin with Github</button>
            </form>
        </div>
    )
}