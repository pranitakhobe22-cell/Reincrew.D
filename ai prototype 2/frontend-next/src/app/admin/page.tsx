'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  BarChart3, 
  AlertCircle, 
  Search, 
  LogOut, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import Logo from '@/components/Logo';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [violations, setViolations] = useState<any[]>([]);
  const [error, setError] = useState('');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchData();
    const interval = setInterval(fetchData, 30000); // Auto-refresh 30s
    return () => clearInterval(interval);
  }, [router]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const [intRes, anaRes, monRes] = await Promise.all([
        fetch(`${API}/admin/interviews`, { headers }),
        fetch(`${API}/admin/analytics`, { headers }),
        fetch(`${API}/admin/monitoring`, { headers })
      ]);

      const [intData, anaData, monData] = await Promise.all([
        intRes.json(),
        anaRes.json(),
        monRes.json()
      ]);

      if (intData.success) setInterviews(intData.data.interviews);
      if (anaData.success) setAnalytics(anaData.data);
      if (monData.success) setViolations(monData.data.violations || []);
    } catch (_err) {
      setError('Connection lost. Retrying...');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const filteredInterviews = interviews.filter(iv => {
    const matchesSearch = iv.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || iv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="font-bold text-slate-400">Loading Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card-bg border-bottom border-border px-8 py-4 flex items-center justify-between">
        <Logo size={28} />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            <ShieldCheck size={12} /> Admin
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-sm transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">Real-time candidate intelligence and behavioral monitoring.</p>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard label="Total Interviews" value={analytics.totalInterviews} icon={<Users className="text-indigo-600" />} />
            <StatCard label="Completed" value={analytics.completedInterviews} icon={<CheckCircle className="text-green-600" />} />
            <StatCard label="In Progress" value={analytics.inProgressInterviews} icon={<Clock className="text-orange-600" />} />
            <StatCard label="Avg Score" value={`${analytics.averageScore}/10`} icon={<BarChart3 className="text-primary" />} />
          </div>
        )}

        {/* Violations Monitoring */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-3">
              Behavioral Monitoring
              {violations.length > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-black uppercase animate-pulse">
                  Violations Detected
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <RefreshCw size={14} className="animate-spin-slow" /> Auto-refreshing 30s
            </div>
          </div>
          
          <div className="bg-card-bg border border-border rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-bottom border-slate-200 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Violation Type</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {violations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium italic">
                      No violations recorded in this session.
                    </td>
                  </tr>
                ) : (
                  violations.slice(0, 5).map((v, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm">{v.candidateName}</div>
                        <div className="text-xs text-slate-400">{v.candidateEmail}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-tight border border-red-100">
                          {v.violationType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        {new Date(v.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:underline text-xs font-bold flex items-center gap-1">
                          Preview <ExternalLink size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Main Intelligence Table */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-xl font-serif font-bold text-slate-900">Intelligence Table</h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 h-10 rounded-xl border border-border bg-background focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium w-[240px]"
                />
              </div>
              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-4 pr-10 h-10 rounded-xl border border-border bg-background focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-bold appearance-none cursor-pointer min-w-[140px]"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          <div className="bg-card-bg border border-border rounded-4xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-bottom border-slate-200 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                  <th className="px-8 py-5">Candidate</th>
                  <th className="px-8 py-5">Score</th>
                  <th className="px-8 py-5">Summary Preview</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInterviews.map((iv, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{iv.candidateName}</div>
                      <div className="text-xs text-slate-400">{iv.candidateEmail}</div>
                    </td>
                    <td className="px-8 py-5">
                      {iv.score !== null ? (
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${getScoreStyle(iv.score)}`}>
                          {iv.score}/10
                        </span>
                      ) : (
                        <span className="text-slate-300 font-bold">-</span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs text-slate-400 max-w-[200px] truncate italic font-medium">
                        {iv.summary || "No summary generated"}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight border ${getStatusStyle(iv.status)}`}>
                        {iv.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right text-xs font-bold text-slate-400">
                      {new Date(iv.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: any, icon: React.ReactNode }) {
  return (
    <div className="bg-card-bg p-6 rounded-3xl border border-border shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-2xl font-serif font-black text-slate-900">{value ?? '-'}</p>
      </div>
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
        {icon}
      </div>
    </div>
  );
}

function getScoreStyle(score: number) {
  if (score >= 7) return "bg-green-50 text-green-600 border-green-100";
  if (score >= 4) return "bg-orange-50 text-orange-600 border-orange-100";
  return "bg-red-50 text-red-600 border-red-100";
}

function getStatusStyle(status: string) {
  if (status === 'completed') return "bg-slate-100 text-slate-600 border-slate-200";
  return "bg-indigo-50 text-indigo-600 border-indigo-100";
}

function Loader2(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
