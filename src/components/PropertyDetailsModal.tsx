'use client';

import { Property } from '@/types';
import Image from 'next/image';

interface PropertyDetailsModalProps {
    property: Property | null;
    isOpen: boolean;
    onClose: () => void;
    onContactAgent: () => void;
}

export function PropertyDetailsModal({ property, isOpen, onClose, onContactAgent }: PropertyDetailsModalProps) {
    if (!property) return null;

    const formatPrice = () => {
        if (property.priceType === 'night') {
            return `$${property.price}/night`;
        }
        return `$${property.price.toLocaleString('en-US')}`;
    };

    const handleWhatsApp = () => {
        const message = `Hi! I'm interested in ${property.title}. Can you provide more information?`;
        const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={onClose}
        >
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop with fade animation */}
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                />

                {/* Modal with slide-up and scale animation */}
                <div
                    className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out ${isOpen
                            ? 'translate-y-0 opacity-100 scale-100'
                            : 'translate-y-8 opacity-0 scale-95'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button with hover animation */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 group"
                    >
                        <svg className="w-6 h-6 text-dark-navy group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Image Gallery with zoom effect */}
                    <div className="relative h-96 bg-gray-100 overflow-hidden group">
                        <Image
                            src={`/properties/${property.images[0]}`}
                            alt={property.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {property.featured && (
                            <div className="absolute top-4 left-4 bg-sandy-gold text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide animate-pulse">
                                Featured Property
                            </div>
                        )}
                        <div className="absolute bottom-4 left-4 bg-dark-navy text-white px-4 py-2 rounded-lg text-sm font-semibold uppercase backdrop-blur-sm">
                            For {property.type === 'sale' ? 'Sale' : 'Rent'}
                        </div>
                    </div>

                    {/* Content with staggered animations */}
                    <div className="p-8 space-y-6">
                        {/* Header - animated */}
                        <div className={`transform transition-all duration-500 delay-100 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                            <h2 className="text-3xl font-bold text-dark-navy mb-2">
                                {property.title}
                            </h2>
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-lg">{property.location}</span>
                            </div>
                        </div>

                        {/* Price - animated */}
                        <div className={`pb-6 border-b border-gray-200 transform transition-all duration-500 delay-200 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                            <span className="text-4xl font-bold text-ocean-blue animate-pulse">
                                {formatPrice()}
                            </span>
                        </div>

                        {/* Stats - animated with stagger */}
                        <div className={`grid grid-cols-3 gap-4 pb-6 border-b border-gray-200 transform transition-all duration-500 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                                <div className="w-12 h-12 bg-sky-azure/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-dark-navy">{property.bedrooms}</p>
                                    <p className="text-sm text-gray-600">Bedrooms</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 delay-75">
                                <div className="w-12 h-12 bg-sky-azure/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-dark-navy">{property.bathrooms}</p>
                                    <p className="text-sm text-gray-600">Bathrooms</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 delay-150">
                                <div className="w-12 h-12 bg-sky-azure/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-dark-navy">{property.sqft}</p>
                                    <p className="text-sm text-gray-600">Sq Ft</p>
                                </div>
                            </div>
                        </div>

                        {/* Description - animated */}
                        <div className={`transform transition-all duration-500 delay-400 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                            <h3 className="text-xl font-bold text-dark-navy mb-3">About This Property</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities - animated */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div className={`transform transition-all duration-500 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <h3 className="text-xl font-bold text-dark-navy mb-3">Amenities</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {property.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                            <svg className="w-5 h-5 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Features - animated */}
                        {property.features && property.features.length > 0 && (
                            <div className={`transform transition-all duration-500 delay-600 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <h3 className="text-xl font-bold text-dark-navy mb-3">Key Features</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {property.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                            <svg className="w-5 h-5 text-sandy-gold" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTAs - animated */}
                        <div className={`grid grid-cols-2 gap-4 sticky bottom-0 bg-white pt-4 border-t border-gray-200 transform transition-all duration-500 delay-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <button
                                onClick={handleWhatsApp}
                                className="bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#20BA5A] transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.713 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={onContactAgent}
                                className="bg-ocean-blue text-white px-6 py-4 rounded-xl hover:bg-sky-azure transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
                            >
                                Contact Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
