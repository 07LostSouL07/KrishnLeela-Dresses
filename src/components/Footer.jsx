import React from 'react';
import { Phone, MapPin, Clock, Mail, Sparkles, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-stone-100 dark:bg-[#070709] border-t border-stone-200 dark:border-stone-850 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-stone-200 dark:border-stone-800/80">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-luxury-gold mb-3">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.25em] font-sans font-medium">
                  Costumes & Stage Wear
                </span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-normal">
                KrishnLeela <span className="italic text-luxury-gold">Dresses</span>
              </h4>
              <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm font-sans font-light leading-relaxed max-w-sm">
                Providing high-quality character costumes, crafting original, handcrafted character costumes and divine attire with our own in-house creativity. Custom-tailored to bring your exact vision to life for every stage, competition, and celebration.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Costume bookings & custom fittings available daily
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 flex flex-col gap-4 text-sm font-sans">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-semibold">
              Get in Touch
            </span>

            {/* Contact Details */}
            <div className="flex items-start gap-3 text-stone-700 dark:text-stone-300">
              <div className="w-8 h-8 rounded-full bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center text-luxury-gold shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-stone-400 block">Contact Us</span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium tracking-wide">
                  <a href="tel:+919827815992" className="hover:text-luxury-gold transition-colors">
                    98278 15992
                  </a>
                  <span className="text-stone-400 text-xs hidden sm:inline">&bull;</span>
                  <a href="tel:+917803904356" className="hover:text-luxury-gold transition-colors">
                    78039 04356
                  </a>
                </div>
              </div>
            </div>

            {/* Email Contact */}
            <a
              href="mailto:krishnleelabhavandresswala@gmail.com"
              className="flex items-start gap-3 text-stone-700 dark:text-stone-300 hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center text-luxury-gold shrink-0 mt-0.5 group-hover:bg-luxury-gold/10 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-stone-400 block">E-mail</span>
                <span className="font-medium text-xs sm:text-sm break-all">krishnleelabhavandresswala@gmail.com</span>
              </div>
            </a>

            {/* Operating Hours */}
            <div className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
              <div className="w-8 h-8 rounded-full bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center text-luxury-gold shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-xs sm:text-sm space-y-0.5">
                <span className="text-xs text-stone-400 block">Opening Hours</span>
                <span className="text-stone-700 dark:text-stone-300">Mon &ndash; Sat &bull; 11:30 AM &ndash; 09:30 PM</span>
                <span className="text-stone-700 dark:text-stone-300">Sun &bull; 11:30 AM &ndash; 03:00 PM</span>
              </div>
            </div>
          </div>

          {/* Location & Map Link */}
          <div className="md:col-span-3 flex flex-col gap-4 text-sm font-sans">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-semibold">
              Shop Location
            </span>

            <a
              href="https://maps.app.goo.gl/PVKDqhtnwWZMKK9VA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View flagship store location on Google Maps"
              className="group p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-luxury-gold transition-all duration-300 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-luxury-gold">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    KrishnLeela Dresses
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-luxury-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <address className="mt-2 text-xs not-italic text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                266/A, Street No.4,New Ashoka Garden, Nearby Kaila Devi Kangan Store, Nearby Nehru School, Bhopal, Madhya Pradesh, 462023
              </address>
              <span className="mt-2 block text-[11px] text-luxury-gold underline underline-offset-2">
                Open in Google Maps
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Quiet Luxury Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-stone-500 dark:text-stone-400">
          <p>
            &copy; {currentYear} KrishnLeela Dresses. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Devotional & Divine</span>
            <span>&bull;</span>
            <span>Hygienically Clean</span>
            <span>&bull;</span>
            <span>School Functions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

