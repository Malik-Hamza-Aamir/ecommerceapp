import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

const TooltipWrapper = ({children, content} : {children: ReactNode, content: string}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent align="end" alignOffset={5}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper