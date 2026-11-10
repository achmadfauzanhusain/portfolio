import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

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

// ---------- DATA ----------
const keyboard = {
    name: "Essential 75",
    theme: "Orange - Black",
    creator: "PRESSPLAY",
    store: "Online",
    buyDate: "2026-02-08",
    price: { idr: 699000, usd: 39.05 },
    image: "/collections/keyboard/keyboard1.jpeg",
    description: "my first join artisan keycap community in real life by buying ths keycaps",
}

const formatIDR = (n) => `Rp ${n.toLocaleString("id-ID")}`
const formatUSD = (n) => `$ ${n.toFixed(2)}`
const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })

const specs = [
    { label: "Creator", value: keyboard.creator },
    { label: "Store", value: keyboard.store },
    { label: "Buy Date", value: formatDate(keyboard.buyDate) },
]

// ---------- COMPONENT ----------
const Essential75 = () => {
    const root = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.timeline({ defaults: { ease: "power3.out" } })
                    .from("[data-back]", { y: -12, opacity: 0, duration: 0.6 })
                    .from("[data-media]", { y: 40, opacity: 0, duration: 0.9 }, "-=0.3")
                    .from("[data-info]", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
            })
        }, root)

        return () => ctx.revert()
    }, [])

    const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"

    return (
        <div ref={root} className="isolate min-h-screen overflow-x-hidden bg-[#1A6DE0] text-white antialiased">
            <Clouds />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap");
                        .font-serif-display { font-family: "Instrument Serif", Georgia, "Times New Roman", serif; letter-spacing: 0.015em; }
                    `,
                }}
            />

            <main className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-16">
                <Link
                    data-back
                    href="/collections/keycaps"
                    className={`group inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm text-[#D4E4FC] transition-colors hover:border-white/60 hover:text-white ${focus}`}
                >
                    <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
                    All keyboards
                </Link>

                <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-2 md:gap-12">
                    <div data-media className="aspect-square overflow-hidden rounded-2xl border border-white/25 bg-white/10">
                        <Image
                            className="h-full w-full object-cover"
                            width={300}
                            height={300}
                            src={keyboard.image}
                            alt={`${keyboard.name} - ${keyboard.theme}`}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div data-info className="flex gap-1 md:gap-2">
                            <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-[#E6EFFD]">{formatIDR(keyboard.price.idr)}</span>
                            <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-[#E6EFFD]">{formatUSD(keyboard.price.usd)}</span>
                        </div>

                        <h1 data-info className="font-serif-display mt-5 text-4xl font-normal leading-tight sm:text-5xl md:text-6xl">
                            {keyboard.name}
                        </h1>
                        <p data-info className="mt-2 text-base text-[#D4E4FC] md:text-lg">{keyboard.theme}</p>

                        <dl data-info className="mt-8 divide-y divide-white/15 rounded-2xl border border-white/25 bg-white/10 px-6 text-[15px] md:text-base">
                            {specs.map(({ label, value }) => (
                                <div key={label} className="flex items-baseline justify-between gap-4 py-4">
                                    <dt className="text-[#A9C8F6]">{label}</dt>
                                    <dd className="text-right text-[#D4E4FC]">{value}</dd>
                                </div>
                            ))}
                        </dl>

                        <p data-info className="mt-8 max-w-prose text-[15px] leading-relaxed text-[#D4E4FC] md:text-base">
                            {keyboard.description}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Essential75