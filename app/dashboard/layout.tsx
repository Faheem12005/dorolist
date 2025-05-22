import Sidenav from "@/app/ui/dashboard/sidenav"
import { ToastContainer } from "react-toastify"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="h-screen flex bg-white">
          <ToastContainer autoClose={1500}/>
          <Sidenav/>
          <div className="p-4 grow">{children}</div>
        </div>
    )
  }