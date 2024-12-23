// app/page.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Brain,
  ShieldCheck,
  Calendar,
  LineChart,
  ArrowRight,
  Award,
  FileText,
  Users,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
              >
                <Lock className="h-8 w-8" />
                <span className="text-xl font-bold">ExamSecure</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/features"
                  className="hover:text-blue-200 transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/about"
                  className="hover:text-blue-200 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-blue-200 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button className="px-4 py-2 text-white hover:text-blue-200 transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1 flex items-center">
        <div className="text-center w-full">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Next-Generation
            <span className="text-blue-600"> Examination </span>
            Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionize your academic assessments with AI-powered question
            generation, secure blockchain verification, and intelligent
            scheduling solutions.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/demo">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <span>Request Demo</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/learn-more">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Brain className="h-8 w-8" />,
              title: "AI Question Generation",
              description:
                "Automatically generate diverse question papers while maintaining academic standards",
              color: "bg-blue-500",
            },
            {
              icon: <ShieldCheck className="h-8 w-8" />,
              title: "Secure Examination",
              description:
                "Cryptographic security ensures tamper-proof and transparent examination delivery",
              color: "bg-green-500",
            },
            {
              icon: <Calendar className="h-8 w-8" />,
              title: "Smart Scheduling",
              description:
                "Intelligent timetabling system that considers all constraints for optimal scheduling",
              color: "bg-purple-500",
            },
            {
              icon: <LineChart className="h-8 w-8" />,
              title: "Automated Assessment",
              description:
                "Real-time grading and result processing for quick and accurate evaluations",
              color: "bg-orange-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`${feature.color} text-white p-3 rounded-lg inline-block mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="h-6 w-6" />
                <span className="text-lg font-bold text-white">ExamSecure</span>
              </div>
              <p className="text-sm">
                Revolutionizing examination management with advanced technology
                and security.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-white transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-white transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-sm">© 2024 ExamSecure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
