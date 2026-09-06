'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@zavora/config';

const SLIDES = [
  {
    id: 1,
    bg: 'from-pink-700 to-purple-800',
    badge: 'Health & Beauty',
    title: 'Healthy Choices. Beautiful You.',
    subtitle: 'Quality products for your everyday health, beauty & personal care.',
    price: '',
    oldPrice: '',
    note: '',
    cta: 'Shop Now',
    href: ROUTES.healthBeauty,
    imageSrc: 'https://address-restaurant2.odoo.com/web/image/2113-67ed1a66/pppp.webp',
    emoji: '',
  },
  {
    id: 2,
    bg: 'from-purple-600 to-pink-500',
    badge: 'Flash Sale',
    title: 'Fashion Week Deals',
    subtitle: 'Up to 70% off on top brands',
    price: 'From UGX 25,000',
    oldPrice: '',
    note: 'Ends midnight tonight',
    cta: 'Shop Fashion',
    href: ROUTES.fashion,
    imageSrc: 'https://address-restaurant2.odoo.com/web/image/2121-09657faa/Fashion.webp',
    emoji: '',
  },
  {
    id: 3,
    bg: 'from-cyan-700 to-blue-800',
    badge: 'Phones & Tablets',
    title: 'Stay Connected. Stay Ahead.',
    subtitle: 'Latest smartphones & tablets from top brands.',
    price: 'From UGX 450,000',
    oldPrice: '',
    note: 'Free delivery on orders above UGX 500,000',
    cta: 'Shop Phones & Tablets',
    href: ROUTES.phonesTablets,
    imageSrc: 'https://address-restaurant2.odoo.com/web/image/2131-4951a7e3/phone%20%26%20tablets.webp',
    emoji: '',
  },
  {
    id: 4,
    bg: 'from-slate-800 to-indigo-900',
    badge: 'Electronics',
    title: 'Power Up Your World.',
    subtitle: 'TVs, audio, cameras & more from top brands.',
    price: 'From UGX 150,000',
    oldPrice: '',
    note: 'Free delivery on orders above UGX 500,000',
    cta: 'Shop Electronics',
    href: ROUTES.electronics,
    imageSrc: 'https://address-restaurant2.odoo.com/web/image/2133-adfefa14/eletronics.webp',
    emoji: '',
  },
  {
    id: 5,
    bg: 'from-red-500 to-orange-400',
    badge: 'Hot Deal',
    title: 'Home Appliances Sale',
    subtitle: 'Fridges · Washing Machines · Microwaves',
    price: 'Up to 50% OFF',
    oldPrice: '',
    note: 'While stocks last',
    cta: 'Explore',
    href: ROUTES.homeAppliances,
    imageSrc: 'https://address-restaurant2.odoo.com/web/image/2117-c7221b29/appl.webp',
    emoji: '',
  },
  {
    id: 6,
    bg: 'from-emerald-800 to-teal-900',
    badge: 'Computing',
    title: 'Work Smarter. Create Faster.',
    subtitle: 'Laptops, desktops, monitors & accessories.',
    price: 'From UGX 850,000',
    oldPrice: '',
    note: 'Free laptop bag on orders above UGX 1.5M',
    cta: 'Shop Computing',
    href: ROUTES.computing,
    imageSrc: 'https://address-restaurant2.odoo.com/web/image/2137-0ad028ba/Computing.webp',
    emoji: '',
  },
  {
    id: 7,
    bg: 'from-pink-400 to-yellow-300',
    badge: 'Baby Products',
    title: 'Everything Your Baby Needs.',
    subtitle: 'Feeding, clothing, toys & care essentials.',
    price: 'From UGX 15,000',
    oldPrice: '',
    note: 'Safe & trusted products for your little one',
    cta: 'Shop Baby Products',
    href: ROUTES.babyProducts,
    imageSrc: 'https://address-restaurant2.odoo.com/web/image/2139-17f3d2c5/babies.webp',
    emoji: '',
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <section className="w-full px-4 py-3 sm:px-6 lg:px-8">
      <div
        className="relative rounded-2xl overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Sliding track */}
        <div
          className="flex"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: 'transform 700ms ease-in-out',
          }}
        >
          {SLIDES.map((slide) => (
            <Link key={slide.id} href={slide.href} className="min-w-full block">
              <div className={`bg-gradient-to-r ${slide.bg} relative flex h-[180px] items-center overflow-hidden sm:h-[220px] md:h-[280px]`}>
                {/* Text */}
                <div className="relative z-10 max-w-[55%] px-4 py-4 text-white sm:px-8 md:max-w-[52%] md:px-14 md:py-6">
                  {slide.badge && (
                    <span className="mb-1 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest sm:text-[10px] md:text-xs">
                      <span className="h-1 w-1 rounded-full bg-white sm:h-1.5 sm:w-1.5" />
                      {slide.badge}
                    </span>
                  )}
                  <h1 className="text-base font-extrabold leading-tight sm:text-xl md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="mt-0.5 text-[10px] text-white/80 sm:text-xs">{slide.subtitle}</p>
                  )}
                  <div className="mt-1 flex items-baseline gap-2">
                    {slide.price && <span className="text-[10px] text-white/80 sm:text-xs">{slide.price}</span>}
                    {slide.oldPrice && <span className="text-[10px] text-white/50 line-through sm:text-xs">{slide.oldPrice}</span>}
                  </div>
                  {slide.note && (
                    <p className="mt-0.5 hidden text-[10px] text-white/60 sm:block">{slide.note}</p>
                  )}
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full border-2 border-white bg-white px-3 py-1 text-[10px] font-bold text-gray-900 sm:mt-3 sm:px-5 sm:py-1.5 sm:text-xs">
                    {slide.cta} →
                  </span>
                </div>
                {/* Image */}
                <div className="absolute inset-y-0 right-0 w-[48%]">
                  <img src={slide.imageSrc} alt={slide.title} className="h-full w-full object-contain object-center" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-white' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
