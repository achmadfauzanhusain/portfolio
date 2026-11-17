'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Poppins, Cormorant_Garamond } from 'next/font/google'

const serif = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    display: 'swap',
})

const IMG1 = '/labreinassance/reinassance.jpeg'
const IMG2 = '/labreinassance/reinassance2.jpg'
const IMG3 = '/labreinassance/reinassance3.jpg'
const IMG4 = '/labreinassance/reinassance4.jpg'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Team', href: '#team' },
    { label: 'Craft', href: '#craft' },
    { label: 'Works', href: '#works' },
    { label: 'Careers', href: '#contact' },
]

// const trustedBy = ['Casa Aurelia', 'Bottega Nova', 'Studio Fiorenza', 'Arte Digitale', 'Lumen & Co']

const benefits = [
    {
        title: 'Design and craft',
        text: 'Interfaces composed with proportion, rhythm and restraint, so every screen feels deliberate.',
        image: IMG2,
        position: 'object-center',
    },
    {
        title: 'Engineering',
        text: 'Architectures that scale from the first sketch to millions of users without being rebuilt.',
        image: IMG3,
        position: 'object-center',
    },
    {
        title: 'Rapid delivery',
        text: 'Small senior teams that ship working software in weeks, not quarters.',
        image: IMG4,
        position: 'object-center',
    },
]

const partners = [
    'fauzanhusain', 'Ministry of Communication and Digital', 'Bandung Techno Park'
]

const founders = [
    {
        name: 'Fauzan Husain',
        role: 'Founder & CEO',
        photo: null,
        bio: 'Product strategist who has led software teams from first prototype to launch. Replace this text with your own background, education and previous companies.',
        link: 'https://fauzanhusain.com',
    }
]

const featured = ['Gazzetta Digitale', 'Il Codice', 'Tech Rinascita', 'The Atelier Post', 'Forum Mercatorum', 'Studio Magazine', 'Via Nova', 'Opus Weekly']

const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Craft', href: '#craft' },
    { label: 'Works', href: '#works' },
    { label: 'Team', href: '#team' },
    { label: 'Careers', href: '#contact' },
    { label: 'Blog', href: '#contact' },
]

const LogoMark = ({ className = '' }) => (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" />
        <circle cx="16" cy="16" r="10.5" />
        <path d="M16 3v26M3 16h26" strokeWidth="0.8" />
    </svg>
)

const SocialInstagram = () => (
    <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
)

const RenaissanceSoftware = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const solid = scrolled || menuOpen
    return (
        <div className={`${poppins.className} min-h-screen bg-white text-neutral-900 antialiased`}>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
                    solid ? 'border-b border-black/5 bg-white/95 text-neutral-900 backdrop-blur' : 'bg-transparent text-white'
                }`}
            >
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <Link href="#home" className="flex items-center gap-3" aria-label="Renaissance Software, home">
                        <LogoMark className="h-8 w-8" />
                        <span className={`${serif.className} text-2xl font-semibold tracking-wide`}>Renaissance Software</span>
                    </Link>

                    <nav className="hidden items-center gap-9 text-sm font-light lg:flex" aria-label="Main">
                        <Link href="#home" className="transition-opacity hover:opacity-70">Home</Link>

                        {navLinks.slice(1).map((item) => (
                            <Link key={item.label} href={item.href} className="transition-opacity hover:opacity-70">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="https://wa.me/6289684053091"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hidden rounded-full px-6 py-2.5 text-sm font-medium transition-colors sm:inline-block ${
                                solid ? 'bg-neutral-900 text-white hover:bg-neutral-700' : 'bg-white text-neutral-900 hover:bg-white/85'
                            }`}
                        >
                            Get in touch
                        </Link>
                        <button
                            type="button"
                            className="p-2 lg:hidden"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                                {menuOpen ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
                            </svg>
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="border-t border-black/5 bg-white px-6 pb-6 pt-2 text-neutral-900 lg:hidden">
                        {[navLinks[0], { label: 'Craft', href: '#craft' }, ...navLinks.slice(1)].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="block border-b border-black/5 py-3.5 text-base"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="https://wa.me/6289684053091"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                            className="mt-5 block w-full rounded-full bg-neutral-900 py-3 text-center text-sm font-medium text-white"
                        >
                            Get in touch
                        </Link>
                    </div>
                )}
            </header>

            <main>
                <section id="home" className="relative flex h-screen min-h-[680px] w-full flex-col justify-end overflow-hidden text-white">
                    <Image
                        src={IMG1}
                        alt="Renaissance painting, the visual theme of Renaissance Software"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/45" />

                    <div className="relative mx-auto w-full max-w-7xl px-6 pb-10">
                        <Link
                            href="#manifesto"
                            className="mb-8 inline-block rounded-full border border-white/40 bg-white/10 px-5 py-2 text-sm font-light backdrop-blur transition-colors hover:bg-white/20"
                        >
                            Read our manifesto at renaissance.software/manifesto
                        </Link>

                        <h1 className={`${serif.className} max-w-4xl text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-8xl`}>
                            Software crafted like a masterpiece
                        </h1>
                        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg">
                            Renaissance Software is a software house that brings the discipline of the Renaissance workshop, where art, science and engineering
                            worked as one, to the products you ship today.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="https://wa.me/6289684053091"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white px-7 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-white/85"
                            >
                                Start a project
                            </Link>
                            <Link
                                href="#works"
                                className="rounded-full border border-white/50 px-7 py-3 text-sm font-medium transition-colors hover:bg-white/15"
                            >
                                See our works
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-col gap-4 border-t border-white/25 pt-6 sm:flex-row sm:items-center sm:gap-10">
                            {/* <span className="shrink-0 text-sm font-light text-white/75">Trusted by</span> */}
                            <ul className="flex flex-wrap items-center gap-x-9 gap-y-3">
                                {/* {trustedBy.map((name) => (
                                    <li key={name} className={`${serif.className} text-xl font-semibold tracking-wide text-white/90 sm:text-2xl`}>
                                        {name}
                                    </li>
                                ))} */}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* Why Renaissance Software (3 images)                  */}
                {/* ---------------------------------------------------- */}
                <section id="craft" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
                    <div className="max-w-3xl">
                        <h2 className={`${serif.className} text-4xl font-medium leading-tight sm:text-6xl`}>
                            Why great products are built like workshops
                        </h2>
                        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
                            The bottegas of Florence put painters, sculptors and engineers under one roof, so each work carried many hands and one vision.
                            We build software the same way: strategy, design and engineering together, from the first sketch to the final release.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-10 md:grid-cols-3">
                        {benefits.map((item) => (
                            <article key={item.title}>
                                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                        className={`object-cover ${item.position}`}
                                    />
                                </div>
                                <h3 className={`${serif.className} mt-6 text-3xl font-semibold`}>{item.title}</h3>
                                <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-neutral-600">{item.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* Manifesto CTA + image strip                          */}
                {/* ---------------------------------------------------- */}
                <section id="manifesto" className="border-y border-black/10">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2">
                        <div>
                            <h2 className={`${serif.className} text-4xl font-medium leading-tight sm:text-6xl`}>
                                The future of software is craft
                            </h2>
                            <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
                                Learn how we plan, design and build digital products, and why we believe careful work outlasts fast work.
                            </p>
                            <p className="mt-2 text-base font-light text-neutral-600">Read the full manifesto at renaissance.software/manifesto</p>
                            <Link
                                href="#manifesto"
                                className="mt-8 inline-block rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
                            >
                                View our manifesto
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[IMG2, IMG3, IMG4, IMG1].map((src, i) => (
                                <div
                                    key={i}
                                    className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 ${i % 2 === 1 ? 'translate-y-8' : ''}`}
                                >
                                    <Image
                                        src={src}
                                        alt="Renaissance artwork"
                                        fill
                                        sizes="(min-width: 1024px) 25vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* Partners                                             */}
                {/* ---------------------------------------------------- */}
                <section id="works" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
                    <h2 className={`${serif.className} text-center text-4xl font-medium sm:text-5xl`}>Our clients and collaborators</h2>
                    <ul className="mt-14 grid grid-cols-2 border-l border-t border-black/10 sm:grid-cols-3 lg:grid-cols-4">
                        {partners.map((name) => (
                            <li
                                key={name}
                                className={`${serif.className} flex h-28 items-center justify-center border-b border-r border-black/10 px-4 text-center text-xl font-semibold tracking-wide text-neutral-700 sm:text-2xl`}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ---------------------------------------------------- */}
                {/* Founders                                             */}
                {/* ---------------------------------------------------- */}
                <section id="team" className="bg-neutral-50">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
                        <div className="max-w-3xl">
                            <h2 className={`${serif.className} text-4xl font-medium leading-tight sm:text-6xl`}>Meet our founders</h2>
                            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
                                We are a team of designers and engineers who treat every product as a work to be finished with care, and who want to raise
                                the standard of what a software house can deliver.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-6 md:grid-cols-3">
                            {founders.map((f, i) => (
                                <article key={i} className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
                                    {f.photo ? (
                                        <div className="relative h-28 w-28 overflow-hidden rounded-full">
                                            <Image src={f.photo} alt={f.name} fill sizes="112px" className="object-cover" />
                                        </div>
                                    ) : (
                                        <div
                                            className={`${serif.className} flex h-28 w-28 items-center justify-center rounded-full border border-black/15 text-5xl font-medium text-neutral-500`}
                                            aria-hidden="true"
                                        >
                                            {f.name.charAt(0)}
                                        </div>
                                    )}
                                    <h3 className={`${serif.className} mt-6 text-3xl font-semibold`}>{f.name}</h3>
                                    <p className="mt-1 text-sm font-medium text-neutral-500">{f.role}</p>
                                    <p className="mt-4 text-sm font-light leading-relaxed text-neutral-600">{f.bio}</p>
                                    <Link
                                        href={f.link}
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:opacity-70"
                                        aria-label={`${f.name} on LinkedIn`}
                                    >
                                        Portfolio
                                    </Link>
                                </article>
                            ))}
                        </div>

                        <Link href="#" className="mt-12 inline-block text-sm font-medium underline underline-offset-4 hover:opacity-70">
                            Meet the rest of the team
                        </Link>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* Featured in                                          */}
                {/* ---------------------------------------------------- */}
                <section className="mx-auto max-w-7xl px-6 py-24">
                    <h2 className={`${serif.className} text-center text-3xl font-medium sm:text-4xl`}>As featured in</h2>
                    <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        {featured.map((name) => (
                            <li key={name} className={`${serif.className} text-2xl font-semibold italic text-neutral-500 sm:text-3xl`}>
                                {name}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ---------------------------------------------------- */}
                {/* Final CTA                                            */}
                {/* ---------------------------------------------------- */}
                <section id="contact" className="relative isolate overflow-hidden text-white">
                    <Image src={IMG3} alt="" fill sizes="100vw" className="-z-20 object-cover" />
                    <div className="absolute inset-0 -z-10 bg-black/60" />
                    <div className="mx-auto max-w-4xl px-6 py-28 text-center sm:py-36">
                        <h2 className={`${serif.className} text-4xl font-medium leading-tight sm:text-6xl`}>
                            Build your next product with us
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg">
                            Looking for a software partner, or want to join the workshop? Reach out and tell us what you are making.
                        </p>
                        <Link
                            href="https://wa.me/6289684053091"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-white/85"
                        >
                            Get in touch
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="border-t border-black/10">
                <div className="mx-auto max-w-7xl px-6 py-14">
                    <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                        <div>
                            <Link href="#home" className="flex items-center gap-3">
                                <LogoMark className="h-8 w-8" />
                                <span className={`${serif.className} text-2xl font-semibold tracking-wide`}>Renaissance Software</span>
                            </Link>
                            <p className="mt-4 max-w-xs text-sm font-light text-neutral-600">A software house with the discipline of a Renaissance workshop.</p>
                        </div>

                        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm font-light sm:grid-cols-3">
                            {footerLinks.map((item) => (
                                <Link key={item.label} href={item.href} className="hover:opacity-60">
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-5">
                            <Link
                                href="https://instagram.com/renaissance.software"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Renaissance Software on Instagram"
                                className="hover:opacity-60"
                            >
                                <SocialInstagram />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col gap-2 border-t border-black/10 pt-6 text-xs font-light text-neutral-500 sm:flex-row sm:justify-between">
                        <p>&copy; {new Date().getFullYear()} Renaissance Software. All rights reserved.</p>
                        <p>We dont have office for now</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default RenaissanceSoftware