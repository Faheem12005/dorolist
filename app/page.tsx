import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link href="/login" className="bg-white rounded-sm px-6 py-3 text-black">
        <span>Click to login</span>
      </Link>
    </div>
  );
}
