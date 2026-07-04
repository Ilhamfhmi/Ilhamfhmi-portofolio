'use client';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/data';

// Icon panah diagonal (pojok kanan bawah card)
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Icon kecil di samping kategori
function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M20 8V6a2 2 0 0 0-2-2h-2M20 16v2a2 2 0 0 1-2 2h-2" strokeLinecap="round" />
    </svg>
  );
}

// Placeholder berbentuk mockup browser window.
function BrowserMockup({ project }) {
  const urlText = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '')
    : `${project.id}.vercel.app`;

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#16181d] to-[#0f1013] pt-6 px-6 md:pt-8 md:px-10 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
      <div className="w-full h-full rounded-t-xl border border-white/10 bg-[#131519] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.55)]">

        {/* Title bar browser */}
        <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/[0.06] bg-white/[0.03] shrink-0">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
          </div>
          <div className="ml-2 flex-1 max-w-[240px] h-5 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center px-3">
            <span className="text-[9px] font-mono text-white/40 truncate">{urlText}</span>
          </div>
        </div>

        {/* Isi "halaman web": skeleton layout */}
        <div className="flex-1 relative p-4 md:p-5 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-br from-[#272E40]/50 to-transparent blur-2xl" />

          <div className="relative flex items-center justify-between mb-5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#70797C] to-white/70" />
            <div className="flex gap-2">
              <span className="w-8 h-1.5 rounded-full bg-white/[0.08]" />
              <span className="w-8 h-1.5 rounded-full bg-white/[0.08]" />
              <span className="w-8 h-1.5 rounded-full bg-white/[0.08]" />
            </div>
          </div>

          <div className="relative">
            <p className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-[#c3cad6] to-[#70797C] bg-clip-text text-transparent leading-tight">
              {project.title}
            </p>
            <div className="mt-2.5 space-y-1.5">
              <span className="block w-4/5 h-1.5 rounded-full bg-white/[0.08]" />
              <span className="block w-3/5 h-1.5 rounded-full bg-white/[0.08]" />
            </div>
            <span className="inline-block mt-3.5 w-16 h-5 rounded-full bg-gradient-to-r from-[#272E40] to-[#4B4C4F] border border-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, idx, shouldReduceMotion }) {
  const href = project.liveUrl || project.repoUrl || null;
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Lihat project ${project.title}` }
    : {};

  // Spotlight: simpan posisi kursor sebagai CSS variable di elemen card.
  // Pakai setProperty langsung (bukan state) biar nggak re-render tiap gerakan mouse.
  const handleCardMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      onMouseMove={handleCardMouseMove}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: (idx % 2) * 0.12,
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      viewport={{ once: true, margin: '-60px' }}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.18] transition-colors duration-500"
    >
      <Wrapper {...wrapperProps} className="block relative aspect-[16/10] w-full">

        {/* Thumbnail asli, atau mockup browser kalau belum ada */}
        {project.image ? (
          <Image
            src={project.image}
            alt={`Tampilan project ${project.title}`}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <BrowserMockup project={project} />
        )}

        {/* Spotlight yang ngikutin kursor di dalam card */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(154,165,184,0.14), transparent 65%)'
          }}
        />

        {/* Gradient overlay bawah supaya teks kebaca */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Tahun (pojok kanan atas) */}
        <span className="absolute top-4 right-4 glass-effect-badge px-2.5 py-1 rounded-full text-[10px] font-medium text-white/60">
          {project.year}
        </span>

        {/* Info project (pojok kiri bawah) */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 pr-16">
          <div className="flex items-center gap-1.5 text-white/55 mb-1.5">
            <TagIcon />
            <span className="text-[11px] font-mono tracking-wide">{project.category}</span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
            {project.title}
          </h3>

          {/* Tech chips: muncul saat hover */}
          <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/70 bg-white/[0.08] backdrop-blur-sm border border-white/[0.08]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Panah diagonal (pojok kanan bawah) */}
        <span
          className="absolute bottom-5 right-5 text-white/50 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <ArrowIcon />
        </span>
      </Wrapper>
    </motion.article>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  // Mouse tracking untuk parallax background section
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Transform di-hoist (hook nggak boleh inline di dalam ternary JSX)
  const orbTopX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const orbTopY = useTransform(springY, [-0.5, 0.5], [-18, 18]);
  const orbBottomX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const orbBottomY = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const gridX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const gridY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="projects"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0d0d0d] py-20 md:py-28 px-4 sm:px-6 overflow-hidden"
    >

      {/* Background interaktif */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">

        {/* Grid pattern dengan parallax halus */}
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
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)'
            }}
          />
        </motion.div>

        {/* Orb atas: gerak searah mouse */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px]"
          style={shouldReduceMotion ? {} : { x: orbTopX, y: orbTopY }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-[#272E40]/12 to-transparent blur-3xl"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Orb bawah: gerak berlawanan arah */}
        <motion.div
          className="absolute bottom-0 -right-32 w-[400px] h-[400px]"
          style={shouldReduceMotion ? {} : { x: orbBottomX, y: orbBottomY }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-tl from-[#70797C]/12 to-transparent blur-3xl"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header (rata tengah) */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-effect-badge px-4 py-1.5 rounded-full mb-5"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#70797C] to-white" />
            <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
              Selected Works
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.1]"
          >
            Projects That Solve{' '}
            <span className="bg-gradient-to-r from-[#9aa5b8] via-[#70797C] to-[#9aa5b8] bg-clip-text text-transparent">
              Real Problems
            </span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mt-4 text-sm md:text-base text-gray-400 max-w-lg leading-relaxed"
          >
            From cooperative platforms to point-of-sale systems, every project is built end to end with clean code and real users in mind.
          </motion.p>
        </div>

        {/* Projects Grid: seragam 2 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}