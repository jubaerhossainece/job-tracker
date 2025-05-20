// components/settings/Notifications.jsx
"use client"

import { useSettings } from "@/contexts/settings-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export function Notifications() {
  const { settings, updateNotificationSettings } = useSettings()

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification settings have been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Notification Channels</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email-notifications"
                checked={settings.notifications.email}
                onCheckedChange={(checked) => updateNotificationSettings({ email: checked })}
              />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="push-notifications"
                checked={settings.notifications.push}
                onCheckedChange={(checked) => updateNotificationSettings({ push: checked })}
              />
              <Label htmlFor="push-notifications">Push Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sms-notifications"
                checked={settings.notifications.sms}
                onCheckedChange={(checked) => updateNotificationSettings({ sms: checked })}
              />
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notification Types</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="account-activity"
                checked={settings.notifications.accountActivity}
                onCheckedChange={(checked) => updateNotificationSettings({ accountActivity: checked })}
              />
              <Label htmlFor="account-activity">Account Activity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new-features"
                checked={settings.notifications.newFeatures}
                onCheckedChange={(checked) => updateNotificationSettings({ newFeatures: checked })}
              />
              <Label htmlFor="new-features">New Features and Updates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={settings.notifications.marketing}
                onCheckedChange={(checked) => updateNotificationSettings({ marketing: checked })}
              />
              <Label htmlFor="marketing">Marketing and Promotions</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notification-frequency">Notification Frequency</Label>
          <Select
            value={settings.notifications.frequency}
            onValueChange={(value) => updateNotificationSettings({ frequency: value })}
          >
            <SelectTrigger id="notification-frequency">
              <SelectValue placeholder="Select Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="real-time">Real-time</SelectItem>
              <SelectItem value="daily">Daily Digest</SelectItem>
              <SelectItem value="weekly">Weekly Summary</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Quiet Hours</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="time"
              value={settings.notifications.quietHoursStart}
              onChange={(e) => updateNotificationSettings({ quietHoursStart: e.target.value })}
            />
            <span>to</span>
            <Input
              type="time"
              value={settings.notifications.quietHoursEnd}
              onChange={(e) => updateNotificationSettings({ quietHoursEnd: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
      </CardFooter>
    </Card>
  )
}

export default Notifications