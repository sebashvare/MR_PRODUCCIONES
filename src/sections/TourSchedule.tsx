import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Ticket, ExternalLink } from 'lucide-react';
import { tourScheduleConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const TourSchedule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeVenue, setActiveVenue] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.tour-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-sale':
        return { text: tourScheduleConfig.statusLabels.onSale, color: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30' };
      case 'sold-out':
        return { text: tourScheduleConfig.statusLabels.soldOut, color: 'bg-rose-500/20 text-rose-700 border-rose-500/30' };
      case 'coming-soon':
        return { text: tourScheduleConfig.statusLabels.comingSoon, color: 'bg-amber-500/20 text-amber-700 border-amber-500/30' };
      default:
        return { text: tourScheduleConfig.statusLabels.default, color: 'bg-gray-500/20 text-gray-700 border-gray-500/30' };
    }
  };

  const TOUR_DATES = tourScheduleConfig.tourDates;

  // Null check: if config is empty, do not render
  if (tourScheduleConfig.tourDates.length === 0 && !tourScheduleConfig.sectionTitle) {
    return null;
  }

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-br from-[#D4AF37] via-[#B8941F] to-[#D4AF37] py-12 md:py-20 overflow-hidden"
    >
      {/* Rotating vinyl disc */}
      {tourScheduleConfig.vinylImage && (
        <div className="absolute top-6 md:top-12 right-4 md:right-12 lg:right-20 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 z-10 opacity-50 md:opacity-70 pointer-events-none">
          <img
            src={tourScheduleConfig.vinylImage}
            alt="Vinyl Disc"
            className="w-full h-full animate-spin-slow"
          />
        </div>
      )}

      {/* Content container */}
      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <p className="font-mono-custom text-[10px] md:text-xs text-[#1F1F1F]/70 uppercase tracking-wider mb-2">
            {tourScheduleConfig.sectionLabel}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#1F1F1F]">
            {tourScheduleConfig.sectionTitle}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left: Venue preview - takes 5 columns on large screens */}
          {TOUR_DATES.length > 0 && (
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-24">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={TOUR_DATES[activeVenue]?.image}
                    alt={TOUR_DATES[activeVenue]?.venue}
                    className="w-full h-full object-cover transition-all duration-700"
                  />

                  {/* Venue info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="font-display text-2xl md:text-3xl text-white mb-1">
                      {TOUR_DATES[activeVenue]?.venue}
                    </p>
                    <p className="font-mono-custom text-sm text-white/70 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {TOUR_DATES[activeVenue]?.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right: Tour list - takes 7 columns on large screens */}
          <div className="lg:col-span-7 space-y-3 md:space-y-4">
            {TOUR_DATES.map((tour, index) => {
              const status = getStatusLabel(tour.status);

              return (
                <div
                  key={tour.id}
                  className="tour-item group relative p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-white/60 backdrop-blur-sm border border-[#1F1F1F]/10 hover:bg-white/90 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveVenue(index)}
                  onMouseLeave={() => setActiveVenue(0)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 lg:gap-6">
                    {/* Date */}
                    <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0 min-w-[70px] sm:min-w-[80px]">
                      <p className="font-mono-custom text-xl sm:text-2xl md:text-3xl font-bold text-[#1F1F1F] leading-none">
                        {tour.date.split('.').slice(1).join('.')}
                      </p>
                      <p className="font-mono-custom text-xs text-[#1F1F1F]/50">
                        {tour.date.split('.')[0]}
                      </p>
                    </div>

                    {/* Divider - hidden on mobile */}
                    <div className="hidden sm:block w-px h-12 bg-[#1F1F1F]/10" />

                    {/* Venue info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-[#1F1F1F]/50 flex-shrink-0" />
                        <span className="font-display text-lg md:text-xl text-[#1F1F1F] truncate">
                          {tour.city}
                        </span>
                      </div>
                      <p className="text-sm text-[#1F1F1F]/60 ml-6 truncate">
                        {tour.venue}
                      </p>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-[#1F1F1F]/60 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono-custom text-sm">{tour.time}</span>
                    </div>

                    {/* Status badge */}
                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-semibold border ${status.color}`}>
                        {status.text}
                      </span>
                    </div>

                    {/* Action button */}
                    <div className="flex-shrink-0">
                      {tour.status === 'on-sale' ? (
                        <button className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-[#1F1F1F] text-white rounded-full text-xs md:text-sm font-medium hover:bg-[#050508] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                          <Ticket className="w-4 h-4" />
                          <span className="hidden sm:inline">{tourScheduleConfig.buyButtonText}</span>
                          <span className="sm:hidden">Comprar</span>
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 px-4 md:px-5 py-2.5 border-2 border-[#1F1F1F]/30 text-[#1F1F1F]/80 rounded-full text-xs md:text-sm font-medium hover:border-[#1F1F1F]/60 hover:text-[#1F1F1F] hover:bg-white/50 transition-all duration-300">
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">{tourScheduleConfig.detailsButtonText}</span>
                          <span className="sm:hidden">Detalles</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#1F1F1F] rounded-full group-hover:h-10 md:group-hover:h-14 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-16 lg:mt-20 text-center">
          <p className="font-mono-custom text-xs md:text-sm text-[#1F1F1F]/60 mb-4">
            {tourScheduleConfig.bottomNote}
          </p>
          <button className="px-8 md:px-10 py-3.5 md:py-4 bg-[#1F1F1F] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#050508] hover:shadow-xl hover:scale-105 transition-all duration-300">
            {tourScheduleConfig.bottomCtaText}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F1F1F]/20 to-transparent" />
    </section>
  );
};

export default TourSchedule;
