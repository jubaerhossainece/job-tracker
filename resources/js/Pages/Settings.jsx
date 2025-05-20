// resources/js/Pages/Settings.jsx
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from "@/components/settings/Account"
import Security from "@/components/settings/Security"
import Preferences from "@/components/settings/Preferences"
import Notifications from "@/components/settings/Notifications"
import Privacy from "@/components/settings/Privacy"
import { SettingsProvider } from "@/contexts/settings-context"
import DashboardLayout from "@/Layouts/DashboardLayout"

function Settings() {
  return (
    <SettingsProvider>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Account />
          </TabsContent>

          <TabsContent value="security">
            <Security />
          </TabsContent>

          <TabsContent value="preferences">
            <Preferences />
          </TabsContent>

          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>

          <TabsContent value="privacy">
            <Privacy />
          </TabsContent>
        </Tabs>
      </div>
    </SettingsProvider>
  )
}

// ✅ Add layout assignment for Inertia or custom routing
Settings.layout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Settings
