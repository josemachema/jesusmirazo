export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Log pageview
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// Log specific events
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Track lead capture
export const trackLeadCapture = (source: string) => {
    event({
        action: 'lead_capture',
        category: 'Engagement',
        label: source,
    });
};

// Track property view
export const trackPropertyView = (propertyId: string, propertyTitle: string) => {
    event({
        action: 'property_view',
        category: 'Properties',
        label: `${propertyId} - ${propertyTitle}`,
    });
};

// Track contact click
export const trackContact = (method: 'whatsapp' | 'phone' | 'email') => {
    event({
        action: 'contact_click',
        category: 'Contact',
        label: method,
    });
};

// Extend Window interface for TypeScript
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}
