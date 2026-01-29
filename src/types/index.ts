// Property types based on properties_data.json
export interface PropertyAmenity {
    name: string;
}

export interface PropertyFeature {
    name: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Property {
    id: string;
    type: 'sale' | 'rent';
    title: string;
    price: number;
    priceType: 'sale' | 'night';
    location: string;
    coordinates: Coordinates;
    description: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    amenities: string[];
    features: string[];
    images: string[];
    featured: boolean;
    availableFrom: string;
    yearBuilt?: number;
    hoa?: number;
    status: 'available' | 'pending' | 'sold';

    // Rental specific
    sleeps?: number;
    minStay?: number;
    maxOccupancy?: number;
    cleaningFee?: number;

    // Sale specific
    lotSize?: string;
    rentalIncome?: string;
}

export interface PropertyMetadata {
    totalProperties: number;
    forSale: number;
    forRent: number;
    featured: number;
    generated: string;
    location: string;
    currency: string;
    agent: {
        name: string;
        company: string;
        phone: string;
        email: string;
        whatsapp: string;
    };
}

export interface PropertiesData {
    properties: Property[];
    metadata: PropertyMetadata;
}

// Lead types
export interface Lead {
    id?: string;
    fullName: string;
    phone: string;
    email?: string;
    interestType: 'rent' | 'buy' | 'inquiry';
    desiredDates?: {
        from: string;
        to: string;
    };
    budget: number;
    message?: string;
    propertyId?: string;
    source: string; // 'modal', 'whatsapp', 'phone', 'email'
    status: 'nuevo' | 'contactado' | 'en-proceso' | 'cerrado' | 'perdido';
    createdAt: string;
    updatedAt: string;
}

// Engagement tracking
export interface EngagementEvent {
    type: 'property_click' | 'view_details' | 'gallery_open' | 'scroll_deep' | 'time_threshold';
    timestamp: number;
    propertyId?: string;
    metadata?: Record<string, any>;
}
