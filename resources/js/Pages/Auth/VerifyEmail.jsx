"use client"

import { useState, useEffect } from "react"
import { Briefcase, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useForm } from "@inertiajs/react"

export default function VerifyEmail({ status }) {
  const [isResent, setIsResent] = useState(false)

  // Use Inertia's useForm hook
  const { post, processing } = useForm({})

  // Set isResent to true when status is received
  useEffect(() => {
    if (status === "verification-link-sent") {
      setIsResent(true)
    }
  }, [status])

  const handleResendVerification = (e) => {
    e.preventDefault()
    post("/email/verification-notification", {
      onSuccess: () => {
        // If no status is provided by the backend, we'll still show the success state
        if (!status) {
          setIsResent(true)
        }
      },
    })
  }

  const handleTryAgain = () => {
    setIsResent(false)
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
              {!isResent ? "Verify your email" : "Check your email"}
            </CardTitle>
            <CardDescription className="text-center">
              {!isResent
                ? "We need to verify your email address before you can access your account"
                : "We've sent you a new verification link to your email address"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {!isResent ? (
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="flex justify-center mb-6">
                    <div className="bg-[#4747ff]/10 p-4 rounded-full">
                      <Mail className="h-12 w-12 text-[#4747ff]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Check your email</h3>
                  <p className="text-gray-600 mb-6">
                    We've sent a verification link to your email address. Click the link in the email to verify your
                    account.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Didn't receive the email? Check your spam folder or request a new one.
                  </p>
                </div>
                <div className="flex justify-center">
                  <CustomButton onClick={handleResendVerification} disabled={processing} className="w-full">
                    {processing ? "Sending..." : "Resend verification email"}
                  </CustomButton>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#4747ff]/10 p-4 rounded-full">
                    <CheckCircle className="h-12 w-12 text-[#4747ff]" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">Email sent!</h3>
                <p className="text-gray-600 mb-6">
                  We've sent a new verification link to your email address. Please check your inbox and click the link
                  to verify your account.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Still didn't receive it? Check your spam folder or try again.
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
              method="post"
              as="button"
              className="inline-flex items-center text-sm text-[#4747ff] hover:text-[#3a3ae6] font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Sign out
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
