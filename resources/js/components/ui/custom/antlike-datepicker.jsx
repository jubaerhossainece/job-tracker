// DatePicker.jsx
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"

export function AntlikeDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="PPP"
        customInput={
          <div className="relative">
            <Input
              value={selectedDate.toLocaleDateString()}
              readOnly
              className="pr-10"
            />
            <CalendarIcon className="absolute right-2 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
        }
        popperPlacement="bottom-start"
        className="w-full"
      />
    </div>
  )
}
