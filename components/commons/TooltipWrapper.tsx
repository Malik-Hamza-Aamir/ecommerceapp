import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

const TooltipWrapper = ({ children, content }: { children: ReactNode, content: string }) => {
  return (
    <TooltipProvider delayDuration={100} >
      <Tooltip >
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper