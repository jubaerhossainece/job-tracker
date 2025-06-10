"use client"

import { Camera, Upload, Trash2, ExternalLink, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useForm } from "@inertiajs/react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const AccountSettings = ({ user }) => {
  console.log('User prop in AccountSettings:', JSON.stringify(user, null, 2)); // <--- ADD THIS LINE
  // Account form
  const {
    data: accountData,
    setData: setAccountData,
    put: putAccount,
    processing: accountProcessing,
    errors: accountErrors,
  } = useForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    country: user.country || "",
    postal_code: user.postal_code || "",
    job_title: user.job_title || "",
    company: user.company || "",
    bio: user.bio || "",
  })

  // Social links form
  const {
    data: socialData,
    setData: setSocialData,
    put: putSocial,
    processing: socialProcessing,
    errors: socialErrors,
  } = useForm({
    website: user.website || "",
    linkedin: user.linkedin || "",
    github: user.github || "",
    twitter: user.twitter || "",
  })

  // Professional form
  const {
    data: professionalData,
    setData: setProfessionalData,
    put: putProfessional,
    processing: professionalProcessing,
    errors: professionalErrors,
  } = useForm({
    skills: user.skills || "",
    languages: user.languages || "",
    portfolio: user.portfolio || "",
  })

  // Photo form
  const {
    data: photoData,
    setData: setPhotoData,
    post: postPhoto,
    delete: deletePhoto,
    processing: photoProcessing,
    errors: photoErrors,
    reset: resetPhoto,
  } = useForm({
    photo: null,
  })

  // Resume form
  const {
    data: resumeData,
    setData: setResumeData,
    post: postResume,
    delete: deleteResume,
    processing: resumeProcessing,
    errors: resumeErrors,
    reset: resetResume,
  } = useForm({
    resume: null,
  })

  const handleAccountSubmit = (e) => {
    e.preventDefault()
    putAccount(route("settings.account.update"), {
      preserveScroll: true,
    })
  }

  const handleSocialSubmit = (e) => {
    e.preventDefault()
    putSocial(route("settings.account.social.update"), {
      preserveScroll: true,
    })
  }

  const handleProfessionalSubmit = (e) => {
    e.preventDefault()
    putProfessional(route("settings.account.professional.update"), {
      preserveScroll: true,
    })
  }

  const handlePhotoSubmit = (e) => {
    e.preventDefault()
    postPhoto(route("settings.account.photo.update"), {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => resetPhoto(),
    })
  }

  const handleResumeSubmit = (e) => {
    e.preventDefault()
    postResume(route("settings.account.resume.update"), {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => resetResume(),
    })
  }

  const handleRemovePhoto = () => {
    if (confirm("Are you sure you want to remove your profile photo?")) {
      deletePhoto(route("settings.account.photo.remove"))
    }
  }

  const handleRemoveResume = () => {
    if (confirm("Are you sure you want to remove your resume?")) {
      deleteResume(route("settings.account.resume.remove"))
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>Update your profile photo to personalize your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photo ? `/storage/${user.photo}` : undefined} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex gap-2">
                <form onSubmit={handlePhotoSubmit} className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0] || null
                      setPhotoData("photo", file)
                    }}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </span>
                    </Button>
                  </Label>
                  {photoData.photo && (
                    <Button type="submit" variant="secondary" size="sm" disabled={photoProcessing}>
                      <Upload className="h-4 w-4 mr-2" />
                      {photoProcessing ? "Uploading..." : "Upload"}
                    </Button>
                  )}
                </form>
                {user.photo && (
                  <Button variant="outline" size="sm" onClick={handleRemovePhoto}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>
          {photoErrors.photo && (
            <Alert variant="destructive">
              <AlertDescription>{photoErrors.photo}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your personal information and contact details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAccountSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={accountData.name}
                  onChange={(e) => setAccountData("name", e.target.value)}
                />
                {accountErrors.name && <p className="text-sm text-red-500">{accountErrors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData("email", e.target.value)}
                />
                {accountErrors.email && <p className="text-sm text-red-500">{accountErrors.email}</p>}
                {user.email_verified_at && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      Verified
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={accountData.phone}
                  onChange={(e) => setAccountData("phone", e.target.value)}
                />
                {accountErrors.phone && <p className="text-sm text-red-500">{accountErrors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  name="job_title"
                  value={accountData.job_title}
                  onChange={(e) => setAccountData("job_title", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={accountData.company}
                  onChange={(e) => setAccountData("company", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={accountData.address}
                  onChange={(e) => setAccountData("address", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={accountData.city}
                  onChange={(e) => setAccountData("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={accountData.state}
                  onChange={(e) => setAccountData("state", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={accountData.country}
                  onChange={(e) => setAccountData("country", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={accountData.bio}
                onChange={(e) => setAccountData("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">{accountData.bio?.length || 0}/1000 characters</p>
            </div>

            <Button type="submit" variant="secondary" disabled={accountProcessing}>
              <Save className="h-4 w-4 mr-2" />
              {accountProcessing ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Connect your social media profiles.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSocialSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={socialData.website}
                  onChange={(e) => setSocialData("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
                {socialErrors.website && <p className="text-sm text-red-500">{socialErrors.website}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={socialData.linkedin}
                  onChange={(e) => setSocialData("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
                {socialErrors.linkedin && <p className="text-sm text-red-500">{socialErrors.linkedin}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  value={socialData.github}
                  onChange={(e) => setSocialData("github", e.target.value)}
                  placeholder="https://github.com/username"
                />
                {socialErrors.github && <p className="text-sm text-red-500">{socialErrors.github}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  type="url"
                  value={socialData.twitter}
                  onChange={(e) => setSocialData("twitter", e.target.value)}
                  placeholder="https://twitter.com/username"
                />
                {socialErrors.twitter && <p className="text-sm text-red-500">{socialErrors.twitter}</p>}
              </div>
            </div>

            <Button type="submit" variant="secondary" disabled={socialProcessing}>
              <Save className="h-4 w-4 mr-2" />
              {socialProcessing ? "Saving..." : "Save Social Links"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
          <CardDescription>Showcase your skills and professional background.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfessionalSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                value={professionalData.skills}
                onChange={(e) => setProfessionalData("skills", e.target.value)}
                placeholder="JavaScript, React, Node.js, Python..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Separate skills with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <Input
                id="languages"
                name="languages"
                value={professionalData.languages}
                onChange={(e) => setProfessionalData("languages", e.target.value)}
                placeholder="English (Native), Spanish (Fluent)..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <Input
                id="portfolio"
                name="portfolio"
                type="url"
                value={professionalData.portfolio}
                onChange={(e) => setProfessionalData("portfolio", e.target.value)}
                placeholder="https://yourportfolio.com"
              />
              {professionalErrors.portfolio && <p className="text-sm text-red-500">{professionalErrors.portfolio}</p>}
            </div>

            <Button type="submit" variant="secondary" disabled={professionalProcessing}>
              <Save className="h-4 w-4 mr-2" />
              {professionalProcessing ? "Saving..." : "Save Professional Info"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Resume */}
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
          <CardDescription>Upload your latest resume for job applications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.resume ? (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded">
                  <Upload className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Current Resume</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded on {new Date(user.resume_uploaded_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/storage/${user.resume}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </a>
                </Button>
                <Button variant="outline" size="sm" onClick={handleRemoveResume}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 border-2 border-dashed rounded-lg">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No resume uploaded</p>
            </div>
          )}

          <form onSubmit={handleResumeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume">Upload New Resume</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files[0] || null
                  setResumeData("resume", file)
                }}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX. Max size 5MB.</p>
              {resumeErrors.resume && <p className="text-sm text-red-500">{resumeErrors.resume}</p>}
            </div>

            {resumeData.resume && (
              <Button type="submit" variant="secondary" disabled={resumeProcessing}>
                <Upload className="h-4 w-4 mr-2" />
                {resumeProcessing ? "Uploading..." : "Upload Resume"}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountSettings
