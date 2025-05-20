// components/settings/Security.jsx
"use client"

import { useSettings } from "@/contexts/settings-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Laptop, Smartphone, Tablet } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

export function Security() {
  const { settings, updateSecuritySettings } = useSettings()

  const handleSaveSecuritySettings = () => {
    updateSecuritySettings({
      twoFactorEnabled: !settings.security.twoFactorEnabled,
    })
    toast({
      title: "Security settings updated",
      description: "Your security settings have been updated successfully.",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account's security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="two-factor" 
              checked={settings.security.twoFactorEnabled}
              onCheckedChange={(checked) => updateSecuritySettings({ twoFactorEnabled: checked })}
            />
            <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSecuritySettings}>Save Security Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>Recent login activities on your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.security.loginHistory.map((login, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>
                {login.date} {login.time}
              </span>
              <span>{login.ip}</span>
              <span>{login.location}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Currently active sessions on your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.security.activeSessions.map((session, index) => {
            const Icon = session.device === "Laptop" ? Laptop : 
                        session.device === "Smartphone" ? Smartphone : Tablet;
            
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Icon className="mr-2 h-4 w-4" />
                  {session.device}
                </span>
                <span>{session.browser}</span>
                <span>{session.os}</span>
              </div>
            );
          })}
        </CardContent>
        <CardFooter>
          <Button variant="outline">Log Out All Other Sessions</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Security