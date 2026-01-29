'use client';

import { useState } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { FloatingContactButton } from '@/components/FloatingContactButton';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { Navbar } from '@/components/Navbar';
import { getPropertiesForRent } from '@/lib/properties';
import Image from 'next/image';
import Link from 'next/link';

export default function RentalsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'beachfront' | 'condo' | 'house'>('all');
    const rentals = getPropertiesForRent();

    const filteredRentals = selectedFilter === 'all'
        ? rentals
        : rentals.filter(p => {
            const title = p.title.toLowerCase();
            if (selectedFilter === 'beachfront') return title.includes('beach') || title.includes('ocean');
            if (selectedFilter === 'condo') return title.includes('condo');
            if (selectedFilter === 'house') return title.includes('house') || title.includes('villa');
            return true;
        });

    return (
        <main className="min-h-screen bg-white-sand">
            {/* Navbar with working mobile menu */}
            <Navbar onOpenModal={() => setIsModalOpen(true)} currentPage="rentals" />

            {/* Hero Section */}
            <section className="relative h-[400px] bg-gradient-to-br from-ocean-blue to-sky-azure overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Vacation Rentals in Rocky Point
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
                        Your perfect beachfront getaway awaits. Nightly, weekly, and monthly rentals available.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="text-gray-700 font-medium">Filter by:</span>
                        {[
                            { value: 'all', label: 'All Properties' },
                            { value: 'beachfront', label: 'Beachfront' },
                            { value: 'condo', label: 'Condos' },
                            { value: 'house', label: 'Houses & Villas' },
                        ].map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setSelectedFilter(filter.value as any)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all ${selectedFilter === filter.value
                                    ? 'bg-ocean-blue text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-dark-navy mb-2">
                            {filteredRentals.length} {filteredRentals.length === 1 ? 'Property' : 'Properties'} Available
                        </h2>
                        <p className="text-gray-600">
                            Find your perfect Rocky Point vacation rental
                        </p>
                    </div>

                    {filteredRentals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredRentals.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-dark-navy mb-2">No properties match your filter</h3>
                            <p className="text-gray-600 mb-6">Try selecting a different filter option</p>
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className="bg-ocean-blue text-white px-6 py-3 rounded-full hover:bg-ocean-blue/90 transition-all font-medium"
                            >
                                Show All Properties
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-ocean-blue to-sky-azure">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        I have access to exclusive listings not shown online. Let me help you find your perfect Rocky Point rental.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sandy-gold text-dark-navy px-8 py-4 rounded-full hover:bg-sandy-gold/90 transition-all hover:-translate-y-1 shadow-2xl font-semibold text-lg"
                    >
                        Contact Me for More Options
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark-navy text-white py-12">
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
