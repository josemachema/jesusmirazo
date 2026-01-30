'use client';

import { useState } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { FloatingContactButton } from '@/components/FloatingContactButton';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal';
import { Navbar } from '@/components/Navbar';
import { getPropertiesForSale } from '@/lib/properties';
import Image from 'next/image';
import Link from 'next/link';

export default function SalesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'condo' | 'house' | 'land'>('all');
    const salesProperties = getPropertiesForSale();

    const filteredProperties = selectedFilter === 'all'
        ? salesProperties
        : salesProperties.filter(p => {
            const title = p.title.toLowerCase();
            if (selectedFilter === 'condo') return title.includes('condo') || title.includes('penthouse');
            if (selectedFilter === 'house') return title.includes('house') || title.includes('villa') || title.includes('home');
            if (selectedFilter === 'land') return title.includes('lot') || title.includes('land');
            return true;
        });

    const handleViewDetails = (property: any) => {
        setSelectedProperty(property);
        setIsDetailsModalOpen(true);
    };

    const handleContactFromDetails = () => {
        setIsDetailsModalOpen(false);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-white-sand">
            {/* Navbar with working mobile menu */}
            <Navbar onOpenModal={() => setIsModalOpen(true)} currentPage="sales" />

            {/* Hero Section */}
            <section className="relative h-[400px] bg-gradient-to-br from-sandy-gold to-sunset-coral overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Properties for Sale in Rocky Point
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
                        Invest in paradise. Condos, houses, and land available for purchase.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="text-gray-700 font-medium">Property Type:</span>
                        {[
                            { value: 'all', label: 'All Properties' },
                            { value: 'condo', label: 'Condos & Penthouses' },
                            { value: 'house', label: 'Houses & Villas' },
                            { value: 'land', label: 'Land & Lots' },
                        ].map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setSelectedFilter(filter.value as any)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all ${selectedFilter === filter.value
                                    ? 'bg-sandy-gold text-dark-navy shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Benefits */}
            <section className="py-12 bg-gradient-to-br from-white to-sky-azure/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-sandy-gold text-3xl font-bold mb-2">15-20%</div>
                            <div className="text-sm text-gray-600">Annual ROI on rentals</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-sunset-coral text-3xl font-bold mb-2">30-40%</div>
                            <div className="text-sm text-gray-600">Lower prices than California</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="text-ocean-blue text-3xl font-bold mb-2">$0</div>
                            <div className="text-sm text-gray-600">Property tax (under certain conditions)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-dark-navy mb-2">
                            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} for Sale
                        </h2>
                        <p className="text-gray-600">
                            Find your perfect investment opportunity in Rocky Point
                        </p>
                    </div>

                    {filteredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} onViewDetails={(prop) => handleViewDetails(prop)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-dark-navy mb-2">No properties match your filter</h3>
                            <p className="text-gray-600 mb-6">Try selecting a different property type</p>
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className="bg-sandy-gold text-dark-navy px-6 py-3 rounded-full hover:bg-sandy-gold/90 transition-all font-medium"
                            >
                                Show All Properties
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Invest CTA */}
            <section className="py-20 bg-dark-navy text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Why Invest in Rocky Point?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div className="text-left">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sandy-gold rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-dark-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Growing Market</h3>
                                        <p className="text-white/80">Tourism increasing 15% year-over-year</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sandy-gold rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-dark-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">High ROI</h3>
                                        <p className="text-white/80">Rental income potential of $30-50k/year</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sandy-gold rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-dark-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Affordable Entry</h3>
                                        <p className="text-white/80">Properties starting from $150k USD</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sandy-gold rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-dark-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />

                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Secure Investment</h3>
                                        <p className="text-white/80">Fideicomiso (bank trust) protects buyers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-12 bg-sandy-gold text-dark-navy px-8 py-4 rounded-full hover:bg-sandy-gold/90 transition-all hover:-translate-y-1 shadow-2xl font-semibold text-lg"
                        >
                            Schedule an Investment Consultation
                        </button>
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
            <PropertyDetailsModal
                property={selectedProperty}
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                onContactAgent={handleContactFromDetails}
            />
        </main>
    );
}
