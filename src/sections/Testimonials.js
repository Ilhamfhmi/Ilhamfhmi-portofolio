'use client';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';
import { testimonials } from '@/data';

// Posisi partikel deterministik (hindari hydration mismatch)
const particles = [
  { left: '8%',  top: '18%', dur: 3.8, delay: 0.2, size: 1 },
  { left: '20%', top: '72%', dur: 4.2, delay: 1.1, size: 1.5 },
  { left: '33%', top: '40%', dur: 3.4, delay: 0.7, size: 1 },
  { left: '48%', top: '85%', dur: 4.8, delay: 0.3, size: 1 },
  { left: '62%', top: '22%', dur: 3.6, delay: 1.4, size: 1.5 },
  { left: '74%', top: '60%', dur: 4.1, delay: 0.9, size: 1 },
  { left: '88%', top: '35%', dur: 3.9, delay: 1.8, size: 1 },
  { left: '15%', top: '50%', dur: 4.5, delay: 0.5, size: 1.5 },
  { left: '55%', top: '75%', dur: 3.3, delay: 1.6, size: 1 },
  { left: '92%', top: '65%', dur: 4.0, delay: 0.4, size: 1.5 },
];

function QuoteIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7" aria-hidden="true">
      <path d="M9.333 6C5.284 6 2 9.284 2 13.333v4c0 4.049 3.284 7.334 7.333 7.334h1.334C11.403 24.667 12 24.07 12 23.333v-8C12 14.597 11.403 14 10.667 14H6.667C6.299 14 6 13.701 6 13.333v-2C6 9.985 7.985 8 10.333 8H10.667C11.403 8 12 7.403 12 6.667V6.333C12 5.597 11.403 5 10.667 5h-.001C10.22 5 9.774 5.004 9.333 6zm16 0C21.284 6 18 9.284 18 13.333v4c0 4.049 3.284 7.334 7.333 7.334h1.334C27.403 24.667 28 24.07 28 23.333v-8C28 14.597 27.403 14 26.667 14h-4C22.299 14 22 13.701 22 13.333v-2C22 9.985 23.985 8 26.333 8H26.667C27.403 8 28 7.403 28 6.667V6.333C28 5.597 27.403 5 26.667 5h-.001C26.22 5 25.774 5.004 25.333 6z" />
    </svg>
  );
}

function InitialAvatar({ name }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#272E40] to-[#4B4C4F] border border-white/10 flex items-center justify-center shrink-0">
      <span className="text-[11px] font-bold text-white/80 tracking-wide">{initials}</span>
    </div>
  );
}

// Card dengan border glow statis (selalu menyala, tanpa efek ngikutin kursor)
function GlowCard({ testimonial, isActive, onClick, shouldReduceMotion }) {
  const cardRef = useRef(null);

  // Hanya spotlight di dalam card yang masih ngikutin mouse
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }, [shouldReduceMotion]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className="relative rounded-2xl p-[1.5px] transition-all duration-500"
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(154,165,184,0.5) 0%, rgba(112,121,124,0.2) 40%, rgba(39,46,64,0.4) 70%, rgba(154,165,184,0.3) 100%)'
          : 'rgba(255,255,255,0.04)',
        boxShadow: isActive
          ? '0 0 30px rgba(112,121,124,0.18), 0 0 70px rgba(39,46,64,0.2)'
          : 'none'
      }}
    >
      {/* Inner card */}
      <div
        className={`relative rounded-[14px] p-5 md:p-6 flex flex-col gap-3.5 overflow-hidden transition-colors duration-500 ${
          isActive
            ? 'bg-[#141518] cursor-default'
            : 'bg-[#101113] cursor-pointer'
        }`}
      >
        {/* Spotlight di dalam card */}
        {isActive && (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[14px]"
            style={{
              background: 'radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(154,165,184,0.07), transparent 65%)'
            }}
          />
        )}

        {/* Quote icon */}
        <div className={`relative transition-colors duration-500 ${isActive ? 'text-white/75' : 'text-white/18'}`}>
          <QuoteIcon />
        </div>

        {/* Teks kutipan */}
        <div className="relative">
          <p className={`font-bold leading-snug tracking-tight transition-all duration-500 ${
            isActive ? 'text-xl md:text-2xl text-white' : 'text-lg text-white/50'
          }`}>
            {testimonial.quote.split(/(?<=\.|,)(\s)/)[0]}
          </p>
          {testimonial.quote.split(/(?<=\.|,)(\s)/).length > 1 && (
            <p className={`mt-2 text-xs leading-relaxed transition-colors duration-500 ${
              isActive ? 'text-gray-400' : 'text-gray-700'
            }`}>
              {testimonial.quote.split(/(?<=\.|,)(\s)/).slice(1).join('')}
            </p>
          )}
        </div>

        {/* Identitas */}
        <div className={`relative flex items-center gap-3 mt-auto pt-4 border-t transition-colors duration-500 ${
          isActive ? 'border-white/[0.08]' : 'border-white/[0.03]'
        }`}>
          <InitialAvatar name={testimonial.name} />
          <div>
            <p className={`text-sm font-semibold transition-colors duration-500 ${
              isActive ? 'text-white' : 'text-white/40'
            }`}>{testimonial.name}</p>
            <p className={`text-[11px] transition-colors duration-500 ${
              isActive ? 'text-gray-500' : 'text-gray-700'
            }`}>{testimonial.role} · {testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  const getOffset = (idx) => {
    let offset = idx - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const getCardStyle = (offset) => {
    const abs = Math.abs(offset);
    if (abs === 0) return {
      scale: 1, x: '0%', zIndex: 30, opacity: 1,
      filter: 'blur(0px) brightness(1)', pointerEvents: 'auto'
    };
    if (abs === 1) return {
      scale: 0.88, x: offset > 0 ? '66%' : '-66%', zIndex: 20,
      opacity: 0.55, filter: 'blur(2px) brightness(0.5)', pointerEvents: 'auto'
    };
    return {
      scale: 0.78, x: offset > 0 ? '115%' : '-115%', zIndex: 10,
      opacity: 0, filter: 'blur(6px) brightness(0.3)', pointerEvents: 'none'
    };
  };

  // Mouse tracking untuk 3D background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const gridX   = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const gridY   = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const orbAX   = useTransform(springX, [-0.5, 0.5], [-28, 28]);
  const orbAY   = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const orbBX   = useTransform(springX, [-0.5, 0.5], [22, -22]);
  const orbBY   = useTransform(springY, [-0.5, 0.5], [16, -16]);
  const tiltX   = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const tiltY   = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="testimonials"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0d0d0d] py-12 md:py-16 px-4 sm:px-6 overflow-hidden"
    >

      {/* ===== 3D Background ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">

        {/* Grid parallax */}
        <motion.div
          className="absolute -inset-8 opacity-[0.025]"
          style={shouldReduceMotion ? {} : { x: gridX, y: gridY }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)'
            }}
          />
        </motion.div>

        {/* Orb atas-kiri */}
        <motion.div
          className="absolute -top-32 right-1/4 w-[450px] h-[450px]"
          style={shouldReduceMotion ? {} : { x: orbAX, y: orbAY }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-bl from-[#272E40]/15 to-transparent blur-3xl"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Orb bawah-kanan */}
        <motion.div
          className="absolute bottom-0 -left-32 w-[400px] h-[400px]"
          style={shouldReduceMotion ? {} : { x: orbBX, y: orbBY }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-tr from-[#70797C]/12 to-transparent blur-3xl"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </motion.div>

        {/* Floating particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size * 4}px`,
              height: `${p.size * 4}px`
            }}
            animate={shouldReduceMotion ? {} : {
              y: [-8, 8, -8],
              opacity: [0.15, 0.4, 0.15],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-effect-badge px-4 py-1.5 rounded-full mb-5"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#70797C] to-white" />
            <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.1]"
          >
            Hear From People{' '}
            <span className="bg-gradient-to-r from-[#9aa5b8] via-[#70797C] to-[#9aa5b8] bg-clip-text text-transparent">
              I&apos;ve Worked With
            </span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mt-4 text-sm md:text-base text-gray-400 max-w-md leading-relaxed"
          >
            From project teammates to organization partners, here&apos;s what they say about working with me.
          </motion.p>
        </div>

        {/* Carousel dengan 3D tilt */}
        <motion.div
          className="relative flex items-center justify-center"
          style={shouldReduceMotion ? { height: '280px' } : {
            height: '280px',
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
            perspective: '1200px'
          }}
        >
          {testimonials.map((t, idx) => {
            const offset   = getOffset(idx);
            const style    = getCardStyle(offset);
            const isActive = offset === 0;

            return (
              <motion.div
                key={t.id}
                animate={shouldReduceMotion ? {} : {
                  scale: style.scale,
                  x: style.x,
                  opacity: style.opacity,
                  filter: style.filter,
                  zIndex: style.zIndex
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className={`absolute w-full max-w-[460px] ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                style={{ pointerEvents: style.pointerEvents, zIndex: style.zIndex }}
              >
                <GlowCard
                  testimonial={t}
                  isActive={isActive}
                  onClick={() => !isActive && setActive(idx)}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Navigator: panah + dots */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <motion.button
            onClick={prev}
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
            className="glass-effect-badge w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300"
            aria-label="Testimoni sebelumnya"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Pilih testimoni">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                role="tab"
                aria-selected={idx === active}
                aria-label={`Testimoni ${idx + 1}`}
                className="relative h-[3px] rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ width: idx === active ? '28px' : '10px' }}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-colors duration-500 ${
                    idx === active ? 'bg-white' : 'bg-white/25'
                  }`}
                />
              </button>
            ))}
          </div>

          <motion.button
            onClick={next}
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
            className="glass-effect-badge w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300"
            aria-label="Testimoni berikutnya"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}