'use client'

import { Tables } from "@/database.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type TaskListProps = {
  tasks: Tables<'tasks'>[];
};

export default function TaskList({ tasks }: TaskListProps) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-2 my-2">
      {tasks.length > 0 ? tasks.map((task, index) => (
        <Link
          href={pathname + "?" + "taskNo=" + (index)}
          key={task.id}
          className="px-2 py-4 bg-gray-200 w-full grid grid-cols-2 justify-items-center hover:bg-gray-300 rounded-2xl"
        >
          <p>{task.task}</p>
          <div>
            {task.completed ? (
              <span className="text-green-600 font-bold">Completed</span>
            ) : (
              <span className="text-red-600">Incomplete</span>
            )}
          </div>
        </Link>
      )) : 
      <div className="w-full flex items-center justify-center flex-col opacity-40">
        <p>No tasks for the day!</p>
        <Image src={`/coffee.png`} width={200} height={200} alt="coffee cup"/>
      </div>
      }
    </div>
  );
}