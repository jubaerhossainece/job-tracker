"use client"

import { useState } from "react"
import { Briefcase, ArrowLeft, Mail } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@inertiajs/react"

export default function ForgotPassword() {
  const [data, setData] = useState({
    email: "",
  })
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const submit = (e) => {
    e.preventDefault()
    setProcessing(true)

    // Validate email
    if (!data.email) {
      setErrors({ email: "Email is required" })
      setProcessing(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setErrors({ email: "Please enter a valid email address" })
      setProcessing(false)
      return
    }

    // Simulate API call to send reset email
    setTimeout(() => {
      // In a real app, you would use fetch or axios to post to your API
      // Example: post('/forgot-password', data);

      setProcessing(false)
      setStatus("We have emailed your password reset link!")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Briefcase className="h-8 w-8 text-[#4747ff]" />
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              Forgot your password? No problem. Just let us know your email address and we will email you a password
              reset link that will allow you to choose a new one.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {status && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">{status}</div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className={`pl-10 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div className="flex justify-center mt-6">
                <CustomButton type="submit" disabled={processing} className="w-full">
                  {processing ? "Sending..." : "Email Password Reset Link"}
                </CustomButton>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-[#4747ff] hover:text-[#3a3ae6] font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
