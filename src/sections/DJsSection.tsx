import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Music2, ChevronLeft, ChevronRight, MapPin, Headphones } from 'lucide-react';
import { djsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const DJsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dj-header',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.dj-card',
        { y: 80, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? djsConfig.djs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === djsConfig.djs.length - 1 ? 0 : prev + 1));
  };

  // Mouse drag handlers for carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const activeDJ = djsConfig.djs[activeIndex];

  // Null check: if config is empty, do not render
  if (djsConfig.djs.length === 0) {
    return null;
  }

  return (
    <section
      id="djs"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-void-black py-16 md:py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-dark to-void-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="dj-header text-center mb-12 md:mb-16">
          <p className="font-mono-custom text-xs md:text-sm text-gold/60 uppercase tracking-[0.3em] mb-3">
            {djsConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {djsConfig.sectionTitle}
          </h2>
          <p className="font-mono-custom text-sm md:text-base text-white/50 max-w-2xl mx-auto">
            {djsConfig.sectionSubtitle}
          </p>
        </div>

        {/* Main DJ Display - Featured Card */}
        <div className="mb-8 md:mb-12">
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden bg-void-dark">
                <img
                  key={activeDJ.id}
                  src={activeDJ.image}
                  alt={activeDJ.name}
                  className="w-full h-full object-cover object-top transition-all duration-500 ease-out animate-fade-in"
                  style={{ 
                    animation: 'fadeIn 0.5s ease-out',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-black/70 via-void-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-void-black/10 lg:to-void-black/60" />
                
                {/* Experience Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-gold/90 backdrop-blur-sm rounded-full">
                  <span className="font-mono-custom text-xs text-void-black font-bold uppercase tracking-wider">
                    {activeDJ.experience} de experiencia
                  </span>
                </div>

                {/* Genre Tags */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {activeDJ.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-mono-custom text-white"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info Side */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                {/* DJ Name & Alias */}
                <div className="mb-6">
                  <p className="font-mono-custom text-gold text-sm uppercase tracking-wider mb-1">
                    {activeDJ.alias}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2">
                    {activeDJ.name}
                  </h3>
                </div>

                {/* Bio */}
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
                  {activeDJ.bio}
                </p>

                {/* Residencies */}
                <div className="mb-6">
                  <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Residencias
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeDJ.residencies.map((residency, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gold/10 border border-gold/30 rounded-lg text-xs font-mono-custom text-gold"
                      >
                        {residency}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {activeDJ.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${activeDJ.socialMedia.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-void-black transition-all duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {activeDJ.socialMedia.soundcloud && (
                    <a
                      href={`https://soundcloud.com/${activeDJ.socialMedia.soundcloud}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-void-black transition-all duration-300"
                    >
                      <Music2 className="w-5 h-5" />
                    </a>
                  )}
                  {activeDJ.socialMedia.spotify && (
                    <a
                      href={`https://open.spotify.com/artist/${activeDJ.socialMedia.spotify}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-void-black transition-all duration-300"
                    >
                      <Headphones className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">
            Desliza para explorar
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-void-black transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-void-black transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DJ Thumbnails Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {djsConfig.djs.map((dj, index) => (
            <div
              key={dj.id}
              onClick={() => setActiveIndex(index)}
              className={`dj-card flex-shrink-0 w-32 md:w-40 cursor-pointer transition-all duration-300 ${
                index === activeIndex
                  ? 'scale-105 opacity-100'
                  : 'scale-100 opacity-50 hover:opacity-75'
              }`}
            >
              <div className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === activeIndex ? 'border-gold shadow-glow' : 'border-white/10'
              }`}>
                <img
                  src={dj.image}
                  alt={dj.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 via-transparent to-transparent" />
                
                {/* Number badge */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                  <span className="font-mono-custom text-xs text-void-black font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-display text-sm text-white truncate">{dj.alias}</p>
                  <p className="font-mono-custom text-[10px] text-gold/80 truncate">{dj.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {djsConfig.djs.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-gold'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-12 left-12 w-20 h-px bg-gradient-to-r from-gold/50 to-transparent hidden lg:block" />
      <div className="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-gold/50 to-transparent hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-20 h-px bg-gradient-to-l from-gold/50 to-transparent hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-px h-20 bg-gradient-to-t from-gold/50 to-transparent hidden lg:block" />
    </section>
  );
};

export default DJsSection;
