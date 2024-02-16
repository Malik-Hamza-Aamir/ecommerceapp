import { ReactNode } from "react"
import Navbar from "@/components/layouts/Navbar"

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default layout