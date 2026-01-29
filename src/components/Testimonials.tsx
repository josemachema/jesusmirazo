'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    propertyType: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Sarah & Mike Johnson',
        location: 'Phoenix, AZ',
        rating: 5,
        text: 'Jesus helped us find our dream beachfront condo in Las Conchas. His local knowledge and professionalism made the whole process smooth and stress-free. Highly recommend!',
        propertyType: 'Purchased Condo',
    },
    {
        id: '2',
        name: 'David Martinez',
        location: 'Tucson, AZ',
        rating: 5,
        text: "We've been renting out our Rocky Point property for 3 years now thanks to Jesus. He manages everything and we're making great returns. Best investment decision we made!",
        propertyType: 'Investment Property',
    },
    {
        id: '3',
        name: 'Jennifer & Tom Williams',
        location: 'San Diego, CA',
        rating: 5,
        text: 'Jesus found us the perfect vacation rental for our family reunion. Great location, amazing views, and he was always available to answer our questions. Will definitely rent again!',
        propertyType: 'Vacation Rental',
    },
];

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-dark-navy mb-4">
                        What My Clients Say
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Real experiences from real clients who found their Rocky Point paradise
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Main Testimonial Card */}
                    <div className="bg-gradient-to-br from-ocean-blue to-sky-azure rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                        {/* Decorative Quote */}
                        <div className="absolute top-8 left-8 text-white/20 text-8xl font-serif">"</div>

                        <div className="relative z-10">
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                    <svg key={i} className="w-6 h-6 text-sandy-gold" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed">
                                {testimonials[activeIndex].text}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold">{testimonials[activeIndex].name.charAt(0)}</span>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{testimonials[activeIndex].name}</div>
                                    <div className="text-white/80">{testimonials[activeIndex].location}</div>
                                    <div className="text-sandy-gold text-sm font-medium">{testimonials[activeIndex].propertyType}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`transition-all duration-300 rounded-full ${index === activeIndex
                                    ? 'w-12 h-3 bg-ocean-blue'
                                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`View testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* All Testimonials (Small Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {testimonials.map((testimonial, index) => (
                            <button
                                key={testimonial.id}
                                onClick={() => setActiveIndex(index)}
                                className={`text-left p-6 rounded-xl transition-all duration-300 ${index === activeIndex
                                    ? 'bg-ocean-blue/10 border-2 border-ocean-blue shadow-lg'
                                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-200 hover:shadow-md'
                                    }`}
                            >
                                <div className="flex gap-1 mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-sandy-gold" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 text-sm mb-3 line-clamp-3">{testimonial.text}</p>
                                <div className="font-semibold text-dark-navy text-sm">{testimonial.name}</div>
                                <div className="text-gray-500 text-xs">{testimonial.location}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
