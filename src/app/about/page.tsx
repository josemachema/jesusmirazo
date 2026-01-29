'use client';

import { useState } from 'react';
import { FloatingContactButton } from '@/components/FloatingContactButton';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-white-sand">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo-coldwell-banker.png"
                            alt="Coldwell Banker"
                            width={180}
                            height={45}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-dark-navy hover:text-ocean-blue transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="/rentals" className="text-dark-navy hover:text-ocean-blue transition-colors font-medium">
                            Rentals
                        </Link>
                        <Link href="/sales" className="text-dark-navy hover:text-ocean-blue transition-colors font-medium">
                            For Sale
                        </Link>
                        <Link href="/about" className="text-ocean-blue font-semibold">
                            About
                        </Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-sunset-coral text-white px-6 py-2.5 rounded-full hover:bg-sunset-coral/90 transition-all hover:-translate-y-0.5 shadow-lg font-medium"
                        >
                            Contact Me
                        </button>
                    </nav>
                    <button className="md:hidden text-dark-navy">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[500px] bg-gradient-to-br from-ocean-blue via-sky-azure to-sunset-coral overflow-hidden pt-20">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/50 to-transparent"></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl">
                        <span className="text-6xl font-bold text-ocean-blue">JM</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Jesus Mirazo
                    </h1>
                    <p className="text-2xl md:text-3xl text-white/90 mb-2">
                        Your Rocky Point Real Estate Expert
                    </p>
                    <div className="flex items-center gap-2 text-sandy-gold">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xl font-semibold">Coldwell Banker Certified Agent</span>
                    </div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                            <div>
                                <div className="bg-gradient-to-br from-ocean-blue to-sky-azure h-96 rounded-2xl shadow-2xl"></div>
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold text-dark-navy mb-6">
                                    Welcome to Your Rocky Point Journey
                                </h2>
                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        For over <strong>15 years</strong>, I've been helping families and investors find their perfect piece of paradise in Puerto Peñ
                                        asco (Rocky Point), Mexico.
                                    </p>
                                    <p>
                                        As a <strong>Coldwell Banker certified agent</strong>, I bring local expertise combined with global reach. Whether you're looking for a vacation rental, investment property, or your dream beachfront home, I'm here to guide you every step of the way.
                                    </p>
                                    <p>
                                        I understand the unique challenges of buying property in Mexico, and I make the process simple, transparent, and stress-free. From navigating Fideicomiso (bank trusts) to connecting you with the best contractors and property managers, I'm your one-stop resource.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                            <div className="bg-gradient-to-br from-ocean-blue to-sky-azure text-white rounded-xl p-6 text-center">
                                <div className="text-4xl font-bold mb-2">15+</div>
                                <div className="text-sm">Years Experience</div>
                            </div>
                            <div className="bg-gradient-to-br from-sandy-gold to-sunset-coral text-white rounded-xl p-6 text-center">
                                <div className="text-4xl font-bold mb-2">500+</div>
                                <div className="text-sm">Happy Clients</div>
                            </div>
                            <div className="bg-gradient-to-br from-sunset-coral to-ocean-blue text-white rounded-xl p-6 text-center">
                                <div className="text-4xl font-bold mb-2">$50M+</div>
                                <div className="text-sm">Sales Volume</div>
                            </div>
                            <div className="bg-gradient-to-br from-sky-azure to-ocean-blue text-white rounded-xl p-6 text-center">
                                <div className="text-4xl font-bold mb-2">98%</div>
                                <div className="text-sm">Client Satisfaction</div>
                            </div>
                        </div>

                        {/* Why Choose Me */}
                        <div className="bg-gradient-to-br from-white-sand to-gray-50 rounded-2xl p-8 md:p-12">
                            <h3 className="text-3xl font-bold text-dark-navy mb-8 text-center">
                                Why Work With Me?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    {
                                        icon: (
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ),
                                        title: 'Local Expertise',
                                        description: 'Born and raised in Rocky Point. I know every neighborhood, development, and hidden gem.',
                                    },
                                    {
                                        icon: (
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                            </svg>
                                        ),
                                        title: 'Bilingual Service',
                                        description: 'Fluent in English and Spanish. No language barriers, smooth communication.',
                                    },
                                    {
                                        icon: (
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-1-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ),
                                        title: 'Investment Guidance',
                                        description: 'Expert analysis on ROI, rental potential, and market trends to maximize your investment.',
                                    },
                                    {
                                        icon: (
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        ),
                                        title: 'Full-Service Support',
                                        description: 'Property management, legal assistance, contractors—I connect you with trusted partners.',
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-ocean-blue text-white rounded-full flex items-center justify-center flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-dark-navy mb-2">{item.title}</h4>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-dark-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Find Your Rocky Point Property?
                    </h2>
                    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                        Let's start your journey today. I'll help you every step of the way.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sandy-gold text-dark-navy px-8 py-4 rounded-full hover:bg-sandy-gold/90 transition-all hover:-translate-y-1 shadow-2xl font-semibold text-lg"
                    >
                        Schedule a Free Consultation
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark-navy text-white py-12 border-t border-white/10">
                <div className="container mx-auto px-4 text-center">
                    <Image
                        src="/logo-coldwell-banker.png"
                        alt="Coldwell Banker"
                        width={200}
                        height={50}
                        className="h-12 w-auto mx-auto mb-6 brightness-0 invert"
                    />
                    <p className="text-white/80 mb-2">
                        Jesus Mirazo - Your Rocky Point Real Estate Expert
                    </p>
                    <p className="text-white/60 text-sm">
                        © {new Date().getFullYear()} All rights reserved
                    </p>
                </div>
            </footer>

            {/* Floating Contact Button */}
            <FloatingContactButton onOpenModal={() => setIsModalOpen(true)} />

            {/* Lead Capture Modal */}
            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}
