'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
    onOpenModal: () => void;
    currentPage?: 'home' | 'sales' | 'rentals' | 'about' | 'contact';
}

export function Navbar({ onOpenModal, currentPage = 'home' }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (page: string) => currentPage === page;

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo-coldwell-banker.png"
                        alt="Coldwell Banker"
                        width={180}
                        height={40}
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8">
                    <Link
                        href="/"
                        className={`font-medium transition-colors ${isActive('home') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/sales"
                        className={`font-medium transition-colors ${isActive('sales') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                    >
                        Sales
                    </Link>
                    <Link
                        href="/rentals"
                        className={`font-medium transition-colors ${isActive('rentals') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                    >
                        Rentals
                    </Link>
                    <Link
                        href="/about"
                        className={`font-medium transition-colors ${isActive('about') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className={`font-medium transition-colors ${isActive('contact') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                    >
                        Contact
                    </Link>
                </nav>

                {/* Desktop CTA */}
                <button
                    onClick={onOpenModal}
                    className="hidden md:block bg-ocean-blue text-white px-6 py-2 rounded-lg hover:bg-sky-azure transition-colors font-semibold"
                >
                    Get Started
                </button>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-dark-navy hover:text-ocean-blue"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-3">
                    <Link
                        href="/"
                        className={`block py-2 font-medium ${isActive('home') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/sales"
                        className={`block py-2 font-medium ${isActive('sales') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Sales
                    </Link>
                    <Link
                        href="/rentals"
                        className={`block py-2 font-medium ${isActive('rentals') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Rentals
                    </Link>
                    <Link
                        href="/about"
                        className={`block py-2 font-medium ${isActive('about') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className={`block py-2 font-medium ${isActive('contact') ? 'text-ocean-blue font-semibold' : 'text-dark-navy hover:text-ocean-blue'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    <button
                        onClick={() => {
                            onOpenModal();
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-ocean-blue text-white px-6 py-3 rounded-lg hover:bg-sky-azure transition-colors font-semibold mt-2"
                    >
                        Get Started
                    </button>
                </div>
            )}
        </header>
    );
}
