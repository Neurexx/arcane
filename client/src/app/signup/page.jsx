"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowRight, User, Mail, Lock } from "lucide-react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("teacher");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const router = useRouter();

  const checkPasswordStrength = (password) => {
    if (password.length < 8) return "weak";
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(
      Boolean
    ).length;
    return strength <= 2 ? "weak" : strength === 3 ? "medium" : "strong";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
    if (id === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
    setError("");
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      setError("");

      if (passwordStrength === "weak") {
        setError("Please choose a stronger password");
        setLoading(false);
        return;
      }

      const data = { ...userData, role: selectedRole };
      const res = await axios.post("/api/signup", data);

      if (res.status === 201) {
        await signIn("credentials", {
          redirect: false,
          identifier: userData.email,
          password: userData.password,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  }

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="p-4 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2 group"
          >
            <ArrowRight className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Home
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Create Account
            </h1>
            <p className="text-gray-600">Join us to start your journey</p>
          </div>

          <div className="flex justify-center space-x-4">
            {["teacher", "student"].map((role) => (
              <Button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-32 transition-all duration-300 ${
                  selectedRole === role
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <User className={`h-4 w-4 mr-2 ${
                  selectedRole === role ? "animate-bounce" : ""
                }`} />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
              <div className="group">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 flex items-center gap-2 group-hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                    className="mt-1 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="group">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 flex items-center gap-2 group-hover:text-blue-600 transition-colors"
                  >
                    <Lock className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    required
                    className="mt-1 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  />
                  {userData.password && (
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStrengthColor()} transition-all duration-500 ease-out`}
                          style={{
                            width:
                              passwordStrength === "weak"
                                ? "33%"
                                : passwordStrength === "medium"
                                ? "66%"
                                : "100%",
                          }}
                        />
                      </div>
                      <p
                        className={`text-sm ${
                          passwordStrength === "weak"
                            ? "text-red-500"
                            : passwordStrength === "medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        } transition-colors`}
                      >
                        Password strength:{" "}
                        <span className="font-medium">{passwordStrength}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="animate-shake"
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
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

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-blue-600 hover:text-blue-500 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-500 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}