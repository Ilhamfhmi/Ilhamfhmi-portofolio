'use client';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      { name: 'Next.js',       level: 90 },
      { name: 'React.js',      level: 88 },
      { name: 'Tailwind CSS',  level: 92 },
      { name: 'Framer Motion', level: 75 },
      { name: 'TypeScript',    level: 65 },
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
    skills: [
      { name: 'Laravel',       level: 82 },
      { name: 'Node.js',       level: 68 },
      { name: 'Hono.js',       level: 65 },
      { name: 'REST API',      level: 85 },
      { name: 'Livewire Volt', level: 70 },
    ]
  },
  {
    id: 'database',
    label: 'Database & Cloud',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    skills: [
      { name: 'Supabase',      level: 85 },
      { name: 'MySQL',         level: 80 },
      { name: 'PostgreSQL',    level: 72 },
      { name: 'Vercel',        level: 88 },
      { name: 'Railway',       level: 75 },
    ]
  },
  {
    id: 'tools',
    label: 'Tools & Governance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" />
      </svg>
    ),
    skills: [
      { name: 'Git & GitHub',  level: 88 },
      { name: 'Figma',         level: 72 },
      { name: 'COBIT 2019',    level: 78 },
      { name: 'Jest',          level: 65 },
      { name: 'Postman',       level: 80 },
    ]
  }
];

// Label level skill berdasarkan angka
function getLevelLabel(level) {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 70) return 'Proficient';
  if (level >= 60) return 'Intermediate';
  return 'Familiar';
}

function getLevelColor(level) {
  if (level >= 90) return 'from-white to-[#9aa5b8]';
  if (level >= 80) return 'from-[#9aa5b8] to-[#70797C]';
  if (level >= 70) return 'from-[#70797C] to-[#4B4C4F]';
  return 'from-[#4B4C4F] to-[#2e3035]';
}

function SkillBar({ skill, delay, shouldReduceMotion }) {
  return (
    <div className="group/skill">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-white/80 group-hover/skill:text-white transition-colors duration-300">
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-white/35 group-hover/skill:text-white/60 transition-colors duration-300">
            {getLevelLabel(skill.level)}
          </span>
          <span className="text-[10px] font-mono text-white/25 group-hover/skill:text-white/50 transition-colors duration-300">
            {skill.level}%
          </span>
        </div>
      </div>
      {/* Track */}
      <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
        {/* Bar animasi saat masuk viewport */}
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            delay: shouldReduceMotion ? 0 : delay,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          viewport={{ once: true, margin: '-40px' }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, idx, activeId, setActiveId, shouldReduceMotion }) {
  const isActive = activeId === category.id;

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: idx * 0.1,
        duration: 0.55,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      viewport={{ once: true, margin: '-60px' }}
      onClick={() => setActiveId(isActive ? null : category.id)}
      className="group relative rounded-2xl p-[1px] cursor-pointer transition-all duration-500"
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(154,165,184,0.45) 0%, rgba(112,121,124,0.2) 50%, rgba(154,165,184,0.3) 100%)'
          : 'rgba(255,255,255,0.04)',
        boxShadow: isActive
          ? '0 0 30px rgba(112,121,124,0.12), 0 0 60px rgba(39,46,64,0.18)'
          : 'none'
      }}
    >
      <div className={`relative rounded-[14px] p-6 overflow-hidden transition-colors duration-500 ${
        isActive ? 'bg-[#141518]' : 'bg-[#0f1012] group-hover:bg-[#111316]'
      }`}>

        {/* Spotlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(154,165,184,0.06), transparent 65%)'
          }}
        />

        {/* Header kategori */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors duration-500 ${
              isActive
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-white/[0.04] border-white/[0.06] text-white/50 group-hover:text-white/70'
            }`}>
              {category.icon}
            </div>
            <h3 className={`text-sm font-semibold tracking-wide transition-colors duration-500 ${
              isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'
            }`}>
              {category.label}
            </h3>
          </div>

          {/* Jumlah skill + toggle arrow */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/30">
              {category.skills.length} skills
            </span>
            <motion.span
              className={`text-white/40 transition-colors duration-300 ${isActive ? 'text-white/70' : ''}`}
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </div>
        </div>

        {/* Skills list (collapsible) */}
        <motion.div
          initial={false}
          animate={{ height: isActive ? 'auto' : '0px', opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="flex flex-col gap-4 pb-1">
            {category.skills.map((skill, sIdx) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                delay={0.1 + sIdx * 0.07}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </motion.div>

        {/* Preview pill saat collapsed: tampilkan 3 nama pertama */}
        <motion.div
          animate={{ opacity: isActive ? 0 : 1, height: isActive ? 0 : 'auto' }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-1.5 mt-1">
            {category.skills.slice(0, 3).map((skill) => (
              <span
                key={skill.name}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/40 border border-white/[0.06]"
              >
                {skill.name}
              </span>
            ))}
            {category.skills.length > 3 && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/25 border border-white/[0.04]">
                +{category.skills.length - 3} more
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState('frontend'); // buka frontend by default

  // Parallax background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const gridX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const gridY = useTransform(springY, [-0.5, 0.5], [-8,   8]);
  const orbAX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const orbAY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const orbBX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const orbBY = useTransform(springY, [-0.5, 0.5], [14, -14]);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  return (
    <section
      id="skills"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0d0d0d] py-12 md:py-16 px-4 sm:px-6 overflow-hidden"
    >

      {/* Background interaktif */}
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
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)'
            }}
          />
        </motion.div>

        {/* Orb kiri atas */}
        <motion.div
          className="absolute -top-40 -left-20 w-[480px] h-[480px]"
          style={shouldReduceMotion ? {} : { x: orbAX, y: orbAY }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-[#272E40]/15 to-transparent blur-3xl"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Orb kanan bawah */}
        <motion.div
          className="absolute -bottom-40 -right-20 w-[420px] h-[420px]"
          style={shouldReduceMotion ? {} : { x: orbBX, y: orbBY }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-tl from-[#70797C]/12 to-transparent blur-3xl"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
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
              Tech Stack
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.1]"
          >
            Tools I Build{' '}
            <span className="bg-gradient-to-r from-[#9aa5b8] via-[#70797C] to-[#9aa5b8] bg-clip-text text-transparent">
              Things With
            </span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mt-4 text-sm md:text-base text-gray-400 max-w-md leading-relaxed"
          >
            A curated set of technologies I use daily, from UI to database to deployment. Click a category to explore.
          </motion.p>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {skillCategories.map((category, idx) => (
            <SkillCard
              key={category.id}
              category={category}
              idx={idx}
              activeId={activeId}
              setActiveId={setActiveId}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}