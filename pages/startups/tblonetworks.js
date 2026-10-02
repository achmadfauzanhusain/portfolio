import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const serif = { fontFamily: "'Newsreader', 'Source Serif 4', Georgia, serif" }
const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" }

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
        caption: 'Fauzan, Founder',
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
    'Every day, billions of people hand over their names, photos, phone numbers, and locations just to post a photo or chat with a friend. That data gets sold, hacked, or used to watch them.'

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
            }, root)

            return () => ctx.revert()
        })

        return () => mm.revert()
    }, [])

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&display=swap");html{scroll-behavior:smooth;}`,
                }}
            />

            <div ref={root} className="min-h-screen bg-[#f6f5ee] text-[#1a1a17] antialiased">
                {/* NAV */}
                <header className="sticky top-0 z-20 bg-[#f6f5ee]/90 backdrop-blur">
                    <nav
                        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
                        style={sans}
                    >
                        <ul className="hidden items-center gap-10 text-[15px] md:flex">
                            {navLinks.slice(0, 2).map((l) => (
                                <li key={l.label} className="nav-item">
                                    <a href={l.href} className="hover:text-[#ff6600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff6600]">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div>
                            <p className="text-xl bg-[#ff6600] px-2 md:px-4 text-white font-bold">TBLONETWORKS</p>
                        </div>

                        <ul className="hidden items-center gap-10 text-[15px] md:flex">
                            {navLinks.slice(2).map((l) => (
                                <li key={l.label} className="nav-item">
                                    <a href={l.href} className="hover:text-[#ff6600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff6600]">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Hamburger (hanya mobile) */}
                        <button
                            type="button"
                            className="nav-item -mr-2 p-2 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff6600]"
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
                        <div id="mobile-menu" className="border-t border-[#1a1a17]/15 bg-[#f6f5ee] md:hidden" style={sans}>
                            <ul className="mx-auto flex max-w-7xl flex-col px-6 py-2">
                                {navLinks.map((l) => (
                                    <li key={l.label} className="border-b border-[#1a1a17]/10 last:border-b-0">
                                        <a
                                            href={l.href}
                                            onClick={() => setOpen(false)}
                                            className="block py-4 text-lg hover:text-[#ff6600]"
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
                <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col items-center justify-center px-6 pb-40 pt-36 text-center lg:py-20">
                    {/* Foto melayang: di sudut hero, di belakang teks */}
                    <div className="pointer-events-none absolute inset-0">
                        {floaters.map((f) => (
                            <div key={f.src} className={`float-card absolute ${f.pos}`}>
                                <figure className="float-bob bg-white p-1.5 pb-2 shadow-[0_14px_28px_-10px_rgba(26,26,23,0.35)] lg:p-2 lg:pb-3 lg:shadow-[0_20px_40px_-12px_rgba(26,26,23,0.35)]">
                                    <img
                                        src={f.src}
                                        alt={f.alt}
                                        loading="eager"
                                        className="aspect-[4/5] w-full object-cover"
                                    />
                                    <figcaption className="mt-2 text-center text-xs md:text-sm italic text-[#1a1a17]/70 lg:block" style={serif}>
                                        {f.caption}
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <h1
                            className="text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.02] tracking-[-0.02em]"
                            style={serif}
                        >
                            <span className="block overflow-hidden pb-[0.12em]">
                                <span className="hero-line block">Social media without</span>
                            </span>
                            <span className="block overflow-hidden pb-[0.18em]">
                                <span className="hero-line block">
                                    handing over your <em className="italic">identity</em>
                                    <sup className="ml-1 align-super text-[0.22em] font-normal not-italic">[1]</sup>
                                </span>
                            </span>
                        </h1>

                        <p className="hero-sub mt-6 max-w-2xl text-xl leading-9 text-[#1a1a17]/80 md:text-2xl" style={serif}>
                            All you need is an Ethereum wallet. Connect, sign one message, and you’re in, in 30 seconds.
                        </p>

                        <p
                            className="hero-footnote mt-8 max-w-xl text-left text-lg italic leading-8 md:text-xl"
                            style={serif}
                        >
                            [1] “Data is the new oil. It’s valuable, but if unrefined it cannot really be used.”
                            <span className="mt-2 block text-right">— Clive Humby</span>
                        </p>

                        <div className="hero-cta mt-12 flex flex-col items-center gap-4 sm:flex-row" style={sans}>
                            <a
                                href="#join"
                                className="rounded-full bg-[#ff6600] px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-black"
                            >
                                Get Started
                            </a>
                            <a href="#how" className="px-4 py-3.5 text-base underline underline-offset-4 hover:text-[#ff6600]">
                                See how it works
                            </a>
                        </div>
                    </div>
                </section>

                {/* PROBLEM */}
                <section className="quote-section mx-auto max-w-4xl px-6 py-32 md:py-48">
                    <p className="text-[clamp(1.75rem,4.2vw,3.25rem)] font-light leading-[1.22] tracking-[-0.01em]" style={serif}>
                        {quoteText.split(' ').map((w, i) => (
                            <span key={i} className="q-word inline-block pr-[0.28em]">
                                {w}
                            </span>
                        ))}
                    </p>
                    <p className="mt-10 text-2xl italic text-[#1a1a17]/70" style={serif}>
                        We’re building the alternative.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section id="how" className="mx-auto max-w-6xl px-6 pb-32">
                    <div className="rule h-px w-full bg-[#1a1a17]/80" />
                    <div className="grid gap-12 pt-14 md:grid-cols-[1fr_2fr] md:gap-20">
                        <h2 className="text-4xl font-light leading-tight md:text-5xl" style={serif}>
                            Your wallet is your <em className="italic">only</em> identity
                        </h2>
                        <ol className="space-y-12">
                            {steps.map((s) => (
                                <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-4">
                                    <span className="text-3xl text-[#ff6600]" style={serif}>
                                        {s.n}
                                    </span>
                                    <div>
                                        <h3 className="text-3xl" style={serif}>
                                            {s.title}
                                        </h3>
                                        <p className="mt-3 max-w-xl text-lg leading-8 text-[#1a1a17]/75" style={serif}>
                                            {s.body}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* WHAT WE STORE */}
                <section className="mx-auto max-w-6xl px-6 pb-32">
                    <h2 className="mb-12 max-w-2xl text-4xl font-light leading-tight md:text-5xl" style={serif}>
                        We store no data. We can’t sell anything. Nothing can leak.
                    </h2>
                    <ul>
                        {stored.map(([title, body]) => (
                            <li key={title}>
                                <div className="rule h-px w-full bg-[#1a1a17]/25" />
                                <div className="grid gap-2 py-8 md:grid-cols-[1fr_2fr] md:gap-20">
                                    <h3 className="text-2xl" style={serif}>
                                        {title}
                                    </h3>
                                    <p className="max-w-xl text-lg leading-8 text-[#1a1a17]/75" style={serif}>
                                        {body}
                                    </p>
                                </div>
                            </li>
                        ))}
                        <li>
                            <div className="rule h-px w-full bg-[#1a1a17]/25" />
                        </li>
                    </ul>
                </section>

                {/* COMMUNITY & DIGITAL RIGHTS */}
                <section className="mx-auto max-w-4xl px-6 pb-36">
                    <p className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-light leading-[1.3]" style={serif}>
                        We’re starting with active crypto users in Southeast Asia: people who already know wallets, care about privacy, and are fed up with data-hungry mainstream platforms.
                    </p>
                    <p className="mt-12 text-[clamp(1.5rem,3.2vw,2.4rem)] font-light italic leading-[1.3]" style={serif}>
                        This isn’t only about technology. It’s about digital rights: anyone should be able to speak online without sacrificing their real identity.
                    </p>
                </section>

                {/* CTA */}
                <section id="join" className="bg-[#ff6600] px-6 py-14 text-center text-white">
                    <h2 className="mx-auto max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1.05]" style={serif}>
                        Your identity is your wallet. <em className="italic">It’s the only thing the world needs to know.</em>
                    </h2>
                    <a
                        href="/startups/tblonetworks"
                        className="mt-8 inline-block rounded-full bg-black px-8 py-4 text-xl italic text-white transition-colors hover:bg-white hover:text-black"
                        style={serif}
                    >
                        Join Early Access
                    </a>
                </section>

                {/* FOOTER */}
                <footer className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-[#1a1a17]/70 md:flex-row md:justify-between" style={sans}>
                    <span>© {new Date().getFullYear()} Tblo Networks</span>
                    <span className="flex gap-6">
                        <a href="#" className="hover:text-[#ff6600]">Docs</a>
                        <a href="https://github.com/achmadfauzanhusain" className="hover:text-[#ff6600]">GitHub</a>
                        <a href="#" className="hover:text-[#ff6600]">X</a>
                        <a href="#" className="hover:text-[#ff6600]">Privacy</a>
                    </span>
                </footer>
            </div>
        </>
    )
}

export default TbloNetworks