'use client';

import { useState } from 'react';
import { FloatingContactButton } from '@/components/FloatingContactButton';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
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
                        <Link href="/about" className="text-dark-navy hover:text-ocean-blue transition-colors font-medium">
                            About
                        </Link>
                        <Link href="/contact" className="text-ocean-blue font-semibold">
                            Contact
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[400px] bg-gradient-to-br from-ocean-blue via-sky-azure to-dark-navy overflow-hidden pt-20">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Let's Talk!
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
                        Ready to find your perfect Rocky Point property? I'm here to help you every step of the way.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/526381234567?text=Hi! I found your listing on Rocky Point Jesus"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            <div className="w16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-dark-navy mb-2">WhatsApp</h3>
                            <p className="text-gray-600 mb-4">
                                Chat with me directly for quick responses
                            </p>
                            <div className="text-ocean-blue font-semibold group-hover:underline">
                                Message Now →
                            </div>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+526381234567"
                            className="group bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            <div className="w-16 h-16 bg-ocean-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-dark-navy mb-2">Phone</h3>
                            <p className="text-gray-600 mb-4">
                                Call me to discuss your property needs
                            </p>
                            <div className="text-ocean-blue font-semibold group-hover:underline">
                                +52 (638) 123-4567
                            </div>
                        </a>

                        {/* Email */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all text-left"
                        >
                            <div className="w-16 h-16 bg-sunset-coral rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-dark-navy mb-2">Get Info via Email</h3>
                            <p className="text-gray-600 mb-4">
                                Fill out a quick form and I'll respond within 24 hours
                            </p>
                            <div className="text-ocean-blue font-semibold group-hover:underline">
                                Send Message →
                            </div>
                        </button>
                    </div>

                    {/* Office Hours */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-dark-navy mb-6 text-center">Office Hours</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Monday - Friday</span>
                                <span className="text-dark-navy font-semibold">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Saturday</span>
                                <span className="text-dark-navy font-semibold">10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="font-medium text-gray-700">Sunday</span>
                                <span className="text-gray-500">By Appointment Only</span>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-sky-azure/10 rounded-lg">
                            <p className="text-sm text-gray-700 text-center">
                                <strong>Note:</strong> All times are in Mountain Standard Time (MST)
                            </p>
                        </div>
                    </div>
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
