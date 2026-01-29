export interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    interest: 'rent' | 'buy' | 'inquiry';
    budget: string;
    message: string;
    status: 'new' | 'contacted' | 'qualified' | 'closed' | 'lost';
    source: 'website' | 'whatsapp' | 'phone' | 'referral';
    createdAt: string;
    updatedAt: string;
    notes?: string;
}

export interface LeadStats {
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    closed: number;
    lost: number;
    thisMonth: number;
    thisWeek: number;
    conversionRate: number;
}

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'agent';
}
