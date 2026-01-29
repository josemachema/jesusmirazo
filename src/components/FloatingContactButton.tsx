'use client';

import { useState } from 'react';
import { useEngagement } from '@/contexts/EngagementContext';

interface FloatingContactButtonProps {
    onOpenModal: () => void;
}

export function FloatingContactButton({ onOpenModal }: FloatingContactButtonProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { clickCount, incrementClicks } = useEngagement();

    const handleMainClick = () => {
        setIsExpanded(!isExpanded);
        incrementClicks();
    };

    const handleWhatsApp = () => {
        incrementClicks();
        window.open('https://wa.me/526381234567?text=Hi! I found your listing on Rocky Point Jesus', '_blank');
    };

    const handlePhone = () => {
        incrementClicks();
        window.location.href = 'tel:+526381234567';
    };

    const handleEmail = () => {
        incrementClicks();
        onOpenModal();
        setIsExpanded(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
            {/* Click Counter Badge (visible when >= 1 click) */}
            {clickCount > 0 && clickCount < 3 && (
                <div className="bg-ocean-blue text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce">
                    {clickCount}/3 clicks
                </div>
            )}

            {/* Expanded Menu - State 2 */}
            {isExpanded && (
                <div className="flex flex-col gap-3 animate-fade-in">
                    {/* WhatsApp */}
                    <button
                        onClick={handleWhatsApp}
                        className="group flex items-center gap-3 bg-white text-gray-700 px-5 py-3 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <span className="font-medium">WhatsApp</span>
                        <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </div>
                    </button>

                    {/* Phone */}
                    <button
                        onClick={handlePhone}
                        className="group flex items-center gap-3 bg-white text-gray-700 px-5 py-3 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <span className="font-medium">Call Me</span>
                        <div className="w-12 h-12 bg-ocean-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                    </button>

                    {/* Email / Form */}
                    <button
                        onClick={handleEmail}
                        className="group flex items-center gap-3 bg-white text-gray-700 px-5 py-3 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <span className="font-medium">Get Info</span>
                        <div className="w-12 h-12 bg-sunset-coral rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </button>
                </div>
            )}

            {/* Main Button - State 1 */}
            <button
                onClick={handleMainClick}
                className={`relative w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${isExpanded ? 'bg-gray-500' : 'bg-gradient-to-br from-ocean-blue to-sky-azure'
                    }`}
                aria-label={isExpanded ? 'Close contact menu' : 'Open contact menu'}
            >
                {/* Pulse Animation Ring (only when not expanded) */}
                {!isExpanded && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-ocean-blue opacity-75 animate-ping"></span>
                )}

                <svg
                    className={`w-8 h-8 text-white relative z-10 transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isExpanded ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    )}
                </svg>

                {/* Badge with click indicator */}
                {clickCount > 0 && clickCount < 3 && !isExpanded && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-sunset-coral text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {clickCount}
                    </span>
                )}
            </button>
        </div>
    );
}
