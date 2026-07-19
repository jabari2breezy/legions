"use client";

import { useState, useCallback, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Utilities ─── */

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 50,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function ClipReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2200;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function Magnetic({
  children,
  className = "",
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.15);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? "a" : "button";
  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <Tag href={href} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
        {children}
      </Tag>
    </motion.div>
  );
}

/* ─── Preloader ─── */

function Preloader({ onDone }: { onDone: () => void }) {
  const [c, setC] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur += Math.floor(Math.random() * 12) + 4;
      if (cur >= 100) { cur = 100; clearInterval(id); setC(100); setTimeout(() => setExit(true), 350); }
      else setC(cur);
    }, 50);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (exit) { const t = setTimeout(onDone, 900); return () => clearTimeout(t); }
  }, [exit, onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="pl"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#060A14" } as CSSProperties}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }} className="text-center">
            <div className="font-serif text-[clamp(5rem,16vw,14rem)] font-light leading-none tabular-nums" style={{ color: "#11C7CA" } as CSSProperties}>
              {c}
            </div>
            <motion.div initial={{ width: 0 }} animate={{ width: "8rem" }} transition={{ duration: 1.5, ease }} className="h-px mx-auto mt-8 mb-4" style={{ background: "#11C7CA", opacity: 0.3 } as CSSProperties} />
            <div className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: "#387AC4" } as CSSProperties}>Legions Club</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Nav ─── */

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: s ? "rgba(6,10,20,0.8)" : "transparent",
        backdropFilter: s ? "blur(20px)" : "none",
        borderBottom: s ? "1px solid rgba(17,199,202,0.06)" : "1px solid transparent",
      } as CSSProperties}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center font-serif text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #11C7CA, #068896)", color: "#274B70" } as CSSProperties}
          >
            L
          </motion.div>
          <span className="font-serif text-lg font-medium hidden sm:block" style={{ color: "#EAE9F4" } as CSSProperties}>Legions Club</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {["About", "Programs", "Work", "Impact"].map((item) => (
            <motion.a key={item} href={`#${item.toLowerCase()}`} className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(213,237,245,0.4)" } as CSSProperties} whileHover={{ color: "rgba(17,199,202,1)" }}>
              {item}
            </motion.a>
          ))}
        </div>

        <Magnetic href="#join">
          <motion.span
            className="inline-flex items-center px-6 py-2.5 text-[11px] font-mono font-medium tracking-[0.15em] uppercase rounded-full"
            style={{ background: "#11C7CA", color: "#274B70" } as CSSProperties}
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(17,199,202,0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            Join Now
          </motion.span>
        </Magnetic>
      </div>
    </motion.nav>
  );
}

/* ─── Hero ─── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ty = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const op = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[110vh] flex items-end pb-24 sm:pb-32 overflow-hidden" style={{ background: "#060A14" } as CSSProperties}>
      {/* ambient orbs */}
      <motion.div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(17,199,202,0.06) 0%, transparent 70%)", filter: "blur(60px)", animation: "orbFloat 20s ease-in-out infinite" } as CSSProperties} />
      <motion.div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(62,93,224,0.04) 0%, transparent 70%)", filter: "blur(50px)", animation: "orbFloat 25s ease-in-out infinite 5s" } as CSSProperties} />

      <motion.div style={{ y: ty, opacity: op }} className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* top line */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3, ease }} className="flex items-center gap-4 mb-12">
          <div className="w-16 h-px" style={{ background: "#11C7CA" } as CSSProperties} />
          <span className="font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: "#11C7CA" } as CSSProperties}>Est. 2024 — Youth Development</span>
        </motion.div>

        {/* main title */}
        <div className="mb-6">
          <ClipReveal delay={0.5}>
            <h1 className="font-serif text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] font-light tracking-[-0.03em]">
              <span style={{ color: "#EAE9F4" } as CSSProperties}>Building</span>
            </h1>
          </ClipReveal>
          <ClipReveal delay={0.62}>
            <h1 className="font-serif text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] font-light tracking-[-0.03em]">
              <span className="gradient-text font-semibold italic">Tomorrow&apos;s</span>
            </h1>
          </ClipReveal>
          <ClipReveal delay={0.74}>
            <h1 className="font-serif text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] font-light tracking-[-0.03em]">
              <span style={{ color: "#EAE9F4" } as CSSProperties}>Leaders</span>
            </h1>
          </ClipReveal>
        </div>

        {/* sub + cta row */}
        <div className="grid sm:grid-cols-2 gap-12 items-end mt-16">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0, ease }} className="text-lg max-w-md leading-relaxed" style={{ color: "#387AC4" } as CSSProperties}>
            Empowering the next generation through mentorship, community, and the relentless pursuit of excellence.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.15, ease }} className="flex flex-wrap gap-4">
            <Magnetic href="#join">
              <motion.span className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide uppercase rounded-full" style={{ background: "#11C7CA", color: "#274B70" } as CSSProperties} whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(17,199,202,0.3)" }} whileTap={{ scale: 0.97 }}>
                Join the Movement
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.span>
            </Magnetic>
            <Magnetic href="#glimpse">
              <motion.span className="glass inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide uppercase rounded-full" style={{ color: "#11C7CA" } as CSSProperties} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                See Our Work
              </motion.span>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.8, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: "#11C7CA" } as CSSProperties}>Scroll</span>
        <motion.div className="w-px h-14" style={{ background: "#11C7CA" } as CSSProperties} animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>
    </section>
  );
}

/* ─── Marquee ─── */

function Marquee() {
  const items = ["Leadership", "Mentorship", "Community", "Excellence", "Innovation", "Purpose", "Ambition", "Growth"];
  const track = [...items, ...items].map((t, i) => (
    <span key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
      <span className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic font-light" style={{ color: "rgba(17,199,202,0.25)" } as CSSProperties}>{t}</span>
      <span className="w-2 h-2 rounded-full" style={{ background: "rgba(17,199,202,0.15)" } as CSSProperties} />
    </span>
  ));

  return (
    <div className="py-12 overflow-hidden divider-solid" style={{ borderTop: "1px solid rgba(17,199,202,0.06)", borderBottom: "1px solid rgba(17,199,202,0.06)" } as CSSProperties}>
      <div className="flex animate-marquee" style={{ width: "max-content" } as CSSProperties}>
        {track}
        {track}
      </div>
    </div>
  );
}

/* ─── About ─── */

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={ref} className="relative py-32 sm:py-44" style={{ background: "#0D1526" } as CSSProperties}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* left: text */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-px" style={{ background: "#11C7CA" } as CSSProperties} />
                <span className="font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: "#11C7CA" } as CSSProperties}>About Us</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.9] font-light mb-10" style={{ color: "#EAE9F4" } as CSSProperties}>
                Our<br />
                <span className="italic font-semibold" style={{ color: "#11C7CA" } as CSSProperties}>Mission</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg leading-[1.75] mb-6" style={{ color: "#D5EDF5", opacity: 0.8 } as CSSProperties}>
                Legions Club exists to cultivate extraordinary young individuals who will shape the future. We believe every young person carries the potential for greatness — our role is to ignite that spark.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base leading-[1.8]" style={{ color: "#387AC4", opacity: 0.7 } as CSSProperties}>
                Through carefully designed programs, world-class mentorship, and a community that champions ambition, we create environments where young leaders don&apos;t just learn — they transform.
              </p>
            </Reveal>

            <div className="grid grid-cols-3 gap-8 mt-14 pt-10" style={{ borderTop: "1px solid rgba(17,199,202,0.08)" } as CSSProperties}>
              {[{ n: "500+", l: "Youth" }, { n: "50+", l: "Mentors" }, { n: "12", l: "Programs" }].map((s, i) => (
                <Reveal key={s.l} delay={0.4 + i * 0.1}>
                  <div>
                    <div className="font-serif text-3xl sm:text-4xl font-light mb-1" style={{ color: "#11C7CA" } as CSSProperties}>{s.n}</div>
                    <div className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: "#387AC4" } as CSSProperties}>{s.l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: visual */}
          <div className="lg:col-span-7 relative">
            <Reveal delay={0.2} y={30}>
              <motion.div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ y: imgY }}>
                <div className="img-placeholder absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(17,199,202,0.08), rgba(62,93,224,0.06), rgba(13,21,38,0.9))" } as CSSProperties} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-[12rem] sm:text-[16rem] font-bold select-none" style={{ color: "rgba(17,199,202,0.06)" } as CSSProperties}>L</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: "linear-gradient(to top, #0D1526, transparent)" } as CSSProperties} />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Programs ─── */

function Programs() {
  const programs = [
    { tag: "01", title: "Leadership Academy", desc: "Intensive leadership development through real-world challenges, public speaking, and strategic thinking workshops.", accent: "#11C7CA", bg: "linear-gradient(135deg, rgba(17,199,202,0.1), rgba(6,136,150,0.05))" },
    { tag: "02", title: "Mentorship Circle", desc: "One-on-one pairing with industry professionals who guide, inspire, and open doors for the next generation.", accent: "#48DDD5", bg: "linear-gradient(135deg, rgba(72,221,213,0.1), rgba(27,170,204,0.05))" },
    { tag: "03", title: "Community Impact", desc: "Hands-on projects that create measurable change in local communities while building character and purpose.", accent: "#41EFE7", bg: "linear-gradient(135deg, rgba(65,239,231,0.1), rgba(17,199,202,0.05))" },
    { tag: "04", title: "Creative Lab", desc: "A space for young innovators to explore technology, art, and design thinking through collaborative projects.", accent: "#3E5DE0", bg: "linear-gradient(135deg, rgba(62,93,224,0.1), rgba(63,55,162,0.05))" },
  ];

  return (
    <section id="programs" className="relative py-32 sm:py-44" style={{ background: "#060A14" } as CSSProperties}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: "#11C7CA" } as CSSProperties} />
            <span className="font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: "#11C7CA" } as CSSProperties}>Programs</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.9] font-light max-w-3xl mb-20" style={{ color: "#EAE9F4" } as CSSProperties}>
            Where Ambition Meets{" "}
            <span className="italic font-semibold" style={{ color: "#11C7CA" } as CSSProperties}>Opportunity</span>
          </h2>
        </Reveal>

        {/* staggered 2-col grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {programs.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.1}>
              <motion.div
                className="glass shimmer-border rounded-2xl p-8 sm:p-10 group cursor-pointer relative overflow-hidden"
                whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
              >
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: p.bg } as CSSProperties} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: p.accent } as CSSProperties}>{p.tag}</span>
                    <motion.div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: `1px solid ${p.accent}` } as CSSProperties}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke={p.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </motion.div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-4" style={{ color: "#EAE9F4" } as CSSProperties}>{p.title}</h3>
                  <p className="leading-relaxed text-[15px] opacity-55" style={{ color: "#D5EDF5" } as CSSProperties}>{p.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Glimpse (Work) ─── */

function Glimpse() {
  const projects = [
    { num: "01", title: "Leadership Summit 2024", cat: "Leadership", desc: "50 young leaders gathered for a weekend of transformation.", accent: "#11C7CA", gradient: "linear-gradient(135deg, rgba(17,199,202,0.12), rgba(6,136,150,0.06))" },
    { num: "02", title: "Community Garden Build", cat: "Community Impact", desc: "Built 3 urban gardens serving 200+ families in need.", accent: "#48DDD5", gradient: "linear-gradient(135deg, rgba(72,221,213,0.12), rgba(27,170,204,0.06))" },
    { num: "03", title: "Tech Innovation Lab", cat: "Creative", desc: "Students built and shipped their first apps in 8 weeks.", accent: "#3E5DE0", gradient: "linear-gradient(135deg, rgba(62,93,224,0.12), rgba(63,55,162,0.06))" },
    { num: "04", title: "Mentor Matching Gala", cat: "Mentorship", desc: "Paired 120 youth with industry professionals.", accent: "#41EFE7", gradient: "linear-gradient(135deg, rgba(65,239,231,0.12), rgba(17,199,202,0.06))" },
  ];

  return (
    <section id="glimpse" className="relative py-32 sm:py-44 overflow-hidden" style={{ background: "#0D1526" } as CSSProperties}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: "#11C7CA" } as CSSProperties} />
            <span className="font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: "#11C7CA" } as CSSProperties}>A Glimpse</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.9] font-light max-w-3xl mb-20" style={{ color: "#EAE9F4" } as CSSProperties}>
            Our Work in<br />
            <span className="italic font-semibold" style={{ color: "#11C7CA" } as CSSProperties}>Action</span>
          </h2>
        </Reveal>

        {/* asymmetric staggered grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p, i) => {
            const offset = i % 2 === 1 ? "sm:mt-16" : "";
            return (
              <Reveal key={p.num} delay={i * 0.1} className={offset}>
                <motion.div
                  className="glass shimmer-border rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
                >
                  {/* image placeholder area */}
                  <div className="hover-image-scale relative aspect-[16/10]">
                    <div className="img-placeholder absolute inset-0" style={{ background: p.gradient } as CSSProperties} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-[6rem] font-bold select-none" style={{ color: "rgba(17,199,202,0.04)" } as CSSProperties}>{p.num}</span>
                    </div>
                    <div className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(6,10,20,0.7)", backdropFilter: "blur(10px)", color: p.accent, border: `1px solid ${p.accent}33` } as CSSProperties}>
                      {p.cat}
                    </div>
                  </div>

                  <div className="p-8 sm:p-10">
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-3" style={{ color: "#EAE9F4" } as CSSProperties}>{p.title}</h3>
                    <p className="leading-relaxed text-[15px] opacity-55 mb-6" style={{ color: "#D5EDF5" } as CSSProperties}>{p.desc}</p>
                    <motion.div className="flex items-center gap-2 text-sm font-medium" style={{ color: p.accent } as CSSProperties}>
                      View Project
                      <motion.svg width="14" height="14" viewBox="0 0 16 16" fill="none" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─── */

function Stats() {
  const stats = [
    { value: 98, suffix: "%", label: "Completion Rate", accent: "#11C7CA" },
    { value: 49, suffix: "", label: "Mentor Rating", accent: "#48DDD5", display: "4.9" },
    { value: 85, suffix: "%", label: "College Acceptance", accent: "#41EFE7" },
    { value: 3, suffix: "x", label: "Leadership Growth", accent: "#3E5DE0" },
  ];

  return (
    <section id="impact" className="relative py-32 sm:py-44" style={{ background: "#060A14" } as CSSProperties}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: "#11C7CA" } as CSSProperties} />
            <span className="font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: "#11C7CA" } as CSSProperties}>Our Impact</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="py-10" style={{ borderTop: "1px solid rgba(17,199,202,0.08)" } as CSSProperties}>
                <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light mb-4 glow" style={{ color: s.accent } as CSSProperties}>
                  {s.display ? s.display : <CountUp target={s.value} suffix={s.suffix} />}
                </div>
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#387AC4" } as CSSProperties}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Quote ─── */

function Quote() {
  return (
    <section className="relative py-32 sm:py-44" style={{ background: "#0D1526" } as CSSProperties}>
      <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <Reveal>
          <svg className="mx-auto mb-10" width="40" height="30" viewBox="0 0 40 30" fill="none">
            <path d="M0 30V18C0 13.3333 1.16667 9.16667 3.5 5.5C5.83333 1.83333 9.16667 0 13.5 0V6C10.8333 6 8.66667 6.83333 7 8.5C5.33333 10.1667 4.5 12.3333 4.5 15H13V30H0ZM27 30V18C27 13.3333 28.1667 9.16667 30.5 5.5C32.8333 1.83333 36.1667 0 40.5 0V6C37.8333 6 35.6667 6.83333 34 8.5C32.3333 10.1667 31.5 12.3333 31.5 15H40V30H27Z" fill="rgba(17,199,202,0.1)" />
          </svg>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="font-serif text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.2] font-light italic" style={{ color: "#EAE9F4" } as CSSProperties}>
            &ldquo;Every young person carries the spark of greatness. Our mission is to fan that spark into a flame that lights the way for others.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-10 h-px" style={{ background: "#11C7CA", opacity: 0.4 } as CSSProperties} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#387AC4" } as CSSProperties}>Legions Club</span>
            <div className="w-10 h-px" style={{ background: "#11C7CA", opacity: 0.4 } as CSSProperties} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CTA ─── */

function CTA() {
  return (
    <section id="join" className="relative py-32 sm:py-44" style={{ background: "#060A14" } as CSSProperties}>
      <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: "#11C7CA" } as CSSProperties} />
            <span className="font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: "#11C7CA" } as CSSProperties}>Get Involved</span>
            <div className="w-10 h-px" style={{ background: "#11C7CA" } as CSSProperties} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] font-light mb-8" style={{ color: "#EAE9F4" } as CSSProperties}>
            Ready to<br />
            <span className="italic font-semibold" style={{ color: "#11C7CA" } as CSSProperties}>Lead?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg max-w-xl mx-auto mb-14 leading-relaxed" style={{ color: "#387AC4" } as CSSProperties}>
            Whether you&apos;re a young leader seeking growth or a mentor ready to make a difference, there&apos;s a place for you in the Legions.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-5">
            <Magnetic href="#">
              <motion.span className="inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-wide uppercase rounded-full" style={{ background: "#11C7CA", color: "#274B70" } as CSSProperties} whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(17,199,202,0.3)" }} whileTap={{ scale: 0.97 }}>
                Apply Now
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.span>
            </Magnetic>
            <Magnetic href="#">
              <motion.span className="glass inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-wide uppercase rounded-full" style={{ color: "#11C7CA" } as CSSProperties} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                Become a Mentor
              </motion.span>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  const cols = [
    { h: "Organization", links: ["About", "Mission", "Team", "Careers"] },
    { h: "Programs", links: ["Leadership Academy", "Mentorship Circle", "Community Impact", "Creative Lab"] },
    { h: "Connect", links: ["Instagram", "Twitter / X", "LinkedIn", "YouTube"] },
    { h: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
  ];

  return (
    <footer className="relative pt-24 pb-8" style={{ background: "#0D1526" } as CSSProperties}>
      <div className="divider max-w-[1600px] mx-auto mb-20" />
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-14 mb-20">
          {cols.map((col, ci) => (
            <Reveal key={col.h} delay={ci * 0.08}>
              <div>
                <div className="font-mono text-[9px] tracking-[0.35em] uppercase mb-6" style={{ color: "#11C7CA" } as CSSProperties}>{col.h}</div>
                <ul className="space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <motion.a href="#" className="text-[13px] block" style={{ color: "rgba(213,237,245,0.4)" } as CSSProperties} whileHover={{ color: "rgba(213,237,245,1)", x: 4 }} transition={{ duration: 0.2 }}>
                        {l}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-sm font-bold" style={{ background: "linear-gradient(135deg, #11C7CA, #068896)", color: "#274B70" } as CSSProperties}>L</div>
              <span className="font-serif text-base font-medium" style={{ color: "#EAE9F4" } as CSSProperties}>Legions Club</span>
            </div>
          </Reveal>
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase opacity-30" style={{ color: "#D5EDF5" } as CSSProperties}>
            &copy; {new Date().getFullYear()} Legions Club. All rights reserved.
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none select-none">
        <span className="font-serif text-[clamp(4rem,12vw,10rem)] font-bold whitespace-nowrap" style={{ color: "#EAE9F4" } as CSSProperties}>LEGIONS</span>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onDone={onDone} />
      <AnimatePresence>
        {loaded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Nav />
            <main>
              <Hero />
              <Marquee />
              <About />
              <Programs />
              <Glimpse />
              <Stats />
              <Quote />
              <CTA />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
