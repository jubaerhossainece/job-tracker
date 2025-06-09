"use client"

import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useForm } from "@inertiajs/react"
// import { route } from "inertiajs"

const PreferenceSettings = ({ user }) => {
  const form = useForm({
    theme: "system",
    date_format: "MM/DD/YYYY",
    timezone: "UTC",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    form.put(route("settings.preferences.update"), {
      preserveScroll: true,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>Customize how the application looks and feels.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={form.data.theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => form.setData("theme", "light")}
                  >
                    Light
                  </Button>
                  <Button
                    type="button"
                    variant={form.data.theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => form.setData("theme", "dark")}
                  >
                    Dark
                  </Button>
                  <Button
                    type="button"
                    variant={form.data.theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => form.setData("theme", "system")}
                  >
                    System
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select value={form.data.date_format} onValueChange={(value) => form.setData("date_format", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={form.data.timezone} onValueChange={(value) => form.setData("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" disabled={form.processing}>
              <Save className="h-4 w-4 mr-2" />
              {form.processing ? "Saving..." : "Save Preferences"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreferenceSettings
