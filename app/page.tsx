import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/login')
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to Dorolist
          </h1>
          <Link href="/login" className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Start
          </Link>
        </div>

        <div className="relative w-full h-80 md:h-96 bg-white rounded-lg shadow-md">
          <Image
            src="/image.png"
            alt="project-pic"
            fill
            className="object-fit"
          />
        </div>
      </div>
    </div>
  );
}
