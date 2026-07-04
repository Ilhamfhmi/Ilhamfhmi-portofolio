'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'HOME',        href: '#'             },
  { label: 'PROJECTS',    href: '#projects'     },
  { label: 'EXPERIENCE',  href: '#experience'   },
  { label: 'TESTIMONIAL', href: '#testimonials' },
  { label: 'SKILLS',      href: '#skills'       },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('HOME');

  useEffect(() => {
    const sectionIds = navItems
      .map((item) => item.href.replace('#', ''))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = navItems.find(
              (item) => item.href === `#${entry.target.id}`
            );
            if (matched) setActiveTab(matched.label);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-60px 0px -30% 0px'
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) setActiveTab('HOME');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (item) => {
    setActiveTab(item.label);

    if (item.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(item.href);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="glass-effect flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-full shadow-2xl">

        {/* Logo */}
        <button
          onClick={() => handleNavClick({ label: 'HOME', href: '#' })}
          className="text-sm font-bold tracking-wider text-white hover:text-white/80 transition-colors duration-300"
        >
          ilhamFahmi.
        </button>

        {/* Nav Items */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300 rounded-full z-10 ${
                activeTab === item.label
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeTab === item.label && (
                <motion.div
                  layoutId="activeNavbarTab"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* Connect Us */}
        <button
          onClick={() => {
            const target = document.getElementById('contact');
            if (target) {
              const y = target.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className="bg-white text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-md"
        >
          Connect Us
        </button>
      </nav>
    </motion.header>
  );
}