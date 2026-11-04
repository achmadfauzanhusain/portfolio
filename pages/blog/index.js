"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/*
 * Palet (sama dengan Home)
 * BLUE #1A6DE0 latar | BLUE-DEEP #1559B8 panel | WHITE teks
 * TINT #F2F7FF / #E6EFFD / #D4E4FC (paragraf) / #A9C8F6 (label) / #8FB8F3
 */

const NAV_LINKS = [
    { label: "Projects", href: "/#projects" },
    { label: "Certificates", href: "/#certificates" },
    { label: "Experience", href: "/#experience" },
    { label: "Research", href: "/#research" },
]

const CLOUDS = [
    { top: 6, w: 38, o: 0.1, dur: 170, blur: 3, depth: 0.1, flip: false },
    { top: 22, w: 26, o: 0.14, dur: 120, blur: 2, depth: 0.2, flip: true },
    { top: 40, w: 44, o: 0.09, dur: 190, blur: 4, depth: 0.1, flip: true },
    { top: 58, w: 22, o: 0.16, dur: 100, blur: 1.5, depth: 0.35, flip: false },
    { top: 76, w: 36, o: 0.11, dur: 160, blur: 3, depth: 0.15, flip: false },
]

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

const Blog = () => {
    const root = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

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

                gsap.utils.toArray("[data-heading]").forEach((h) => {
                    gsap.from(h, { y: 48, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 88%", once: true } })
                })

                const reveals = gsap.utils.toArray("[data-reveal]")
                if (reveals.length) {
                    gsap.set(reveals, { opacity: 0, y: 50 })
                    ScrollTrigger.batch(reveals, {
                        start: "top 90%",
                        once: true,
                        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", overwrite: true }),
                    })
                }
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
                    `,
                }}
            />

            {/* Nav */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-[#1A6DE0]/85 backdrop-blur-md">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-6 md:py-4">
                    <div data-nav>
                        <a href="/" className="text-base font-semibold tracking-[0.2em] md:text-lg md:tracking-[0.22em]">FAUZANHUSAIN</a>
                    </div>

                    <ul className="hidden items-center gap-10 text-[14px] text-white/80 md:flex">
                        {NAV_LINKS.map((l) => (
                            <li key={l.label} data-nav>
                                <a href={l.href} className={`transition-colors hover:text-white ${focus}`}>{l.label}</a>
                            </li>
                        ))}
                    </ul>

                    <div data-nav className="hidden md:block">
                        <a href="https://github.com/achmadfauzanhusain" className={`rounded-full border border-white/40 px-5 py-2 text-[14px] transition-colors hover:bg-white hover:text-[#1A6DE0] ${focus}`}>
                            GitHub
                        </a>
                    </div>

                    <button
                        data-nav
                        type="button"
                        className={`-mr-2 p-2 md:hidden ${focus}`}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </nav>

                {menuOpen && (
                    <div id="mobile-menu" className="border-t border-white/20 bg-[#1A6DE0] md:hidden">
                        <ul className="mx-auto flex max-w-7xl flex-col px-5 py-1">
                            {NAV_LINKS.map((l) => (
                                <li key={l.label} className="border-b border-white/20 last:border-b-0">
                                    <a href={l.href} onClick={() => setMenuOpen(false)} className="block py-3.5 text-base text-white/90 hover:text-white">{l.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div
                    data-progress
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left bg-gradient-to-r from-white/50 via-white to-white/50 will-change-transform"
                    style={{ transform: "scaleX(0)" }}
                />
            </header>

            <section className="mx-auto border-b min-h-screen max-w-4xl px-5 pb-20 pt-28 sm:pt-32 md:px-6 md:pb-32 md:pt-36 text-sm md:text-base">
                <p>
                    hi, interested in tech industry when i was kid and started write my first code at 14-15 years old like 8th grade junior high school.
                    i started coding bcs mark zuckerberg and interested to build software company too.
                </p>

                <p className="mt-16">
                    i started my first startup abt supply chain when i was 4th grade college and it get rejected by venture capital from united states.
                </p>

                <p className="mt-16">
                    when elementary school, i am very math person, i love math, i love solve problem, i take privat lesson abt math and joining competition. but in junior high school - high school, i lost my interest in math.
                    and i think my interest in math is back when i was college
                </p>

                <p>

                </p>
            </section>

            <section className="mx-auto min-h-screen max-w-4xl px-5 pb-20 pt-28 sm:pt-32 md:px-6 md:pb-32 md:pt-36 text-sm md:text-base">
                <p>my interesting field :</p>
                <p className="mt-2">technology, art, finance, philosophy</p>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/20 px-5 py-10 md:px-6 md:py-12">
                <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-[#A9C8F6] md:flex-row">
                    <p className="font-semibold text-white">Fauzan Husain</p>
                    <p>Fullstack Web3 Javascript Developer · Cryptography Engineer</p>
                </div>
                <p className="mx-auto mt-8 max-w-6xl text-xs text-[#8FB8F3] md:mt-10">© 2026 Fauzan Husain</p>
            </footer>
        </main>
    )
}

export default Blog