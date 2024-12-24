"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, ArrowRight, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("teacher");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: userData.email,
        password: userData.password,
        role: selectedRole,
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error
        );
      } else {
        router.push(
          selectedRole === "teacher" ? "/teacher-dashboard" : "/dashboard"
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
    setError("");
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
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
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
                    placeholder={
                      selectedRole === "teacher"
                        ? "teacher@example.com"
                        : "student@example.com"
                    }
                    required
                    className="mt-1 hover:border-blue-400 focus:border-blue-500 transition-colors"
                    autoComplete="email"
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
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={handleInputChange}
                      required
                      className="mt-1 hover:border-blue-400 focus:border-blue-500 transition-colors"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center group">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <Alert variant="destructive" className="animate-shake">
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
                    Signing in...
                  </>
                ) : (
                  `Sign in as ${
                    selectedRole === "teacher" ? "Teacher" : "Student"
                  }`
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
