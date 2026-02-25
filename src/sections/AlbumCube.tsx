import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { albumCubeConfig } from '../config';
import { X, Check, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CubeProps {
  rotationProgress: number;
  onCubeClick: () => void;
}

const Cube = ({ rotationProgress, onCubeClick }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const textures = useTexture(albumCubeConfig.cubeTextures);

  // Responsive cube size
  const cubeSize = Math.min(viewport.width * 0.4, 3);

  useFrame(() => {
    if (meshRef.current) {
      // Map rotation progress (0-1) to rotation angles
      const targetRotationY = rotationProgress * Math.PI * 2;
      const targetRotationX = Math.sin(rotationProgress * Math.PI) * 0.3;

      // Smooth interpolation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      castShadow
      onClick={onCubeClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          roughness={0.2}
          metalness={0.1}
        />
      ))}
    </mesh>
  );
};

const AlbumCube = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setRotationProgress(progress);

        // Calculate current album index
        const albumIndex = Math.min(
          Math.floor(progress * 4),
          albumCubeConfig.albums.length - 1
        );
        setCurrentAlbumIndex(albumIndex);

        // Velocity-based blur effect
        const velocity = Math.abs(self.getVelocity());
        const targetBlur = Math.min(velocity / 500, 8);
        const targetSpacing = Math.min(velocity / 100, 30);

        setBlurAmount(prev => prev + (targetBlur - prev) * 0.2);
        setLetterSpacing(prev => prev + (targetSpacing - prev) * 0.2);
      },
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  // Modal animation
  useEffect(() => {
    if (modalRef.current) {
      if (modalOpen) {
        gsap.to(modalRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power3.out',
        });
      } else {
        gsap.to(modalRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.2,
          ease: 'power3.in',
        });
      }
    }
  }, [modalOpen]);

  const currentAlbum = albumCubeConfig.albums[currentAlbumIndex];

  const handleCubeClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Null check: if config is empty, do not render
  if (albumCubeConfig.albums.length === 0 || albumCubeConfig.cubeTextures.length === 0) {
    return null;
  }

  return (
    <section
      id="albums"
      ref={sectionRef}
      className="relative w-full h-screen bg-void-black overflow-hidden"
    >
      {/* Background title with blur effect */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          filter: `blur(${blurAmount}px)`,
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <h2 className="font-display text-[20vw] text-white/5 uppercase whitespace-nowrap select-none">
          {currentAlbum.subtitle}
        </h2>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <spotLight
              position={[-10, -10, -10]}
              angle={0.15}
              penumbra={1}
              intensity={0.5}
              color="#D4AF37"
            />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#FFD700" />
            <Cube rotationProgress={rotationProgress} onCubeClick={handleCubeClick} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Click hint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none">
        <div className="flex flex-col items-center gap-2 opacity-60">
          <div className="w-12 h-12 rounded-full border-2 border-gold/50 flex items-center justify-center animate-pulse">
            <Package className="w-6 h-6 text-gold" />
          </div>
          <span className="font-mono-custom text-xs text-gold/70 uppercase tracking-wider">Toca para ver paquetes</span>
        </div>
      </div>

      {/* Album info overlay */}
      <div className="absolute bottom-8 md:bottom-12 left-4 md:left-12 z-20 max-w-[80%] md:max-w-none">
        <p className="font-mono-custom text-[10px] md:text-xs text-gold/60 uppercase tracking-wider mb-1 md:mb-2">
          Servicio {String(currentAlbum.id).padStart(2, '0')} / {String(albumCubeConfig.albums.length).padStart(2, '0')}
        </p>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-1 md:mb-2 transition-all duration-300">
          {currentAlbum.title}
        </h3>
        <p className="font-mono-custom text-xs md:text-sm text-silver/70">
          {currentAlbum.subtitle}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-2 md:gap-3">
          {albumCubeConfig.albums.map((album, index) => (
            <div
              key={album.id}
              className={`w-1.5 md:w-2 rounded-full transition-all duration-300 ${
                index === currentAlbumIndex
                  ? 'bg-gold h-6 md:h-8 shadow-glow'
                  : 'bg-white/20 h-1.5 md:h-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 md:bottom-12 right-4 md:right-12 z-20">
        <p className="font-mono-custom text-[10px] md:text-xs text-white/40 uppercase tracking-wider">
          {albumCubeConfig.scrollHint}
        </p>
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-8 md:top-12 left-4 md:left-12 w-12 md:w-20 h-px bg-gradient-to-r from-gold/50 to-transparent" />
      <div className="absolute top-8 md:top-12 left-4 md:left-12 w-px h-12 md:h-20 bg-gradient-to-b from-gold/50 to-transparent" />

      {/* Modal Overlay */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-5xl max-h-[90vh] bg-void-dark border border-gold/30 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ opacity: 0, transform: 'scale(0.95)' }}
          >
            {/* Modal Header */}
            <div className="relative p-6 md:p-8 border-b border-white/10">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold/20 hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="pr-12">
                <p className="font-mono-custom text-xs text-gold/60 uppercase tracking-wider mb-2">
                  {currentAlbum.subtitle}
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
                  {currentAlbum.title}
                </h2>
                <p className="text-white/60 text-sm md:text-base max-w-2xl">
                  {currentAlbum.description}
                </p>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {currentAlbum.packages.map((pkg, index) => (
                  <div 
                    key={index}
                    className="relative p-5 md:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all duration-300 group"
                  >
                    {/* Package Header */}
                    <div className="mb-4">
                      <h3 className="font-display text-xl md:text-2xl text-white mb-1">
                        {pkg.name}
                      </h3>
                      <p className="text-gold font-mono-custom text-lg md:text-xl font-bold">
                        {pkg.price}
                      </p>
                      <p className="text-white/50 text-sm mt-1">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className="w-full mt-5 py-3 bg-gold/20 text-gold rounded-lg font-mono-custom text-sm uppercase tracking-wider hover:bg-gold hover:text-void-black transition-all duration-300">
                      Solicitar
                    </button>

                    {/* Popular Badge */}
                    {index === 1 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-void-black text-xs font-bold rounded-full">
                        MÁS POPULAR
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AlbumCube;
