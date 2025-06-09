"use client"

import { Save, Bell, Mail, Calendar, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useForm } from "@inertiajs/react"
// import { route } from "@/utils/route" // Import the route function

const NotificationSettings = ({ user }) => {
  const { data, setData, put, processing, errors } = useForm({
    email_notifications: true,
    application_updates: true,
    interview_reminders: true,
    weekly_summary: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(route("settings.notifications.update"), {
      preserveScroll: true,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>Choose what email notifications you'd like to receive.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Application Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified when your application status changes</p>
                  </div>
                </div>
                <Switch
                  checked={data.application_updates}
                  onCheckedChange={(checked) => setData("application_updates", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Interview Reminders</p>
                    <p className="text-sm text-muted-foreground">Receive reminders about upcoming interviews</p>
                  </div>
                </div>
                <Switch
                  checked={data.interview_reminders}
                  onCheckedChange={(checked) => setData("interview_reminders", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Weekly Summary</p>
                    <p className="text-sm text-muted-foreground">Get a weekly summary of your job search activity</p>
                  </div>
                </div>
                <Switch
                  checked={data.weekly_summary}
                  onCheckedChange={(checked) => setData("weekly_summary", checked)}
                />
              </div>
            </div>

            <Button type="submit" disabled={processing}>
              <Save className="h-4 w-4 mr-2" />
              {processing ? "Saving..." : "Save Preferences"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationSettings
