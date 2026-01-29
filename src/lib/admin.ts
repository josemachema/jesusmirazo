import { Lead, LeadStats } from '@/types/admin';

const LEADS_STORAGE_KEY = 'rocky_point_leads';
const AUTH_STORAGE_KEY = 'rocky_point_admin_auth';

// Mock admin credentials (en producción esto estaría en el backend)
const ADMIN_CREDENTIALS = {
    email: 'admin@rockypointjesus.com',
    password: 'admin123', // En producción usar hash
};

export function authenticateAdmin(email: string, password: string): boolean {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ email, loggedInAt: new Date().toISOString() }));
        return true;
    }
    return false;
}

export function isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const auth = localStorage.getItem(AUTH_STORAGE_KEY);
    return !!auth;
}

export function logoutAdmin(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function saveLeadToStorage(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Lead {
    const leads = getLeadsFromStorage();

    const newLead: Lead = {
        ...lead,
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'new',
        source: 'website',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    leads.push(newLead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));

    return newLead;
}

export function getLeadsFromStorage(): Lead[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!stored) {
        // Initialize with mock data
        const mockLeads = generateMockLeads();
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(mockLeads));
        return mockLeads;
    }

    return JSON.parse(stored);
}

export function updateLeadInStorage(leadId: string, updates: Partial<Lead>): Lead | null {
    const leads = getLeadsFromStorage();
    const index = leads.findIndex(l => l.id === leadId);

    if (index === -1) return null;

    leads[index] = {
        ...leads[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    return leads[index];
}

export function deleteLeadFromStorage(leadId: string): boolean {
    const leads = getLeadsFromStorage();
    const filtered = leads.filter(l => l.id !== leadId);

    if (filtered.length === leads.length) return false;

    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
}

export function getLeadStats(): LeadStats {
    const leads = getLeadsFromStorage();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const stats: LeadStats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        closed: leads.filter(l => l.status === 'closed').length,
        lost: leads.filter(l => l.status === 'lost').length,
        thisMonth: leads.filter(l => new Date(l.createdAt) >= startOfMonth).length,
        thisWeek: leads.filter(l => new Date(l.createdAt) >= startOfWeek).length,
        conversionRate: leads.length > 0
            ? Math.round((leads.filter(l => l.status === 'closed').length / leads.length) * 100)
            : 0,
    };

    return stats;
}

function generateMockLeads(): Lead[] {
    const mockLeads: Lead[] = [
        {
            id: 'lead_1',
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 (555) 123-4567',
            interest: 'buy',
            budget: '$200k-$300k',
            message: 'Looking for a beachfront condo for retirement. Prefer Las Conchas area.',
            status: 'qualified',
            source: 'website',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            notes: 'Very interested. Scheduled property tour for next week.',
        },
        {
            id: 'lead_2',
            name: 'Michael Chen',
            email: 'mchen@company.com',
            phone: '+1 (555) 234-5678',
            interest: 'rent',
            budget: '$150-$250/night',
            message: 'Family vacation in March. Need 3 bedrooms, close to beach.',
            status: 'contacted',
            source: 'website',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            notes: 'Sent 3 property options via email.',
        },
        {
            id: 'lead_3',
            name: 'David Martinez',
            email: 'david.m@gmail.com',
            phone: '+1 (555) 345-6789',
            interest: 'buy',
            budget: '$150k-$200k',
            message: 'Investment property. Looking for good rental income potential.',
            status: 'new',
            source: 'website',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'lead_4',
            name: 'Jennifer Williams',
            email: 'jwilliams@email.com',
            phone: '+1 (555) 456-7890',
            interest: 'rent',
            budget: '$200-$300/night',
            message: 'Anniversary trip in April. Oceanfront preferred.',
            status: 'closed',
            source: 'whatsapp',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            notes: 'Booked Las Palomas Resort condo for April 15-20. Paid deposit.',
        },
        {
            id: 'lead_5',
            name: 'Robert Taylor',
            email: 'rtaylor@company.com',
            phone: '+1 (555) 567-8901',
            interest: 'inquiry',
            budget: 'Not specified',
            message: 'General questions about buying process in Mexico.',
            status: 'contacted',
            source: 'website',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            notes: 'Sent buying guide PDF. Waiting for response.',
        },
    ];

    return mockLeads;
}
