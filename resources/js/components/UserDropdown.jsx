"use client"

import { useState, useEffect } from "react"
import { router, usePage } from "@inertiajs/react"
import {
  User,
  Settings,
  HelpCircle,
  Bell,
  CreditCard,
  LogOut,
} from "lucide-react"
import "./UserDropdown.css"

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const { user } = usePage().props.auth

  // Get initials from name for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("user-dropdown")
      if (dropdown && !dropdown.contains(event.target) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = () => {
    router.post(route("logout"))
  }

  const handleNavigate = (url) => {
    setIsOpen(false)
    router.visit(url)
  }

  return (
    <div className="user-dropdown-container" id="user-dropdown">
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="avatar-container">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="avatar-image"
              onError={(e) => {
                e.currentTarget.style.display = "none"
                e.currentTarget.nextElementSibling.style.display = "flex"
              }}
            />
          ) : (
            <div className="avatar-fallback">{getInitials(user.name)}</div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-header">
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
            <div className="header-avatar">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="header-avatar-image"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    e.currentTarget.nextElementSibling.style.display = "flex"
                  }}
                />
              ) : (
                <div className="header-avatar-fallback">
                  {getInitials(user.name)}
                </div>
              )}
            </div>
          </div>

          <div className="dropdown-divider" />

          <div className="dropdown-menu-group">
            <button
              className="dropdown-item"
              onClick={() => handleNavigate("/profile")}
            >
              <User className="item-icon" />
              <span>Profile</span>
              <span className="item-shortcut">⇧⌘P</span>
            </button>

            <button
              className="dropdown-item"
              onClick={() => handleNavigate("/notifications")}
            >
              <Bell className="item-icon" />
              <span>Notifications</span>
              <span className="item-shortcut">⌘N</span>
            </button>

            <button
              className="dropdown-item"
              onClick={() => handleNavigate("/billing")}
            >
              <CreditCard className="item-icon" />
              <span>Billing</span>
              <span className="item-shortcut">⌘B</span>
            </button>

            <button
              className="dropdown-item"
              onClick={() => handleNavigate("/settings")}
            >
              <Settings className="item-icon" />
              <span>Settings</span>
              <span className="item-shortcut">⌘S</span>
            </button>

            <button
              className="dropdown-item"
              onClick={() => handleNavigate("/help")}
            >
              <HelpCircle className="item-icon" />
              <span>Help</span>
            </button>
          </div>

          <div className="dropdown-divider" />

          <button className="dropdown-item logout-item" onClick={handleLogout}>
            <LogOut className="item-icon" />
            <span>Log out</span>
            <span className="item-shortcut">⇧⌘Q</span>
          </button>
        </div>
      )}
    </div>
  )
}
