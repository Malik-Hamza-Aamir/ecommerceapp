import { ReactNode } from "react"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const layout = ({children} : {children: ReactNode}) => {
  return (
  <>
  <div className="flex flex-col min-h-screen w-full">
    <Navbar />
    <div className="flex-1 flex gap-10">
        <Sidebar />
        {children}
    </div>
  </div>
  </>
  )
}

export default layout