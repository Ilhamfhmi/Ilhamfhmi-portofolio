'use client';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

const floatingCursors = [
  {
    text: 'Web Developer',
    position: 'top-[48%] left-2 lg:left-10',
    side: 'left',
    floatDelay: 0,
    depth: 16,
    rotate3d: { x: -10, y: 15 }
  },
  {
    text: 'Design & Code',
    position: 'bottom-4 left-[10%] lg:left-[14%]',
    side: 'left',
    floatDelay: 0.8,
    depth: -11,
    rotate3d: { x: 5, y: 10 }
  },
  {
    text: 'QA Tester',
    position: 'top-[48%] right-2 lg:right-10',
    side: 'right',
    floatDelay: 0.4,
    depth: 13,
    rotate3d: { x: -8, y: -15 }
  },
  {
    text: 'Tech & Business',
    position: 'bottom-4 right-[10%] lg:right-[14%]',
    side: 'right',
    floatDelay: 1.2,
    depth: -18,
    rotate3d: { x: 5, y: -12 }
  }
];

const taglineWords = [
  { t: 'Turning' }, { t: 'Your' }, { t: 'Digital' }, { t: 'Dreams' },
  { t: 'Into' }, { t: 'A' },
  { t: 'Vibrant', em: true }, { t: 'And', em: true }, { t: 'Successful', em: true },
  { t: 'Reality' }, { t: 'With' }, { t: 'Expert' },
  { t: 'Precision', em: true }, { t: 'And', em: true }, { t: 'Creativity', em: true }
];

// Posisi partikel HARUS deterministik (bukan Math.random di render)
// supaya hasil render server dan client identik. Random di render = hydration error.
const particles = [
  { left: '8%', top: '22%', dur: 3.4, delay: 0.2 },
  { left: '17%', top: '68%', dur: 4.1, delay: 1.1 },
  { left: '26%', top: '35%', dur: 3.8, delay: 0.6 },
  { left: '34%', top: '80%', dur: 4.6, delay: 1.8 },
  { left: '43%', top: '15%', dur: 3.2, delay: 0.9 },
  { left: '52%', top: '72%', dur: 4.3, delay: 0.3 },
  { left: '61%', top: '28%', dur: 3.6, delay: 1.5 },
  { left: '68%', top: '60%', dur: 4.8, delay: 0.7 },
  { left: '76%', top: '18%', dur: 3.9, delay: 1.2 },
  { left: '84%', top: '75%', dur: 3.3, delay: 0.4 },
  { left: '91%', top: '42%', dur: 4.4, delay: 1.7 },
  { left: '95%', top: '58%', dur: 3.7, delay: 0.8 }
];

function GlassCursorIcon({ mirrored, idx }) {
  // id gradient harus unik per instance, kalau tidak akan duplikat di DOM
  const gradId = `cursorGrad-${idx}`;
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 md:w-5 md:h-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] ${
        mirrored ? '-scale-x-100' : ''
      }`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(112,121,124,0.4)" />
        </linearGradient>
      </defs>
      <path
        d="M5.5 3.5L18.8 11c.75.42.6 1.54-.24 1.75l-5.4 1.36-2.9 4.73c-.45.73-1.58.5-1.7-.35L5.5 3.5z"
        fill={`url(#${gradId})`}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingCursor({ cursor, idx, springX, springY, shouldReduceMotion }) {
  // SEMUA hooks dipanggil tanpa syarat di atas.
  // Hook tidak boleh berada di dalam ternary (shouldReduceMotion ? {} : {...useTransform})
  // karena jumlah hook per render harus selalu konsisten.
  const x = useTransform(springX, [-0.5, 0.5], [-cursor.depth, cursor.depth]);
  const y = useTransform(springY, [-0.5, 0.5], [-cursor.depth * 0.6, cursor.depth * 0.6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [cursor.rotate3d.x, -cursor.rotate3d.x]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-cursor.rotate3d.y, cursor.rotate3d.y]);
  const shadowOpacity = useTransform(springX, [-0.5, 0.5], [0.3, 0.7]);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        delay: idx * 0.2,
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={`absolute ${cursor.position} hidden md:block z-10 group`}
      style={{ perspective: '1000px' }}
    >
      {/* 3D Transform Layer */}
      <motion.div
        style={shouldReduceMotion ? {} : {
          x, y,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative"
      >
        {/* 3D Shadow (menambah depth) */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#272E40]/20 to-[#70797C]/10 blur-xl"
          style={shouldReduceMotion ? { opacity: 0.4 } : { opacity: shadowOpacity, scale: 0.8 }}
        />

        {/* Floating animation */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: cursor.side === 'left' ? [0, 6, -3, 0] : [0, -6, 3, 0],
            y: [0, -5, 3, 0],
            rotateZ: cursor.side === 'left' ? [0, 2, -1, 0] : [0, -2, 1, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: cursor.floatDelay
          }}
          whileHover={shouldReduceMotion ? {} : {
            scale: 1.15,
            transition: { duration: 0.3 }
          }}
          className={`flex flex-col ${cursor.side === 'right' ? 'items-start' : 'items-end'}`}
        >
          {/* Cursor icon + glow */}
          <div className="relative">
            <GlassCursorIcon mirrored={cursor.side === 'left'} idx={idx} />

            {/* Glow effect di belakang cursor */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#70797C]/20 to-transparent rounded-full blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Label glass */}
          <span
            className={`glass-effect-badge px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white/70 group-hover:text-white tracking-wide inline-block cursor-default whitespace-nowrap transition-colors duration-300 relative overflow-hidden ${
              cursor.side === 'right' ? 'ml-3 -mt-0.5' : 'mr-3 -mt-0.5'
            }`}
          >
            {/* Shine effect */}
            {!shouldReduceMotion && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'linear',
                  delay: idx * 0.5
                }}
              />
            )}
            <span className="relative z-10">{cursor.text}</span>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Tagline() {
  const shouldReduceMotion = useReducedMotion();

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // 3D Tilt untuk container text
  const tiltX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  // Semua transform di-hoist ke sini (tidak boleh inline di JSX dalam ternary,
  // karena hook wajib dipanggil setiap render dengan urutan yang sama)
  const gridRotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const gridRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const farGlowX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const farGlowY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const circleLeftX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const circleLeftY = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  const circleRightX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const circleRightY = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const ringX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const ringY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const sideLeftX = useTransform(springX, [-0.5, 0.5], [0, 10]);
  const sideRightX = useTransform(springX, [-0.5, 0.5], [0, -10]);
  const lightingBg = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(112,121,124,0.08) 0%, transparent 60%)`
  );

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0d0d0d] border-y border-white/5 pt-10 pb-20 md:pt-12 md:pb-28 px-6 overflow-hidden -mt-px lg:-mt-24 z-20"
      style={{ perspective: '1200px' }}
    >

      {/* Enhanced 3D Background dengan depth layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">

        {/* 3D Grid Pattern (subtle) */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={shouldReduceMotion ? {} : {
            rotateX: gridRotateX,
            rotateY: gridRotateY,
            scale: 1.1
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </motion.div>

        {/* Depth Layer 1: Far background glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={shouldReduceMotion ? {} : { x: farGlowX, y: farGlowY, scale: 1.2 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-[#272E40]/15 via-[#70797C]/10 to-[#272E40]/15 blur-3xl rounded-full" />
        </motion.div>

        {/* Depth Layer 2: Mid ground glass circles */}
        <motion.div
          className="absolute -top-40 -left-40 w-[400px] h-[400px]"
          style={shouldReduceMotion ? {} : { x: circleLeftX, y: circleLeftY }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#272E40]/20 to-transparent blur-2xl" />
        </motion.div>

        <motion.div
          className="absolute -bottom-40 -right-40 w-[400px] h-[400px]"
          style={shouldReduceMotion ? {} : { x: circleRightX, y: circleRightY }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-bl from-[#70797C]/15 to-transparent blur-2xl" />
        </motion.div>

        {/* Depth Layer 3: Floating particles (posisi deterministik) */}
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{ left: p.left, top: p.top }}
              animate={shouldReduceMotion ? {} : {
                y: [-10, 10, -10],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1]
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
      </div>

      {/* Floating Cursor Tags dengan 3D Effect */}
      {floatingCursors.map((cursor, idx) => (
        <FloatingCursor
          key={idx}
          cursor={cursor}
          idx={idx}
          springX={springX}
          springY={springY}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}

      {/* 3D Center Focus Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[5]"
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { x: ringX, y: ringY }}
      >
        <div className="relative">
          {[80, 60, 40].map((size, i) => (
            <motion.div
              key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
              style={{ width: size, height: size }}
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3],
                rotate: i % 2 === 0 ? [0, 45, 0] : [45, 0, 45]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5
              }}
            />
          ))}
          <motion.div
            className="w-2 h-2 rounded-full bg-white/30 -translate-x-1/2 -translate-y-1/2"
            animate={shouldReduceMotion ? {} : {
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </motion.div>

      {/* Main Tagline Content dengan 3D Tilt */}
      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        style={shouldReduceMotion ? {} : {
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Eyebrow: pill "What I Do" diapit garis, pengganti garis polos.
            Tidak menambah padding section, jadi jarak ke Hero tetap sama. */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8"
          style={shouldReduceMotion ? {} : { transform: 'translateZ(20px)' }}
        >
          {/* Garis kiri */}
          <motion.div
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { width: 0 }}
            whileInView={{ width: '48px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-r from-transparent to-white/25 hidden sm:block"
          />

          {/* Eyebrow pill */}
          <span className="glass-effect-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#70797C] to-white" />
            <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
              What I Do
            </span>
          </span>

          {/* Garis kanan */}
          <motion.div
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { width: 0 }}
            whileInView={{ width: '48px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-l from-transparent to-white/25 hidden sm:block"
          />
        </motion.div>

        {/* 3D Text Container */}
        <div style={shouldReduceMotion ? {} : { transformStyle: 'preserve-3d' }}>
          <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight relative">
            {taglineWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.15 + idx * 0.05,
                  duration: 0.6,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                viewport={{ once: true, margin: '-80px' }}
                className={`inline-block mr-[0.28em] relative ${
                  word.em
                    ? 'bg-gradient-to-r from-[#9aa5b8] via-[#70797C] to-[#9aa5b8] bg-clip-text text-transparent'
                    : 'text-white'
                }`}
                style={shouldReduceMotion ? {} : {
                  transformStyle: 'preserve-3d',
                  translateZ: word.em ? 15 : 10
                }}
                whileHover={shouldReduceMotion ? {} : {
                  translateZ: 30,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                {/* 3D Shadow text di belakang */}
                {!shouldReduceMotion && (
                  <span
                    className="absolute inset-0 text-white/5 blur-[2px] select-none"
                    style={{ transform: 'translateZ(-5px)' }}
                    aria-hidden="true"
                  >
                    {word.t}
                  </span>
                )}
                {word.t}
              </motion.span>
            ))}
          </p>
        </div>

        {/* Bottom accent dengan 3D position */}
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-3"
          style={shouldReduceMotion ? {} : { transform: 'translateZ(25px)' }}
        >
          <motion.div
            className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20"
            animate={shouldReduceMotion ? {} : {
              width: ['2rem', '3rem', '2rem']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/30"
            animate={shouldReduceMotion ? {} : {
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/20"
            animate={shouldReduceMotion ? {} : {
              width: ['2rem', '3rem', '2rem']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
          />
        </motion.div>
      </motion.div>

      {/* Side 3D elements */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block"
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { x: sideLeftX }}
      />
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block"
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { x: sideRightX }}
      />

      {/* Enhanced Lighting Effect (follows mouse) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[15]"
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { background: lightingBg }}
      />
    </section>
  );
}