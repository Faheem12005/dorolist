import { createProjectAction } from "@/app/lib/actions";

export default function Page () {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mb-8 text-gray-800">Create Project</h1>
            <form action={createProjectAction} className="bg-white p-8 rounded-xl shadow-sm flex flex-col gap-6 w-full max-w-md">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm text-gray-600">Project Name</label>
                    <input
                        id="name"
                        name="projectName"
                        minLength={5}
                        maxLength={30}
                        required
                        className="border border-gray-200 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-400 transition"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="desc" className="text-sm text-gray-600">Project Description</label>
                    <input
                        id="desc"
                        name="projectDesc"
                        minLength={10}
                        required
                        className="border border-gray-200 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-400 transition"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="deadline" className="text-sm text-gray-600">Set Deadline</label>
                    <input
                        id="deadline"
                        name="deadline"
                        type="date"
                        required
                        className="border border-gray-200 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-400 transition"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 bg-gray-800 text-white rounded-md py-2 font-medium hover:bg-gray-700 transition"
                >
                    Create Project
                </button>
            </form>
        </div>
    );
}