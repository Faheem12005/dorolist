import Sidenav from "@/app/ui/dashboard/sidenav"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="h-screen flex bg-white">
          <Sidenav/>
          <div className="p-4 grow">{children}</div>
        </div>
    )
  }