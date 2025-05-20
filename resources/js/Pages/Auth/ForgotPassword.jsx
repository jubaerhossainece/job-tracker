"use client"
import { useState, useEffect } from "react"
import { Briefcase, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useForm } from "@inertiajs/react"

export default function ForgotPassword({ status }) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Use Inertia's useForm hook
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
  })

  // Set isSubmitted to true when status is received
  useEffect(() => {
    if (status) {
      setIsSubmitted(true)
    }
  }, [status])

  const submit = (e) => {
    e.preventDefault()
    post("/forgot-password", {
      onSuccess: () => {
        // If no status is provided by the backend, we'll still show the success state
        if (!status) {
          setIsSubmitted(true)
        }
      },
    })
  }

  const handleTryAgain = () => {
    setIsSubmitted(false)
    reset("email")
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
            <CardTitle className="text-2xl text-center font-bold">
              {!isSubmitted ? "Reset your password" : "Check your email"}
            </CardTitle>
            <CardDescription className="text-center">
              {!isSubmitted
                ? "Enter your email address and we'll send you a link to reset your password"
                : "We've sent you an email with a link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {!isSubmitted ? (
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
                      onChange={(e) => setData("email", e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div className="flex justify-center mt-6">
                  <CustomButton type="submit" disabled={processing} className="w-full">
                    {processing ? "Sending link..." : "Send reset link"}
                  </CustomButton>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#4747ff]/10 p-4 rounded-full">
                    <CheckCircle className="h-12 w-12 text-[#4747ff]" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">Check your email</h3>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <span className="font-medium">{data.email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <CustomButton className="w-full" onClick={handleTryAgain}>
                  Try again
                </CustomButton>
              </div>
            )}
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
