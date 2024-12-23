"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2,ArrowRight } from "lucide-react"
import axios from "axios"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [selectedRole, setSelectedRole] = useState("teacher")
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState("")
  const router = useRouter()

  const checkPasswordStrength = (password) => {
    if (password.length < 8) return "weak"
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length
    return strength <= 2 ? "weak" : strength === 3 ? "medium" : "strong"
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setUserData(prev => ({ ...prev, [id]: value }))
    if (id === "password") {
      setPasswordStrength(checkPasswordStrength(value))
    }
    // Clear error when user types
    setError("")
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setLoading(true)
      setError("")

      if (passwordStrength === "weak") {
        setError("Please choose a stronger password")
        setLoading(false)
        return
      }

      const data = { ...userData, role: selectedRole }
      const res = await axios.post("/api/signup", data)

      if (res.status === 201) {
        await signIn("credentials", {
          redirect: false,
          identifier: userData.email,
          password: userData.password,
        })
        router.push("/dashboard")
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during signup")
    } finally {
      setLoading(false)
    }
  }

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "weak": return "bg-red-500"
      case "medium": return "bg-yellow-500"
      case "strong": return "bg-green-500"
      default: return "bg-gray-200"
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <header className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="mx-auto flex justify-between items-center">
        <Link
            href="/"
            className="text-xl font-bold hover:text-blue-100 transition-colors flex items-center gap-2"
          >
            <ArrowRight className="h-5 w-5" />
            Home
          </Link>
          <nav className="space-x-4">
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Your Account
            </h1>
            <p className="mt-2 text-gray-600">
              Join as a teacher or student to get started
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            {["teacher", "student"].map((role) => (
              <Button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-32 transition-all ${
                  selectedRole === role
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
                {userData.password && (
                  <div className="mt-2">
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthColor()} transition-all`}
                        style={{ width: passwordStrength === "weak" ? "33%" : passwordStrength === "medium" ? "66%" : "100%" }}
                      />
                    </div>
                    <p className={`text-sm mt-1 ${
                      passwordStrength === "weak" ? "text-red-500" :
                      passwordStrength === "medium" ? "text-yellow-600" :
                      "text-green-600"
                    }`}>
                      Password strength: {passwordStrength}
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  `Sign up as ${selectedRole === "teacher" ? "Teacher" : "Student"}`
                )}
              </Button>
            </form>
            <nav>
              <br />
              <p className="text-center">
                Do you have an account?
                <Link
                  href="/login"
                  className="hover:text-blue-700 transition-colors"
                >
                  Login 
                </Link>
              </p>
            </nav>
          </div>
          <div className="text-center text-sm text-gray-600">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}