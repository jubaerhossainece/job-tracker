// components/settings/Privacy.jsx
"use client"

import { useSettings } from "@/contexts/settings-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export function Privacy() {
  const { settings, updatePrivacySettings } = useSettings()

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Manage your privacy and data settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics-sharing">Share analytics data</Label>
                <Switch
                  id="analytics-sharing"
                  checked={settings.privacy.analyticsSharing}
                  onCheckedChange={(checked) => updatePrivacySettings({ analyticsSharing: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="personalized-ads">Allow personalized ads</Label>
                <Switch
                  id="personalized-ads"
                  checked={settings.privacy.personalizedAds}
                  onCheckedChange={(checked) => updatePrivacySettings({ personalizedAds: checked })}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={settings.privacy.visibility}
                onValueChange={(value) => updatePrivacySettings({ visibility: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="visibility-public" />
                  <Label htmlFor="visibility-public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="visibility-private" />
                  <Label htmlFor="visibility-private">Private</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.privacy.dataRetention}
                onValueChange={(value) => updatePrivacySettings({ dataRetention: value })}
              >
                <SelectTrigger id="data-retention">
                  <SelectValue placeholder="Select Data Retention Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="2-years">2 Years</SelectItem>
                  <SelectItem value="indefinite">Indefinite</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Third-Party Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Connected: Google Analytics, Facebook Pixel</p>
              <Button variant="outline">Manage Integrations</Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between">
          <Button variant="outline">Download Your Data</Button>
          <Button variant="destructive">Delete My Account</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSavePrivacy}>Save Privacy Settings</Button>
      </CardFooter>
    </Card>
  )
}

export default Privacy