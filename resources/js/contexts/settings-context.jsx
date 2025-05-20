// contexts/settings-context.jsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Complete defaultSettings with sections for all tabs
const defaultSettings = {
  // Account settings
  account: {
    avatar: "https://github.com/shadcn.png",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "utc-8",
  },
  
  // Security settings
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: "2023-01-15",
    passwordStrength: "strong",
    loginAlerts: true,
    activeSessions: [
      { device: "Laptop", browser: "Chrome", os: "Windows 10", lastActive: "2023-07-20" },
      { device: "Smartphone", browser: "Safari", os: "iOS 15", lastActive: "2023-07-19" }
    ],
    loginHistory: [
      { date: "2023-07-20", time: "14:30 UTC", ip: "192.168.1.1", location: "New York, USA" },
      { date: "2023-07-19", time: "09:15 UTC", ip: "10.0.0.1", location: "London, UK" },
      { date: "2023-07-18", time: "22:45 UTC", ip: "172.16.0.1", location: "Tokyo, Japan" }
    ]
  },
  
  // Preferences settings
  preferences: {
    language: "en",
    currency: "usd",
    dateFormat: "mm-dd-yyyy",
    fontSize: 16,
    theme: "system",
    layout: "default",
  },
  
  // Notifications settings
  notifications: {
    email: true,
    push: true,
    sms: false,
    accountActivity: true,
    newFeatures: true,
    marketing: false,
    frequency: "real-time",
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
  },
  
  // Privacy settings
  privacy: {
    analyticsSharing: true,
    personalizedAds: false,
    visibility: "public",
    dataRetention: "1-year",
  }
}

const SettingsContext = createContext(undefined)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    // Try to load settings from localStorage during initialization
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("userSettings")
      if (savedSettings) {
        return JSON.parse(savedSettings)
      }
    }
    return defaultSettings
  })

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings))
  }, [settings])

  // Update methods for each settings section
  const updateAccountSettings = (accountSettings) => {
    setSettings((prev) => ({
      ...prev,
      account: { ...prev.account, ...accountSettings },
    }))
  }

  const updateSecuritySettings = (securitySettings) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, ...securitySettings },
    }))
  }

  const updatePreferencesSettings = (preferencesSettings) => {
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...preferencesSettings },
    }))
  }

  const updateNotificationSettings = (notificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...notificationSettings },
    }))
  }

  const updatePrivacySettings = (privacySettings) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, ...privacySettings },
    }))
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateAccountSettings,
        updateSecuritySettings,
        updatePreferencesSettings,
        updateNotificationSettings,
        updatePrivacySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}