import { auth } from "@/auth";
import ProjectLinks from "./project-links";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Sidenav() {
  const session = await auth();
  return (
    <div className="h-full flex flex-col w-1/6 min-w-1/6 bg-gray-100 text-gray-600 border-r-[0.5px] border-r-gray-200 divide-y-[0.5px] divide-gray-200 items-center">
      <div className="flex px-2 py-4 gap-5 mb-10 justify-between w-full">
        <p className="text-gray-800">{session?.user.name}</p>
        {session?.user.image && (
          <Image
            width={20}
            height={20}
            className="rounded-full"
            src={session.user.image}
            alt="User Icon"
          />
        )}
      </div>
      <div className="w-full px-2">
        <p className="px-2 py-2">Projects</p>
        <div className="min-w-full w-full shrink-0 bg-primary-300 px-2 py-2 rounded-xs hover:bg-gray-200 hover:cursor-pointer flex items-center gap-4">
          <Link href="/dashboard/create" className="flex items-center gap-4">
            <PlusIcon className="h-4 w-4" />
            <p className="text-xs">Create Project</p>
          </Link>
        </div>
        <ProjectLinks />
      </div>
    </div>
  );
}
