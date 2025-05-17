// components/settings/Preferences.jsx
"use client"

import { useSettings } from "@/contexts/settings-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

export function Preferences() {
  const { settings, updatePreferencesSettings } = useSettings()

  const handleSavePreferences = () => {
    toast({
      title: "Preferences updated",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your dashboard experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select 
              value={settings.preferences.language} 
              onValueChange={(value) => updatePreferencesSettings({ language: value })}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select 
              value={settings.preferences.currency} 
              onValueChange={(value) => updatePreferencesSettings({ currency: value })}
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="jpy">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-format">Date Format</Label>
            <Select 
              value={settings.preferences.dateFormat} 
              onValueChange={(value) => updatePreferencesSettings({ dateFormat: value })}
            >
              <SelectTrigger id="date-format">
                <SelectValue placeholder="Select Date Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size ({settings.preferences.fontSize}px)</Label>
            <Slider
              id="font-size"
              value={[settings.preferences.fontSize]}
              max={24}
              min={12}
              step={1}
              onValueChange={(value) => updatePreferencesSettings({ fontSize: value[0] })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Theme</Label>
          <RadioGroup 
            value={settings.preferences.theme} 
            onValueChange={(value) => updatePreferencesSettings({ theme: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="theme-light" />
              <Label htmlFor="theme-light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label htmlFor="theme-dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="theme-system" />
              <Label htmlFor="theme-system">System</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>Dashboard Layout</Label>
          <RadioGroup 
            value={settings.preferences.layout} 
            onValueChange={(value) => updatePreferencesSettings({ layout: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="layout-default" />
              <Label htmlFor="layout-default">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="layout-compact" />
              <Label htmlFor="layout-compact">Compact</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expanded" id="layout-expanded" />
              <Label htmlFor="layout-expanded">Expanded</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

export default Preferences