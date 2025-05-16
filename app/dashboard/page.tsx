import { signOut } from "@/auth";

export default async function Dashboard() {
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
