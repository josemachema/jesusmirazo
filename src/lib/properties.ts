import { Property } from '@/types';
import propertiesData from '@/data/properties.json';

export function getAllProperties(): Property[] {
    return (propertiesData as any).properties;
}

export function getFeaturedProperties(): Property[] {
    return getAllProperties().filter(p => p.featured);
}

export function getPropertiesForSale(): Property[] {
    return getAllProperties().filter(p => p.type === 'sale');
}

export function getPropertiesForRent(): Property[] {
    return getAllProperties().filter(p => p.type === 'rent');
}

export function getPropertyById(id: string): Property | undefined {
    return getAllProperties().find(p => p.id === id);
}
