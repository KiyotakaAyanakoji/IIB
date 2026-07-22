

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, Loader2, ShieldCheck, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';

// Reuse the established 3D scene
const LoginScene = dynamic(() => import('./LoginScene'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0A192F] z-0" />
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  // Flow State: 'identify' -> 'otp' -> 'reset' -> 'success'
  const [step, setStep] = useState<'identify' | 'otp' | 'reset' | 'success'>('identify');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Step 1: Identification
  const [identifier, setIdentifier] = useState('');

  // Step 2: OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);

  // Step 3: Password Reset
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password Validation Criteria
  const reqLength = newPassword.length >= 8;
  const reqUpper = /[A-Z]/.test(newPassword);
  const reqLower = /[a-z]/.test(newPassword);
  const reqNumberOrSpecial = /[0-9!@#$%^&*]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const isPasswordValid = reqLength && reqUpper && reqLower && reqNumberOrSpecial && passwordsMatch;

  // OTP Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handlers
  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    // Simulate API: Check if user exists & send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setTimer(60);
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    // Simulate API: Verify OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('reset');
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setErrorMsg("Please meet all password requirements.");
      return;
    }
    setIsLoading(true);
    setErrorMsg("");
    // Simulate API: Save new password
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      // Auto-redirect after success
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex w-full min-h-[100dvh] bg-white font-sans m-0 p-0 overflow-hidden">
      
      {/* LEFT PANEL: 3D Crystal Scene */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between overflow-hidden bg-[#0A192F]">
        <div className="absolute inset-0 z-0">
          <LoginScene />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0A192F]/90 to-transparent pointer-events-none z-10" />
        <div className="relative z-20 flex flex-col justify-end h-full p-16 pb-20 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            Secure Account<br />Recovery.
            <motion.span
              animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-[4px] h-[1em] bg-[#2A86FF] align-middle ml-2"
            />
          </motion.h1>
        </div>
      </div>

      {/* RIGHT PANEL: Dynamic Flow Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 bg-white relative">
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-10">
          <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-[#2A86FF] transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>

        <div className="w-full max-w-md mt-12 sm:mt-0 relative">
          
          {/* Progress Indicator */}
          {step !== 'success' && (
            <div className="flex gap-2 mb-12 justify-center">
              {['identify', 'otp', 'reset'].map((s, i) => (
                <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${
                  step === s ? 'w-8 bg-[#2A86FF]' : 
                  (i < ['identify', 'otp', 'reset'].indexOf(step) ? 'w-4 bg-[#2A86FF]/40' : 'w-4 bg-slate-100')
                }`} />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* STEP 1: IDENTIFICATION */}
            {step === 'identify' && (
              <motion.div key="identify" initial="hidden" animate="show" exit="exit" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                <motion.div variants={itemVariants} className="text-center lg:text-left mb-8">
                  <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center mb-6 border border-slate-100 lg:hidden mx-auto">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h2>
                  <p className="text-gray-500">Enter your registered phone number to receive a secure recovery code.</p>
                </motion.div>

                <form onSubmit={handleIdentify} className="space-y-4">
                  <motion.div variants={itemVariants}>
                    <input
                      type="tel" required placeholder="Phone number"
                      value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A86FF] focus:border-transparent outline-none transition-all text-sm"
                    />
                  </motion.div>

                  {errorMsg && <motion.p variants={itemVariants} className="text-red-500 text-sm font-medium flex items-center gap-1.5"><AlertCircle className="w-4 h-4"/>{errorMsg}</motion.p>}

                  <motion.div variants={itemVariants} className="pt-4">
                    <button type="submit" disabled={isLoading || !identifier} className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Recovery Code"}
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === 'otp' && (
              <motion.div key="otp" initial="hidden" animate="show" exit="exit" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                <motion.div variants={itemVariants} className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-50 text-[#2A86FF] rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Identity</h2>
                  <p className="text-gray-500 text-sm">
                    We sent a 6-digit secure code to <span className="font-semibold text-gray-800">{identifier}</span>.
                  </p>
                </motion.div>

                <form onSubmit={handleVerifyOTP} className="space-y-8">
                  <motion.div variants={itemVariants} className="flex justify-between gap-2 sm:gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index} ref={el => { otpRefs.current[index] = el; }}
                        type="text" maxLength={1} value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border border-gray-300 focus:border-[#2A86FF] focus:ring-2 focus:ring-[#2A86FF]/20 outline-none transition-all bg-slate-50 focus:bg-white"
                      />
                    ))}
                  </motion.div>

                  {errorMsg && <motion.p variants={itemVariants} className="text-red-500 text-sm font-medium text-center flex items-center justify-center gap-1.5"><AlertCircle className="w-4 h-4"/>{errorMsg}</motion.p>}

                  <motion.div variants={itemVariants}>
                    <button type="submit" disabled={isLoading || otp.join('').length < 6} className="w-full py-3.5 px-4 bg-[#2A86FF] hover:bg-[#1d6fe8] text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Code"}
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-6">
                      {timer > 0 ? (
                        <span>Resend code in <span className="font-semibold text-gray-800">00:{timer.toString().padStart(2, '0')}</span></span>
                      ) : (
                        <button type="button" onClick={() => setTimer(60)} className="font-semibold text-gray-800 hover:text-[#2A86FF] transition-colors">Resend Code</button>
                      )}
                    </p>
                  </motion.div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === 'reset' && (
              <motion.div key="reset" initial="hidden" animate="show" exit="exit" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                <motion.div variants={itemVariants} className="text-center lg:text-left mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h2>
                  <p className="text-gray-500">Your new password must be unique and meet the security requirements below.</p>
                </motion.div>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <motion.div variants={itemVariants} className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'} required placeholder="New Password"
                      value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A86FF] focus:border-transparent outline-none transition-all text-sm"
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'} required placeholder="Confirm New Password"
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all text-sm ${confirmPassword.length > 0 ? (passwordsMatch ? 'border-green-400 focus:ring-2 focus:ring-green-400' : 'border-red-400 focus:ring-2 focus:ring-red-400') : 'border-gray-200 focus:ring-2 focus:ring-[#2A86FF]'}`}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </motion.div>

                  {/* Dynamic Requirements Checklist */}
                  <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Password Requirements</p>
                    <ul className="text-sm space-y-2">
                      <li className={`flex items-center gap-2 ${reqLength ? 'text-green-600' : 'text-slate-500'}`}><CheckCircle2 className={`w-4 h-4 ${reqLength ? 'text-green-500' : 'text-slate-300'}`}/> At least 8 characters</li>
                      <li className={`flex items-center gap-2 ${reqUpper && reqLower ? 'text-green-600' : 'text-slate-500'}`}><CheckCircle2 className={`w-4 h-4 ${reqUpper && reqLower ? 'text-green-500' : 'text-slate-300'}`}/> Uppercase & lowercase letters</li>
                      <li className={`flex items-center gap-2 ${reqNumberOrSpecial ? 'text-green-600' : 'text-slate-500'}`}><CheckCircle2 className={`w-4 h-4 ${reqNumberOrSpecial ? 'text-green-500' : 'text-slate-300'}`}/> Number or special character</li>
                      <li className={`flex items-center gap-2 ${passwordsMatch ? 'text-green-600' : 'text-slate-500'}`}><CheckCircle2 className={`w-4 h-4 ${passwordsMatch ? 'text-green-500' : 'text-slate-300'}`}/> Passwords match</li>
                    </ul>
                  </motion.div>

                  {errorMsg && <motion.p variants={itemVariants} className="text-red-500 text-sm font-medium flex items-center gap-1.5"><AlertCircle className="w-4 h-4"/>{errorMsg}</motion.p>}

                  <motion.div variants={itemVariants} className="pt-4">
                    <button type="submit" disabled={isLoading || !isPasswordValid} className="w-full py-3.5 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS & AUTO-REDIRECT */}
            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Password Updated</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your security credentials have been successfully reset. Redirecting you to the sign-in portal...</p>
                <Loader2 className="w-6 h-6 text-[#2A86FF] animate-spin mx-auto" />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
