"use client"

import { useState } from "react"
import { User, Bell, Settings, Shield, Lock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import AccountSettings from "./Account"
import NotificationSettings from "./Notifications"
import PreferenceSettings from "./Preferences"
import SecuritySettings from "./Security"
import PrivacySettings from "./Privacy"

const SettingsIndex = ({ user, flash, loginHistory, activeSessions }) => {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      {flash?.success && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{flash.success}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountSettings user={user} />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings user={user} />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferenceSettings user={user} />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings user={user} loginHistory={loginHistory} activeSessions={activeSessions} />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettings user={user} />
        </TabsContent>
      </Tabs>
    </>
  )
}

SettingsIndex.layout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default SettingsIndex
