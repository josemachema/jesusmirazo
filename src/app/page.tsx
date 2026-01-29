'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { PropertyCard } from '@/components/PropertyCard';
import { Testimonials } from '@/components/Testimonials';
import { FloatingContactButton } from '@/components/FloatingContactButton';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { useEngagement } from '@/contexts/EngagementContext';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { shouldShowModal, markModalShown } = useEngagement();

  useEffect(() => {
    if (shouldShowModal) {
      setIsModalOpen(true);
      markModalShown();
    }
  }, [shouldShowModal, markModalShown]);

  return (
    <div className="min-h-screen bg-white">
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
            <Link href="/" className="text-dark-navy hover:text-ocean-blue font-medium">Home</Link>
            <Link href="/sales" className="text-dark-navy hover:text-ocean-blue font-medium">Sales</Link>
            <Link href="/rentals" className="text-dark-navy hover:text-ocean-blue font-medium">Rentals</Link>
            <Link href="/about" className="text-dark-navy hover:text-ocean-blue font-medium">About</Link>
            <Link href="/contact" className="text-dark-navy hover:text-ocean-blue font-medium">Contact</Link>
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => setIsModalOpen(true)}
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
              className="block text-dark-navy hover:text-ocean-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/sales"
              className="block text-dark-navy hover:text-ocean-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sales
            </Link>
            <Link
              href="/rentals"
              className="block text-dark-navy hover:text-ocean-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rentals
            </Link>
            <Link
              href="/about"
              className="block text-dark-navy hover:text-ocean-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-dark-navy hover:text-ocean-blue font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-ocean-blue text-white px-6 py-3 rounded-lg hover:bg-sky-azure transition-colors font-semibold mt-2"
            >
              Get Started
            </button>
          </div>
        )}
      </header>

      <main>
        <HeroSection onOpenModal={() => setIsModalOpen(true)} />

        <section id="featured" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-dark-navy mb-4">
                Featured Properties
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover your dream property in Rocky Point
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PropertyCard property={{
                id: "1",
                title: "Las Palomas Beachfront Condo",
                price: 425000,
                priceType: "sale" as const,
                bedrooms: 3,
                bathrooms: 2,
                sqft: 1850,
                images: ["property-1.png"],
                location: "Sandy Beach",
                coordinates: { lat: 31.333, lng: -113.533 },
                description: "Stunning beachfront condo with ocean views",
                amenities: ["Pool", "Gym", "Security"],
                features: ["Ocean View", "Balcony", "Parking"],
                type: "sale" as const,
                featured: true,
                availableFrom: "2026-02-01",
                status: "available" as const
              }} />
              <PropertyCard property={{
                id: "2",
                title: "Sonoran Sea Resort",
                price: 389000,
                priceType: "sale" as const,
                bedrooms: 2,
                bathrooms: 2,
                sqft: 1400,
                images: ["property-2.png"],
                location: "Sandy Beach",
                coordinates: { lat: 31.335, lng: -113.535 },
                description: "Luxury resort condo with stunning views",
                amenities: ["Pool", "Beach Access", "Security"],
                features: ["Ocean View", "Balcony", "Parking"],
                type: "sale" as const,
                featured: true,
                availableFrom: "2026-02-01",
                status: "available" as const
              }} />
              <PropertyCard property={{
                id: "3",
                title: "Princesa de Peñasco",
                price: 350000,
                priceType: "sale" as const,
                bedrooms: 2,
                bathrooms: 2,
                sqft: 1250,
                images: ["property-3.png"],
                location: "Cholla Bay",
                coordinates: { lat: 31.320, lng: -113.520 },
                description: "Beautiful beachfront property",
                amenities: ["Pool", "Gym", "Beach Access"],
                features: ["Ocean View", "Balcony", "Parking"],
                type: "sale" as const,
                featured: true,
                availableFrom: "2026-02-01",
                status: "available" as const
              }} />
            </div>

            <div className="text-center mt-12">
              <Link href="/sales" className="inline-block bg-ocean-blue text-white px-8 py-4 rounded-lg hover:shadow-xl transition-all hover:-translate-y-1 font-semibold text-lg">
                View All Properties
              </Link>
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="py-20 bg-gradient-to-br from-ocean-blue to-sky-azure text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Contact me today for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/526381234567?text=Hi Jesus!" target="_blank" rel="noopener noreferrer" className="bg-white text-ocean-blue px-8 py-4 rounded-lg hover:shadow-2xl transition-all hover:-translate-y-1 font-semibold text-lg">
                Chat on WhatsApp
              </a>
              <button onClick={() => setIsModalOpen(true)} className="bg-white/10 backdrop-blur-md border-2 border-white/40 text-white px-8 py-4 rounded-lg hover:bg-white hover:text-ocean-blue transition-all hover:-translate-y-1 font-semibold text-lg">
                Request Free Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Image src="/logo-coldwell-banker.png" alt="Coldwell Banker" width={180} height={40} className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400">Your trusted Rocky Point real estate expert since 2008</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/sales" className="text-gray-400 hover:text-white">Properties for Sale</Link>
                <Link href="/rentals" className="text-gray-400 hover:text-white">Vacation Rentals</Link>
                <Link href="/about" className="text-gray-400 hover:text-white">About Jesus</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="flex flex-col gap-2 text-gray-400">
                <p>+52 638 123 4567</p>
                <p>jesus@rockypointjesus.com</p>
                <p>Rocky Point, Sonora, Mexico</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>2026 Jesus Mirazo - Rocky Point Real Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <FloatingContactButton onOpenModal={() => setIsModalOpen(true)} />
      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
