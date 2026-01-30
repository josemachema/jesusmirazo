'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import Image from 'next/image';
import { saveLeadToStorage } from '@/lib/admin';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId?: string;
    propertyTitle?: string;
}

export function LeadCaptureModal({ isOpen, onClose, propertyId, propertyTitle }: LeadCaptureModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        interestType: 'inquiry' as 'rent' | 'buy' | 'inquiry',
        budget: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setSubmitted(false);
            setFormData({
                fullName: '',
                phone: '',
                email: '',
                interestType: 'inquiry',
                budget: '',
                message: '',
            });
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simular envío
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save lead to localStorage
        saveLeadToStorage({
            name: formData.fullName,
            phone: formData.phone,
            email: formData.email || `noemail_${Date.now()}@temp.com`,
            interest: formData.interestType,
            budget: formData.budget || 'Not specified',
            message: formData.message || (propertyTitle ? `Interested in: ${propertyTitle}` : ''),
            source: 'website',
        });


        setIsSubmitting(false);
        setSubmitted(true);

        // Auto-close after success
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <div className="hidden md:block md:w-2/5 relative bg-gradient-to-br from-ocean-blue to-sky-azure">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                        <svg className="w-16 h-16 mb-4 text-sandy-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <h3 className="text-2xl font-bold text-center mb-2">Let's Find Your Perfect Property</h3>
                        <p className="text-center text-white/90">
                            Share your details and I'll send you personalized recommendations
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="md:w-3/5 p-8 overflow-y-auto">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {submitted ? (
                        // Success State
                        <div className="flex flex-col items-center justify-center h-full text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-dark-navy mb-4">¡Gracias {formData.fullName.split(' ')[0]}!</h2>
                            <p className="text-gray-600 max-w-md mb-2">
                                I'll review your information and contact you shortly with personalized property recommendations.
                            </p>
                            <p className="text-sm text-gray-500">
                                Expect to hear from me within 24 hours!
                            </p>
                        </div>
                    ) : (
                        // Form State
                        <>
                            <h2 className="text-3xl font-bold text-dark-navy mb-2">
                                I See You're Interested!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Let me help you personally find the perfect property in Rocky Point
                            </p>

                            {propertyTitle && (
                                <div className="mb-6 p-4 bg-sky-azure/10 border border-sky-azure/20 rounded-lg">
                                    <p className="text-sm text-gray-600">Interested in:</p>
                                    <p className="font-semibold text-dark-navy">{propertyTitle}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                {/* Email (optional) */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Interest Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        I'm interested in: *
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['rent', 'buy', 'inquiry'].map((type) => (
                                            <label
                                                key={type}
                                                className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${formData.interestType === type
                                                    ? 'border-ocean-blue bg-ocean-blue/5'
                                                    : 'border-gray-300 hover:border-ocean-blue/50'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="interestType"
                                                    value={type}
                                                    checked={formData.interestType === type}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <span className="font-medium capitalize">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget */}
                                <div>
                                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                        Budget Range
                                    </label>
                                    <input
                                        type="text"
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all"
                                        placeholder="e.g., $200-300/night or $300k-500k"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Details (Optional)
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={3}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent transition-all resize-none"
                                        placeholder="Tell me about your ideal property, dates, number of guests, etc."
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send My Information'
                                    )}
                                </Button>

                                {/* Security & Privacy Message */}
                                <div className="mt-4 flex items-start gap-2 bg-sky-azure/10 p-3 rounded-lg border border-sky-azure/30">
                                    <svg className="w-5 h-5 text-ocean-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-semibold text-dark-navy">Your Information is Safe</p>
                                        <p className="text-xs text-gray-600 mt-0.5">
                                            We never share your data. 24-hour response guarantee.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By submitting, you agree to be contacted about Rocky Point properties
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
