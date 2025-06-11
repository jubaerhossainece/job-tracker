"use client"

import { Shield, Save, Key, Monitor, Clock, MapPin, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useForm, router } from "@inertiajs/react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SecuritySettings = ({ user, loginHistory }) => {
  // console.log(loginHistory, user);
  // Password form
  const {
    data: passwordData,
    setData: setPasswordData,
    put: putPassword,
    processing: passwordProcessing,
    errors: passwordErrors,
    reset: resetPassword,
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  // Two-factor form
  const {
    // data: twoFactorData, // Not used yet
    // setData: setTwoFactorData, // Not used yet
    post: postTwoFactor,
    delete: deleteTwoFactor,
    processing: twoFactorProcessing,
  } = useForm({})

  // Account Deletion form
  const {
    data: deleteAccountData,
    setData: setDeleteAccountData,
    delete: deleteAccountFormAction,
    processing: deleteAccountProcessing,
    errors: deleteAccountErrors,
    reset: resetDeleteAccountForm,
  } = useForm({
    password: "", // For current password confirmation
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    putPassword(route("settings.security.password.update"), {
      preserveScroll: true,
      onSuccess: () => resetPassword(),
    })
  }

  const handleEnableTwoFactor = () => {
    postTwoFactor(route("settings.security.two-factor.enable"), {
      preserveScroll: true,
    })
  }

  const handleDisableTwoFactor = () => {
    if (confirm("Are you sure you want to disable two-factor authentication?")) {
      deleteTwoFactor(route("settings.security.two-factor.disable"), {
        preserveScroll: true,
      })
    }
  }

  // Mock data for sessions (both active and login history from single table)
  const activeSessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "Active now",
      current: true,
      type: "active_session",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
      type: "active_session",
    },
  ]

  // const loginHistory = [
  //   {
  //     id: 3,
  //     location: "New York, NY",
  //     ip: "192.168.1.1",
  //     device: "Chrome on Windows",
  //     time: "2 hours ago",
  //     status: "success",
  //     type: "login",
  //   },
  //   {
  //     id: 4,
  //     location: "San Francisco, CA",
  //     ip: "192.168.1.2",
  //     device: "Safari on iPhone",
  //     time: "1 day ago",
  //     status: "success",
  //     type: "login",
  //   },
  //   {
  //     id: 5,
  //     location: "London, UK",
  //     ip: "192.168.1.3",
  //     device: "Firefox on Mac",
  //     time: "3 days ago",
  //     status: "failed",
  //     type: "login",
  //   },
  // ]

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                id="current_password"
                name="current_password"
                type="password"
                value={passwordData.current_password}
                onChange={(e) => setPasswordData("current_password", e.target.value)}
                placeholder="Enter your current password"
              />
              {passwordErrors.current_password && (
                <p className="text-sm text-red-500">{passwordErrors.current_password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={passwordData.password}
                onChange={(e) => setPasswordData("password", e.target.value)}
                placeholder="Enter your new password"
              />
              {passwordErrors.password && <p className="text-sm text-red-500">{passwordErrors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm New Password</Label>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={passwordData.password_confirmation}
                onChange={(e) => setPasswordData("password_confirmation", e.target.value)}
                placeholder="Confirm your new password"
              />
              {passwordErrors.password_confirmation && (
                <p className="text-sm text-red-500">{passwordErrors.password_confirmation}</p>
              )}
            </div>

            <Button type="submit" disabled={passwordProcessing}>
              <Save className="h-4 w-4 mr-2" />
              {passwordProcessing ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  {user.two_factor_enabled ? "Currently enabled" : "Currently disabled"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={user.two_factor_enabled ? "default" : "secondary"}>
                  {user.two_factor_enabled ? "Enabled" : "Disabled"}
                </Badge>
                {user.two_factor_enabled ? (
                  <Button variant="outline" size="sm" onClick={handleDisableTwoFactor} disabled={twoFactorProcessing}>
                    Disable
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleEnableTwoFactor} disabled={twoFactorProcessing}>
                    <Shield className="h-4 w-4 mr-2" />
                    Enable
                  </Button>
                )}
              </div>
            </div>

            {!user.two_factor_enabled && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Two-factor authentication adds an extra layer of security to your account by requiring a verification
                  code in addition to your password.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Manage your active login sessions across different devices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.current && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Login History
          </CardTitle>
          <CardDescription>Recent login activity on your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loginHistory.map((login) => (
              <div key={login.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${login.login_successful ? "bg-green-100" : "bg-red-100"}`}>
                    <Monitor className={`h-4 w-4 ${login.login_successful ? "text-green-600" : "text-red-600"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{login.user_agent}</p>
                      <Badge variant={login.login_successful ? "default" : "destructive"} className="text-xs">
                        {login.login_successful ? 'Success' : 'Failed'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {login.location}
                      </span>
                      <span>IP: {login.ip_address}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{login.login_at_human}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action is irreversible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4"> {/* Changed from form to div to handle AlertDialog correctly */}
            <div className="space-y-2">
              <Label htmlFor="current_password_for_delete">Current Password</Label>
              <Input
                id="current_password_for_delete"
                name="password"
                type="password"
                value={deleteAccountData.password}
                onChange={(e) => setDeleteAccountData("password", e.target.value)}
                placeholder="Enter your current password to confirm"
                disabled={deleteAccountProcessing} // Disable input while processing
              />
              {deleteAccountErrors.password && (
                <p className="text-sm text-red-500">{deleteAccountErrors.password}</p>
              )}
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" disabled={deleteAccountProcessing || !deleteAccountData.password}> {/* Disable if no password or processing */}
                  {deleteAccountProcessing ? "Deleting..." : "Delete Account"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    Please confirm by typing your current password above.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => {if (deleteAccountProcessing) resetDeleteAccountForm(); }}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteAccountFormAction(route("settings.account.delete"), {
                        preserveScroll: true,
                        onSuccess: () => {
                          resetDeleteAccountForm();
                          // router.visit('/'); // Optionally redirect
                        },
                        // onError is implicitly handled by useForm errors object
                      });
                    }}
                    disabled={deleteAccountProcessing || !deleteAccountData.password} // Also disable action if no password
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {deleteAccountProcessing ? "Deleting..." : "Confirm Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SecuritySettings
