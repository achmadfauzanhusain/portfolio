"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Keycap3D from "./keycap3d"

gsap.registerPlugin(ScrollTrigger)

/*
 * Palet warna (diambil dari gambar referensi)
 * BLUE      #1A6DE0  latar utama (biru cerah)
 * BLUE-DEEP #1559B8  panel / jendela produk (biru lebih gelap)
 * WHITE     #FFFFFF  teks utama & tombol
 * TINT-1    #F2F7FF  teks terang di panel
 * TINT-2    #E6EFFD  teks daftar
 * TINT-3    #D4E4FC  teks sekunder / paragraf
 * TINT-4    #A9C8F6  teks tersier / label
 * TINT-5    #8FB8F3  nomor langkah (sebelum menyala)
 */

const NAV_LINKS = [
    { label: "How it works", href: "#how" },
    { label: "Why Dropcaps", href: "#why" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
]

const STARS_BG = [
    "radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,.9), transparent)",
    "radial-gradient(1px 1px at 90px 140px, rgba(255,255,255,.6), transparent)",
    "radial-gradient(1.5px 1.5px at 160px 70px, rgba(255,255,255,.8), transparent)",
    "radial-gradient(1px 1px at 230px 190px, rgba(255,255,255,.5), transparent)",
    "radial-gradient(1px 1px at 300px 40px, rgba(255,255,255,.7), transparent)",
    "radial-gradient(1.5px 1.5px at 340px 230px, rgba(255,255,255,.6), transparent)",
].join(",")

const CLOUDS = [
    { top: 4, w: 38, o: 0.1, dur: 170, blur: 3, depth: 0.1, flip: false },
    { top: 16, w: 26, o: 0.14, dur: 120, blur: 2, depth: 0.2, flip: true },
    { top: 30, w: 44, o: 0.09, dur: 190, blur: 4, depth: 0.1, flip: true },
    { top: 44, w: 22, o: 0.16, dur: 100, blur: 1.5, depth: 0.35, flip: false },
    { top: 58, w: 36, o: 0.11, dur: 160, blur: 3, depth: 0.15, flip: false },
    { top: 70, w: 28, o: 0.15, dur: 110, blur: 2, depth: 0.3, flip: true },
    { top: 84, w: 42, o: 0.1, dur: 180, blur: 3.5, depth: 0.12, flip: false },
]

const TICKETS = [
    "A3B8XQ", "C1D4MN", "D8K2TR", "F5H7WZ", "G2J9LP",
    "H6M3VB", "J4N8QC", "K7F9Q2", "L1P5XD", "M9R2GT",
    "N3T6HY", "P8V1KW", "Q5W4ZA", "R2X7BN", "S6Y3CF",
    "T9Z8DJ", "V4A1EM", "W7B5FQ", "X3C9GS", "Z9P0LL",
]
const WINNERS = [3, 7, 13, 18]

const STEPS = [
    ["Open signup", "Buyers sign up over several days. Minute one and minute last carry the same odds, so speed stops mattering."],
    ["Lock the list", "When signup closes, we publish every ticket code and a hash of the full list. Nobody can add or swap entries afterwards."],
    ["Pull a future blockchain block", "The random number is the hash of a blockchain block that did not exist when the list was locked. Nobody can predict or influence it: not the maker, not bots, and not us."],
    ["Draw", "A published formula turns the locked list and the random number into the winners."],
    ["Verify", "Anyone can rerun the formula and get the same result. No trust required."],
]

// Fokus ke pembuat keycap (yang membayar), bukan kolektor atau komunitas
const REASONS = [
    ["Nobody can accuse you", "Run drops free of favoritism claims. Share one link, publish the proof, and keep your community on your side."],
    ["Not even we can cheat", "The draw uses a blockchain block from the future as its random number. No one controls it, including you and including us, and anyone can check it."],
    ["Your buyers keep it simple", "Buyers sign up and pay the way they always do. No wallet, no crypto knowledge. Payments go straight to you."],
]

const PLANS = [
    {
        name: "Single drop",
        blurb: "For makers trying fair drops for the first time.",
        price: "$3",
        unit: "/ drop",
        items: ["Up to 500 entries", "Locked list with public hash", "Draw from a future blockchain block", "Public verification page"],
    },
]

const FAQS = [
    ["What is Dropcaps?", "Dropcaps runs your limited releases as a verifiable lottery instead of a race. Buyers sign up during an open window, the entry list is locked and published, and winners are drawn with a number nobody can control."],
    ["Why use a blockchain?", "Only for one thing: a random number that nobody can set, not you and not us. The hash of a future block cannot be predicted when the list is locked, and anyone can look it up. That is all the blockchain does here."],
    ["Do my buyers need a crypto wallet?", "No. Buyers sign up and pay with normal methods. The blockchain block is a technical detail they can inspect if they want to."],
    ["Does this stop scalpers completely?", "No, and we do not claim it does. It removes the speed advantage of bots, so being fastest no longer wins. Winners can still resell, so you can set your own resale rules."],
    ["Do you hold the money?", "No. Payments go straight to you through your own payment provider. Dropcaps only runs the signup and the draw."],
    ["What proves the draw was fair?", "The hash of the locked list is published before the random block exists. After the draw, anyone can recompute the winners from the published list and block hash."],
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

// Layer awan di belakang semua konten (butuh "isolate" pada <main>)
const Clouds = () => {
    const cloudsRoot = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()
            const clouds = gsap.utils.toArray("[data-cloud]")

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                clouds.forEach((el, i) => {
                    const c = CLOUDS[i]

                    // Melayang dari kiri ke kanan tanpa henti.
                    // progress() menyebar posisi awal supaya awan tidak muncul serentak.
                    gsap.fromTo(
                        el,
                        { x: () => -el.offsetWidth },
                        { x: () => window.innerWidth, duration: c.dur, ease: "none", repeat: -1, invalidateOnRefresh: true }
                    ).progress((i * 0.37 + 0.1) % 1)

                    // Parallax: awan bergeser naik pelan saat halaman di-scroll
                    gsap.to(el.firstElementChild, {
                        y: -420 * c.depth,
                        ease: "none",
                        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 1 },
                    })
                })
            })

            // Tanpa gerak: awan diam, tersebar di layar
            mm.add("(prefers-reduced-motion: reduce)", () => {
                clouds.forEach((el, i) => {
                    gsap.set(el, { x: () => (i / clouds.length) * window.innerWidth * 0.85 })
                })
            })
        }, cloudsRoot)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={cloudsRoot} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
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

const DropCaps = () => {
    const root = useRef(null)
    const [open, setOpen] = useState(0)
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
                // Navbar: item masuk dari atas
                gsap.from("[data-nav]", { y: -16, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" })

                // Progress bar scroll di bawah navbar
                gsap.to("[data-progress]", {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.3,
                    },
                })

                // Hero: konten mengecil + memudar, bintang parallax saat di-scroll
                const heroScroll = { trigger: "#top", start: "top top", end: "bottom top+=80", scrub: 0.5 }
                gsap.to("[data-hero-content]", { scale: 0.92, opacity: 0, yPercent: -8, ease: "none", scrollTrigger: heroScroll })
                gsap.to("[data-hero-glow]", { opacity: 0.2, yPercent: 25, ease: "none", scrollTrigger: heroScroll })
                gsap.to("[data-stars]", { y: -200, ease: "none", scrollTrigger: heroScroll })

                // Heading section naik pelan saat masuk layar
                gsap.utils.toArray("[data-heading]").forEach((h) => {
                    gsap.from(h, {
                        y: 48,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: { trigger: h, start: "top 88%", once: true },
                    })
                })

                // How it works: baris muncul, nomor menyala mengikuti scroll
                gsap.utils.toArray("[data-step]").forEach((row) => {
                    gsap.from(row, {
                        y: 40,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: { trigger: row, start: "top 90%", once: true },
                    })
                    gsap.fromTo(
                        row.querySelector("[data-step-num]"),
                        { color: "#8fb8f3" },
                        {
                            color: "#ffffff",
                            ease: "none",
                            scrollTrigger: { trigger: row, start: "top 70%", end: "top 40%", scrub: true },
                        }
                    )
                })

                // Kartu alasan, pricing, dan FAQ: muncul bergelombang
                const reveals = gsap.utils.toArray("[data-reveal]")
                gsap.set(reveals, { opacity: 0, y: 50 })
                ScrollTrigger.batch(reveals, {
                    start: "top 90%",
                    once: true,
                    onEnter: (batch) =>
                        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", overwrite: true }),
                })

                // CTA: kartu membesar seperti zoom in
                gsap.fromTo(
                    "[data-cta]",
                    { scale: 0.88, y: 60 },
                    {
                        scale: 1,
                        y: 0,
                        ease: "none",
                        scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "top 40%", scrub: 0.5 },
                    }
                )

                // Hero: one orchestrated entrance
                gsap.timeline({ defaults: { ease: "power3.out" } })
                    .from("[data-hero]", { y: 28, opacity: 0, duration: 0.9, stagger: 0.12 })
                    .from("[data-window-wrap]", { y: 90, opacity: 0, duration: 1.1 }, "-=0.55")

                // Window tilts flat as it scrolls into view
                gsap.fromTo(
                    "[data-window]",
                    { rotateX: 9, scale: 0.94 },
                    {
                        rotateX: 0,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: "[data-window-wrap]",
                            start: "top 85%",
                            end: "top 25%",
                            scrub: true,
                        },
                    }
                )

                // The draw: entries flicker, then winners light up
                const tickets = gsap.utils.toArray("[data-ticket]")
                const winners = gsap.utils.toArray("[data-winner]")
                const others = tickets.filter((t) => !t.hasAttribute("data-winner"))

                ScrollTrigger.create({
                    trigger: "[data-draw]",
                    start: "top 60%",
                    once: true,
                    onEnter: () => {
                        gsap.timeline()
                            .to(tickets, { opacity: 1, duration: 0.25, stagger: { each: 0.05, from: "random" } })
                            .to(others, { opacity: 0.3, duration: 0.5 }, "+=0.4")
                            .to(
                                winners,
                                {
                                    opacity: 1,
                                    backgroundColor: "#ffffff",
                                    color: "#1A6DE0",
                                    scale: 1.08,
                                    duration: 0.5,
                                    stagger: 0.18,
                                    ease: "back.out(2.2)",
                                },
                                "<0.1"
                            )
                            .to(winners, { boxShadow: "0 0 24px rgba(255,255,255,0.55)", duration: 0.6, stagger: 0.1 }, "<0.3")
                            .to("[data-verified]", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
                    },
                })
            })

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set("[data-ticket]", { opacity: 1 })
                gsap.set("[data-winner]", { backgroundColor: "#ffffff", color: "#1A6DE0" })
                gsap.set("[data-verified]", { opacity: 1, y: 0 })
                gsap.set("[data-progress]", { scaleX: 0 })
            })
        }, root)

        return () => ctx.revert()
    }, [])

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
                        <a href="#top" className="text-base font-semibold tracking-[0.2em] md:text-lg md:tracking-[0.22em]">DROPCAPS</a>
                    </div>

                    <ul className="hidden items-center gap-10 text-[14px] text-white/80 md:flex">
                        {NAV_LINKS.map((l) => (
                            <li key={l.label} data-nav>
                                <a
                                    href={l.href}
                                    className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div data-nav className="hidden md:block">
                        <a
                            href="#start"
                            className="rounded-full border border-white/40 px-5 py-2 text-[14px] text-white transition-colors hover:bg-white hover:text-[#1A6DE0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                        >
                            Run a drop
                        </a>
                    </div>

                    <button
                        data-nav
                        type="button"
                        className="-mr-2 p-2 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
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
                            {[...NAV_LINKS, { label: "Run a drop", href: "#start" }].map((l) => (
                                <li key={l.label} className="border-b border-white/20 last:border-b-0">
                                    <a
                                        href={l.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block py-3.5 text-base text-white/90 hover:text-white"
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Progress bar scroll */}
                <div
                    data-progress
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left bg-gradient-to-r from-white/50 via-white to-white/50 will-change-transform"
                    style={{ transform: "scaleX(0)" }}
                />
            </header>

            {/* Hero */}
            <section id="top" className="relative overflow-hidden px-5 pb-6 pt-28 text-center sm:pt-32 md:px-6 md:pb-10 md:pt-28">
                <div
                    data-stars
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 -bottom-[200px] opacity-50 will-change-transform"
                    style={{ backgroundImage: STARS_BG, backgroundSize: "360px 260px" }}
                />
                <div data-hero-glow className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.2),transparent)] md:h-[520px]" />
                <div data-hero-content className="relative mx-auto max-w-3xl">
                    <p data-hero className="mb-4 text-xs text-[#D4E4FC] md:mb-6 md:text-sm">For artisan keycap makers</p>
                    <h1 data-hero className="text-[2.85rem] font-serif-display font-normal leading-[1.1] sm:text-6xl md:text-8xl md:leading-[1.02]">
                        Fair Drops for<br />Artisan Keycaps
                    </h1>
                    <p data-hero className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#D4E4FC] md:mt-6 md:text-lg">
                        Open signup, a locked list, and a draw nobody can rig, not even us. Bots lose their speed advantage, and your buyers stop refreshing the page.
                    </p>
                    <div data-hero className="mt-8 flex flex-col items-center gap-3 md:mt-10">
                        <a href="#start" className="rounded-full bg-pink-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-100 md:px-7">
                            Run your first drop
                        </a>
                        <span className="text-xs text-[#A9C8F6]">Buyers need no wallet · Works with any storefront</span>
                    </div>
                    <div data-hero className="mx-auto mt-6 h-[300px] w-full max-w-xl sm:h-[380px] md:mt-8 md:h-[460px]">
                        <Keycap3D />
                    </div>
                </div>

                {/* Product window */}
                <div data-window-wrap className="mx-auto mt-12 max-w-5xl md:mt-20" style={{ perspective: 1400 }}>
                    <div data-window className="overflow-hidden rounded-xl border border-white/20 bg-[#1559B8] shadow-2xl shadow-blue-950/40 md:rounded-2xl">
                        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5 md:gap-2 md:px-4 md:py-3">
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#3B86EA] md:h-3 md:w-3" />
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#3B86EA] md:h-3 md:w-3" />
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#3B86EA] md:h-3 md:w-3" />
                            <span className="ml-2 truncate text-[11px] text-[#A9C8F6] md:ml-3 md:text-xs">dropcaps.app / drops / aurora-014</span>
                        </div>

                        <div className="grid gap-px bg-white/10 text-left md:grid-cols-[1fr_300px]">
                            <div data-draw className="bg-[#1559B8] p-4 sm:p-6 md:p-8">
                                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                                    <div>
                                        <h3 className="text-base font-medium md:text-lg">Aurora resin keycap</h3>
                                        <p className="mt-1 text-xs text-[#A9C8F6] md:text-sm">20 entries · 4 available · list locked</p>
                                    </div>
                                    <span data-verified className="translate-y-2 whitespace-nowrap rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs text-white opacity-0">
                                        Draw verified
                                    </span>
                                </div>
                                <div className="mt-5 grid grid-cols-4 gap-1.5 sm:gap-2 md:mt-6">
                                    {TICKETS.map((code, i) => (
                                        <div
                                            key={code}
                                            data-ticket
                                            {...(WINNERS.includes(i) ? { "data-winner": true } : {})}
                                            className="rounded-md border border-white/20 bg-white/10 px-1 py-2 text-center text-[10px] tabular-nums text-[#F2F7FF] opacity-40 sm:rounded-lg sm:px-3 sm:py-2.5 sm:text-sm"
                                        >
                                            {code}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 bg-[#1559B8] p-4 text-xs sm:p-6 sm:text-sm md:space-y-5 md:p-8">
                                <div>
                                    <p className="text-[#A9C8F6]">List hash</p>
                                    <p className="mt-1 break-all text-[#F2F7FF]">9f2c4a1b…e41a07d3</p>
                                </div>
                                <div>
                                    <p className="text-[#A9C8F6]">Randomness source</p>
                                    <p className="mt-1 text-[#F2F7FF]">Blockchain block #24,118,502, created after the list was locked</p>
                                </div>
                                <div>
                                    <p className="text-[#A9C8F6]">Signup window</p>
                                    <p className="mt-1 text-[#F2F7FF]">Closed Oct 30, 20:00</p>
                                </div>
                                <div className="rounded-lg border border-white/20 p-3 text-[#D4E4FC]">
                                    Rerun the formula yourself and get the same four winners.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 md:px-6 md:py-32">
                <div className="max-w-2xl">
                    <h2 data-heading className="text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">Stop Racing.<br />Start Drawing.</h2>
                    <p className="mt-4 text-base text-[#D4E4FC] md:mt-5 md:text-lg">
                        Every drop follows the same five steps, and every step leaves a public record.
                    </p>
                </div>
                <ol className="mt-10 divide-y divide-white/20 border-y border-white/20 md:mt-16">
                    {STEPS.map(([title, body], i) => (
                        <li key={title} data-step className="grid gap-1.5 py-6 md:grid-cols-[80px_1fr_1.4fr] md:items-baseline md:gap-4 md:py-8">
                            <span data-step-num className="text-xs text-[#8FB8F3] md:text-sm">0{i + 1}</span>
                            <h3 className="text-lg font-medium md:text-xl">{title}</h3>
                            <p className="text-[15px] leading-relaxed text-[#D4E4FC] md:text-base">{body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Why Dropcaps (untuk pembuat keycap) */}
            <section id="why" className="mx-auto max-w-6xl scroll-mt-16 px-5 pb-20 md:px-6 md:pb-32">
                <h2 data-heading className="max-w-xl text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">Built for Artisan Keycap Makers</h2>
                <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
                    {REASONS.map(([title, body]) => (
                        <div key={title} data-reveal className="border-t border-white/40 pt-5 md:pt-6">
                            <h3 className="text-lg font-medium md:text-xl">{title}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-[#D4E4FC] md:mt-3 md:text-base">{body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="mx-auto max-w-4xl scroll-mt-16 px-5 pb-20 md:px-6 md:pb-32">
                <h2 data-heading className="text-3xl font-serif-display font-normal sm:text-4xl md:text-5xl">Simple Pricing</h2>
                <p className="mt-4 max-w-xl text-sm text-[#D4E4FC] md:mt-5 md:text-lg">
                    Pay per drop, or subscribe if you release often. Prices in USD.
                </p>
                <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
                    {PLANS.map((plan, i) => (
                        <div
                            key={plan.name}
                            data-reveal
                            className={`flex flex-col rounded-2xl border p-6 md:p-8 ${i === 1 ? "border-white/60 bg-white/[0.14]" : "border-white/25"}`}
                        >
                            <h3 className="text-lg font-medium">{plan.name}</h3>
                            <p className="mt-2 text-sm text-[#D4E4FC] md:min-h-[48px]">{plan.blurb}</p>
                            <p className="mt-5 text-3xl font-semibold md:mt-6 md:text-4xl">
                                {plan.price}
                                <span className="ml-1 text-sm font-normal text-[#A9C8F6] md:text-base">{plan.unit}</span>
                            </p>
                            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[#E6EFFD] md:mt-8 md:space-y-3">
                                {plan.items.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#A9C8F6]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="https://wa.me/6289684053091"
                                className={`mt-8 rounded-full px-5 py-2.5 text-center text-sm font-medium transition md:mt-10 ${
                                    i === 1 ? "bg-white text-[#1A6DE0] hover:bg-sky-100" : "border border-white/40 hover:bg-white/10"
                                }`}
                            >
                                Book A Demo
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-5 pb-20 md:px-6 md:pb-32">
                <h2 data-heading className="text-3xl font-serif-display font-normal sm:text-4xl md:text-5xl">Common Questions</h2>
                <div className="mt-8 divide-y divide-white/20 border-y border-white/20 md:mt-12">
                    {FAQS.map(([q, a], i) => {
                        const isOpen = open === i
                        return (
                            <div key={q} data-reveal>
                                <button
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:gap-6 md:py-6 md:text-lg"
                                >
                                    {q}
                                    <span className={`shrink-0 text-2xl text-[#A9C8F6] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                                </button>
                                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5 md:pb-6" : "grid-rows-[0fr]"}`}>
                                    <p className="overflow-hidden text-[15px] leading-relaxed text-[#D4E4FC] md:text-base">{a}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* CTA */}
            <section id="start" className="scroll-mt-16 px-5 pb-20 text-center md:px-6 md:pb-32">
                <div data-cta className="mx-auto max-w-3xl rounded-3xl border border-white/25 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(255,255,255,0.18),transparent)] px-5 py-14 md:px-6 md:py-24">
                    <h2 data-heading className="text-3xl font-serif-display font-normal leading-tight sm:text-4xl md:text-5xl">Ready for Your First Fair Drop?</h2>
                    <p className="mx-auto mt-4 max-w-md text-base text-[#D4E4FC] md:mt-5 md:text-lg">
                        Tell us about your next release and we will set it up with you.
                    </p>
                    <a href="https://wa.me/6289684053091" className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-medium text-[#1A6DE0] transition hover:bg-sky-100 md:mt-10 md:px-8">
                        Run a drop
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/20 px-5 py-10 md:px-6 md:py-12">
                <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 text-sm text-[#A9C8F6] md:flex-row">
                    <div>
                        <p className="font-semibold text-white">Dropcaps</p>
                        <p className="mt-2">Fair drops for artisan keycap makers.</p>
                    </div>
                    <div className="flex gap-12 md:gap-16">
                        <div className="space-y-2">
                            <p className="text-[#E6EFFD]">Product</p>
                            <a href="#how" className="block hover:text-white">How it works</a>
                            <a href="#pricing" className="block hover:text-white">Pricing</a>
                            <a href="#faq" className="block hover:text-white">FAQ</a>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[#E6EFFD]">Legal</p>
                            <a href="#" className="block hover:text-white">Privacy</a>
                            <a href="#" className="block hover:text-white">Terms</a>
                        </div>
                    </div>
                </div>
                <p className="mx-auto mt-8 max-w-6xl text-xs text-[#8FB8F3] md:mt-10">© 2026 Dropcaps</p>
            </footer>
        </main>
    )
}

export default DropCaps