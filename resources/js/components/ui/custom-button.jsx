import { cn } from "@/lib/utils"

export function CustomButton({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#4747ff] text-white hover:bg-[#3a3ae6] h-10 px-4 py-2",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}