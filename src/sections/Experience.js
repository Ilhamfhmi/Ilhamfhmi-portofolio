'use client';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const experiences = [
  { 
    role: 'Laboratory Assistant', 
    company: 'SAG Laboratory — Telkom University', 
    period: '2026',
    type: 'Education',
    description: 'Assisting in software engineering laboratory, mentoring students, and managing lab resources.',
    skills: ['Mentoring', 'Lab Management', 'Teaching'],
    color: '#272E40'
  },
  { 
    role: 'IT Support Intern', 
    company: 'DPMPTSP East Java Province', 
    period: '2025',
    type: 'Internship',
    description: 'Provided technical support, maintained IT infrastructure, and assisted in digital transformation projects.',
    skills: ['IT Support', 'Infrastructure', 'Digital Transformation'],
    color: '#4B4C4F'
  },
  { 
    role: 'Creative Relation Staff', 
    company: 'GIBEI — Telkom University', 
    period: '2026',
    type: 'Organization',
    description: 'Managed creative relations, coordinated events, and built partnerships with stakeholders.',
    skills: ['Event Management', 'Partnership', 'Creative Direction'],
    color: '#70797C'
  },
  { 
    role: 'Digital Content Staff', 
    company: 'SAG Laboratory', 
    period: '2025',
    type: 'Creative',
    description: 'Created and managed digital content, developed social media strategies, and increased engagement.',
    skills: ['Content Creation', 'Social Media', 'Strategy'],
    color: '#9aa5b8'
  },
];

const floatingTags = [
  { text: 'Open to Opportunities', position: 'top-[45%] -left-6 lg:left-2', side: 'left', floatDelay: 0, depth: 14 },
  { text: 'Ilham Fahmi', position: 'top-[35%] -right-6 lg:right-2', side: 'right', floatDelay: 0.5, depth: 12 },
];

const particles = [
  { left: '10%', top: '20%', dur: 3.4, delay: 0.2 },
  { left: '20%', top: '70%', dur: 4.1, delay: 1.1 },
  { left: '35%', top: '35%', dur: 3.8, delay: 0.6 },
  { left: '50%', top: '15%', dur: 3.2, delay: 0.9 },
  { left: '65%', top: '75%', dur: 4.3, delay: 0.3 },
  { left: '80%', top: '25%', dur: 3.6, delay: 1.5 },
  { left: '90%', top: '60%', dur: 4.8, delay: 0.7 },
  { left: '15%', top: '45%', dur: 5.2, delay: 2.1 },
  { left: '75%', top: '50%', dur: 3.9, delay: 1.8 },
];

function GlassCursorIcon({ mirrored, idx }) {
  const gradId = `expCursorGrad-${idx}`;
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 md:w-5 md:h-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] ${mirrored ? '-scale-x-100' : ''}`}
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

function FloatingTag({ tag, idx, springX, springY, shouldReduceMotion }) {
  const x = useTransform(springX, [-0.5, 0.5], [-tag.depth, tag.depth]);
  const y = useTransform(springY, [-0.5, 0.5], [-tag.depth * 0.6, tag.depth * 0.6]);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      viewport={{ once: true }}
      className={`absolute ${tag.position} hidden lg:block z-20 group`}
    >
      <motion.div style={shouldReduceMotion ? {} : { x, y }} className="relative">
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: tag.side === 'left' ? [0, 6, -3, 0] : [0, -6, 3, 0],
            y: [0, -5, 3, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: tag.floatDelay }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.1, transition: { duration: 0.3 } }}
          className={`flex flex-col ${tag.side === 'right' ? 'items-start' : 'items-end'}`}
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : {
              filter: 'brightness(1.2) drop-shadow(0 0 12px rgba(112,121,124,0.6))',
            }}
          >
            <GlassCursorIcon mirrored={tag.side === 'left'} idx={idx} />
          </motion.div>
          <span
            className={`glass-effect-badge px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white/70 group-hover:text-white tracking-wide whitespace-nowrap transition-all duration-300 relative overflow-hidden ${
              tag.side === 'right' ? 'ml-3 -mt-0.5' : 'mr-3 -mt-0.5'
            }`}
          >
            {!shouldReduceMotion && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear', delay: idx * 0.5 }}
              />
            )}
            <span className="relative z-10">{tag.text}</span>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const [activeExperience, setActiveExperience] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="experience"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0d0d0d] py-24 md:py-32 px-6 overflow-hidden border-t border-white/5"
    >
      
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Main ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#272E40]/12 via-[#70797C]/8 to-[#272E40]/12 blur-[120px] rounded-full" />
        
        {/* Side glows */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#272E40]/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#70797C]/10 to-transparent blur-3xl" />
        
        {/* 3D Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={shouldReduceMotion ? {} : {
            rotateX: useTransform(springY, [-0.5, 0.5], [2, -2]),
            rotateY: useTransform(springX, [-0.5, 0.5], [-2, 2]),
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

        {/* Floating Particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{ left: p.left, top: p.top }}
            animate={shouldReduceMotion ? {} : { 
              y: [-10, 10, -10], 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          {/* Label Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <motion.span 
              className="glass-effect-badge px-5 py-2 rounded-full text-xs font-semibold text-white/50 tracking-widest uppercase inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.06)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#70797C] to-white" />
              Professional Journey
            </motion.span>
          </motion.div>

          {/* Title with Gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Where Passion Meets Precision
            </span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/30 text-sm md:text-base max-w-lg mx-auto leading-relaxed"
          >
            Combining technical expertise with creative vision to build digital solutions that make an impact
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Floating Tags */}
            {floatingTags.map((tag, idx) => (
              <FloatingTag
                key={idx}
                tag={tag}
                idx={idx}
                springX={springX}
                springY={springY}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}

            {/* Photo Card with 3D Effect */}
            <motion.div 
              className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden glass-effect-card backdrop-blur-xl group"
              style={shouldReduceMotion ? {} : {
                rotateX: useTransform(springY, [-0.5, 0.5], [3, -3]),
                rotateY: useTransform(springX, [-0.5, 0.5], [-3, 3]),
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Animated Border Gradient */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, #272E40, #70797C, #272E40)',
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                animate={shouldReduceMotion ? {} : {
                  background: [
                    'linear-gradient(0deg, #272E40, #70797C, #272E40)',
                    'linear-gradient(360deg, #272E40, #70797C, #272E40)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Grid background */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '36px 36px',
                }}
              />

              {/* Sparkles */}
              {[
                { pos: 'top-8 right-12', dur: 3, delay: 0, size: 'text-sm' },
                { pos: 'top-1/3 right-6', dur: 2.5, delay: 0.5, size: 'text-xs' },
                { pos: 'bottom-1/3 left-6', dur: 2, delay: 1, size: 'text-sm' },
                { pos: 'top-1/2 left-12', dur: 4, delay: 1.5, size: 'text-xs' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${s.pos} text-white/25 ${s.size}`}
                  animate={shouldReduceMotion ? {} : { 
                    opacity: [0.2, 0.6, 0.2], 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
                  aria-hidden="true"
                >
                  ✦
                </motion.div>
              ))}

              {/* Central glow behind photo */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-t from-[#272E40]/30 via-[#70797C]/20 to-transparent blur-2xl" />

              {/* Photo */}
              <div className="absolute inset-0 flex items-end justify-center">
                <Image
                  src="/ilham-experience.png"   
                  alt="Ilham Fahmi - Fullstack Developer"
                  fill
                  sizes="(min-width: 1024px) 450px, (min-width: 768px) 380px, 320px"
                  className="object-contain object-bottom select-none pointer-events-none scale-110 group-hover:scale-115 transition-transform duration-700"
                  quality={95}
                  priority
                />
                
                {/* Gradient overlay bottom */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#0d0d0d]/50 to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Description + Timeline Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Description */}
            <div className="space-y-4">
              <motion.p 
                className="text-white/60 text-sm md:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                A full-stack developer with a strong foundation in modern web technologies, 
                dedicated to crafting scalable applications and intuitive user experiences.
              </motion.p>
              
              <motion.p 
                className="text-white/40 text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                From laboratory mentoring to government digital transformation, 
                each role has sharpened my ability to bridge the gap between technical 
                execution and strategic vision.
              </motion.p>
            </div>

            {/* Timeline Experience */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
              
              <div className="flex flex-col gap-3">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx + 0.6 }}
                    viewport={{ once: true }}
                    whileHover={shouldReduceMotion ? {} : { x: 6 }}
                    onClick={() => setActiveExperience(activeExperience === idx ? null : idx)}
                    className="group relative cursor-pointer"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-6 -translate-x-1/2 hidden md:block">
                      <motion.div 
                        className="w-3 h-3 rounded-full border-2 border-white/20 bg-[#0d0d0d]"
                        whileHover={{ scale: 1.5, borderColor: 'rgba(255,255,255,0.5)' }}
                        style={{ backgroundColor: activeExperience === idx ? exp.color : '#0d0d0d' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Content Card */}
                    <div className="md:ml-6 glass-effect-card rounded-xl md:rounded-2xl p-4 md:p-5 hover:bg-white/[0.04] transition-all duration-300 border border-white/5 hover:border-white/10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold text-sm md:text-base">
                              {exp.role}
                            </h3>
                            <span 
                              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                              style={{ 
                                backgroundColor: `${exp.color}20`, 
                                color: exp.color,
                                border: `1px solid ${exp.color}40`
                              }}
                            >
                              {exp.type}
                            </span>
                          </div>
                          <p className="text-white/40 text-xs md:text-sm">{exp.company}</p>
                        </div>
                        <span className="text-white/60 text-xs md:text-sm font-medium ml-4">
                          {exp.period}
                        </span>
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {activeExperience === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 mt-3 border-t border-white/5">
                              <p className="text-white/40 text-xs md:text-sm mb-3 leading-relaxed">
                                {exp.description}
                              </p>
                              
                              {/* Skills Tags */}
                              <div className="flex flex-wrap gap-1.5">
                                {exp.skills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/5"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand indicator */}
                      <motion.div
                        className="absolute bottom-3 right-4 text-white/20"
                        animate={{ rotate: activeExperience === idx ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}