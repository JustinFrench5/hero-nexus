'use client';

import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

/* ── Animation helpers ── */
const ease = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.1 },
  }),
};

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Eyebrow Badge ── */
function Eyebrow({
  children,
  color = 'purple',
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const colors: Record<string, string> = {
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
  };
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase ${colors[color]}`}
    >
      {children}
    </span>
  );
}

/* ── Feature Card ── */
function FeatureCard({
  icon,
  color,
  title,
  desc,
  i,
}: {
  icon: string;
  color: string;
  title: string;
  desc: string;
  i: number;
}) {
  const colorMap: Record<
    string,
    { bg: string; text: string; border: string; hoverBorder: string }
  > = {
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/15',
      hoverBorder: 'hover:border-purple-500/35',
    },
    blue: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/15',
      hoverBorder: 'hover:border-blue-500/35',
    },
    green: {
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      border: 'border-green-500/15',
      hoverBorder: 'hover:border-green-500/35',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/15',
      hoverBorder: 'hover:border-amber-500/35',
    },
  };
  const c = colorMap[color] || colorMap.purple;

  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      className={`group bg-white/[0.03] hover:bg-white/[0.06] border ${c.border} ${c.hoverBorder} rounded-2xl p-8 transition-all duration-500`}
    >
      <div
        className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${c.bg} mb-5 transition-transform duration-400 group-hover:scale-110`}
      >
        <Icon icon={icon} className={`${c.text} text-[22px]`} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2.5">{title}</h3>
      <p className="text-[15px] text-white/50 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Community', href: '#community' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#0a0a1a]/92 backdrop-blur-xl border-b border-white/[0.06] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icons/hero-nexus-logo-no-bg.png"
            alt="Hero Nexus"
            width={44}
            height={44}
          />
          <span className="text-xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Hero Nexus
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            as={Link}
            href="/login"
            variant="bordered"
            size="sm"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/15 hover:border-purple-500/50 rounded-full px-5 font-semibold text-sm transition-all duration-300"
          >
            Sign in
          </Button>
          <Button
            as={Link}
            href="/register"
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full px-6 font-semibold text-sm shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[1px] animate-pulse [animation-duration:8s]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/15 blur-[1px] animate-pulse [animation-duration:10s] [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/[0.08] blur-[1px] animate-pulse [animation-duration:12s] [animation-delay:4s]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow color="purple">
            <Icon
              icon="lucide:sparkles"
              className="text-sm"
            />
            Now in open beta
          </Eyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mt-8 mb-8"
        >
          <Image
            src="/icons/hero-nexus-logo-no-bg.png"
            alt=""
            width={120}
            height={120}
            className="mx-auto animate-bounce [animation-duration:6s] drop-shadow-[0_8px_32px_rgba(124,58,237,0.4)]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="text-[clamp(40px,6vw,72px)] font-extrabold text-white leading-[1.05] mb-6 max-w-[800px] mx-auto"
        >
          Your tabletop{' '}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]">
            adventures
          </span>
          , reimagined
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="text-[clamp(16px,2vw,20px)] text-white/55 max-w-[560px] mx-auto leading-relaxed mb-12"
        >
          Create characters, manage campaigns, and share homebrew content — all
          in one beautiful platform built for modern RPG players.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button
            as={Link}
            href="/register"
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full px-7 font-semibold shadow-lg shadow-purple-600/35 hover:shadow-xl hover:shadow-purple-600/50 hover:-translate-y-0.5 transition-all duration-350 gap-2"
          >
            Begin your adventure
            <Icon icon="lucide:arrow-right" className="text-base" />
          </Button>
          <Button
            as={Link}
            href="/about"
            variant="bordered"
            size="lg"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/50 rounded-full px-7 font-semibold transition-all duration-300"
          >
            Learn more
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          className="flex justify-center gap-12 mt-[72px] flex-wrap"
        >
          {[
            { val: '10K+', label: 'Adventurers' },
            { val: '50K+', label: 'Characters created' },
            { val: '4.9', label: 'App Store rating' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-mono text-[28px] font-bold text-white">
                {s.val}
              </div>
              <div className="text-[13px] text-white/40 font-medium mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Features ── */
function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const features = [
    {
      icon: 'lucide:user-round-pen',
      color: 'purple',
      title: 'Character creation',
      desc: 'Build characters with our guided system. Ability scores, backstories, and equipment — every detail at your fingertips.',
    },
    {
      icon: 'lucide:book-open',
      color: 'blue',
      title: 'Homebrew content',
      desc: 'Create and share custom spells, classes, and items. Your imagination is the only limit.',
    },
    {
      icon: 'lucide:cloud',
      color: 'green',
      title: 'Cloud sync',
      desc: 'Access your characters and campaigns anywhere. Secure cloud storage keeps your progress safe across all devices.',
    },
    {
      icon: 'lucide:users',
      color: 'amber',
      title: 'Party management',
      desc: 'Organize campaigns, invite players, and track party progress together in real time.',
    },
  ];

  return (
    <section id="features" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <Section>
          <div className="text-center mb-16">
            <Eyebrow color="indigo">Features</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold text-white mt-5 mb-4">
              Everything you need to{' '}
              <span className="text-purple-400">play</span>
            </h2>
            <p className="text-[17px] text-white/45 max-w-[500px] mx-auto leading-relaxed">
              Tools designed for tabletop RPG players, dungeon masters, and
              homebrew creators alike.
            </p>
          </div>
        </Section>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── How It Works ── */
function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    {
      num: '01',
      icon: 'lucide:user-plus',
      title: 'Create your account',
      desc: 'Sign up in seconds and set up your adventurer profile.',
    },
    {
      num: '02',
      icon: 'lucide:wand-sparkles',
      title: 'Build a character',
      desc: 'Use our guided creator to craft your perfect hero with stats, backstory, and gear.',
    },
    {
      num: '03',
      icon: 'lucide:swords',
      title: 'Join a campaign',
      desc: 'Find or create a campaign, invite friends, and start your adventure together.',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-[100px] bg-white/[0.015]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <Section>
          <div className="text-center mb-16">
            <Eyebrow color="green">How it works</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold text-white mt-5">
              Three steps to your{' '}
              <span className="text-green-400">legend</span>
            </h2>
          </div>
        </Section>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[960px] mx-auto"
        >
          {steps.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              className="text-center"
            >
              <div className="relative w-16 h-16 rounded-2xl mx-auto mb-5 bg-gradient-to-br from-purple-600/15 to-indigo-500/15 border border-purple-500/15 flex items-center justify-center">
                <Icon
                  icon={s.icon}
                  className="text-purple-400 text-[26px]"
                />
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-[11px] font-bold font-mono w-7 h-7 rounded-full flex items-center justify-center">
                  {s.num}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-[15px] text-white/45 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const quotes = [
    {
      text: 'Hero Nexus completely changed how our group manages campaigns. The character creator is incredibly intuitive.',
      name: 'Alex M.',
      role: 'Dungeon Master',
      color: 'purple',
    },
    {
      text: 'Finally, a platform that understands what tabletop players actually need. Cloud sync is a game-changer.',
      name: 'Jordan R.',
      role: 'Player',
      color: 'blue',
    },
    {
      text: 'The homebrew tools let me create custom content that I can share with my entire community instantly.',
      name: 'Sam K.',
      role: 'Content Creator',
      color: 'green',
    },
  ];

  const avatarBg: Record<string, string> = {
    purple: 'bg-purple-400/20 text-purple-400',
    blue: 'bg-blue-400/20 text-blue-400',
    green: 'bg-green-400/20 text-green-400',
  };

  return (
    <section id="community" className="py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <Section>
          <div className="text-center mb-16">
            <Eyebrow color="amber">Community</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold text-white mt-5">
              Loved by <span className="text-amber-400">adventurers</span>
            </h2>
          </div>
        </Section>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-2xl p-8 transition-all duration-500"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Icon
                    key={j}
                    icon="lucide:star"
                    className="text-amber-400 text-base"
                  />
                ))}
              </div>
              <p className="text-[15px] text-white/60 leading-relaxed mb-6">
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold ${avatarBg[q.color]}`}
                >
                  {q.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {q.name}
                  </div>
                  <div className="text-xs text-white/35">{q.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTASection() {
  return (
    <section className="py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <Section>
          <div className="relative rounded-[28px] py-20 px-12 bg-gradient-to-br from-purple-600/12 to-indigo-500/[0.08] border border-purple-500/15 text-center overflow-hidden">
            <div className="absolute -top-[30%] -right-[10%] w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[1px] pointer-events-none" />
            <h2 className="relative text-[clamp(28px,4vw,44px)] font-extrabold text-white mb-4">
              Ready to begin your legend?
            </h2>
            <p className="relative text-[17px] text-white/50 max-w-[480px] mx-auto leading-relaxed mb-10">
              Join thousands of adventurers who have already discovered the
              magic of Hero Nexus.
            </p>
            <div className="relative flex gap-4 justify-center flex-wrap">
              <Button
                as={Link}
                href="/register"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full px-7 font-semibold shadow-lg shadow-purple-600/35 hover:shadow-xl hover:shadow-purple-600/50 hover:-translate-y-0.5 transition-all duration-350 gap-2"
              >
                Start your journey
                <Icon icon="lucide:arrow-right" className="text-base" />
              </Button>
              <Button
                as={Link}
                href="/about"
                variant="bordered"
                size="lg"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/50 rounded-full px-7 font-semibold transition-all duration-300"
              >
                Learn more
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center flex-wrap gap-6">
        <div className="flex items-center gap-2.5">
          <Image
            src="/icons/hero-nexus-logo-no-bg.png"
            alt=""
            width={32}
            height={32}
          />
          <span className="text-[15px] font-bold text-white/50">
            Hero Nexus
          </span>
        </div>
        <div className="flex gap-8">
          {['Features', 'About', 'FAQ', 'Contact'].map((l) => (
            <Link
              key={l}
              href={l === 'About' ? '/about' : l === 'FAQ' ? '/faq' : '#'}
              className="text-[13px] text-white/35 hover:text-white/70 transition-colors duration-300"
            >
              {l}
            </Link>
          ))}
        </div>
        <div className="text-[13px] text-white/25">
          &copy; 2026 Hero Nexus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
