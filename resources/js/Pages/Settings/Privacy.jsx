"use client"

import { Download, Save, Trash2, Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@inertiajs/react"
import { Alert, AlertDescription } from "@/components/ui/alert"
// import { route } from "@/utils/route" // Import route function

const PrivacySettings = ({ user }) => {
  // Privacy form
  const {
    data: privacyData,
    setData: setPrivacyData,
    put: putPrivacy,
    processing: privacyProcessing,
    errors: privacyErrors,
  } = useForm({
    profile_visibility: "private",
    show_email: false,
    show_phone: false,
  })

  // Delete account form
  const {
    data: deleteData,
    setData: setDeleteData,
    delete: deleteAccount,
    processing: deleteProcessing,
    errors: deleteErrors,
  } = useForm({
    password: "",
  })

  const handlePrivacySubmit = (e) => {
    e.preventDefault()
    putPrivacy(route("settings.privacy.update"), {
      preserveScroll: true,
    })
  }

  const handleExportData = () => {
    window.location.href = route("settings.privacy.export")
  }

  const handleDeleteAccount = (e) => {
    e.preventDefault()
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      deleteAccount(route("settings.account.delete"))
    }
  }

  return (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>Control how your data is used and who can see your information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePrivacySubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
                </div>
                <Select
                  value={privacyData.profile_visibility}
                  onValueChange={(value) => setPrivacyData("profile_visibility", value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />
                        Private
                      </div>
                    </SelectItem>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Public
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Email Address</p>
                  <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                </div>
                <Switch
                  checked={privacyData.show_email}
                  onCheckedChange={(checked) => setPrivacyData("show_email", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Phone Number</p>
                  <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                </div>
                <Switch
                  checked={privacyData.show_phone}
                  onCheckedChange={(checked) => setPrivacyData("show_phone", checked)}
                />
              </div>
            </div>

            <Button type="submit" disabled={privacyProcessing}>
              <Save className="h-4 w-4 mr-2" />
              {privacyProcessing ? "Saving..." : "Save Privacy Settings"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Export
          </CardTitle>
          <CardDescription>Download a copy of your personal data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Download className="h-4 w-4" />
              <AlertDescription>
                You can request a copy of your personal data including your profile information, job applications, and
                activity history.
              </AlertDescription>
            </Alert>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export My Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Delete Account */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>Permanently delete your account and all associated data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              <strong>Warning:</strong> This action cannot be undone. This will permanently delete your account and
              remove all your data from our servers including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your profile information</li>
                <li>All job applications and events</li>
                <li>Uploaded files (resume, cover letters)</li>
                <li>Account preferences and settings</li>
              </ul>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleDeleteAccount} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delete_password">Confirm your password to delete account</Label>
              <Input
                id="delete_password"
                name="password"
                type="password"
                value={deleteData.password}
                onChange={(e) => setDeleteData("password", e.target.value)}
                placeholder="Enter your password to confirm"
              />
              {deleteErrors.password && <p className="text-sm text-red-500">{deleteErrors.password}</p>}
            </div>

            <Button type="submit" variant="destructive" disabled={deleteProcessing || !deleteData.password}>
              <Trash2 className="h-4 w-4 mr-2" />
              {deleteProcessing ? "Deleting..." : "Delete Account Permanently"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PrivacySettings
