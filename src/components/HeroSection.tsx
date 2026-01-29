'use client';

import Image from 'next/image';

interface HeroSectionProps {
    onOpenModal?: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
    return (
        <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden bg-gradient-to-br from-ocean-blue via-dark-navy to-deep-teal">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-beach.jpg"
                    alt="Rocky Point Beach"
                    fill
                    className="object-cover opacity-30"
                    priority
                    quality={90}
                />
                {/* Gradient Overlay - Stronger on left for Jesus visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/80 via-dark-navy/60 to-ocean-blue/70" />
            </div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Content Container */}
            <div className="relative h-full container mx-auto px-4 py-6 md:py-8">
                {/* Bilingual Greeting - Top */}
                <div className="mb-4 md:mb-6">
                    <h2 className="text-white/80 text-2xl md:text-3xl font-light tracking-widest">
                        HELLO <span className="text-sandy-gold">/</span> HOLA
                    </h2>
                </div>

                {/* Main Grid - Asymmetric Split */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">

                    {/* LEFT SIDE - Jesus Photo (Mobile: First, Desktop: 7 cols = 58%) */}
                    <div className="md:col-span-7 flex flex-col items-center md:items-start order-1">
                        {/* Decorative glow behind Jesus */}
                        <div className="absolute bottom-0 left-0 w-1/2 h-3/4 bg-gradient-to-t from-sandy-gold/20 via-ocean-blue/10 to-transparent blur-3xl" />

                        {/* Jesus Photo - Clean */}
                        <div className="relative z-10 drop-shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                            <Image
                                src="/jesus-mirazo-photo.png"
                                alt="Jesus Mirazo - Your Rocky Point Real Estate Expert"
                                width={600}
                                height={800}
                                className="object-contain object-bottom max-h-[50vh] md:max-h-[65vh] lg:max-h-[75vh]"
                                priority
                            />
                        </div>

                        {/* Stats Bar - Below Jesus */}
                        <div className="mt-3 md:mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                            <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-sandy-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-dark-navy font-bold text-[11px] md:text-xs whitespace-nowrap">Top Producer • 15 Years</span>
                            </div>
                            <div className="bg-gradient-to-r from-sandy-gold to-amber-500 text-white rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg">
                                <span className="font-bold text-[11px] md:text-xs whitespace-nowrap">500+ Clients • $50M Sales</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Editorial Content (Mobile: Second, Desktop: 5 cols = 42%) */}
                    <div className="md:col-span-5 order-2 space-y-4 md:space-y-5">

                        {/* Coldwell Banker Badge - HIGH VISIBILITY */}
                        <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 w-fit shadow-xl border-2 border-sandy-gold/30">
                            <Image
                                src="/logo-coldwell-banker.png"
                                alt="Coldwell Banker"
                                width={32}
                                height={32}
                                className="w-6 h-6 md:w-7 md:h-7"
                            />
                            <span className="text-dark-navy font-bold text-sm md:text-base">Certified Agent</span>
                        </div>

                        {/* Editorial Block - Navy Box */}
                        <div className="bg-dark-navy/90 backdrop-blur-md border border-sandy-gold/20 rounded-2xl p-6 md:p-8 shadow-2xl">
                            <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
                                Welcome to
                                <span className="block text-sandy-gold mt-1">Paradise</span>
                            </h1>

                            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
                                Discover the allure of beachfront living in Rocky Point, Mexico.
                            </p>

                            <p className="text-white/95 text-base md:text-lg leading-relaxed font-medium border-l-4 border-sandy-gold pl-4">
                                <strong className="text-sandy-gold">Jesus Mirazo</strong> — Your trusted local expert helping families find their dream homes by the sea.
                            </p>
                        </div>

                        {/* CTA Buttons - Integrated */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://wa.me/526381234567?text=Hi Jesus! I found your website and I'm interested in Rocky Point properties"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-[#25D366] text-white px-6 py-3.5 md:px-7 md:py-4 rounded-full hover:bg-[#20bd5a] transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 min-h-[52px]"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span className="hidden sm:inline">Chat on WhatsApp</span>
                                <span className="sm:hidden">WhatsApp</span>
                            </a>

                            <button
                                onClick={onOpenModal}
                                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/40 px-6 py-3.5 md:px-7 md:py-4 rounded-full hover:bg-white hover:text-dark-navy transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl font-bold text-sm md:text-base min-h-[52px]"
                            >
                                Get Property Info
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
