import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../../icons/brainIcon";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES (injected as <style> tag)
   ───────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #5046E4;
      --primary-light: #6E6AEC;
      --secondary: #E0E7FE;
      --text-dark: #1a1a2e;
      --text-mid: #4a4a6a;
      --text-light: #7a7a9a;
      --white: #ffffff;
      --card-bg: #f4f6ff;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--white);
      color: var(--text-dark);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Fade-in-up animation (triggered by .visible) ── */
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── Staggered children ── */
    .stagger-children > * { transition-delay: 0s !important; }
    .stagger-children.visible > *:nth-child(1) { transition-delay: 0.0s; }
    .stagger-children.visible > *:nth-child(2) { transition-delay: 0.12s; }
    .stagger-children.visible > *:nth-child(3) { transition-delay: 0.24s; }
    .stagger-children.visible > *:nth-child(4) { transition-delay: 0.36s; }
    .stagger-children.visible > *:nth-child(5) { transition-delay: 0.48s; }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--secondary); border-radius: 3px; }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────
   HOOK: Intersection Observer for reveal animations
   ───────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────────────────────
   ABSTRACT BRAIN ILLUSTRATION (SVG)
   ───────────────────────────────────────────────────────────── */
const BrainIllustration = () => (
  <svg viewBox="0 0 520 420" style={{ width: "100%", maxWidth: 520, height: "auto" }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5046E4" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#E0E7FE" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5046E4" />
        <stop offset="100%" stopColor="#6E6AEC" />
      </linearGradient>
      <linearGradient id="g3" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5046E4" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#E0E7FE" stopOpacity="0.3" />
      </linearGradient>
      <filter id="blur1">
        <feGaussianBlur stdDeviation="28" />
      </filter>
      <filter id="shadow1">
        <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#5046E4" floodOpacity="0.18" />
      </filter>
    </defs>

    {/* Background blobs */}
    <ellipse cx="260" cy="210" rx="180" ry="160" fill="url(#g1)" />
    <ellipse cx="160" cy="260" rx="100" ry="80" fill="url(#g3)" filter="url(#blur1)" />
    <ellipse cx="370" cy="150" rx="80" ry="90" fill="url(#g3)" filter="url(#blur1)" />

    {/* Central node (brain core) */}
    <circle cx="260" cy="210" r="62" fill="url(#g2)" filter="url(#shadow1)" />
    <circle cx="260" cy="210" r="48" fill="#fff" fillOpacity="0.15" />

    {/* Satellite nodes */}
    {[
      { cx: 110, cy: 100, r: 28, label: "💡" },
      { cx: 400, cy: 90, r: 24, label: "🔗" },
      { cx: 80, cy: 290, r: 22, label: "📝" },
      { cx: 420, cy: 270, r: 26, label: "📂" },
      { cx: 200, cy: 350, r: 20, label: "✨" },
      { cx: 340, cy: 355, r: 22, label: "🔍" },
    ].map((n, i) => (
      <g key={i}>
        {/* Connection line */}
        <line x1={n.cx} y1={n.cy} x2="260" y2="210"
          stroke="#5046E4" strokeOpacity="0.2" strokeWidth="1.5"
          strokeDasharray="4 4" />
        {/* Node circle */}
        <circle cx={n.cx} cy={n.cy} r={n.r} fill="white" stroke="#E0E7FE" strokeWidth="2" filter="url(#shadow1)" />
        {/* Emoji label */}
        <text x={n.cx} y={n.cy + 6} textAnchor="middle" fontSize="16">{n.label}</text>
      </g>
    ))}

    {/* Pulse rings on center */}
    <circle cx="260" cy="210" r="62" fill="none" stroke="#5046E4" strokeOpacity="0.3" strokeWidth="1.5"
      style={{ animation: "pulse 3s ease-out infinite" }} />
    <circle cx="260" cy="210" r="62" fill="none" stroke="#5046E4" strokeOpacity="0.15" strokeWidth="1"
      style={{ animation: "pulse 3s ease-out infinite 1s" }} />

    <style>{`
      @keyframes pulse {
        0% { transform-origin: 260px 210px; transform: scale(1); opacity: 0.6; }
        100% { transform-origin: 260px 210px; transform: scale(1.55); opacity: 0; }
      }
    `}</style>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px 32px" : "20px 32px",
      background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid #e8eaf5" : "none",
      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div >
          <BrainIcon size="lg"/>
        </div>
        <span className="font-bold text-primary-text text-2xl">
          Brainly
        </span>
      </div>
      {/* Nav links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["Features", "How It Works", "Pricing"].map((l) => (
          <a key={l} href="#" style={{
            textDecoration: "none", color: "#4a4a6a", fontSize: 14, fontWeight: 500,
            transition: "color 0.2s", letterSpacing: "0.1px",
          }}
            onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#5046E4"}
            onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "#4a4a6a"}
          >{l}</a>
        ))}
        <button onClick={()=> navigate("/signup")} style={{
          background: "#5046E4", color: "#fff", border: "none", borderRadius: 8,
          padding: "9px 22px", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
          transition: "all 0.25s", boxShadow: "0 3px 12px rgba(80,70,228,0.35)",
          fontFamily: "'DM Sans', sans-serif",
        }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#4038c7"; (e.target as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#5046E4"; (e.target as HTMLButtonElement).style.transform = "translateY(0)"; }}
        >Sign Up</button>
      </div>
    </nav>
  );
};

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────────────────────── */
const Hero = () => (
  <section style={{
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    padding: "100px 32px 60px", background: "linear-gradient(175deg, #f7f8ff 0%, #eef1ff 50%, #fff 100%)",
    position: "relative", overflow: "hidden",
  }}>
    {/* Decorative top-right blob */}
    <div style={{
      position: "absolute", top: -120, right: -100, width: 480, height: 480,
      borderRadius: "50%", background: "radial-gradient(circle, rgba(80,70,228,0.07) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />
    <div style={{
      position: "absolute", bottom: -80, left: -60, width: 320, height: 320,
      borderRadius: "50%", background: "radial-gradient(circle, rgba(224,231,254,0.6) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />

    <div style={{
      maxWidth: 1120, width: "100%", display: "grid",
      gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
    }}>
      {/* Left: Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, width: "fit-content" }}>
          <div style={{
            background: "linear-gradient(135deg, #5046E4, #6E6AEC)", borderRadius: 20,
            padding: "5px 14px", display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "blink 2s infinite" }} />
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>Now in Beta</span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 800,
          fontSize: "clamp(38px, 5.2vw, 56px)", lineHeight: 1.1,
          color: "#1a1a2e", letterSpacing: "-1.5px",
        }}>
          Your <span style={{ color: "#5046E4" }}>Second Brain</span> —<br />
          Remember Everything,<br />Effortlessly.
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: 17, color: "#5a5a7a", lineHeight: 1.7, maxWidth: 460,
          fontWeight: 300,
        }}>
          Capture ideas, links, notes, and knowledge in one intelligent space. Stop losing brilliant thoughts to the noise of daily life.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
          <button style={{
            background: "linear-gradient(135deg, #5046E4, #6E6AEC)", color: "#fff", border: "none",
            borderRadius: 12, padding: "15px 32px", fontSize: 15.5, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 18px rgba(80,70,228,0.38)", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2px",
          }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.target as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(80,70,228,0.45)"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = "translateY(0)"; (e.target as HTMLButtonElement).style.boxShadow = "0 4px 18px rgba(80,70,228,0.38)"; }}
          >
            Get Started Free
          </button>
          <a href="#how-it-works" style={{
            textDecoration: "none", color: "#5046E4", fontSize: 15, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6, transition: "gap 0.25s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = "10px"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = "6px"}
          >
            See How It Works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#5046E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12 }}>
          <div style={{ display: "flex" }}>
            {["#5046E4","#6E6AEC","#8B87F0","#A9A5F5"].map((c, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: "50%", border: "2px solid #fff",
                background: c, marginLeft: i > 0 ? -10 : 0, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 13,
              }}>
                {["A","B","C","D"][i]}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "#7a7a9a", fontWeight: 500 }}>
            <strong style={{ color: "#1a1a2e" }}>2,400+</strong> users already building their second brain
          </span>
        </div>
      </div>

      {/* Right: Illustration */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <BrainIllustration />
      </div>
    </div>

    <style>{`
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    `}</style>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS
   ───────────────────────────────────────────────────────────── */
const steps = [
  {
    num: "01", title: "Capture",
    desc: "Save notes, links, ideas, and web clips instantly — from anywhere, on any device.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="6" width="28" height="24" rx="4" stroke="#5046E4" strokeWidth="2.2" fill="none"/>
        <path d="M4 12h28" stroke="#5046E4" strokeWidth="2"/>
        <circle cx="9" cy="9" r="1.5" fill="#5046E4"/>
        <circle cx="14" cy="9" r="1.5" fill="#5046E4" opacity="0.5"/>
        <circle cx="19" cy="9" r="1.5" fill="#5046E4" opacity="0.25"/>
        <path d="M10 19h16M10 23h10" stroke="#5046E4" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    num: "02", title: "Organize",
    desc: "Auto-tag, folder, and smart-categorize your knowledge. Structure emerges naturally.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="3" y="8" width="14" height="20" rx="3" stroke="#5046E4" strokeWidth="2.2" fill="none"/>
        <rect x="19" y="5" width="14" height="20" rx="3" stroke="#5046E4" strokeWidth="2.2" fill="none" opacity="0.6"/>
        <path d="M7 14h6M7 18h4" stroke="#5046E4" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
        <path d="M23 11h6M23 15h4" stroke="#5046E4" strokeWidth="1.8" strokeLinecap="round" opacity="0.35"/>
        <path d="M10 30l5 3 5-3" stroke="#5046E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "03", title: "Recall",
    desc: "Find anything instantly with intelligent search. Your knowledge, always at your fingertips.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="16" cy="16" r="10" stroke="#5046E4" strokeWidth="2.2" fill="none"/>
        <path d="M23.5 23.5l6 6" stroke="#5046E4" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M12 16h8M16 12v8" stroke="#5046E4" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
];

const HowItWorks = () => (
  <section id="how-it-works" style={{
    padding: "110px 32px", background: "#fff", position: "relative",
  }}>
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      {/* Header */}
      <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
        <span style={{
          fontSize: 12.5, fontWeight: 600, color: "#5046E4", letterSpacing: "2px",
          textTransform: "uppercase", display: "block", marginBottom: 14,
        }}>How It Works</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 42px)",
          fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.8px", lineHeight: 1.2,
        }}>
          Three steps to total<br /><span style={{ color: "#5046E4" }}>mental clarity</span>
        </h2>
      </div>

      {/* Steps */}
      <div className="reveal stagger-children" style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40,
      }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            textAlign: "center", padding: "40px 28px", borderRadius: 20,
            background: "linear-gradient(145deg, #f9faff, #fff)",
            border: "1px solid #eef0f8",
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
            cursor: "default", position: "relative",
          }}
            onMouseEnter={e => { (e.currentTarget).style.transform = "translateY(-6px)"; (e.currentTarget).style.boxShadow = "0 12px 36px rgba(80,70,228,0.1)"; }}
            onMouseLeave={e => { (e.currentTarget).style.transform = "translateY(0)"; (e.currentTarget).style.boxShadow = "none"; }}
          >
            {/* Step number badge */}
            <div style={{
              position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
              background: "#5046E4", color: "#fff", fontSize: 11, fontWeight: 700,
              padding: "4px 14px", borderRadius: 20, letterSpacing: "1px",
            }}>{s.num}</div>

            {/* Icon circle */}
            <div style={{
              width: 72, height: 72, borderRadius: 18,
              background: "linear-gradient(135deg, #eef1ff, #e4e8fd)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 22px",
            }}>{s.icon}</div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700,
              color: "#1a1a2e", marginBottom: 10, letterSpacing: "-0.3px",
            }}>{s.title}</h3>
            <p style={{ fontSize: 14.5, color: "#6a6a8a", lineHeight: 1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   FEATURES
   ───────────────────────────────────────────────────────────── */
const features = [
  { icon: "🔍", title: "Smart Search", desc: "Find any note, link, or idea in milliseconds with AI-powered semantic search." },
  { icon: "🏷️", title: "Tags & Folders", desc: "Organize effortlessly with auto-suggested tags and nested folder structures." },
  { icon: "🔒", title: "Secure Storage", desc: "End-to-end encryption ensures your knowledge stays private and protected." },
  { icon: "⚡", title: "Fast Access", desc: "Lightning-fast retrieval. No lag, no waiting — your ideas are always ready." },
  { icon: "📱", title: "Cross-Device", desc: "Seamlessly sync across desktop, mobile, and web. Work from anywhere." },
  { icon: "🧠", title: "Smart Insights", desc: "Discover connections between your notes with intelligent relationship mapping." },
];

const Features = () => (
  <section style={{
    padding: "110px 32px", background: "var(--secondary)",
    position: "relative", overflow: "hidden",
  }}>
    {/* Subtle pattern overlay */}
    <div style={{
      position: "absolute", inset: 0, opacity: 0.04,
      backgroundImage: "radial-gradient(circle, #5046E4 1px, transparent 1px)",
      backgroundSize: "40px 40px", pointerEvents: "none",
    }} />

    <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
      {/* Header */}
      <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
        <span style={{
          fontSize: 12.5, fontWeight: 600, color: "#5046E4", letterSpacing: "2px",
          textTransform: "uppercase", display: "block", marginBottom: 14,
        }}>Features</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 42px)",
          fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.8px",
        }}>
          Everything you need to<br /><span style={{ color: "#5046E4" }}>think better</span>
        </h2>
      </div>

      {/* Feature cards grid */}
      <div className="reveal stagger-children" style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 18, padding: "32px 28px",
            boxShadow: "0 2px 16px rgba(80,70,228,0.06)", border: "1px solid rgba(80,70,228,0.07)",
            transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", cursor: "default",
          }}
            onMouseEnter={e => { (e.currentTarget).style.transform = "translateY(-4px)"; (e.currentTarget).style.boxShadow = "0 10px 32px rgba(80,70,228,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget).style.transform = "translateY(0)"; (e.currentTarget).style.boxShadow = "0 2px 16px rgba(80,70,228,0.06)"; }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "linear-gradient(135deg, #eef1ff, #e4e8fd)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, marginBottom: 18,
            }}>{f.icon}</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700,
              color: "#1a1a2e", marginBottom: 8, letterSpacing: "-0.2px",
            }}>{f.title}</h3>
            <p style={{ fontSize: 14, color: "#6a6a8a", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   WHY USE THIS APP
   ───────────────────────────────────────────────────────────── */
const benefits = [
  { title: "Never Forget Ideas", desc: "Every brilliant thought, captured and preserved forever — no more letting inspiration slip away.", accent: "💎" },
  { title: "Think Clearly", desc: "Offload mental clutter into your second brain. Free your mind to focus on what truly matters.", accent: "🌿" },
  { title: "Save Time", desc: "Stop searching for that one note from last week. Everything is findable in seconds.", accent: "⏱️" },
  { title: "Reduce Mental Overload", desc: "Let your second brain carry the weight. Less stress, more creativity, more flow.", accent: "🧘" },
];

const WhyUse = () => (
  <section style={{ padding: "110px 32px", background: "#fff" }}>
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Left: Visual */}
        <div className="reveal" style={{ position: "relative" }}>
          <div style={{
            background: "linear-gradient(145deg, #eef1ff, #dde4fc)",
            borderRadius: 28, padding: 48, position: "relative", overflow: "hidden",
          }}>
            {/* Decorative circles */}
            <div style={{
              position: "absolute", top: -30, right: -30, width: 140, height: 140,
              borderRadius: "50%", background: "rgba(80,70,228,0.08)",
            }} />
            <div style={{
              position: "absolute", bottom: -20, left: -20, width: 100, height: 100,
              borderRadius: "50%", background: "rgba(80,70,228,0.05)",
            }} />

            {/* Stats cards */}
            {[
              { val: "94%", label: "Less mental clutter", top: 0 },
              { val: "3x", label: "Faster idea retrieval", top: 110 },
              { val: "∞", label: "Knowledge stored", top: 220 },
            ].map((s, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 16, padding: "18px 24px",
                boxShadow: "0 4px 20px rgba(80,70,228,0.08)",
                marginBottom: i < 2 ? 16 : 0, display: "flex", alignItems: "center", gap: 16,
                border: "1px solid rgba(80,70,228,0.06)",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "linear-gradient(135deg, #5046E4, #6E6AEC)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontFamily: "'Playfair Display', serif",
                  fontWeight: 800, fontSize: 18, flexShrink: 0,
                }}>{s.val}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: "#9a9ab5" }}>from user surveys</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Benefits list */}
        <div className="reveal stagger-children" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{
              fontSize: 12.5, fontWeight: 600, color: "#5046E4", letterSpacing: "2px",
              textTransform: "uppercase", display: "block", marginBottom: 14,
            }}>Why Brainly</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.8vw, 40px)",
              fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.8px", lineHeight: 1.25,
            }}>
              The way you<br /><span style={{ color: "#5046E4" }}>think, reimagined</span>
            </h2>
          </div>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: "linear-gradient(135deg, #eef1ff, #e4e8fd)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>{b.accent}</div>
              <div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700,
                  color: "#1a1a2e", marginBottom: 4, letterSpacing: "-0.2px",
                }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: "#6a6a8a", lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   CTA SECTION
   ───────────────────────────────────────────────────────────── */
const CTA = () => {
    const navigate = useNavigate();

    return (
  <section style={{ padding: "40px 32px 80px" }}>
    <div className="reveal" style={{
      maxWidth: 900, margin: "0 auto", borderRadius: 32,
      background: "linear-gradient(135deg, #5046E4 0%, #6E6AEC 50%, #8B87F0 100%)",
      padding: "80px 48px", textAlign: "center", position: "relative", overflow: "hidden",
      boxShadow: "0 20px 60px rgba(80,70,228,0.3)",
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "absolute", top: -60, right: -40, width: 220, height: 220,
        borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -50, left: -30, width: 180, height: 180,
        borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 300, height: 300, borderRadius: "50%",
        background: "rgba(255,255,255,0.03)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <span style={{
          display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 20,
          padding: "6px 18px", color: "#fff", fontSize: 12.5, fontWeight: 600,
          letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 24,
        }}>Get Started</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 48px)",
          fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: 18,
        }}>
          Build your second brain<br />today.
        </h2>
        <p style={{
          fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.6,
          maxWidth: 500, margin: "0 auto 36px", fontWeight: 300,
        }}>
          Join thousands of thinkers who never forget an idea again. Free forever, no credit card needed.
        </p>
        <button onClick={() => navigate("/signup")} style={{
          background: "#fff", color: "#5046E4", border: "none", borderRadius: 12,
          padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
          boxShadow: "0 6px 24px rgba(0,0,0,0.15)", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          fontFamily: "'DM Sans', sans-serif",
        }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.transform = "translateY(-3px) scale(1.03)"; (e.target as HTMLButtonElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.2)"; }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = "translateY(0) scale(1)"; (e.target as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.15)"; }}
        >
          Get Started Free →
        </button>
      </div>
    </div>
  </section>
    );
};

/* ─────────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{
    background: "#f4f5fa", borderTop: "1px solid #eaecf3",
    padding: "48px 32px 32px",
  }}>
    <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
      {/* Brand */}
      <div style={{ maxWidth: 280 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div>
            <BrainIcon size="lg"/>
          </div>
          <span className="font-bold text-primary-text text-2xl">Brainly</span>
        </div>
        <p style={{ fontSize: 13.5, color: "#7a7a9a", lineHeight: 1.6 }}>
          Your intelligent second brain. Capture, organize, and recall knowledge effortlessly.
        </p>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 48 }}>
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 600, color: "#5046E4", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>Product</h4>
          {["Features", "Pricing", "Changelog"].map(l => (
            <a key={l} href="#" style={{
              display: "block", fontSize: 14, color: "#6a6a8a", textDecoration: "none",
              marginBottom: 10, transition: "color 0.2s", fontWeight: 500,
            }}
              onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#5046E4"}
              onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "#6a6a8a"}
            >{l}</a>
          ))}
        </div>
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 600, color: "#5046E4", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>Legal</h4>
          {["Privacy Policy", "Terms of Service", "Contact"].map(l => (
            <a key={l} href="#" style={{
              display: "block", fontSize: 14, color: "#6a6a8a", textDecoration: "none",
              marginBottom: 10, transition: "color 0.2s", fontWeight: 500,
            }}
              onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "#5046E4"}
              onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "#6a6a8a"}
            >{l}</a>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{
      maxWidth: 1080, margin: "36px auto 0", paddingTop: 24,
      borderTop: "1px solid #e4e6ef", display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <span style={{ fontSize: 13, color: "#9a9ab5" }}>© 2026 Brainly. All rights reserved.</span>
      <span style={{ fontSize: 13, color: "#9a9ab5" }}>Made with care for curious minds.</span>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────────────────────
   ROOT APP
   ───────────────────────────────────────────────────────────── */
export function Landing() {
  useReveal();

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <WhyUse />
      <CTA />
      <Footer />
    </div>
  );
}