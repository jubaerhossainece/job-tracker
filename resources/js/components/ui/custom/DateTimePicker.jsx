"use client"

import { useState, useRef, useEffect } from "react"
// import "@/../../css/datetime-picker.css" // Updated import path
// import "../../../../css/datetime-picker.css"

// Export as named export to match your import
export function DateTimePicker({
  value,
  onChange,
  label = "",
  placeholder = "Choose date and time",
  disabled = false,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [hours, setHours] = useState(value ? new Date(value).getHours().toString().padStart(2, "0") : "12")
  const [minutes, setMinutes] = useState(value ? new Date(value).getMinutes().toString().padStart(2, "0") : "00")
  const [ampm, setAmpm] = useState(value ? (new Date(value).getHours() >= 12 ? "PM" : "AM") : "AM")

  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Update internal state when value prop changes
  useEffect(() => {
    if (value) {
      const date = new Date(value)
      setSelectedDate(date)
      setHours(
        date.getHours() >= 12
          ? (date.getHours() - 12 || 12).toString().padStart(2, "0")
          : (date.getHours() || 12).toString().padStart(2, "0"),
      )
      setMinutes(date.getMinutes().toString().padStart(2, "0"))
      setAmpm(date.getHours() >= 12 ? "PM" : "AM")
    }
  }, [value])

  const formatDisplayValue = (date) => {
    if (!date) return ""
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Previous month's days
    const prevMonth = new Date(year, month, 0)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i),
      })
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day),
      })
    }

    // Next month's days
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day),
      })
    }

    return days
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (type, value) => {
    if (type === "hours") {
      const numValue = Number.parseInt(value)
      if (numValue >= 1 && numValue <= 12) {
        setHours(value.padStart(2, "0"))
      }
    } else if (type === "minutes") {
      const numValue = Number.parseInt(value)
      if (numValue >= 0 && numValue <= 59) {
        setMinutes(value.padStart(2, "0"))
      }
    } else if (type === "ampm") {
      setAmpm(value)
    }
  }

  const handleConfirm = () => {
    if (selectedDate) {
      const finalDate = new Date(selectedDate)
      let hour24 = Number.parseInt(hours)

      if (ampm === "PM" && hour24 !== 12) {
        hour24 += 12
      } else if (ampm === "AM" && hour24 === 12) {
        hour24 = 0
      }

      finalDate.setHours(hour24, Number.parseInt(minutes), 0, 0)
      onChange(finalDate)
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    if (value) {
      setSelectedDate(new Date(value))
      const date = new Date(value)
      setHours(
        date.getHours() >= 12
          ? (date.getHours() - 12 || 12).toString().padStart(2, "0")
          : (date.getHours() || 12).toString().padStart(2, "0"),
      )
      setMinutes(date.getMinutes().toString().padStart(2, "0"))
      setAmpm(date.getHours() >= 12 ? "PM" : "AM")
    }
  }

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + direction)
      return newMonth
    })
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const days = getDaysInMonth(currentMonth)

  return (
    <div className="datetime-picker-container" ref={containerRef}>
      {label && (
        <label className="datetime-picker-label">
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
      )}

      <div className="datetime-picker-wrapper">
        <input
          type="text"
          value={formatDisplayValue(selectedDate)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={`datetime-picker-input ${selectedDate ? "has-value" : ""}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        />

        <svg
          className="datetime-picker-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <circle cx="8" cy="14" r="1"></circle>
          <circle cx="12" cy="14" r="1"></circle>
          <circle cx="16" cy="14" r="1"></circle>
        </svg>

        {isOpen && (
          <div className="datetime-picker-dropdown">
            {/* Calendar Header */}
            <div className="datetime-picker-header">
              <button className="datetime-picker-nav-btn" onClick={() => navigateMonth(-1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>

              <div className="datetime-picker-month-year">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>

              <button className="datetime-picker-nav-btn" onClick={() => navigateMonth(1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>

            {/* Calendar */}
            <div className="datetime-picker-calendar">
              <div className="datetime-picker-weekdays">
                {weekdays.map((day) => (
                  <div key={day} className="datetime-picker-weekday">
                    {day}
                  </div>
                ))}
              </div>

              <div className="datetime-picker-days">
                {days.map((dayObj, index) => (
                  <button
                    key={index}
                    className={`datetime-picker-day ${
                      !dayObj.isCurrentMonth ? "other-month" : ""
                    } ${isToday(dayObj.date) ? "today" : ""} ${isSelected(dayObj.date) ? "selected" : ""}`}
                    onClick={() => handleDateSelect(dayObj.date)}
                  >
                    {dayObj.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Picker */}
            <div className="datetime-picker-time">
              <div className="datetime-picker-time-label">Time</div>
              <div className="datetime-picker-time-inputs">
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={hours}
                  onChange={(e) => handleTimeChange("hours", e.target.value)}
                  className="datetime-picker-time-input"
                />
                <span className="datetime-picker-time-separator">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => handleTimeChange("minutes", e.target.value)}
                  className="datetime-picker-time-input"
                />
                <select
                  value={ampm}
                  onChange={(e) => handleTimeChange("ampm", e.target.value)}
                  className="datetime-picker-time-input"
                  style={{ width: "auto", minWidth: "3rem" }}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="datetime-picker-actions">
              <button className="datetime-picker-btn datetime-picker-btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="datetime-picker-btn datetime-picker-btn-confirm"
                onClick={handleConfirm}
                disabled={!selectedDate}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Also export as default for flexibility
export default DateTimePicker
