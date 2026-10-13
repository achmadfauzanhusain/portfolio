import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

// Gaya tipografi ala Starcloud: grotesk bersih, tipis, tracking rapat
const serif = { fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }
const sans = { fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }

const navLinks = [
    { label: 'Developers', href: 'https://fauzanhusain.com' },
    { label: 'How it works', href: '#how' },
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

const quoteText =
    'Every day, billions of people hand over their names, photos, phone numbers, and locations just to post a photo or chat with a friend. That data gets sold, hacked, or used to watch them by data broker, government, and other evil company.'

const cssText = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");
html{scroll-behavior:smooth;background:#000;}
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
`

const TbloNetworks = () => {
    const root = useRef(null)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    useEffect(() => {
        const mm = gsap.matchMedia()

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const ctx = gsap.context(() => {
                // Satu momen utama: urutan load di hero
                const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
                tl.from('.nav-item', { y: -16, opacity: 0, duration: 0.7, stagger: 0.06 })
                    .from('.hero-line', { yPercent: 110, duration: 1.2, stagger: 0.14 }, '-=0.4')
                    .from('.hero-sub', { opacity: 0, y: 12, duration: 0.8 }, '-=0.5')
                    .from('.hero-footnote', { opacity: 0, y: 12, duration: 0.8 }, '-=0.5')
                    .from('.hero-cta', { opacity: 0, y: 12, duration: 0.8 }, '-=0.6')
                    .from('.float-card', { opacity: 0, scale: 0.9, duration: 1, stagger: 0.2 }, '-=0.9')

                // Foto melayang terus-menerus, tiap foto beda tempo
                gsap.utils.toArray('.float-bob').forEach((el, i) => {
                    gsap.to(el, {
                        y: i % 2 ? 16 : -16,
                        rotation: i % 2 ? -1.5 : 1.5,
                        duration: 3 + i * 0.7,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                    })
                })

                // Kata demi kata menyala saat di-scroll
                gsap.fromTo(
                    '.q-word',
                    { opacity: 0.15 },
                    {
                        opacity: 1,
                        ease: 'none',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: '.quote-section',
                            start: 'top 65%',
                            end: 'bottom 70%',
                            scrub: true,
                        },
                    }
                )

                // Garis pemisah tergambar saat masuk viewport
                gsap.utils.toArray('.rule').forEach((el) => {
                    gsap.from(el, {
                        scaleX: 0,
                        transformOrigin: 'left center',
                        duration: 1.1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 90%' },
                    })
                })

                // Kartu muncul pelan dari bawah
                gsap.utils.toArray('.reveal').forEach((el, i) => {
                    gsap.from(el, {
                        y: 40,
                        opacity: 0,
                        duration: 0.9,
                        delay: (i % 3) * 0.08,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 90%' },
                    })
                })
            }, root)

            return () => ctx.revert()
        })

        return () => mm.revert()
    }, [])

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: cssText }} />

            <div ref={root} className="min-h-screen bg-black text-white antialiased selection:bg-blue-500 selection:text-white" style={sans}>
                {/* NAV */}
                <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-xl">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="nav-item">
                            <p className="text-lg font-semibold tracking-[0.22em]">TBLONETWORKS</p>
                        </div>

                        <ul className="hidden items-center gap-10 text-[14px] text-white/70 md:flex">
                            {navLinks.slice(0, 3).map((l) => (
                                <li key={l.label} className="nav-item">
                                    <a href={l.href} className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="hidden md:block nav-item">
                            <a
                                href={navLinks[3].href}
                                className="rounded-full border border-white/25 px-5 py-2 text-[14px] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                            >
                                {navLinks[3].label}
                            </a>
                        </div>

                        {/* Hamburger (hanya mobile) */}
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

                    {/* Menu mobile */}
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
                </header>

                {/* HERO */}
                <section className="relative overflow-hidden">
                    {/* Latar luar angkasa: bintang + cakrawala biru bercahaya */}
                    <div className="stars pointer-events-none absolute inset-0 opacity-50" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(37,99,235,0.45),rgba(37,99,235,0.12)_45%,transparent_75%)]" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                    <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center justify-center px-6 pb-40 pt-36 text-center lg:py-20">
                        {/* Foto melayang: di sudut hero, di belakang teks */}
                        <div className="pointer-events-none absolute inset-0">
                            {floaters.map((f) => (
                                <div key={f.src} className={`float-card absolute ${f.pos}`}>
                                    <figure className="float-bob overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-1 shadow-[0_0_60px_-10px_rgba(59,130,246,0.45)] backdrop-blur">
                                        <img
                                            src={f.src}
                                            alt={f.alt}
                                            loading="eager"
                                            className="aspect-[4/5] w-full rounded-xl object-cover"
                                        />
                                        <figcaption className="mt-2 pb-1 text-center text-[11px] md:text-xs text-white/70 md:text-sm">
                                            {f.caption}
                                        </figcaption>
                                    </figure>
                                </div>
                            ))}
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
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
                                <a
                                    href="#join"
                                    className="rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-colors hover:bg-blue-500 hover:text-white"
                                >
                                    Get Started
                                </a>
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

                {/* PROBLEM */}
                <section className="quote-section mx-auto max-w-4xl px-6 py-32 md:py-48">
                    <p className="text-[clamp(1.75rem,4.2vw,3.25rem)] font-light leading-[1.2] tracking-[-0.025em]" style={serif}>
                        {quoteText.split(' ').map((w, i) => (
                            <span key={i} className="q-word inline-block pr-[0.28em]">
                                {w}
                            </span>
                        ))}
                    </p>
                    <p className="mt-10 text-2xl font-light text-blue-400" style={serif}>
                        We’re building the alternative.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section id="how" className="mx-auto max-w-6xl px-6 pb-32">
                    <div className="rule h-px w-full bg-gradient-to-r from-blue-500 via-blue-400/40 to-transparent" />
                    <h2 className="mx-auto mt-14 max-w-3xl text-center text-4xl font-light leading-tight tracking-[-0.03em] md:text-6xl" style={serif}>
                        Your wallet is your <em className="font-light not-italic text-blue-400">only</em> identity
                    </h2>
                    <ol className="mt-16 grid gap-5 md:grid-cols-3">
                        {steps.map((s) => (
                            <li
                                key={s.n}
                                className="reveal card-glow rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25 md:p-10"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-base text-blue-400">
                                    {s.n}
                                </span>
                                <h3 className="mt-16 text-2xl font-normal tracking-[-0.02em] md:text-3xl" style={serif}>
                                    {s.title}
                                </h3>
                                <p className="mt-4 text-base font-light leading-7 text-white/60" style={serif}>
                                    {s.body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* WHAT WE STORE */}
                <section className="mx-auto max-w-6xl px-6 pb-32">
                    <h2 className="mb-14 max-w-3xl text-4xl font-light leading-tight tracking-[-0.03em] md:text-6xl" style={serif}>
                        We store no data. We can’t sell anything. Nothing can leak.
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

                {/* COMMUNITY & DIGITAL RIGHTS */}
                <section id="community" className="mx-auto max-w-4xl px-6 pb-36">
                    <p className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-white" style={serif}>
                        We’re starting with active crypto users in Southeast Asia: people who already know wallets, care about privacy, and are fed up with data-hungry mainstream platforms.
                    </p>
                    <p className="mt-12 text-[clamp(1.5rem,3.2vw,2.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-white/50" style={serif}>
                        This isn’t only about technology. It’s about digital rights: anyone should be able to speak online without sacrificing their real identity.
                    </p>
                </section>

                {/* CTA */}
                <section id="join" className="px-6 pb-24">
                    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#04060d] px-6 py-20 text-center md:py-28">
                        <div className="stars pointer-events-none absolute inset-0 opacity-40" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,rgba(37,99,235,0.6),transparent_70%)]" />
                        <div className="relative">
                            <h2 className="mx-auto max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.035em]" style={serif}>
                                Your identity is your wallet. <em className="font-light not-italic text-blue-400">It’s the only thing the world needs to know.</em>
                            </h2>
                            <Link
                                href="https://wa.me/6289684053091?text=hey%2C%20bro,%20its%20very%20cool%20cool%20idea"
                                className="mt-10 inline-block rounded-full bg-white px-9 py-4 text-lg font-medium text-black transition-colors hover:bg-blue-500 hover:text-white"
                                style={sans}
                            >
                                Join Early Access
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
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