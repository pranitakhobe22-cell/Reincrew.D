'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, ShieldCheck, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form States
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'candidate'
  });

  const redirectUser = useCallback((user: { role: string; onboarded: string | number }) => {
    if (user.onboarded === 0 || user.onboarded === '0') {
      router.push('/onboarding');
    } else {
      router.push(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [router]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'register') setMode('register');
    
    // Auth Check
    const token = localStorage.getItem('token');
    if (token) {
      redirectUser({ 
        role: localStorage.getItem('role') || 'candidate', 
        onboarded: localStorage.getItem('onboarded') || '0' 
      });
    }
  }, [searchParams, redirectUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Authentication failed');
        return;
      }

      // Save Session
      const { token, user } = data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('role', user.role);
      localStorage.setItem('onboarded', user.onboarded || 0);

      redirectUser(user);
    } catch {
      setError('Cannot connect to server. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#E0E7FF_0%,transparent_50%)] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-primary/3 blur-[100px] rounded-full -translate-x-1/2" />
      </div>

      <Link 
        href="/" 
        className="absolute top-10 left-10 z-20 flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="bg-card-bg border border-border shadow-2xl shadow-indigo-900/5 rounded-[2.5rem] overflow-hidden p-10 md:p-12">
          
          <div className="flex justify-center mb-10">
            <Logo size={42} />
          </div>

          <div className="mb-10 text-center">
            <h1 className="text-3xl font-serif font-bold text-[#1E293B] mb-3">
              {mode === 'login' ? 'Sign In' : 'Join Reincrew'}
            </h1>
            <p className="text-slate-500 font-medium">
              {mode === 'login' 
                ? 'Continue your AI-powered career journey.' 
                : 'Master every interview with realistic AI assessments.'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div
                  key="register-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background focus:bg-card-bg focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all font-medium text-slate-900"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Role</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background focus:bg-card-bg focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all font-medium text-slate-900 appearance-none"
                        >
                          <option value="candidate">Candidate</option>
                          <option value="admin">Admin / HR</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all font-medium text-slate-900"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all font-medium text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              {mode === 'login' 
                ? "Don't have an account?" 
                : "Already have an account?"}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-2 text-primary font-bold hover:underline"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
