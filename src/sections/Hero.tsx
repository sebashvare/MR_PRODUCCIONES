import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar, Menu, X, Users } from 'lucide-react';
import { heroConfig } from '../config';

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
  users: Users,
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(' '.repeat(heroConfig.decodeText?.length || 0));
  const [isDecoding, setIsDecoding] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const TARGET_TEXT = heroConfig.decodeText;
  const CHARS = heroConfig.decodeChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  // Decode text effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [TARGET_TEXT, CHARS]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: 0.3,
          ease: 'power3.out',
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          duration: 0.3,
          ease: 'power3.in',
        });
      }
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Null check: if config is empty, do not render
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-void-black"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroConfig.backgroundImage})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 video-overlay" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-black/30 to-void-black" />
      </div>

      {/* Desktop Navigation pill - hidden on mobile */}
      <nav
        ref={navRef}
        className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2"
      >
        <div className="flex items-center gap-1">
          {heroConfig.navItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Button - visible only on mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold/20 hover:border-gold/50 transition-all"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed inset-y-0 right-0 w-[280px] bg-void-black/95 backdrop-blur-xl z-40 transform translate-x-full"
        style={{ boxShadow: '-10px 0 40px rgba(0,0,0,0.5)' }}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <div className="flex flex-col gap-2">
            {heroConfig.navItems.map((item, index) => {
              const IconComponent = ICON_MAP[item.icon];
              return (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="flex items-center gap-4 px-4 py-4 text-left font-mono-custom uppercase tracking-wider text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile CTA Buttons */}
          <div className="mt-auto pb-8 space-y-3">
            <button
              onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
              className="w-full px-6 py-4 bg-gold text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-gold-bright transition-colors shadow-glow"
            >
              {heroConfig.ctaPrimary}
            </button>
            <button
              onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
              className="w-full px-6 py-4 border border-gold/50 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              {heroConfig.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 md:pb-20 px-4">
        {/* Logo / Brand */}
        <div className="absolute top-4 md:top-6 left-4 md:left-8 z-50">
          <div className="flex items-center gap-3">
            {heroConfig.logoImage && (
              <img 
                src={heroConfig.logoImage} 
                alt={heroConfig.brandName}
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}
              />
            )}
          </div>
        </div>

        {/* Main title with decode effect */}
        <h1
          ref={titleRef}
          className="decode-text text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-bold text-white leading-none tracking-tighter mb-4 text-center"
        >
          <span className={`${isDecoding ? 'text-glow-cyan gradient-text' : 'gradient-text'} transition-all duration-300`}>
            {displayText}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono-custom text-xs sm:text-sm md:text-base text-silver/70 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 max-w-xl md:max-w-2xl text-center px-4"
        >
          {heroConfig.subtitle}
        </p>

        {/* CTA Buttons - Desktop */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
            className="px-8 py-3 bg-gold text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-gold-bright transition-colors duration-300 shadow-glow"
          >
            {heroConfig.ctaPrimary}
          </button>
          <button
            onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
            className="px-8 py-3 border border-gold/50 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-gold hover:text-gold transition-colors duration-300"
          >
            {heroConfig.ctaSecondary}
          </button>
        </div>

        {/* CTA Buttons - Mobile */}
        <div className="flex md:hidden gap-3">
          <button
            onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
            className="px-6 py-3 bg-gold text-void-black font-display text-xs uppercase tracking-wider rounded-full hover:bg-gold-bright transition-colors duration-300 shadow-glow"
          >
            {heroConfig.ctaPrimary}
          </button>
          <button
            onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
            className="px-6 py-3 border border-gold/50 text-white font-display text-xs uppercase tracking-wider rounded-full hover:border-gold hover:text-gold transition-colors duration-300"
          >
            {heroConfig.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Corner accents - hidden on small mobile */}
      <div className="hidden sm:block absolute top-8 right-8 text-right">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">{heroConfig.cornerLabel}</p>
        <p className="font-mono-custom text-xs text-gold/60">{heroConfig.cornerDetail}</p>
      </div>
    </section>
  );
};

export default Hero;
