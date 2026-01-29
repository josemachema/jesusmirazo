'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateAdmin } from '@/lib/admin';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const isAuthenticated = authenticateAdmin(email, password);

            if (isAuthenticated) {
                router.push('/admin');
            } else {
                setError('Invalid email or password');
                setIsLoading(false);
            }
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-ocean-blue via-sky-azure to-sunset-coral flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div className="relative w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/">
                            <Image
                                src="/logo-coldwell-banker.png"
                                alt="Coldwell Banker"
                                width={200}
                                height={50}
                                className="h-12 w-auto mx-auto mb-6"
                            />
                        </Link>
                        <h1 className="text-2xl font-bold text-dark-navy mb-2">Admin Login</h1>
                        <p className="text-gray-600">Sign in to access the dashboard</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all"
                                placeholder="admin@rockypointjesus.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-ocean-blue to-sky-azure text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all hover:-translate-y-0.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-blue-800">
                                <div className="font-semibold mb-1">Demo Credentials</div>
                                <div className="space-y-1">
                                    <div><span className="font-medium">Email:</span> admin@rockypointjesus.com</div>
                                    <div><span className="font-medium">Password:</span> admin123</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Site */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-ocean-blue hover:text-sky-azure transition-colors text-sm font-medium"
                        >
                            ← Back to Website
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-white/80 text-sm">
                    <p>© {new Date().getFullYear()} Rocky Point Jesus - All rights reserved</p>
                </div>
            </div>
        </div>
    );
}
