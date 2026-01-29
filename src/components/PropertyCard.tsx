'use client';

import { Property } from '@/types';
import { Button } from './ui/Button';
import Image from 'next/image';

interface PropertyCardProps {
    property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
    const formatPrice = () => {
        if (property.priceType === 'night') {
            return `$${property.price}/night`;
        }
        return `$${property.price.toLocaleString('en-US')}`;
    };

    const handleWhatsApp = () => {
        const message = `Hi! I'm interested in ${property.title} (${property.id}). Can you provide more information?`;
        const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="property-card group bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
            {/* Image */}
            <div className="relative h-60 overflow-hidden">
                <Image
                    src={`/properties/${property.images[0]}`}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Featured Badge */}
                {property.featured && (
                    <div className="absolute top-3 right-3 bg-[var(--sandy-gold)] text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide">
                        Featured
                    </div>
                )}

                {/* Property Type Badge */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase">
                    For {property.type === 'sale' ? 'Sale' : 'Rent'}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-xl font-bold text-[var(--dark-navy)] mb-2 line-clamp-1">
                    {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[var(--gray-600)] text-sm mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{property.location}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-[var(--gray-700)] mb-4 pb-4 border-b border-[var(--gray-200)]">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-5 h-5 text-[var(--sandy-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-medium">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-5 h-5 text-[var(--sandy-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span className="font-medium">{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-5 h-5 text-[var(--sandy-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="font-medium">Ocean View</span>
                    </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <span className="text-3xl font-bold text-dark-navy">
                        {formatPrice()}
                    </span>
                </div>

                {/* Description */}
                <p className="text-[var(--gray-600)] text-sm mb-4 line-clamp-2">
                    {property.description}
                </p>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="whatsapp"
                        size="sm"
                        onClick={handleWhatsApp}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.713 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        WhatsApp
                    </Button>
                    <Button variant="outline" size="sm">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
