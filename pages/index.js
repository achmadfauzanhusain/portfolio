"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const LINKEDIN_URL = "https://linkedin.com/in/achmadfauzanhusain/"
const GITHUB_URL = "https://github.com/achmadfauzanhusain"

const FUND_USD = 10000
const USD_IDR = 18000
const fmt = (n, cur) => new Intl.NumberFormat(cur === "IDR" ? "id-ID" : "en-US").format(n)

const NAV_LINKS = [
    { label: "Projects", href: "#projects" },
    { label: "Open Source", href: "#open-source" },
    { label: "Certificates", href: "#certificates" },
    { label: "Experience", href: "#experience" },
    { label: "Research", href: "#research" },
    { label: "Trading", href: "#trading" }
]

const STARS_BG = [
    "radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,.9), transparent)",
    "radial-gradient(1px 1px at 90px 140px, rgba(255,255,255,.6), transparent)",
    "radial-gradient(1.5px 1.5px at 160px 70px, rgba(255,255,255,.8), transparent)",
    "radial-gradient(1px 1px at 230px 190px, rgba(255,255,255,.5), transparent)",
    "radial-gradient(1px 1px at 300px 40px, rgba(255,255,255,.7), transparent)",
].join(",")

const CLOUDS = [
    { top: 6, w: 38, o: 0.1, dur: 170, blur: 3, depth: 0.1, flip: false },
    { top: 22, w: 26, o: 0.14, dur: 120, blur: 2, depth: 0.2, flip: true },
    { top: 40, w: 44, o: 0.09, dur: 190, blur: 4, depth: 0.1, flip: true },
    { top: 58, w: 22, o: 0.16, dur: 100, blur: 1.5, depth: 0.35, flip: false },
    { top: 76, w: 36, o: 0.11, dur: 160, blur: 3, depth: 0.15, flip: false },
]

const PROJECTS = [
  ["TBLO CHAIN", "Decentralized Supply Chain is a blockchain-based system that ensures transparency, data authenticity, and secure supply chain tracking without a central authority.", "https://tblochain.com/"],
  ["DropCaps", "Fair drop for artisan keycap maker", "https://fauzanhusain.com/startups/dropcaps"],
  ["NFT Marketplace", "NFT Marketplace is a platform that allows users to buy & mint NFT fauzanchenko.", "https://github.com/achmadfauzanhusain/fauzanchenko-smartcontract"],
  ["TBLO Networks", "Social media without handing over your identity", "https://fauzanhusain.com/startups/tblonetworks"],
  ["Grants DAO", "Grants DAO is a decentralized organization that manages pooled funds to finance community projects or initiatives through a member voting mechanism.", "https://grants-dao-two.vercel.app/"],
]

const OPEN_SOURCE = [
    {
        name: "one-time-pad-encryption",
        body: "A simple one-time pad cipher written in Node.js.",
        label: "Fork",
        href: "https://github.com/achmadfauzanhusain/one-time-pad-encryption",
        upstream: { name: "joshterrill/one-time-pad", href: "https://github.com/joshterrill/one-time-pad" },
    },
    {
        name: "RSA-encryption-concept",
        body: "Learning the math & concept behind RSA encryption.",
        label: "Original",
        href: "https://github.com/achmadfauzanhusain/RSA-encryption-concept",
    },
    {
        name: "Merkle Tree Circuit",
        body: "Learning the math & concept behind Zero KnowLedge Proof Merkle Tree",
        label: "Original",
        href: "https://github.com/achmadfauzanhusain/circuit-zkp-merkletree-poseidon",
    },
]

const CERTS = [
    ["Fullstack Javascript Developer", "In this bootcamp we learn to create and develop top up game voucher applications using MongoDB, Express.js, React.js, and Node.js.", "/certificate/certificate-1.webp"],
    ["Backend Javascript Developer", "In this bootcamp I learned by working on several tasks, and the final project was to create an API project that connects to the database.", "/certificate/certificate-3.webp"],
]

const INTERNSHIPS = [
    ["PT Trans Nasional Teknologi (High School Internship)", "Front End Developer", "Mar 2023 - Jun 2023 · 4 months · Makassar"],
    ["Harisenin (Bootcamp)", "Full Stack Developer", "Dec 2024 - Jun 2025 · 7 months · Jakarta Selatan"],
    ["CMLABS", "Backend Developer", "Aug 2025 - Sep 2025 · 2 months · DKI Jakarta"],
    ["Ministry Digital of Communication and Informatics", "Fullstack Developer", "Oct 2026 - Present · Jakarta Pusat"],
    ["Reksa Karya", "Front End Developer", "Oct 2026 - Present · Jakarta Pusat"],
]

const ORGS = [
    ["Chevallier Software Laboratory", "Backend Developer", "Nov 2025 - Sep 2026 · 11 months · Telkom University"],
    ["Chess Telkom", "Not using tech", "Sep 2024 - Now · Telkom University"],
    ["Web 3 Dev Bandung", "-", "Oct 2026 - Now · Bandung"],
]

const MATH = ["Math Basic", "Geometry", "Intermediate Algebra", "Math Logic", "Discrete Math", "Linear Algebra Basic"]

const RESEARCH = [
    ["Bitcoin", "/investment-research/bitcoin"],
    ["Tempus AI", "/investment-research/tempus-ai"],
]

const LinkedInIcon = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
)

const CloudShape = () => (
    <svg viewBox="0 0 240 100" className="block h-auto w-full" fill="#ffffff" aria-hidden="true">
        <circle cx="62" cy="64" r="26" />
        <circle cx="108" cy="46" r="38" />
        <circle cx="158" cy="56" r="32" />
        <circle cx="198" cy="70" r="20" />
        <rect x="40" y="64" width="176" height="26" rx="13" />
    </svg>
)

const Clouds = () => {
    const rootRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()
            const clouds = gsap.utils.toArray("[data-cloud]")

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                clouds.forEach((el, i) => {
                    const c = CLOUDS[i]
                    gsap.fromTo(
                        el,
                        { x: () => -el.offsetWidth },
                        { x: () => window.innerWidth, duration: c.dur, ease: "none", repeat: -1, invalidateOnRefresh: true }
                    ).progress((i * 0.37 + 0.1) % 1)

                    gsap.to(el.firstElementChild, {
                        y: -420 * c.depth,
                        ease: "none",
                        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 1 },
                    })
                })
            })

            mm.add("(prefers-reduced-motion: reduce)", () => {
                clouds.forEach((el, i) => gsap.set(el, { x: () => (i / clouds.length) * window.innerWidth * 0.85 }))
            })
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {CLOUDS.map((c, i) => (
                <div key={i} data-cloud className="absolute left-0 will-change-transform" style={{ top: `${c.top}%`, width: `clamp(160px, ${c.w}vw, 620px)` }}>
                    <div style={{ opacity: c.o, filter: `blur(${c.blur}px)`, transform: c.flip ? "scaleX(-1)" : undefined }}>
                        <CloudShape />
                    </div>
                </div>
            ))}
        </div>
    )
}

const Home = () => {
    const root = useRef(null)
    const drawerRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)

    // Tutup dengan Escape
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    // Kunci scroll saat menu terbuka
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [menuOpen])

    // Tutup otomatis saat layar melebar ke desktop
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)")
        const onChange = (e) => e.matches && setMenuOpen(false)
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])

    // `inert` lewat ref supaya aman di React 18 maupun 19
    useEffect(() => {
        const el = drawerRef.current
        if (!el) return
        if (menuOpen) el.removeAttribute("inert")
        else el.setAttribute("inert", "")
    }, [menuOpen])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from("[data-nav]", { y: -16, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" })

                gsap.to("[data-progress]", {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
                })

                const heroScroll = { trigger: "#top", start: "top top", end: "bottom top+=80", scrub: 0.5 }
                gsap.to("[data-hero-content]", { scale: 0.92, opacity: 0, yPercent: -8, ease: "none", scrollTrigger: heroScroll })
                gsap.to("[data-hero-glow]", { opacity: 0.2, yPercent: 25, ease: "none", scrollTrigger: heroScroll })
                gsap.to("[data-stars]", { y: -200, ease: "none", scrollTrigger: heroScroll })

                gsap.utils.toArray("[data-heading]").forEach((h) => {
                    gsap.from(h, { y: 48, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 88%", once: true } })
                })

                const reveals = gsap.utils.toArray("[data-reveal]")
                gsap.set(reveals, { opacity: 0, y: 50 })
                ScrollTrigger.batch(reveals, {
                    start: "top 90%",
                    once: true,
                    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", overwrite: true }),
                })

                gsap.fromTo(
                    "[data-cta]",
                    { scale: 0.88, y: 60 },
                    { scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "top 40%", scrub: 0.5 } }
                )

                gsap.timeline({ defaults: { ease: "power3.out" } })
                    .from("[data-hero]", { y: 28, opacity: 0, duration: 0.9, stagger: 0.12 })
                    .from("[data-window-wrap]", { y: 90, opacity: 0, duration: 1.1 }, "-=0.55")

                gsap.fromTo(
                    "[data-window]",
                    { rotateX: 9, scale: 0.94 },
                    { rotateX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: "[data-window-wrap]", start: "top 85%", end: "top 25%", scrub: true } }
                )
            })

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set("[data-progress]", { scaleX: 0 })
            })
        }, root)

        return () => ctx.revert()
    }, [])

    const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"

    return (
        <main ref={root} className="isolate min-h-screen overflow-x-hidden bg-[#1A6DE0] text-white antialiased">
            <Clouds />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap");
                        .font-serif-display { font-family: "Instrument Serif", Georgia, "Times New Roman", serif; letter-spacing: 0.015em; }
                        @media (prefers-reduced-motion: reduce) {
                            .drawer-motion, .drawer-motion * { transition-duration: 0.01ms !important; transition-delay: 0ms !important; }
                        }
                    `,
                }}
            />

            {/* Nav */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-[#1A6DE0]/85 backdrop-blur-md">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-6 md:py-4">
                    <div data-nav>
                        <a href="#top" className="text-base font-semibold tracking-[0.2em] md:text-lg md:tracking-[0.22em]">FAUZANHUSAIN</a>
                    </div>

                    <ul className="hidden items-center gap-8 text-[14px] text-white/80 md:flex">
                        {NAV_LINKS.map((l) => (
                            <li key={l.label} data-nav>
                                <a href={l.href} className={`transition-colors hover:text-white ${focus}`}>{l.label}</a>
                            </li>
                        ))}
                    </ul>

                    <div data-nav className="hidden md:block">
                        <a href={GITHUB_URL} className={`rounded-full border border-white/40 px-5 py-2 text-[14px] transition-colors hover:bg-white hover:text-[#1A6DE0] ${focus}`}>
                            GitHub
                        </a>
                    </div>

                    {/* Hamburger → X */}
                    <button
                        data-nav
                        type="button"
                        className={`relative -mr-2 h-10 w-10 md:hidden ${focus}`}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-6 -translate-x-1/2 bg-white transition-all duration-300 ${menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[7px]"}`} />
                        <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-6 -translate-x-1/2 bg-white transition-all duration-300 ${menuOpen ? "scale-x-0 opacity-0" : ""}`} />
                        <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-6 -translate-x-1/2 bg-white transition-all duration-300 ${menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[7px]"}`} />
                    </button>
                </nav>

                <div
                    data-progress
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left bg-gradient-to-r from-white/50 via-white to-white/50 will-change-transform"
                    style={{ transform: "scaleX(0)" }}
                />
            </header>

            {/* Mobile drawer (di luar header agar tidak terikat backdrop-blur) */}
            <div
                className={`drawer-motion fixed inset-0 z-[60] md:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
                aria-hidden={!menuOpen}
            >
                {/* Backdrop */}
                <div
                    onClick={() => setMenuOpen(false)}
                    className={`absolute inset-0 bg-[#06193A]/50 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
                />

                {/* Panel */}
                <aside
                    ref={drawerRef}
                    id="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                    className={`absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col border-l border-white/20 bg-gradient-to-b from-[#1A6DE0] to-[#1559B8] shadow-2xl shadow-blue-950/60 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(70%_70%_at_80%_0%,rgba(255,255,255,0.18),transparent)]" />

                    <div className="relative flex items-center justify-between px-6 py-4">
                        <span className="text-sm text-[#A9C8F6]">Menu</span>
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setMenuOpen(false)}
                            className={`-mr-2 rounded-full p-2 text-white/80 transition-colors hover:text-white ${focus}`}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>
                    </div>

                    <ul className="relative mt-4 flex flex-1 flex-col overflow-y-auto px-6">
                        {NAV_LINKS.map((l, i) => (
                            <li
                                key={l.label}
                                className={`border-b border-white/15 transition-all duration-500 ease-out ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                                style={{ transitionDelay: menuOpen ? `${200 + i * 60}ms` : "0ms" }}
                            >
                                <a
                                    href={l.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`group flex items-baseline justify-between py-4 ${focus}`}
                                >
                                    <span className="font-serif-display text-3xl text-white/90 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">{l.label}</span>
                                    <span aria-hidden="true" className="text-lg text-[#A9C8F6] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div
                        className={`relative space-y-4 border-t border-white/15 px-6 py-6 transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        style={{ transitionDelay: menuOpen ? "560ms" : "0ms" }}
                    >
                        <a
                            href={GITHUB_URL}
                            className={`block rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-[#1A6DE0] transition hover:bg-sky-100 ${focus}`}
                        >
                            GitHub
                        </a>
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center justify-center gap-2 text-sm text-[#D4E4FC] transition-colors hover:text-white ${focus}`}
                        >
                            <LinkedInIcon className="h-4 w-4" /> LinkedIn
                        </a>
                    </div>
                </aside>
            </div>

            {/* Hero */}
            <section id="top" className="relative overflow-hidden px-5 pb-6 pt-28 text-center sm:pt-32 md:px-6 md:pb-10 md:pt-36">
                <div
                    data-stars
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 -bottom-[200px] opacity-50 will-change-transform"
                    style={{ backgroundImage: STARS_BG, backgroundSize: "360px 260px" }}
                />
                <div data-hero-glow className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.2),transparent)] md:h-[520px]" />
                <div data-hero-content className="relative mx-auto max-w-3xl">
                    <p data-hero className="mb-4 text-xs text-[#D4E4FC] md:mb-6 md:text-sm">Portfolio</p>
                    <h1 data-hero className="text-[3.2rem] font-serif-display font-normal leading-[1.1] sm:text-7xl md:text-8xl md:leading-[1.02]">
                        Fauzan Husain
                    </h1>
                    <p data-hero className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#D4E4FC] md:mt-6 md:text-lg">
                        Fullstack Web3 Javascript Developer and Interested About Cryptography Mathematics.
                    </p>
                    <div data-hero className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
                        <a href="#projects" className={`rounded-full bg-white px-6 py-3 text-sm font-medium text-[#1A6DE0] transition hover:bg-sky-100 md:px-7 ${focus}`}>
                            See my projects
                        </a>
                        <a href="/blog" className={`rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[#1A6DE0] md:px-7 ${focus}`}>
                            Read my bio
                        </a>
                    </div>
                </div>

                {/* Jendela produk: ringkasan skill & peran */}
                <div data-window-wrap className="mx-auto mt-14 max-w-5xl md:mt-20" style={{ perspective: 1400 }}>
                    <div data-window className="overflow-hidden rounded-xl border border-white/20 bg-[#1559B8] text-left shadow-2xl shadow-blue-950/40 md:rounded-2xl">
                        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5 md:gap-2 md:px-4 md:py-3">
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#3B86EA] md:h-3 md:w-3" />
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#3B86EA] md:h-3 md:w-3" />
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#3B86EA] md:h-3 md:w-3" />
                            <span className="ml-2 truncate text-[11px] text-[#A9C8F6] md:ml-3 md:text-xs">fauzan.dev / about</span>
                        </div>
                        <div className="grid gap-px bg-white/10 md:grid-cols-3">
                            {[
                                ["Role", "Fullstack Web3 Javascript Developer"],
                                ["Focus", "NFT & Tokenized Development, Circuit Development"],
                                ["Stack", "MERN, Solidity, Circom"],
                            ].map(([label, value]) => (
                                <div key={label} className="bg-[#1559B8] p-5 md:p-8">
                                    <p className="text-xs text-[#A9C8F6] md:text-sm">{label}</p>
                                    <p className="mt-2 text-base text-[#F2F7FF] md:text-lg">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 md:px-6 md:py-32">
                <div className="max-w-2xl">
                    <h2 data-heading className="text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">Real Projects</h2>
                    <p className="mt-4 text-base text-[#D4E4FC] md:mt-5 md:text-lg">Projects that I only want to showcase.</p>
                </div>
                <ul className="mt-10 divide-y divide-white/20 border-y border-white/20 md:mt-16">
                    {PROJECTS.map(([title, body, href]) => (
                        <li key={title} data-reveal>
                            <a href={href} target="_blank" rel="noreferrer" className={`group grid gap-1.5 py-6 transition-colors hover:bg-white/5 md:grid-cols-[1fr_1.6fr_40px] md:items-baseline md:gap-6 md:py-8 ${focus}`}>
                                <h3 className="text-lg font-medium md:text-xl">{title}</h3>
                                <p className="text-[15px] leading-relaxed text-[#D4E4FC] md:text-base">{body}</p>
                                <span aria-hidden="true" className="hidden text-xl text-[#A9C8F6] transition-transform group-hover:translate-x-1 group-hover:text-white md:block">↗</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Open Source */}
            <section id="open-source" className="mx-auto max-w-6xl scroll-mt-16 px-5 pb-20 md:px-6 md:pb-32">
                <h2 data-heading className="max-w-xl text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">Open Source Projects</h2>
                <p className="mt-4 text-base text-[#D4E4FC] md:mt-5 md:text-lg">Open source projects I’ve contributed to and built.</p>
                <div className="mt-10 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
                    {OPEN_SOURCE.map(({ name, body, label, href, upstream }) => (
                        <div
                            key={name}
                            data-reveal
                            className="group relative flex flex-col rounded-2xl border border-white/25 bg-white/10 p-6 transition hover:border-white/60 hover:bg-white/[0.16] md:p-8"
                        >
                            <div className="flex items-center justify-between">
                                <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-[#E6EFFD]">{label}</span>
                                <span aria-hidden="true" className="text-xl text-[#A9C8F6] transition-transform group-hover:translate-x-1 group-hover:text-white">↗</span>
                            </div>

                            <h3 className="mt-5 text-lg font-medium md:text-xl">
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`break-words after:absolute after:inset-0 after:rounded-2xl ${focus}`}
                                >
                                    {name}
                                </a>
                            </h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-[#D4E4FC] md:text-base">{body}</p>

                            {upstream && (
                                <p className="relative z-10 mt-4 text-sm text-[#A9C8F6]">
                                    Forked from{" "}
                                    <a
                                        href={upstream.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`underline underline-offset-4 transition-colors hover:text-white ${focus}`}
                                    >
                                        {upstream.name}
                                    </a>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Certificates */}
            <section id="certificates" className="mx-auto max-w-6xl scroll-mt-16 px-5 pb-20 md:px-6 md:pb-32">
                <h2 data-heading className="max-w-xl text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">E-Certificate</h2>
                <p className="mt-4 text-base text-[#D4E4FC] md:mt-5 md:text-lg">Certificate from the training I attended.</p>
                <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
                    {CERTS.map(([title, body, img]) => (
                        <div key={title} data-reveal className="border-t border-white/40 pt-5 md:pt-6">
                            <a
                                href={img}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`View ${title} certificate`}
                                className={`group block overflow-hidden rounded-xl border border-white/20 bg-[#1559B8] shadow-lg shadow-blue-950/30 ${focus}`}
                            >
                                <img
                                    src={img}
                                    alt={`${title} certificate`}
                                    loading="lazy"
                                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </a>
                            <p className="mt-5 text-xs text-[#A9C8F6] md:text-sm">Bootcamp</p>
                            <h3 className="mt-1 text-lg font-medium md:text-xl">{title}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-[#D4E4FC] md:mt-3 md:text-base">{body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section id="experience" className="mx-auto max-w-6xl scroll-mt-16 px-5 pb-20 md:px-6 md:pb-32">
                <div className="grid gap-14 md:grid-cols-2 md:gap-16">
                    {[
                        ["Experience", "My experience in tech company", INTERNSHIPS],
                        ["Organization", "My organization experience in college", ORGS],
                    ].map(([title, sub, list]) => (
                        <div key={title}>
                            <h2 data-heading className="text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">{title}</h2>
                            <p className="mt-4 text-base text-[#D4E4FC] md:text-lg">{sub}</p>
                            <ul className="mt-8 divide-y divide-white/20 border-y border-white/20">
                                {list.map(([name, role, meta]) => (
                                    <li key={name} data-reveal>
                                        <a
                                            href={LINKEDIN_URL}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`${name}, ${role}. Open LinkedIn profile`}
                                            className={`group flex items-center justify-between gap-4 px-0 py-5 transition-all duration-300 hover:bg-white/10 hover:px-4 md:py-6 ${focus}`}
                                        >
                                            <div>
                                                <h3 className="text-lg font-medium">{name}</h3>
                                                <p className="mt-1 text-[15px] text-[#E6EFFD]">{role}</p>
                                                <p className="mt-1 text-sm text-[#A9C8F6]">{meta}</p>
                                            </div>
                                            <LinkedInIcon className="h-6 w-6 shrink-0 text-[#A9C8F6] transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Math */}
            <section className="mx-auto max-w-4xl px-5 pb-20 md:px-6 md:pb-32">
                <h2 data-heading className="text-3xl font-serif-display font-normal sm:text-4xl md:text-5xl">Math</h2>
                <p className="mt-4 text-base text-[#D4E4FC] md:mt-5 md:text-lg">The math I’ve mastered.</p>
                <ul className="mt-8 flex flex-wrap gap-3">
                    {MATH.map((m) => (
                        <li key={m} data-reveal className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm text-[#F2F7FF]">{m}</li>
                    ))}
                </ul>
            </section>

            {/* Investment research */}
            <section id="research" className="mx-auto max-w-4xl scroll-mt-16 px-5 pb-20 md:px-6 md:pb-32">
                <h2 data-heading className="text-3xl font-serif-display font-normal sm:text-4xl md:text-5xl">Investment Research</h2>
                <p className="mt-4 text-base text-[#D4E4FC] md:mt-5 md:text-lg">The investment and trading research I’ve done.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {RESEARCH.map(([name, href]) => (
                        <a
                            key={name}
                            data-reveal
                            href={href}
                            className={`flex items-center justify-between rounded-2xl border border-white/25 bg-white/10 p-6 transition hover:border-white/60 hover:bg-white/[0.16] md:p-8 ${focus}`}
                        >
                            <span className="text-lg font-medium">{name}</span>
                            <span aria-hidden="true" className="text-xl text-[#A9C8F6]">↗</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Managed Capital */}
            <section id="trading" className="mx-auto max-w-4xl scroll-mt-16 px-5 pb-20 md:px-6 md:pb-32">
                <h2 data-heading className="text-3xl font-serif-display font-normal sm:text-4xl md:text-5xl">Managed Capital</h2>
                <p className="mt-4 text-base text-[#D4E4FC] md:mt-5 md:text-lg">
                    I manage my own funds and actively trade them in US tech stocks.
                </p>
                <div data-reveal className="mt-8 rounded-2xl border border-white/25 bg-white/10 p-6 md:p-10">
                    <p className="text-xs text-[#A9C8F6] md:text-sm">Capital under management - Fauzan Husain</p>
                    <p className="mt-2 text-4xl font-serif-display font-normal sm:text-5xl md:text-6xl">
                        ${fmt(FUND_USD, "USD")}+
                    </p>
                    <p className="mt-2 text-xs text-[#A9C8F6] md:text-sm">
                        ≈ Rp{fmt(FUND_USD * USD_IDR, "IDR")} (kurs ± Rp{fmt(USD_IDR, "IDR")}/USD)
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 border-t border-white/20 pt-6">
                        <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-[#F2F7FF]">Market: US Tech Stocks</span>
                        <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-[#F2F7FF]">Style: Position Trading</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-5 pb-20 text-center md:px-6 md:pb-32">
                <div data-cta className="mx-auto max-w-3xl rounded-3xl border border-white/25 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(255,255,255,0.18),transparent)] px-5 py-14 md:px-6 md:py-24">
                    <h2 data-heading className="text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">Let’s Build Something Together</h2>
                    <a href={GITHUB_URL} className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-medium text-[#1A6DE0] transition hover:bg-sky-100 md:mt-10 md:px-8">
                        View my GitHub
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/20 px-5 py-10 md:px-6 md:py-12">
                <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-[#A9C8F6] md:flex-row">
                    <p className="font-semibold text-white">Fauzan Husain</p>
                    <p>Fullstack Web3 Javascript Developer · <br /> NFT & Tokenized Development, < br/>Circuit Development</p>
                </div>
                <p className="mx-auto mt-8 max-w-6xl text-xs text-[#8FB8F3] md:mt-10">© 2026 Fauzan Husain</p>
            </footer>
        </main>
    )
}

export default Home