'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminAuthenticated, getLeadStats, getLeadsFromStorage, updateLeadInStorage, deleteLeadFromStorage } from '@/lib/admin';
import { Lead, LeadStats } from '@/types/admin';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<LeadStats | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

    useEffect(() => {
        // Check authentication
        if (!isAdminAuthenticated()) {
            router.push('/admin/login');
            return;
        }

        // Load data
        loadData();
    }, [router]);

    useEffect(() => {
        // Apply filters
        let filtered = leads;

        if (filterStatus !== 'all') {
            filtered = filtered.filter(l => l.status === filterStatus);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(l =>
                l.name.toLowerCase().includes(query) ||
                l.email.toLowerCase().includes(query) ||
                l.phone.includes(query)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return a.name.localeCompare(b.name);
            }
        });

        setFilteredLeads(filtered);
    }, [leads, filterStatus, searchQuery, sortBy]);

    const loadData = () => {
        setStats(getLeadStats());
        setLeads(getLeadsFromStorage());
    };

    const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
        updateLeadInStorage(leadId, { status: newStatus });
        loadData();
        if (selectedLead?.id === leadId) {
            const updated = getLeadsFromStorage().find(l => l.id === leadId);
            if (updated) setSelectedLead(updated);
        }
    };

    const handleDeleteLead = (leadId: string) => {
        if (confirm('Are you sure you want to delete this lead?')) {
            deleteLeadFromStorage(leadId);
            loadData();
            if (selectedLead?.id === leadId) {
                setSelectedLead(null);
            }
        }
    };

    const handleAddNote = (leadId: string, note: string) => {
        updateLeadInStorage(leadId, { notes: note });
        loadData();
        if (selectedLead?.id === leadId) {
            const updated = getLeadsFromStorage().find(l => l.id === leadId);
            if (updated) setSelectedLead(updated);
        }
    };

    const getStatusColor = (status: Lead['status']) => {
        const colors = {
            new: 'bg-blue-100 text-blue-700',
            contacted: 'bg-yellow-100 text-yellow-700',
            qualified: 'bg-purple-100 text-purple-700',
            closed: 'bg-green-100 text-green-700',
            lost: 'bg-gray-100 text-gray-700',
        };
        return colors[status];
    };

    const getInterestBadge = (interest: Lead['interest']) => {
        const badges = {
            rent: { color: 'bg-sky-100 text-sky-700', label: 'Rental' },
            buy: { color: 'bg-orange-100 text-orange-700', label: 'Purchase' },
            inquiry: { color: 'bg-gray-100 text-gray-700', label: 'Inquiry' },
        };
        return badges[interest];
    };

    if (!stats) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-ocean-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Image
                                src="/logo-coldwell-banker.png"
                                alt="Coldwell Banker"
                                width={160}
                                height={40}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <h1 className="text-xl font-bold text-dark-navy">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-ocean-blue transition-colors"
                        >
                            View Site
                        </Link>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to logout?')) {
                                    localStorage.removeItem('rocky_point_admin_auth');
                                    router.push('/admin/login');
                                }
                            }}
                            className="text-gray-600 hover:text-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-500">Total</span>
                        </div>
                        <div className="text-3xl font-bold text-dark-navy mb-1">{stats.total}</div>
                        <div className="text-sm text-gray-600">All Leads</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-500">This Week</span>
                        </div>
                        <div className="text-3xl font-bold text-dark-navy mb-1">{stats.thisWeek}</div>
                        <div className="text-sm text-gray-600">New This Week</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-500">Qualified</span>
                        </div>
                        <div className="text-3xl font-bold text-dark-navy mb-1">{stats.qualified}</div>
                        <div className="text-sm text-gray-600">Ready to Close</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-500">Conv. Rate</span>
                        </div>
                        <div className="text-3xl font-bold text-dark-navy mb-1">{stats.conversionRate}%</div>
                        <div className="text-sm text-gray-600">{stats.closed} Closed</div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Leads List */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                        {/* Filters */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                                />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                                >
                                    <option value="date">Sort by Date</option>
                                    <option value="name">Sort by Name</option>
                                </select>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {['all', 'new', 'contacted', 'qualified', 'closed', 'lost'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${filterStatus === status
                                                ? 'bg-ocean-blue text-white shadow-sm'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status} {status !== 'all' && `(${leads.filter(l => l.status === status).length})`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Leads Table */}
                        <div className="overflow-x-auto">
                            {filteredLeads.length > 0 ? (
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lead</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Interest</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredLeads.map((lead) => (
                                            <tr
                                                key={lead.id}
                                                onClick={() => setSelectedLead(lead)}
                                                className={`cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-dark-navy">{lead.name}</div>
                                                    <div className="text-sm text-gray-600">{lead.email}</div>
                                                    <div className="text-sm text-gray-500">{lead.phone}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getInterestBadge(lead.interest).color}`}>
                                                        {getInterestBadge(lead.interest).label}
                                                    </span>
                                                    <div className="text-sm text-gray-600 mt-1">{lead.budget}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                                                        {lead.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {new Date(lead.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No leads found</h3>
                                    <p className="text-gray-600">Try adjusting your filters or search query</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lead Detail Panel */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        {selectedLead ? (
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-dark-navy mb-1">{selectedLead.name}</h3>
                                        <p className="text-sm text-gray-600">{selectedLead.email}</p>
                                        <p className="text-sm text-gray-600">{selectedLead.phone}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteLead(selectedLead.id)}
                                        className="text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-2">Status</label>
                                        <select
                                            value={selectedLead.status}
                                            onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead['status'])}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="closed">Closed</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Interest</div>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getInterestBadge(selectedLead.interest).color}`}>
                                            {getInterestBadge(selectedLead.interest).label}
                                        </span>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Budget</div>
                                        <div className="text-sm text-gray-900">{selectedLead.budget}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Message</div>
                                        <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                                            {selectedLead.message || 'No message provided'}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Source</div>
                                        <div className="text-sm text-gray-900 capitalize">{selectedLead.source}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Created</div>
                                        <div className="text-sm text-gray-900">
                                            {new Date(selectedLead.createdAt).toLocaleString()}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Last Updated</div>
                                        <div className="text-sm text-gray-900">
                                            {new Date(selectedLead.updatedAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Notes</label>
                                    <textarea
                                        defaultValue={selectedLead.notes || ''}
                                        onBlur={(e) => {
                                            if (e.target.value !== selectedLead.notes) {
                                                handleAddNote(selectedLead.id, e.target.value);
                                            }
                                        }}
                                        placeholder="Add notes about this lead..."
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue resize-none"
                                    />
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <a
                                        href={`mailto:${selectedLead.email}`}
                                        className="flex-1 bg-ocean-blue text-white px-4 py-2 rounded-lg hover:bg-ocean-blue/90 transition-colors text-center font-medium"
                                    >
                                        Email
                                    </a>
                                    <a
                                        href={`tel:${selectedLead.phone}`}
                                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
                                    >
                                        Call
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No lead selected</h3>
                                <p className="text-gray-600">Click on a lead to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
