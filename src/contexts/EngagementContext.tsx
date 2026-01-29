'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EngagementContextType {
    clickCount: number;
    incrementClicks: () => void;
    resetClicks: () => void;
    shouldShowModal: boolean;
    markModalShown: () => void;
}

const EngagementContext = createContext<EngagementContextType | undefined>(undefined);

export function EngagementProvider({ children }: { children: ReactNode }) {
    const [clickCount, setClickCount] = useState(0);
    const [modalShown, setModalShown] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCount = localStorage.getItem('engagement_click_count');
        const savedModalShown = localStorage.getItem('engagement_modal_shown');

        if (savedCount) {
            setClickCount(parseInt(savedCount, 10));
        }
        if (savedModalShown === 'true') {
            setModalShown(true);
        }
    }, []);

    const incrementClicks = () => {
        setClickCount(prev => {
            const newCount = prev + 1;
            localStorage.setItem('engagement_click_count', newCount.toString());
            return newCount;
        });
    };

    const resetClicks = () => {
        setClickCount(0);
        setModalShown(false);
        localStorage.removeItem('engagement_click_count');
        localStorage.removeItem('engagement_modal_shown');
    };

    const markModalShown = () => {
        setModalShown(true);
        localStorage.setItem('engagement_modal_shown', 'true');
    };

    const shouldShowModal = clickCount >= 3 && !modalShown;

    return (
        <EngagementContext.Provider
            value={{
                clickCount,
                incrementClicks,
                resetClicks,
                shouldShowModal,
                markModalShown,
            }}
        >
            {children}
        </EngagementContext.Provider>
    );
}

export function useEngagement() {
    const context = useContext(EngagementContext);
    if (!context) {
        throw new Error('useEngagement must be used within EngagementProvider');
    }
    return context;
}
