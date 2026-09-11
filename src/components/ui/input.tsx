import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "paint-chip flex h-11 w-full px-3 text-sm text-fg shadow-none",
        "placeholder:text-muted-more outline-none transition-[box-shadow] duration-[var(--motion-quick)]",
        "focus-visible:ring-2 focus-visible:ring-brand/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
