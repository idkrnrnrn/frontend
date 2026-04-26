import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full rounded-md border border-border bg-muted/50 px-4 py-3 text-sm transition-all placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
