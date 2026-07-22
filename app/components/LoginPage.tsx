'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Eye, EyeOff, Briefcase, GraduationCap, Building2, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const LoginScene = dynamic(() => import('./LoginScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#2A86FF] z-0" />
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // UI Mockup: Simulate API call length
    setTimeout(() => {
      setIsLoading(false);
      // To test error state, uncomment below:
      // setErrorMsg("Invalid credentials. Please check your email and password.");
      setIsSuccess(true);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 350, damping: 25 }
    },
  };

  return (
    <div className="flex w-full min-h-[100dvh] bg-white font-sans m-0 p-0">

      {/* LEFT PANEL: Crystal 3D Scene & Brand Copy */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between overflow-hidden bg-[#2A86FF]">
        <div className="absolute inset-0 z-0">
          <LoginScene />
        </div>
        {/* Softer, bottom-only gradient just to keep text readable */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/ to-transparent pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col justify-end h-full p-16 pb-20 pointer-events-none">
          <motion.h1
            variants={{
              hidden: { opacity: 1 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.5 },
              },
            }}
            initial="hidden"
            animate="show"
            // Premium, heavy font styling for the tag
            className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            {"Connecting Potential ,".split("").map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                variants={{
                  hidden: { opacity: 0, display: "none" },
                  show: { opacity: 1, display: "inline-block" }
                }}
              >
                {/* We use \u00A0 to ensure spaces render correctly while typing */}
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            {"to Purpose.".split("").map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                variants={{
                  hidden: { opacity: 0, display: "none" },
                  show: { opacity: 1, display: "inline-block" }
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {/* Blinking Typewriter Cursor */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-[4px] h-[1em] bg-[#2A86FF] align-middle ml-2"
            />
          </motion.h1>
        </div>
      </div>

      {/* RIGHT PANEL: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 bg-white relative">

        {/* Persistent Nav Back Link */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-10">
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-[#2A86FF] transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to IIB
          </Link>
        </div>

        <motion.div
          className="w-full max-w-md mt-12 sm:mt-0"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="lg:hidden mb-12 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2A86FF] to-[#60A5FA] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
              IIB
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
            <p className="text-gray-500">Welcome back! Please enter your details.</p>
          </motion.div>



          <form className="space-y-5" onSubmit={handleSignIn}>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email or username
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A86FF] focus:border-transparent outline-none transition-all text-sm"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A86FF] focus:border-transparent outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 text-[#2A86FF] focus:ring-[#2A86FF]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-[#2A86FF] hover:text-[#1d6fe8] transition-colors">
                Forgot Password?
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              {/* Error State */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errorMsg}
                </div>
              )}

              {/* Success / Loading / Default States */}
              {isSuccess ? (
                <div className="w-full py-3.5 px-4 bg-green-500 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                  Sign In Successful
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        →
                      </span>
                    </>
                  )}
                </button>
              )}
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-[#2A86FF] hover:text-[#1d6fe8] transition-colors">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
