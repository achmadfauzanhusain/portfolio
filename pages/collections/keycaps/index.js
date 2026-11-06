import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const GITHUB_URL = "https://github.com/achmadfauzanhusain"
const LINKEDIN_URL = "https://linkedin.com/in/achmadfauzanhusain/"

const NAV_LINKS = [
    { label: "Projects", href: "#projects" },
    { label: "Open Source", href: "#open-source" },
    { label: "Certificates", href: "#certificates" },
    { label: "Experience", href: "#experience" },
    { label: "Research", href: "#research" },
    { label: "Trading", href: "#trading" }
]

const CLOUDS = [
    { top: 6, w: 38, o: 0.1, dur: 170, blur: 3, depth: 0.1, flip: false },
    { top: 22, w: 26, o: 0.14, dur: 120, blur: 2, depth: 0.2, flip: true },
    { top: 40, w: 44, o: 0.09, dur: 190, blur: 4, depth: 0.1, flip: true },
    { top: 58, w: 22, o: 0.16, dur: 100, blur: 1.5, depth: 0.35, flip: false },
    { top: 76, w: 36, o: 0.11, dur: 160, blur: 3, depth: 0.15, flip: false },
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

const Keycaps = () => {
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
        <>
            <div className="isolate min-h-screen overflow-x-hidden bg-[#1A6DE0] text-white antialiased">
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

                {/* nav */}
                <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-[#1A6DE0]/85 backdrop-blur-md">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-6 md:py-4">
                        <div data-nav>
                            <Link href="/" className="text-base font-semibold tracking-[0.2em] md:text-lg md:tracking-[0.22em]">FAUZANHUSAIN</Link>
                        </div>

                        <ul className="hidden items-center gap-8 text-[14px] text-white/80 lg:flex">
                            {NAV_LINKS.map((l) => (
                                <li key={l.label} data-nav>
                                    <a href={l.href} className={`transition-colors hover:text-white ${focus}`}>{l.label}</a>
                                </li>
                            ))}
                        </ul>

                        <div data-nav className="hidden lg:block">
                            <a href={GITHUB_URL} className={`rounded-full border border-white/40 px-5 py-2 text-[14px] transition-colors hover:bg-white hover:text-[#1A6DE0] ${focus}`}>
                                GitHub
                            </a>
                        </div>

                        {/* Hamburger → X */}
                        <button
                            data-nav
                            type="button"
                            className={`relative -mr-2 h-10 w-10 lg:hidden ${focus}`}
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

                {/* mobile drawer */}
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

                <section className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 md:px-6 md:py-32">
                    <Link
                        data-back
                        href="/collections"
                        className={`group inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm text-[#D4E4FC] transition-colors hover:border-white/60 hover:text-white ${focus}`}
                    >
                        <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
                        Back
                    </Link>

                    <h2 data-heading className="max-w-xl mt-14 text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">Artisan Keycaps Collections</h2>
                    <p className="mt-4 text-base text-[#D4E4FC] md:mt-5 md:text-lg">My artisan keycap collections.</p>

                    <div className="mt-10 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
                        <div
                            data-reveal
                            className="group relative flex flex-col rounded-2xl border border-white/25 bg-white/10 p-6 transition hover:border-white/60 hover:bg-white/[0.16] md:p-8"
                        >
                            {/* price */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-1 md:gap-2">
                                    <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-[#E6EFFD]">
                                        Rp 225.000
                                    </span>

                                    <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-[#E6EFFD]">
                                        $ 12.5
                                    </span>
                                </div>
                                <span aria-hidden="true" className="text-xl text-[#A9C8F6] transition-transform group-hover:translate-x-1 group-hover:text-white">↗</span>
                            </div>

                            <h3 className="mt-5 text-lg font-medium md:text-xl">
                                <Link
                                    href="/collections/keycaps/detail/mitsuro-kanroji"
                                    rel="noreferrer"
                                    className={`break-words after:absolute after:inset-0 after:rounded-2xl ${focus}`}
                                >
                                    Mitsuro Kanroji - Demon Slayer
                                </Link>
                            </h3>

                            <dl className="mt-4 space-y-2 text-[15px] md:text-base">
                                <div className="flex gap-2">
                                    <dt className="text-[#A9C8F6]">Creator:</dt>
                                    <dd className="text-[#D4E4FC]">LOBO</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-[#A9C8F6]">Store:</dt>
                                    <dd className="text-[#D4E4FC]">Thocky Supply</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-[#A9C8F6]">Buy Date:</dt>
                                    <dd className="text-[#D4E4FC]">6 November 2025</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Keycaps