"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        role: selectedRole, // Include role in signin
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error
        );
      } else {
        // Redirect based on role
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
    setError(""); // Clear error when user types
  };

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
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Role Selector */}
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
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-gray-700 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
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
                    className="mt-1"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="text-gray-700 flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm hover:text-gray-700"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <Alert variant="destructive" className="animate-appear">
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
                    Signing in...
                  </>
                ) : (
                  `Sign in as ${
                    selectedRole === "teacher" ? "Teacher" : "Student"
                  }`
                )}
              </Button>
            </form>
            <nav>
              <br />
              <p className="text-center">
                Don't have an account?
                <Link
                  href="/signup"
                  className="hover:text-blue-700 transition-colors"
                >
                  Sign up
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
  );
}
