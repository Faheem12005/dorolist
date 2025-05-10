import { auth, signOut } from "@/auth";
import { getUser } from "@/app/lib/actions";
export default async function Dashboard() {
  getUser();
  return (
    <>
      <p>Dashboard</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </>
  );
}
