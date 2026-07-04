// ============================================
// DATA PORTOFOLIO
// Semua konten diedit dari file ini, tanpa perlu
// menyentuh komponen. Tambah project baru cukup
// tambah satu object di array projects.
// ============================================

export const projects = [
  {
    id: 'mikrolink',
    title: 'MikroLink',
    category: 'Web Application',
    year: '2026',
    description:
      'Cooperative management platform covering member savings, multi-tier loan approval workflows, and automated PDF document generation.',
    tech: ['Laravel', 'Livewire Volt', 'MySQL', 'Tailwind CSS'],
    // Taruh thumbnail di /public/images/projects/mikrolink.png lalu isi path-nya di sini
    image: null, // contoh: '/images/projects/mikrolink.png'
    liveUrl: null,
    repoUrl: 'https://github.com/PPLKEelompokC/MikroLink',
    featured: true
  },
  {
    id: 'sag-laboratory',
    title: 'SAG Laboratory Website',
    category: 'Fullstack Website',
    year: '2025',
    description:
      'Official laboratory website with an admin panel for managing events, partners, and study groups. Deployed on Railway with a custom domain.',
    tech: ['Next.js 14', 'Laravel REST API', 'MySQL', 'Railway'],
    image: null,
    liveUrl: 'https://www.saglaboratory.my.id',
    repoUrl: null,
    featured: false
  },
  {
    id: 'sidoku',
    title: 'SIDOKU',
    category: 'Web Application',
    year: '2025',
    description:
      'Document management system for Kecamatan Bandung Kidul with authentication, file management, and unit-tested workflows.',
    tech: ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'],
    image: null,
    liveUrl: null,
    repoUrl: null,
    featured: false
  },
  {
    id: 'bengkel-chevy-motor',
    title: 'Bengkel Chevy Motor POS',
    category: 'POS System',
    year: '2025',
    description:
      'Point of sale system for an automotive parts shop featuring dual pricing, stock management, receipt printing, and sales reporting.',
    tech: ['Next.js 14', 'Supabase', 'Tailwind CSS'],
    image: null,
    liveUrl: null,
    repoUrl: 'https://github.com/Ilhamfhmi/Project-UMKM-Chevy-Motor',
    featured: false
  },
  {
    id: 'berita-kini',
    title: 'Berita Kini',
    category: 'News Aggregator',
    year: '2024',
    description:
      'News aggregator web app that pulls and organizes the latest headlines across categories with a clean reading experience.',
    tech: ['React.js', 'REST API', 'Vercel'],
    image: null,
    liveUrl: 'https://berita-kini-lake.vercel.app/',
    repoUrl: 'https://github.com/Ilhamfhmi/project-berita-kini',
    featured: false
  },
  {
    id: 'arsipin',
    title: 'Arsipin',
    category: 'Web Platform',
    year: '2024',
    description:
      'Empowerment platform for women-owned UMKM businesses, providing profiles, product showcases, and community features.',
    tech: ['Next.js', 'Supabase', 'Tailwind CSS'],
    image: null,
    liveUrl: null,
    repoUrl: 'https://github.com/reeeyyyyyyyyyyyyyyy/archivy',
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    quote:
      'Ilham delivered our cooperative platform features on time and with impressive attention to detail. His Git workflow and communication made collaboration effortless.',
    name: 'Daffa Marchdiansyah', // ganti
    role: 'Project Lead',
    company: 'MikroLink Team',
    featured: true
  },
  {
    id: 2,
    quote:
      'The document management system he built transformed how our office handles audit files. Clean, fast, and exactly what we needed.',
    name: 'Mas Broo', // ganti
    role: 'Staff',
    company: 'Kecamatan Bandung Kidul',
    featured: false
  },
  {
    id: 3,
    quote:
      'As Head of Digital Content, Ilham consistently brings both technical skill and creative direction. The lab website he built represents us perfectly.',
    name: 'Zaky Hilmi', // ganti
    role: 'Coordinator',
    company: 'SAG Laboratory',
    featured: false
  },
  {
    id: 4,
    quote:
      'Rare combination of developer who understands business context. His work on our investment education content was always sharp and on-brand.',
    name: 'Nadhifa Mudrika', // ganti
    role: 'Member',
    company: 'GIBEI Telkom University',
    featured: false
  },
  {
    id: 5,
    quote:
      'Fast learner, reliable, and proactive. He handled frontend challenges independently and always shipped polished results.',
    name: 'Bu Hanny', // ganti
    role: 'Mentor',
    company: 'DPMPTSP Prov. Jawa Timur',
    featured: false
  }
];