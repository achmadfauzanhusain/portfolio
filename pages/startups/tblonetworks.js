import { Fragment, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)
// Mencegah pin "loncat" saat address bar browser mobile naik/turun
ScrollTrigger.config({ ignoreMobileResize: true })

const serif = { fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }
const sans = { fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }

const navLinks = [
    { label: 'Developers', href: 'https://fauzanhusain.com' },
    { label: 'How it works', href: '#how' },
    { label: 'Rewards', href: '#reward' },
    { label: 'Community', href: '#community' },
    { label: 'About', href: '#join' },
]

const floaters = [
    {
        src: '/developers/founders.jpeg',
        alt: 'Founder Tblo Networks',
        caption: 'FH, Founder',
        pos: 'left-4 top-6 w-20 -rotate-6 sm:left-[6%] sm:w-24 lg:left-[1%] lg:top-[10%] lg:w-32 xl:left-[3%] xl:w-44 2xl:w-56',
    },
    {
        src: '/developers/founders2.jpeg',
        alt: 'Founder Tblo Networks',
        caption: 'Komdigi, Jakarta',
        pos: 'right-4 bottom-6 w-20 rotate-6 sm:right-[6%] sm:w-24 lg:right-[1%] lg:bottom-[10%] lg:w-32 xl:right-[3%] xl:w-40 2xl:w-52',
    },
]

const steps = [
    {
        n: '1',
        title: 'Connect your wallet',
        body: 'Use the Ethereum wallet you already have. No sign-up form, no email verification, no KYC.',
    },
    {
        n: '2',
        title: 'Sign one message',
        body: 'One signature proves the wallet is yours. No password, no phone number.',
    },
    {
        n: '3',
        title: 'You’re in',
        body: 'Start posting and chatting right away. The whole thing takes 30 seconds.',
    },
]

const stored = [
    ['Your public wallet address', 'The only thing on our servers. It’s already public on the blockchain. But we still hash it with salt, so we can’t see it either.'],
    ['Your content', 'Encrypted, and you hold the keys. We can’t read it.'],
    ['Name, email, phone number', 'We never ask for them, so there’s nothing to sell and nothing to leak.'],
    ['Photos and location', 'Not collected to sign up, and never used to watch you.'],
]

const e2eeFlow = [
    ['You', 'Your message is encrypted on your device before it leaves.'],
    ['Our servers', 'They only carry scrambled ciphertext. Nothing readable.'],
    ['Your friend', 'Only their device holds the key to unlock it.'],
]

const e2eePoints = [
    ['Keys never leave your device', 'Your encryption keys are generated and kept on your device. We never see them, so we can’t decrypt anything.'],
    ['Only the two of you can read it', 'Not us, not a hacker who breaks into our servers, not anyone watching the network in between.'],
    ['Nothing useful to hand over', 'If someone demands your chats, all we have is unreadable ciphertext. There is nothing to give.'],
]

// Reward: fee platform 5%, kreator 95%
const FEE_RATE = 0.05
const rewardAmounts = [1, 10, 100]

const rewardFlow = [
    ['Reward a post', 'Love what someone wrote? Send them a reward straight from your wallet, in one tap.'],
    ['95% goes to the creator', 'Almost everything lands directly in the creator’s wallet.'],
    ['5% keeps the network alive', 'A small, transparent fee pays for servers and development. Never your data.'],
]

const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const quoteText =
    'Every day, billions of people hand over their names, photos, phone numbers, and locations just to post a photo or chat with a friend. That data gets sold, hacked, or used to watch them by data broker, government, and other evil company.'

const communityA =
    'We’re starting with active crypto users in Southeast Asia: people who already know wallets, care about privacy, and are fed up with data-hungry mainstream platforms.'
const communityB =
    'This isn’t only about technology. It’s about digital rights: anyone should be able to speak online without sacrificing their real identity.'

const cssText = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");
html{background:#000;}
html.lenis, html.lenis body{height:auto;}
.lenis.lenis-smooth{scroll-behavior:auto !important;}
.lenis.lenis-stopped{overflow:hidden;}
.stars{
  background-image:
    radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,.9), transparent),
    radial-gradient(1px 1px at 90px 140px, rgba(255,255,255,.6), transparent),
    radial-gradient(1.5px 1.5px at 160px 70px, rgba(255,255,255,.8), transparent),
    radial-gradient(1px 1px at 230px 190px, rgba(255,255,255,.5), transparent),
    radial-gradient(1px 1px at 300px 40px, rgba(255,255,255,.7), transparent),
    radial-gradient(1.5px 1.5px at 340px 230px, rgba(255,255,255,.6), transparent);
  background-size: 360px 260px;
}
.card-glow{position:relative;overflow:hidden;}
.card-glow::after{
  content:"";position:absolute;inset:auto -20% -60% -20%;height:70%;
  background:radial-gradient(ellipse at center, rgba(59,130,246,.22), transparent 70%);
  opacity:0;transition:opacity .5s ease;pointer-events:none;
}
.card-glow:hover::after{opacity:1;}
.how-stacked > li{grid-column:1;grid-row:1;}
`

/*
 * Memecah teks jadi per kata.
 * - mask=true  : tiap kata dibungkus overflow-hidden (efek "naik dari bawah", dipakai di heading)
 * - mask=false : kata biasa, dipakai untuk efek opacity yang di-scrub
 */
const Words = ({ text, wordClass, mask = false, color = '' }) =>
    text.split(' ').map((w, i) =>
        mask ? (
            <span key={i} className="mr-[0.25em] -mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                <span className={`${wordClass} ${color} inline-block will-change-transform`}>{w}</span>
            </span>
        ) : (
            <span key={i} className={`${wordClass} inline-block pr-[0.28em]`}>
                {w}
            </span>
        )
    )

const TbloNetworks = () => {
    const root = useRef(null)

    const [open, setOpen] = useState(false)

    // Reward: nominal yang dipilih pengunjung
    const [amount, setAmount] = useState(10)
    const creatorRef = useRef(null)
    const feeRef = useRef(null)
    // Angka yang sedang ditampilkan (di-tween saat nominal berubah)
    const shown = useRef({ c: 10 * (1 - FEE_RATE), f: 10 * FEE_RATE })

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    // Smooth scroll (Lenis) yang disinkronkan dengan GSAP ScrollTrigger.
    // Harus dipasang SEBELUM effect GSAP utama.
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            anchors: true, // link #how, #reward, dst tetap berfungsi
        })
        lenis.on('scroll', ScrollTrigger.update)
        const tick = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(tick)
            lenis.destroy()
        }
    }, [])

    // Angka creator & fee berhitung ke nilai baru setiap nominal diganti
    useEffect(() => {
        const target = { c: amount * (1 - FEE_RATE), f: amount * FEE_RATE }
        const write = () => {
            if (creatorRef.current) creatorRef.current.textContent = fmt(shown.current.c)
            if (feeRef.current) feeRef.current.textContent = fmt(shown.current.f)
        }
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) {
            shown.current = target
            write()
            return
        }
        const tw = gsap.to(shown.current, {
            ...target,
            duration: 0.6,
            ease: 'power2.out',
            onUpdate: write,
            onComplete: write,
        })
        return () => tw.kill()
    }, [amount])

    useEffect(() => {
        const mm = gsap.matchMedia(root.current)
        const refresh = () => ScrollTrigger.refresh()
        window.addEventListener('load', refresh)
        // Font Inter yang terlambat dimuat bisa menggeser layout, jadi hitung ulang
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh)

        /* ------------------------------------------------------------------
         * Semua ukuran layar (selama user tidak memilih reduced motion)
         * ------------------------------------------------------------------ */
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            /* ---------- Intro hero (load) ---------- */
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
            tl.from('.nav-item', { y: -16, opacity: 0, duration: 0.7, stagger: 0.06 })
                .from('.hero-line', { yPercent: 110, duration: 1.2, stagger: 0.14 }, '-=0.4')
                .from('.hero-sub', { opacity: 0, y: 12, duration: 0.8 }, '-=0.5')
                .from('.hero-footnote', { opacity: 0, y: 12, duration: 0.8 }, '-=0.5')
                .from('.hero-cta', { opacity: 0, y: 12, duration: 0.8 }, '-=0.6')
                .from('.float-card', { opacity: 0, scale: 0.9, duration: 1, stagger: 0.2 }, '-=0.9')

            // Foto melayang: dijeda otomatis saat hero sudah keluar layar
            const bobs = gsap.utils.toArray('.float-bob').map((el, i) =>
                gsap.to(el, {
                    y: i % 2 ? 16 : -16,
                    rotation: i % 2 ? -1.5 : 1.5,
                    duration: 3 + i * 0.7,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    force3D: true,
                })
            )
            ScrollTrigger.create({
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                onToggle: (self) => bobs.forEach((b) => (self.isActive ? b.play() : b.pause())),
            })

            /* ---------- Progress bar scroll di header ---------- */
            gsap.to('.scroll-progress', {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3,
                },
            })

            /* ---------- Hero: konten mengecil + memudar saat di-scroll ---------- */
            const heroScroll = {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top+=80',
                scrub: 0.5,
            }
            gsap.to('.hero-content', {
                scale: 0.88,
                opacity: 0,
                yPercent: -10,
                ease: 'none',
                force3D: true,
                scrollTrigger: heroScroll,
            })
            // Foto melayang dengan kecepatan berbeda (parallax)
            gsap.utils.toArray('.float-card').forEach((el, i) => {
                gsap.to(el, {
                    y: i % 2 ? -220 : -140,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: heroScroll,
                })
            })
            gsap.to('.hero-glow', {
                opacity: 0.15,
                yPercent: 25,
                ease: 'none',
                force3D: true,
                scrollTrigger: heroScroll,
            })

            /* ---------- Bintang: parallax pakai transform (GPU), bukan backgroundPosition ---------- */
            gsap.utils.toArray('.stars').forEach((el) => {
                gsap.fromTo(
                    el,
                    { y: 0 },
                    {
                        y: -260,
                        ease: 'none',
                        force3D: true,
                        scrollTrigger: {
                            trigger: el.parentElement,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.5,
                        },
                    }
                )
            })

            /* ---------- Quote: section di-pin, kata menyala satu per satu ---------- */
            const qtl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: '.quote-pin',
                    start: 'top top',
                    end: () => '+=' + window.innerHeight * 1.6,
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })
            qtl.fromTo('.q-word', { opacity: 0.15 }, { opacity: 1, stagger: 0.1, duration: 1 })
                .from('.q-tag', { opacity: 0, y: 24, duration: 1.2 }, '>-0.3')
                .to({}, { duration: 1 })

            /* ---------- Teks komunitas: kata menyala mengikuti scroll ---------- */
            gsap.utils.toArray('.scrub-text').forEach((p) => {
                gsap.fromTo(
                    p.querySelectorAll('.s-word'),
                    { opacity: 0.12 },
                    {
                        opacity: 1,
                        ease: 'none',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: p,
                            start: 'top 80%',
                            end: 'bottom 55%',
                            scrub: 0.5,
                        },
                    }
                )
            })

            /* ---------- Heading: kata naik dari balik mask ---------- */
            gsap.utils.toArray('.split-heading').forEach((h) => {
                gsap.from(h.querySelectorAll('.h-word'), {
                    yPercent: 115,
                    rotate: 3,
                    duration: 1.1,
                    stagger: 0.06,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: h, start: 'top 88%' },
                })
            })

            /* ---------- Garis pemisah ---------- */
            gsap.utils.toArray('.rule').forEach((el) => {
                gsap.from(el, {
                    scaleX: 0,
                    transformOrigin: 'left center',
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 90%' },
                })
            })

            /* ---------- Kartu: muncul bergelombang (batch) ---------- */
            const reveals = gsap.utils.toArray('.reveal')
            gsap.set(reveals, { opacity: 0, y: 50 })
            ScrollTrigger.batch(reveals, {
                start: 'top 90%',
                once: true,
                onEnter: (batch) =>
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: 'power3.out',
                        overwrite: true,
                    }),
            })

            /* ---------- E2EE flow: kartu & panah menyala berurutan saat scroll ---------- */
            const cards = gsap.utils.toArray('.e2ee-card')
            const arrows = gsap.utils.toArray('.e2ee-arrow')
            const etl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: '.e2ee-flow',
                    start: 'top 78%',
                    end: 'bottom 52%',
                    scrub: 0.6,
                },
            })
            cards.forEach((c, i) => {
                etl.from(c, { opacity: 0.12, y: 60, scale: 0.94, duration: 1 }, i)
                if (arrows[i]) {
                    etl.from(arrows[i], { opacity: 0, x: -16, scale: 0.4, duration: 0.6 }, i + 0.7)
                }
            })

            /* ---------- Reward: bar 95/5 terisi mengikuti scroll ---------- */
            gsap.fromTo(
                '.reward-fill',
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.reward-card',
                        start: 'top 75%',
                        end: 'center 55%',
                        scrub: 0.6,
                    },
                }
            )
            gsap.from('.reward-fee', {
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.reward-card',
                    start: 'center 65%',
                    end: 'center 50%',
                    scrub: 0.5,
                },
            })

            /* ---------- CTA: kartu membesar seperti "zoom in" ---------- */
            gsap.fromTo(
                '.join-card',
                { scale: 0.86, y: 80 },
                {
                    scale: 1,
                    y: 0,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: '.join-card',
                        start: 'top bottom',
                        end: 'top 35%',
                        scrub: 0.5,
                    },
                }
            )
            gsap.fromTo(
                '.join-glow',
                { opacity: 0, yPercent: 30 },
                {
                    opacity: 1,
                    yPercent: 0,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: '.join-card',
                        start: 'top 85%',
                        end: 'bottom 70%',
                        scrub: 0.5,
                    },
                }
            )
        })

        /* ------------------------------------------------------------------
         * Desktop: "How it works" di-pin, langkah menyala satu per satu
         * ------------------------------------------------------------------ */
        mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
            const cards = gsap.utils.toArray('.how-card')
            const badges = gsap.utils.toArray('.how-badge')
            gsap.set(cards, { opacity: 0.18, y: 40, scale: 0.96 })

            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: '.how-pin',
                    start: 'top 72px',
                    end: () => '+=' + window.innerHeight * 1.5,
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })
            cards.forEach((c, i) => {
                tl.to(c, { opacity: 1, y: 0, scale: 1, duration: 1 }, i).to(
                    badges[i],
                    { backgroundColor: '#2563eb', borderColor: '#2563eb', color: '#ffffff', duration: 0.4 },
                    i + 0.3
                )
            })
            tl.to('.how-progress', { scaleX: 1, duration: cards.length }, 0).to({}, { duration: 0.6 })
        })

        /* ------------------------------------------------------------------
         * Mobile: "How it works" jadi tumpukan kartu (card stack) yang di-pin.
         * Glow kartu aktif memakai overlay yang hanya di-animate opacity-nya
         * (bukan boxShadow) supaya tidak memicu repaint berat.
         * ------------------------------------------------------------------ */
        mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
            const stack = root.current.querySelector('.how-stack')
            const cards = gsap.utils.toArray('.how-card')
            const badges = gsap.utils.toArray('.how-badge')
            const glows = gsap.utils.toArray('.how-glow')
            const dots = gsap.utils.toArray('.how-dot')
            const n = cards.length
            const STEP = 1.2 // durasi per langkah di timeline

            // Semua kartu ditumpuk di satu sel grid
            stack.classList.add('how-stacked')
            gsap.set('.how-track', { display: 'block' })
            gsap.set('.how-dots', { display: 'flex' })

            const GLOW_ON = { borderColor: 'rgba(59,130,246,0.7)' }
            const GLOW_OFF = { borderColor: 'rgba(255,255,255,0.1)' }
            const BADGE_ON = { backgroundColor: '#2563eb', borderColor: '#2563eb', color: '#ffffff' }
            // Level kedalaman di tumpukan: 0 = depan, makin besar makin ke belakang
            const depth = (k) => ({
                y: -k * 24,
                scale: 1 - k * 0.06,
                opacity: Math.max(0, 1 - k * 0.45),
            })

            gsap.set(cards, { transformPerspective: 900, transformOrigin: '50% 100%', force3D: true, ...GLOW_OFF })
            gsap.set(cards.slice(1), { yPercent: 115, rotationX: -25, opacity: 0 })
            gsap.set(cards[0], GLOW_ON)
            gsap.set(glows, { opacity: 0 })
            gsap.set(glows[0], { opacity: 1 })
            gsap.set(badges[0], BADGE_ON)
            gsap.set(dots[0], { width: 28, backgroundColor: '#3b82f6' })

            const total = (n - 1) * STEP + 1
            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: '.how-pin',
                    start: 'top 80px',
                    end: () => '+=' + window.innerHeight * 1.8,
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })

            for (let i = 1; i < n; i++) {
                const t = (i - 1) * STEP + 0.2

                // Kartu-kartu sebelumnya mundur satu level ke belakang
                for (let j = 0; j < i; j++) {
                    tl.fromTo(cards[j], depth(i - 1 - j), { ...depth(i - j), duration: 0.9, immediateRender: false }, t)
                }
                // Glow kartu sebelumnya padam
                tl.to(cards[i - 1], { ...GLOW_OFF, duration: 0.5 }, t)
                tl.to(glows[i - 1], { opacity: 0, duration: 0.5 }, t)

                // Kartu baru terbang masuk dengan rotasi 3D
                tl.fromTo(
                    cards[i],
                    { yPercent: 115, rotationX: -25, opacity: 0 },
                    { yPercent: 0, rotationX: 0, opacity: 1, duration: 1, immediateRender: false },
                    t
                )
                tl.to(cards[i], { ...GLOW_ON, duration: 0.5 }, t + 0.6)
                tl.to(glows[i], { opacity: 1, duration: 0.5 }, t + 0.6)
                tl.to(badges[i], { ...BADGE_ON, duration: 0.4 }, t + 0.5)

                // Dot indikator: yang lama menyusut, yang baru memanjang
                tl.to(dots[i - 1], { width: 8, backgroundColor: 'rgba(255,255,255,0.25)', duration: 0.4 }, t)
                tl.to(dots[i], { width: 28, backgroundColor: '#3b82f6', duration: 0.4 }, t + 0.4)
            }

            tl.to('.how-progress', { scaleX: 1, duration: total }, 0).to({}, { duration: 0.6 })

            // Kembalikan DOM ke kondisi awal saat media query tidak cocok lagi
            return () => stack.classList.remove('how-stacked')
        })

        return () => {
            window.removeEventListener('load', refresh)
            mm.revert()
        }
    }, [])

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: cssText }} />

            <div ref={root} className="min-h-screen bg-black text-white antialiased selection:bg-blue-500 selection:text-white" style={sans}>
                <header className="sticky top-0 z-20 border-b border-white/10 bg-black/85 backdrop-blur-md">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="nav-item">
                            <p className="text-lg font-semibold tracking-[0.22em]">TBLONETWORKS</p>
                        </div>

                        <ul className="hidden items-center gap-10 text-[14px] text-white/70 md:flex">
                            {navLinks.slice(0, 4).map((l) => (
                                <li key={l.label} className="nav-item">
                                    <a href={l.href} className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="hidden md:block nav-item">
                            <a
                                href={navLinks[4].href}
                                className="rounded-full border border-white/25 px-5 py-2 text-[14px] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                            >
                                {navLinks[4].label}
                            </a>
                        </div>

                        <button
                            type="button"
                            className="nav-item -mr-2 p-2 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            onClick={() => setOpen((v) => !v)}
                        >
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                                {open ? (
                                    <path d="M6 6l12 12M18 6L6 18" />
                                ) : (
                                    <path d="M4 7h16M4 12h16M4 17h16" />
                                )}
                            </svg>
                        </button>
                    </nav>

                    {open && (
                        <div id="mobile-menu" className="border-t border-white/10 bg-black md:hidden">
                            <ul className="mx-auto flex max-w-7xl flex-col px-6 py-2">
                                {navLinks.map((l) => (
                                    <li key={l.label} className="border-b border-white/10 last:border-b-0">
                                        <a
                                            href={l.href}
                                            onClick={() => setOpen(false)}
                                            className="block py-4 text-lg text-white/80 hover:text-white"
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
                        aria-hidden="true"
                        className="scroll-progress pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left bg-gradient-to-r from-blue-500 via-sky-300 to-blue-500 will-change-transform"
                        style={{ transform: 'scaleX(0)' }}
                    />
                </header>

                <section className="hero-section relative overflow-hidden">
                    {/* Dibuat 260px lebih tinggi supaya parallax transform tidak menyisakan celah */}
                    <div className="stars pointer-events-none absolute inset-x-0 top-0 -bottom-[260px] opacity-50 will-change-transform" />
                    <div className="hero-glow pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(37,99,235,0.45),rgba(37,99,235,0.12)_45%,transparent_75%)] will-change-transform" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                    <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center justify-center px-6 pb-40 pt-36 text-center lg:py-20">
                        <div className="pointer-events-none absolute inset-0">
                            {floaters.map((f) => (
                                <div key={f.src} className={`float-card absolute will-change-transform ${f.pos}`}>
                                    <figure className="float-bob overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1 shadow-[0_0_30px_-10px_rgba(59,130,246,0.4)] will-change-transform">
                                        <img
                                            src={f.src}
                                            alt={f.alt}
                                            loading="eager"
                                            decoding="async"
                                            className="aspect-[4/5] w-full rounded-xl object-cover"
                                        />
                                        <figcaption className="mt-2 pb-1 text-center text-[11px] md:text-xs text-white/70 md:text-sm">
                                            {f.caption}
                                        </figcaption>
                                    </figure>
                                </div>
                            ))}
                        </div>

                        <div className="hero-content relative z-10 flex flex-col items-center will-change-transform">
                            <h1
                                className="text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-[-0.035em]"
                                style={serif}
                            >
                                <span className="block overflow-hidden pb-[0.14em]">
                                    <span className="hero-line block">Social media without</span>
                                </span>
                                <span className="block overflow-hidden pb-[0.2em]">
                                    <span className="hero-line block">
                                        handing over your{' '}
                                        <em className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text font-light not-italic text-transparent">identity</em>
                                        <sup className="ml-1 align-super text-[0.22em] font-normal not-italic">🥇</sup>
                                    </span>
                                </span>
                            </h1>

                            <p className="hero-sub mt-6 max-w-2xl text-lg font-light leading-8 text-white/70 md:text-xl md:leading-9" style={serif}>
                                All you need is an Ethereum wallet. Connect, sign one message, and you’re in, in 30 seconds.
                            </p>

                            <p
                                className="hero-footnote mt-8 max-w-xl text-left text-base font-light italic leading-7 text-white/55 md:text-lg"
                                style={serif}
                            >
                                🥇 “Data is the new oil. It’s valuable, but if unrefined it cannot really be used.”
                                <span className="mt-2 block text-right">— Clive Humby</span>
                            </p>

                            <div className="hero-cta mt-12 flex flex-col items-center gap-4 sm:flex-row" style={sans}>
                                <Link
                                    href="https://tblonetworks.vercel.app/"
                                    className="rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-colors hover:bg-blue-500 hover:text-white"
                                >
                                    Try App
                                </Link>
                                <a
                                    href="#how"
                                    className="rounded-full border border-white/25 px-8 py-3.5 text-base text-white transition-colors hover:bg-white/10"
                                >
                                    See how it works
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="quote-section px-6">
                    <div className="quote-pin mx-auto flex min-h-screen max-w-4xl flex-col justify-center py-24">
                        <p className="text-[clamp(1.75rem,4.2vw,3.25rem)] font-light leading-[1.2] tracking-[-0.025em]" style={serif}>
                            <Words text={quoteText} wordClass="q-word" />
                        </p>
                        <p className="q-tag mt-10 text-2xl font-light text-blue-400" style={serif}>
                            We’re building the alternative.
                        </p>
                    </div>
                </section>

                <section id="how" className="mx-auto max-w-6xl px-6 pb-32">
                    <div className="rule h-px w-full bg-gradient-to-r from-blue-500 via-blue-400/40 to-transparent" />
                    <div className="how-pin">
                        <h2 className="split-heading mx-auto mt-12 max-w-3xl text-center text-4xl font-light leading-tight tracking-[-0.03em] md:mt-14 md:text-6xl" style={serif}>
                            <Words text="Your wallet is your" wordClass="h-word" mask />
                            <Words text="only" wordClass="h-word" mask color="text-blue-400" />
                            <Words text="identity" wordClass="h-word" mask />
                        </h2>

                        <div className="how-track mx-auto mt-8 hidden h-px max-w-xs bg-white/10 md:mt-10 md:block" aria-hidden="true">
                            <div className="how-progress h-full origin-left bg-blue-400" style={{ transform: 'scaleX(0)' }} />
                        </div>

                        <ol className="how-stack mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
                            {steps.map((s) => (
                                <li
                                    key={s.n}
                                    className="how-card card-glow rounded-3xl border border-white/10 bg-[#080808] p-8 transition-colors hover:border-white/25 md:p-10"
                                >
                                    {/* Glow aktif (mobile): hanya opacity yang di-animate, bukan boxShadow */}
                                    <span
                                        aria-hidden="true"
                                        className="how-glow pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-[inset_0_0_40px_-10px_rgba(59,130,246,0.55)]"
                                    />
                                    <span className="how-badge relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-base text-blue-400">
                                        {s.n}
                                    </span>
                                    <h3 className="relative mt-12 text-2xl font-normal tracking-[-0.02em] md:text-3xl" style={serif}>
                                        {s.title}
                                    </h3>
                                    <p className="relative mt-4 text-base font-light leading-7 text-white/60" style={serif}>
                                        {s.body}
                                    </p>
                                </li>
                            ))}
                        </ol>

                        {/* Dot indikator langkah (hanya aktif di mobile lewat GSAP) */}
                        <div className="how-dots mt-8 hidden items-center justify-center gap-2" aria-hidden="true">
                            {steps.map((s) => (
                                <span key={s.n} className="how-dot h-2 w-2 rounded-full bg-white/25" />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-6 pb-32">
                    <h2 className="split-heading mb-14 max-w-3xl text-4xl font-light leading-tight tracking-[-0.03em] md:text-6xl" style={serif}>
                        <Words text="We store no data. We can’t sell anything. Nothing can leak." wordClass="h-word" mask />
                    </h2>
                    <ul className="grid gap-5 md:grid-cols-2">
                        {stored.map(([title, body]) => (
                            <li
                                key={title}
                                className="reveal card-glow rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 transition-colors hover:border-white/25 md:p-10"
                            >
                                <h3 className="text-2xl font-normal tracking-[-0.02em]" style={serif}>
                                    {title}
                                </h3>
                                <p className="mt-4 max-w-xl text-base font-light leading-7 text-white/60" style={serif}>
                                    {body}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="chat" className="mx-auto max-w-6xl px-6 pb-32">
                    <div className="rule h-px w-full bg-gradient-to-r from-blue-500 via-blue-400/40 to-transparent" />
                    <h2 className="split-heading mt-14 max-w-3xl text-4xl font-light leading-tight tracking-[-0.03em] md:text-6xl" style={serif}>
                        <Words text="Chats only" wordClass="h-word" mask />
                        <Words text="you two" wordClass="h-word" mask color="text-blue-400" />
                        <Words text="can read" wordClass="h-word" mask />
                    </h2>
                    <p className="reveal mt-6 max-w-2xl text-lg font-light leading-8 text-white/70 md:text-xl md:leading-9" style={serif}>
                        Every message is end-to-end encrypted (E2EE). It’s locked on your device and only unlocked on your friend’s device. Nobody in the middle can open it, including us.
                    </p>

                    <ol className="e2ee-flow mt-14 grid items-stretch gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                        {e2eeFlow.map(([title, body], i) => (
                            <Fragment key={title}>
                                <li className="e2ee-card card-glow rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25">
                                    <h3 className="text-2xl font-normal tracking-[-0.02em]" style={serif}>
                                        {title}
                                    </h3>
                                    <p className="mt-3 text-base font-light leading-7 text-white/60" style={serif}>
                                        {body}
                                    </p>
                                </li>
                                {i < e2eeFlow.length - 1 && (
                                    <li aria-hidden="true" className="e2ee-arrow hidden items-center justify-center text-blue-400 md:flex">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </li>
                                )}
                            </Fragment>
                        ))}
                    </ol>

                    <ul className="mt-5 grid gap-5 md:grid-cols-3">
                        {e2eePoints.map(([title, body]) => (
                            <li
                                key={title}
                                className="reveal card-glow rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 transition-colors hover:border-white/25"
                            >
                                <h3 className="text-xl font-normal tracking-[-0.02em]" style={serif}>
                                    {title}
                                </h3>
                                <p className="mt-3 text-base font-light leading-7 text-white/60" style={serif}>
                                    {body}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="reward" className="mx-auto max-w-6xl px-6 pb-32">
                    <div className="rule h-px w-full bg-gradient-to-r from-blue-500 via-blue-400/40 to-transparent" />
                    <h2 className="split-heading mt-14 max-w-3xl text-4xl font-light leading-tight tracking-[-0.03em] md:text-6xl" style={serif}>
                        <Words text="Reward great posts." wordClass="h-word" mask />
                        <Words text="Creators keep" wordClass="h-word" mask />
                        <Words text="95%." wordClass="h-word" mask color="text-blue-400" />
                    </h2>
                    <p className="reveal mt-6 max-w-2xl text-lg font-light leading-8 text-white/70 md:text-xl md:leading-9" style={serif}>
                        Anyone can reward any post. We take a flat 5% fee on each reward. That’s how we earn, so we never need to sell your data.
                    </p>

                    {/* Kalkulator reward interaktif */}
                    <div className="reward-card card-glow mt-14 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 md:p-12">
                        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm text-white/40" id="reward-label">
                                    Try a reward
                                </p>
                                <div
                                    role="group"
                                    aria-labelledby="reward-label"
                                    className="mt-3 inline-flex gap-1 rounded-full border border-white/15 bg-black/40 p-1"
                                >
                                    {rewardAmounts.map((a) => (
                                        <button
                                            key={a}
                                            type="button"
                                            aria-pressed={amount === a}
                                            onClick={() => setAmount(a)}
                                            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 md:px-6 ${
                                                amount === a ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                                            }`}
                                            style={sans}
                                        >
                                            ${a}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-10 md:gap-14">
                                <div>
                                    <p className="text-sm text-white/50">Creator receives</p>
                                    <p className="mt-2 text-4xl font-light tabular-nums text-blue-400 md:text-6xl" style={serif} aria-live="polite">
                                        $<span ref={creatorRef}>9.50</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/50">Network fee (5%)</p>
                                    <p className="mt-2 text-4xl font-light tabular-nums text-white/80 md:text-6xl" style={serif} aria-live="polite">
                                        $<span ref={feeRef}>0.50</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bar pembagian 95 / 5 */}
                        <div className="mt-10 flex h-3 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                            <div className="reward-fill h-full w-[95%] origin-left rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 will-change-transform" />
                            <div className="reward-fee h-full w-[5%] bg-white/70" />
                        </div>
                        <div className="mt-3 flex justify-between text-xs text-white/40">
                            <span>95% creator</span>
                            <span>5% network</span>
                        </div>
                    </div>

                    <ul className="mt-5 grid gap-5 md:grid-cols-3">
                        {rewardFlow.map(([title, body], i) => (
                            <li
                                key={title}
                                className="reveal card-glow rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 transition-colors hover:border-white/25"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm text-blue-400">
                                    {i + 1}
                                </span>
                                <h3 className="mt-8 text-xl font-normal tracking-[-0.02em]" style={serif}>
                                    {title}
                                </h3>
                                <p className="mt-3 text-base font-light leading-7 text-white/60" style={serif}>
                                    {body}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="community" className="mx-auto max-w-4xl px-6 pb-36">
                    <p className="scrub-text text-[clamp(1.5rem,3.2vw,2.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-white" style={serif}>
                        <Words text={communityA} wordClass="s-word" />
                    </p>
                    <p className="scrub-text mt-12 text-[clamp(1.5rem,3.2vw,2.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-white/50" style={serif}>
                        <Words text={communityB} wordClass="s-word" />
                    </p>
                </section>

                <section id="join" className="px-6 pb-24">
                    <div className="join-card relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#04060d] px-6 py-20 text-center will-change-transform md:py-28">
                        <div className="stars pointer-events-none absolute inset-x-0 top-0 -bottom-[260px] opacity-40 will-change-transform" />
                        <div className="join-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,rgba(37,99,235,0.6),transparent_70%)] will-change-transform" />
                        <div className="relative">
                            <h2 className="split-heading mx-auto max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.035em]" style={serif}>
                                <Words text="Your identity is your wallet." wordClass="h-word" mask />
                                <Words text="It’s the only thing the world needs to know." wordClass="h-word" mask color="text-blue-400" />
                            </h2>
                            <Link
                                href="https://tblonetworks.vercel.app/"
                                className="mt-10 inline-block text-sm md:text-base rounded-full bg-white px-6 md:px-9 py-3 md:py-4 text-lg font-medium text-black transition-colors hover:bg-blue-500 hover:text-white"
                                style={sans}
                            >
                                Join Early Access
                            </Link>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-white/10">
                    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-white/50 md:flex-row md:justify-between" style={sans}>
                        <span>© {new Date().getFullYear()} Tblo Networks</span>
                        <span className="flex gap-6">
                            <a href="#" className="transition-colors hover:text-white">Docs</a>
                            <a href="https://github.com/achmadfauzanhusain" className="transition-colors hover:text-white">GitHub</a>
                            <a href="#" className="transition-colors hover:text-white">X</a>
                            <a href="#" className="transition-colors hover:text-white">Privacy</a>
                        </span>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default TbloNetworks