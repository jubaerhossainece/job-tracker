"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function CustomDatePicker({ value, onChange, className }) {
  // Convert string date to Date object if needed
  const [date, setDate] = React.useState(() => {
    if (value instanceof Date) return value
    if (typeof value === "string" && value) {
      return new Date(value)
    }
    return undefined
  })

  // Handle date selection
  const handleSelect = (selectedDate) => {
    setDate(selectedDate)

    // Format date as YYYY-MM-DD for form submission
    if (selectedDate) {
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const day = String(selectedDate.getDate()).padStart(2, "0")
      const formattedDate = `${year}-${month}-${day}`

      // Call the parent onChange with formatted date string
      onChange(formattedDate)
    } else {
      onChange("")
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full h-11 justify-between text-left font-normal", !date && "text-muted-foreground", className)}
        >
          {date ? format(date, "PPP") : "Select date"}
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar className="custom-calendar"
 mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
