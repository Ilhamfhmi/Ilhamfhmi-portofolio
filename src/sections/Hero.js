'use client';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const photoX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const photoY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const arcsX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const arcsY = useTransform(springY, [-0.5, 0.5], [-4, 4]);
  const sparkleX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const sparkleY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const ornamentX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const ornamentY = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const spotX = useSpring(useMotionValue(0), { stiffness: 60, damping: 25 });
  const spotY = useSpring(useMotionValue(0), { stiffness: 60, damping: 25 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX / innerWidth - 0.5);
    mouseY.set(e.clientY / innerHeight - 0.5);
    spotX.set(e.clientX);
    spotY.set(e.clientY);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2, duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const badges = [
    { text: 'Web Developer' },
    { text: 'Design & Code' },
    { text: 'Tech & Business' },
    { text: 'QA Tester' }
  ];

  const contributionColors = [
    'bg-white/5',
    'bg-emerald-900/70',
    'bg-emerald-700/70',
    'bg-emerald-500/80',
    'bg-emerald-400',
  ];

  const getContributionLevel = (weekIdx, dayIdx) => {
    const seed = (weekIdx * 7 + dayIdx) * 13 % 100;
    if (seed > 90) return 4;
    if (seed > 75) return 3;
    if (seed > 60) return 2;
    if (seed > 45) return 1;
    return 0;
  };

  // Icon user SVG kecil untuk avatar
  const UserIcon = ({ size = 12 }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  // Warna gradient background tiap avatar (warna beda biar nggak monoton)
  const avatarStyles = [
    { bg: 'from-[#2c3347] to-[#1e2538]', text: 'text-[#7a8cb0]' },
    { bg: 'from-[#2d3a2e] to-[#1e2a1f]', text: 'text-[#7aaa7e]' },
    { bg: 'from-[#3a2d2d] to-[#2a1e1e]', text: 'text-[#aa7a7a]' },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex items-end justify-center pt-28 md:pt-24 pb-0 overflow-hidden bg-[#0d0d0d]"
    >
      {/* Cursor Spotlight */}
      {!shouldReduceMotion && (
        <motion.div
          className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[5] hidden lg:block"
          aria-hidden="true"
          style={{
            x: spotX,
            y: spotY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(112,121,124,0.08) 0%, rgba(39,46,64,0.05) 40%, transparent 70%)'
          }}
        />
      )}

      {/* Background Glass Ornaments */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { x: ornamentX, y: ornamentY }}
      >
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#272E40]/20 to-[#70797C]/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[#70797C]/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#272E40]/10 to-[#4B4C4F]/20 blur-3xl" />
      </motion.div>

      {/* Main Grid Container */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 items-end relative z-10 gap-10 lg:gap-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT: Headline + CTA */}
        <motion.div
          className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative z-20 lg:-mr-20 lg:pb-32"
          variants={itemVariants}
        >
          {/* Availability Pill */}
          <div className="glass-effect-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5">
            <span className="relative flex w-2 h-2">
              {!shouldReduceMotion && (
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              )}
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-medium tracking-wide text-white/70">
              Available for new projects
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white mb-5 leading-[1.15]">
            Fullstack Developer <br className="hidden lg:block" />
            Based In <br className="hidden lg:block" />
            Indonesia
          </h2>

          <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed mx-auto lg:mx-0">
            I help build fast, modern, and user-friendly web applications from frontend to backend.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-7">
            <Link
              href="#projects"
              className="glass-effect-card glass-effect-hover glass-shine px-6 py-3 rounded-full text-sm font-semibold text-white inline-block"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 rounded-full text-sm font-medium text-white/70 border border-white/10 hover:border-white/25 hover:text-white transition-colors duration-300 inline-block"
            >
              Let&apos;s Talk →
            </Link>
          </div>
        </motion.div>

        {/* CENTER: Photo */}
        <motion.div
          className="lg:col-span-4 flex justify-center items-end relative order-1 lg:order-2 mt-4 lg:mt-0 lg:mb-24 z-10"
          variants={itemVariants}
        >
          <motion.div
            className="absolute bottom-0 inset-x-0 flex items-end justify-center z-0 pointer-events-none h-full"
            aria-hidden="true"
            style={shouldReduceMotion ? {} : { x: arcsX, y: arcsY }}
          >
            <div className="absolute w-[min(90vw,430px)] h-[min(45vw,215px)] md:w-[500px] md:h-[250px] rounded-t-full bg-[#17181A]/50 backdrop-blur-sm bottom-0" />
            <div className="absolute w-[min(84vw,400px)] h-[min(42vw,200px)] md:w-[460px] md:h-[230px] rounded-t-full bg-[#1C1D1F]/60 backdrop-blur-md bottom-0" />
            <div className="absolute w-[min(78vw,370px)] h-[min(39vw,185px)] md:w-[420px] md:h-[210px] rounded-t-full bg-[#4B4C4F]/40 backdrop-blur-lg bottom-0" />
            <div className="absolute w-[min(72vw,340px)] h-[min(36vw,170px)] md:w-[380px] md:h-[190px] rounded-t-full bg-gradient-to-b from-[#272E40]/80 to-[#70797C]/60 backdrop-blur-xl bottom-0 shadow-[0_-10px_50px_rgba(39,46,64,0.45)]" />
            <div className="absolute w-[min(50vw,240px)] md:w-[300px] h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent bottom-[min(26vw,125px)] md:bottom-[155px] blur-sm" />
          </motion.div>

          <motion.div
            className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-[380px] md:h-[460px] lg:w-[400px] lg:h-[500px] flex items-end justify-center overflow-visible z-10"
            style={shouldReduceMotion ? {} : { x: photoX, y: photoY }}
          >
            <motion.div
              className="absolute top-[38%] -right-6 md:-right-10 text-2xl md:text-3xl text-white/60 z-20"
              aria-hidden="true"
              style={shouldReduceMotion ? {} : { x: sparkleX, y: sparkleY }}
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✦
            </motion.div>

            <motion.div
              className="absolute top-[48%] -left-6 md:-left-10 text-xl md:text-2xl text-white/40 z-20"
              aria-hidden="true"
              style={shouldReduceMotion ? {} : { x: sparkleX, y: sparkleY }}
              animate={shouldReduceMotion ? {} : {
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              ✧
            </motion.div>

            <div className="relative w-full h-full flex items-end justify-center z-10">
              <Image
                src="/ilham-hero.png"
                alt="Ilham Fahmi"
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 380px, (min-width: 640px) 320px, 288px"
                className="object-contain object-bottom select-none pointer-events-none"
                priority
                quality={90}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: GitHub + Customer + Badges */}
        <motion.div
          className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right gap-4 order-3 justify-center relative z-20 lg:-ml-20 pb-4 lg:pb-32"
          variants={itemVariants}
        >
          {/* GitHub Contribution Widget */}
          <motion.div
            className="glass-effect-card rounded-2xl p-3 w-full max-w-[260px]"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-white/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span className="text-[10px] text-white/40 font-medium">Contributions</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">118 this year</span>
            </div>

            <div className="flex gap-[3px]">
              {Array.from({ length: 26 }).map((_, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    const level = getContributionLevel(weekIdx, dayIdx);
                    return (
                      <div
                        key={dayIdx}
                        className={`w-[7px] h-[7px] rounded-[2px] ${contributionColors[level]} transition-opacity hover:opacity-80`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-1 mt-2">
              <span className="text-[9px] text-white/30">Less</span>
              {contributionColors.map((c, i) => (
                <div key={i} className={`w-[7px] h-[7px] rounded-[2px] ${c}`} />
              ))}
              <span className="text-[9px] text-white/30">More</span>
            </div>
          </motion.div>

          {/* Happy Customer Widget: avatar dengan icon user */}
          <motion.div
            className="glass-effect-card glass-effect-hover flex items-center gap-3 px-4 py-2 rounded-full cursor-default"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="flex -space-x-2">
              {avatarStyles.map((style, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${style.bg} border-2 border-[#0d0d0d] flex items-center justify-center ${style.text}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              ))}

              {/* Badge 100+ */}
              <div className="w-8 h-7 rounded-full bg-gradient-to-br from-white to-gray-200 text-black text-[9px] font-bold flex items-center justify-center border-2 border-[#0d0d0d]">
                100+
              </div>
            </div>

            <div className="text-left">
              <p className="text-[10px] text-gray-400 font-medium leading-none">Happy</p>
              <p className="text-[11px] text-white font-bold leading-tight">Customer</p>
            </div>
          </motion.div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-2 max-w-xs">
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                className="glass-effect-badge px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-white/80 cursor-default"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {badge.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}