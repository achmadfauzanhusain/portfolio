const ZKChang = () => {
    const steps = [
        ["Protocol submits circuit", "The project team uploads a circuit (Circom, Noir, Halo2, Cairo) and sets the total reward."],
        ["Automated pre-audit", "Circomspect and Picus clear out easy bugs before human auditors begin."],
        ["Auditors compete", "Dozens of specialist auditors hunt for logic and soundness bugs that slip past the tools."],
        ["Judges evaluate", "Curated judges evaluate every finding, and rewards are paid out quickly."],
        ["Report published", "All findings are recorded and published as an audit report."],
    ]

    const moats = [
        ["Niche ZK", "Focused on ZK, which is still underserved by general audit platforms."],
        ["Reputation compounds", "Auditor track records are logged on the platform and can be taken anywhere."],
        ["Fair judging", "Evaluation is transparent and carried out by curated judges."],
    ]

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap');
            html { scroll-behavior: smooth; }

            :root {
                --bg: #05080f;
                --panel: #0a1220;
                --line: rgba(0, 255, 156, 0.22);
                --neon: #00ff9c;
                --cyan: #22d3ee;
                --alert: #ff3b5c;
            }

            .zk-grid {
                background-color: var(--bg);
                background-image:
                    linear-gradient(rgba(0,255,156,0.045) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,156,0.045) 1px, transparent 1px);
                background-size: 36px 36px;
            }

            .zk-scan::after {
                content: "";
                pointer-events: none;
                position: absolute;
                inset: 0;
                background: repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 3px);
            }

            /* Judul hero: glitch satu kali saat halaman dimuat + saat hover */
            .zk-glitch { position: relative; display: inline-block; color: var(--neon); text-shadow: 0 0 24px rgba(0,255,156,0.45); }
            .zk-glitch::before, .zk-glitch::after {
                content: attr(data-text);
                position: absolute; inset: 0;
                overflow: hidden;
                opacity: 0;
            }
            .zk-glitch::before { color: var(--cyan); clip-path: inset(0 0 55% 0); }
            .zk-glitch::after  { color: var(--alert); clip-path: inset(55% 0 0 0); }
            .zk-glitch { animation: zk-boot 0.9s steps(1) 1; }
            .zk-glitch::before, .zk-glitch::after { animation: zk-boot-layer 0.9s steps(1) 1; }
            .zk-glitch:hover::before { opacity: 0.9; transform: translate(-3px, 0); }
            .zk-glitch:hover::after  { opacity: 0.9; transform: translate(3px, 0); }

            @keyframes zk-boot {
                0% { opacity: 0; }
                20% { opacity: 1; transform: translateX(-4px); }
                40% { opacity: 0.4; transform: translateX(3px); }
                60% { opacity: 1; transform: translateX(0); }
                100% { opacity: 1; }
            }
            @keyframes zk-boot-layer {
                0% { opacity: 0; }
                20% { opacity: 0.9; transform: translate(-5px, 0); }
                40% { opacity: 0.9; transform: translate(5px, 0); }
                60% { opacity: 0; transform: translate(0, 0); }
                100% { opacity: 0; }
            }

            .zk-cursor {
                display: inline-block;
                width: 0.5em; height: 1em;
                margin-left: 0.15em;
                background: var(--neon);
                vertical-align: -0.12em;
                animation: zk-blink 1.1s steps(1) infinite;
            }
            @keyframes zk-blink { 50% { opacity: 0; } }

            /* Kartu dengan sudut bracket ala HUD */
            .zk-card {
                position: relative;
                background: linear-gradient(180deg, rgba(0,255,156,0.04), transparent 60%), var(--panel);
                border: 1px solid var(--line);
                transition: border-color .2s, box-shadow .2s;
            }
            .zk-card::before, .zk-card::after {
                content: ""; position: absolute; width: 14px; height: 14px;
                border: 2px solid var(--neon); opacity: .9;
            }
            .zk-card::before { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
            .zk-card::after  { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
            .zk-card:hover { border-color: var(--neon); box-shadow: 0 0 28px rgba(0,255,156,0.12); }

            .zk-link:focus-visible {
                outline: 2px solid var(--cyan);
                outline-offset: 3px;
            }

            @media (prefers-reduced-motion: reduce) {
                .zk-glitch, .zk-glitch::before, .zk-glitch::after, .zk-cursor { animation: none; }
                html { scroll-behavior: auto; }
            }`}</style>

            <main className="zk-grid min-h-screen text-[#d6ffe9] font-['JetBrains_Mono',monospace] tracking-wide lg:grid lg:grid-cols-[1fr_400px]">

                {/* ===== KOLOM KIRI ===== */}
                <div className="p-4 sm:p-8">

                    {/* Hero: jendela terminal + judul glitch */}
                    <section className="relative border border-[#00ff9c]/40 bg-[#070d18] shadow-[0_0_60px_rgba(0,255,156,0.08)]">
                        <div className="flex items-center gap-2 border-b border-[#00ff9c]/25 px-4 py-3 bg-[#0a1220]">
                            <span className="h-3 w-3 rounded-full bg-[#ff3b5c]" />
                            <span className="h-3 w-3 rounded-full bg-[#ffc233]" />
                            <span className="h-3 w-3 rounded-full bg-[#00ff9c]" />
                            <span className="ml-4 h-[2px] flex-1 bg-gradient-to-r from-[#00ff9c]/40 to-transparent" />
                        </div>

                        <div className="zk-scan relative px-6 sm:px-10 pt-8 sm:pt-12 pb-10">
                            <h1 className="font-['Chakra_Petch',sans-serif] font-bold leading-none text-[16vw] lg:text-[8rem] tracking-tight">
                                <span className="zk-glitch" data-text="ZKCHANG">ZKCHANG</span>
                                <span className="zk-cursor" aria-hidden="true" />
                            </h1>

                            <div className="mt-10 sm:mt-14 lg:ml-[20%] border-l-2 border-[#00ff9c] bg-[#05080f]/80 p-6 sm:p-10 flex gap-6">
                                <span className="hidden sm:block text-7xl font-light leading-none text-[#22d3ee] font-['Chakra_Petch',sans-serif]">↘</span>
                                <div>
                                    <p className="text-base sm:text-lg text-[#22d3ee]">Pitch deck · ZK audit marketplace</p>
                                    <h2 className="font-['Chakra_Petch',sans-serif] font-light text-3xl sm:text-5xl leading-[1.15] mt-3 text-white">
                                        Code4rena for Zero-Knowledge
                                    </h2>
                                    <p className="mt-6 text-base sm:text-lg text-[#d6ffe9]/65 max-w-xl leading-relaxed">
                                        Competitive audit contests for ZK circuits only, with automated pre-audit and portable auditor reputation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cara kerja */}
                    <section id="cara-kerja" className="mt-16 sm:mt-24">
                        <h2 className="font-['Chakra_Petch',sans-serif] font-light text-3xl sm:text-5xl mb-8 text-white">How it works</h2>
                        <ol className="border-t border-[#00ff9c]/30">
                            {steps.map(([title, desc], i) => (
                                <li key={title} className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[5rem_17rem_1fr] gap-x-4 gap-y-1 py-5 border-b border-[#00ff9c]/20 transition-colors hover:bg-[#00ff9c]/[0.04]">
                                    <span className="text-[#00ff9c] text-lg">[{i + 1}]</span>
                                    <span className="font-['Chakra_Petch',sans-serif] font-medium text-xl sm:text-2xl text-white">{title}</span>
                                    <span className="col-start-2 sm:col-start-auto text-base text-[#d6ffe9]/60 leading-relaxed">{desc}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Untuk siapa */}
                    <section id="untuk-siapa" className="mt-16 sm:mt-24">
                        <h2 className="font-['Chakra_Petch',sans-serif] font-light text-3xl sm:text-5xl mb-8 text-white">Who it's for</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="zk-card p-6 min-h-[14rem]">
                                <p className="font-['Chakra_Petch',sans-serif] font-medium text-2xl text-[#00ff9c]">Protocols</p>
                                <p className="mt-4 text-base text-[#d6ffe9]/65 leading-relaxed">
                                    Audits that are faster and cheaper than private firms, with many eyes reviewing in parallel.
                                </p>
                            </div>
                            <div className="zk-card p-6 min-h-[14rem]">
                                <p className="font-['Chakra_Petch',sans-serif] font-medium text-2xl text-[#22d3ee]">Auditors</p>
                                <p className="mt-4 text-base text-[#d6ffe9]/65 leading-relaxed">
                                    Big rewards, less competition than EVM, and a portable, recorded reputation.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Moat */}
                    <section id="moat" className="mt-16 sm:mt-24">
                        <h2 className="font-['Chakra_Petch',sans-serif] font-light text-3xl sm:text-5xl mb-8 text-white">Moat</h2>
                        <div className="grid md:grid-cols-3 gap-5">
                            {moats.map(([title, desc]) => (
                                <div key={title} className="zk-card p-6">
                                    <p className="font-['Chakra_Petch',sans-serif] font-medium text-2xl text-white">{title}</p>
                                    <p className="mt-4 text-base text-[#d6ffe9]/65 leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Satu kalimat */}
                    <section className="mt-16 sm:mt-24 relative border border-[#00ff9c]/50 bg-[#070d18] p-6 sm:p-12 shadow-[0_0_50px_rgba(0,255,156,0.1)]">
                        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#00ff9c] to-[#22d3ee]" />
                        <p className="font-['Chakra_Petch',sans-serif] font-light text-2xl sm:text-4xl leading-snug text-white">
                            Code4rena for Zero-Knowledge: competitive audit contests for ZK circuits only, with automated pre-audit and portable auditor reputation.
                        </p>
                    </section>
                </div>

                {/* ===== KOLOM KANAN (sidebar) ===== */}
                <aside className="border-t lg:border-t-0 lg:border-l border-[#00ff9c]/25 bg-[#070d18]/90 p-6 sm:p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex flex-col gap-10">
                    <nav className="flex flex-col gap-3 text-lg text-[#d6ffe9]/70">
                        <span className="text-[#00ff9c]">[+] ZKChang</span>
                        <a href="#cara-kerja" className="zk-link transition-colors hover:text-[#00ff9c]">↘ How it works</a>
                        <a href="#untuk-siapa" className="zk-link transition-colors hover:text-[#00ff9c]">↘ Who it's for</a>
                        <a href="#moat" className="zk-link transition-colors hover:text-[#00ff9c]">↘ Moat</a>
                    </nav>

                    <a href="https://fauzanhusain.com" target="_blank" rel="noopener noreferrer" className="zk-link relative block border border-[#00ff9c] bg-[#00ff9c]/[0.06] p-3 h-32 text-[#00ff9c] transition-all hover:bg-[#00ff9c] hover:text-[#05080f] hover:shadow-[0_0_32px_rgba(0,255,156,0.45)]">
                        <span className="font-['Chakra_Petch',sans-serif] font-medium text-xl">Developer: Fauzan Husain</span>
                        <span className="absolute right-3 bottom-2 text-6xl font-light font-['Chakra_Petch',sans-serif] leading-none">↘</span>
                    </a>

                    <p className="text-base leading-relaxed text-[#d6ffe9]/85">
                        ZKChang is a competitive audit marketplace for Zero-Knowledge projects. We connect protocols that need secure circuits with specialist auditors who hunt for soundness bugs and under-constrained circuits.
                    </p>
                </aside>
            </main>
        </>
    )
}

export default ZKChang