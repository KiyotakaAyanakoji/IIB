'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, User, Loader2 } from 'lucide-react';

// Reusing the same flawless 3D scene from the login page
const LoginScene = dynamic(() => import('./LoginScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0A192F] z-0" />
});

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // UI Mockup: Simulate API call
    setTimeout(() => {
      setIsLoading(false);
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
      transition: { type: 'spring', stiffness: 350, damping: 25 }
    },
  };

  return (
    <div className="flex w-full min-h-[100dvh] bg-white font-sans m-0 p-0">

      {/* LEFT PANEL: 3D Crystal Scene & Typewriter Copy */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between overflow-hidden bg-[#0A192F]">
        <div className="absolute inset-0 z-0">
          <LoginScene />
        </div>

        {/* Minimal bottom-only gradient to make text pop while revealing the 3D crystal */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0A192F]/90 to-transparent pointer-events-none z-10" />

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
            className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            {"Connecting Potential,".split("").map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                variants={{
                  hidden: { opacity: 0, display: "none" },
                  show: { opacity: 1, display: "inline-block" }
                }}
              >
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

      {/* RIGHT PANEL: Sign Up Form */}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-500">Join the industry intelligence network today.</p>
          </motion.div>

          {/* Quick Start Options: Google & Guest */}
          <motion.div variants={itemVariants} className="flex gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium text-gray-700 shadow-sm">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Start with Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all text-sm font-medium shadow-sm">
              <User className="w-4 h-4" />
              Start as a guest
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Or register with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </motion.div>

          <form className="space-y-5" onSubmit={handleSignUp}>
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A86FF] focus:border-transparent outline-none transition-all text-sm"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@university.edu"
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
                  placeholder="Create a strong password"
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
              <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters long.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#2A86FF] hover:bg-[#1d6fe8] text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[#2A86FF] hover:text-[#1d6fe8] transition-colors">
                Sign In
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
