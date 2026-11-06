import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

/* ---------- Model 3D keycap (bisa diputar) ---------- */
// const KeycapViewer = () => {
//     const mountRef = useRef(null)

//     useEffect(() => {
//         const mount = mountRef.current
//         if (!mount) return

//         const scene = new THREE.Scene()

//         const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
//         camera.position.set(0, 3.6, 5.2)

//         const renderer = new THREE.WebGLRenderer({
//             antialias: true,
//             alpha: true
//         })

//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//         renderer.localClippingEnabled = true
//         renderer.outputColorSpace = THREE.SRGBColorSpace
//         renderer.toneMapping = THREE.ACESFilmicToneMapping
//         renderer.toneMappingExposure = 1.15

//         mount.appendChild(renderer.domElement)

//         // =====================================
//         // LIGHTING
//         // =====================================

//         scene.add(new THREE.AmbientLight(0xffffff, 0.5))

//         scene.add(
//             new THREE.HemisphereLight(
//                 0xffffff,
//                 0xb0b0b0,
//                 1.2
//             )
//         )

//         const key = new THREE.DirectionalLight(0xffffff, 2.2)
//         key.position.set(3, 5, 6)
//         scene.add(key)

//         const fill = new THREE.DirectionalLight(0xffffff, 0.8)
//         fill.position.set(-4, 3, 5)
//         scene.add(fill)

//         const rim = new THREE.DirectionalLight(0xe5eaff, 1.4)
//         rim.position.set(-5, 2, -4)
//         scene.add(rim)

//         // =====================================
//         // MATERIALS
//         // =====================================

//         const mat = (color, roughness = 0.5) =>
//             new THREE.MeshStandardMaterial({
//                 color,
//                 roughness,
//                 metalness: 0,
//                 transparent: false,
//                 opacity: 1
//             })

//         const M = {
//             skin: mat(0xf6d9c4, 0.6),
//             hair: mat(0x3d3f96, 0.55),
//             hairLight: mat(0x6b6fd1, 0.55),
//             eye: mat(0xf2b441, 0.3),
//             pupil: mat(0x3a2410, 0.3),
//             white: mat(0xffffff, 0.3),
//             ink: mat(0x16161c, 0.6),
//             mouth: mat(0xd9604f, 0.5),
//             blush: mat(0xf4a0a0, 0.7),
//             star: mat(0xffd84a, 0.35),

//             keyBody: new THREE.MeshStandardMaterial({
//                 color: 0xffffff,
//                 roughness: 0.65,
//                 metalness: 0,
//                 transparent: false,
//                 opacity: 1,
//                 side: THREE.DoubleSide
//             }),

//             keyRim: new THREE.MeshStandardMaterial({
//                 color: 0xffffff,
//                 roughness: 0.65,
//                 metalness: 0,
//                 transparent: false,
//                 opacity: 1,
//                 side: THREE.DoubleSide
//             })
//         }

//         // =====================================
//         // CLIPPING
//         // =====================================

//         const BASE_TOP = -0.55
//         const HEAD_FRONT = 0.9
//         const REVEAL = 0.45

//         const clipPlane = new THREE.Plane(
//             new THREE.Vector3(0, 1, 0),
//             -(BASE_TOP - 0.01)
//         )

//         Object.entries(M).forEach(([name, material]) => {
//             if (name === "keyBody" || name === "keyRim") return
//             material.clippingPlanes = [clipPlane]
//         })

//         // =====================================
//         // HELPERS
//         // =====================================

//         const geometries = []

//         const add = (
//             parent,
//             geo,
//             material,
//             pos = [0, 0, 0],
//             scale = [1, 1, 1],
//             rot = [0, 0, 0]
//         ) => {
//             geometries.push(geo)

//             const mesh = new THREE.Mesh(geo, material)

//             mesh.position.set(...pos)
//             mesh.scale.set(...scale)
//             mesh.rotation.set(...rot)

//             parent.add(mesh)

//             return mesh
//         }

//         const sphere = (r = 1, w = 32, h = 24) =>
//             new THREE.SphereGeometry(r, w, h)

//         const keycap = new THREE.Group()
//         scene.add(keycap)

//         // =====================================
//         // TALLER TAPERED KEYCAP
//         // =====================================

//         // Increased from 0.72 to 0.82
//         const BASE_H = 0.82

//         const roundedRectPoints = (
//             hw,
//             hd,
//             radius,
//             segments = 12
//         ) => {
//             const points = []

//             const corners = [
//                 { x: hw - radius, z: -hd + radius, start: -90 },
//                 { x: hw - radius, z: hd - radius, start: 0 },
//                 { x: -hw + radius, z: hd - radius, start: 90 },
//                 { x: -hw + radius, z: -hd + radius, start: 180 }
//             ]

//             corners.forEach((corner) => {
//                 for (let i = 0; i <= segments; i++) {
//                     const angle =
//                         (corner.start + (i / segments) * 90) *
//                         Math.PI / 180

//                     points.push([
//                         corner.x + Math.cos(angle) * radius,
//                         corner.z + Math.sin(angle) * radius
//                     ])
//                 }
//             })

//             return points
//         }

//         // Bottom wider, top smaller
//         // All heights adjusted to match BASE_H = 0.82
//         const rings = [
//             {
//                 y: 0,
//                 hw: 1.00,
//                 hd: 0.95,
//                 r: 0.28
//             },
//             {
//                 y: 0.03,
//                 hw: 1.035,
//                 hd: 0.985,
//                 r: 0.30
//             },
//             {
//                 y: 0.08,
//                 hw: 1.04,
//                 hd: 0.99,
//                 r: 0.30
//             },
//             {
//                 y: 0.69,
//                 hw: 0.91,
//                 hd: 0.86,
//                 r: 0.25
//             },
//             {
//                 y: 0.77,
//                 hw: 0.89,
//                 hd: 0.84,
//                 r: 0.24
//             },
//             {
//                 y: 0.82,
//                 hw: 0.86,
//                 hd: 0.81,
//                 r: 0.23
//             }
//         ]

//         const keycapGeo = new THREE.BufferGeometry()

//         const vertices = []
//         const indices = []

//         const perimeterCount = 13 * 4

//         // Create geometry rings
//         rings.forEach((ring) => {
//             const points = roundedRectPoints(
//                 ring.hw,
//                 ring.hd,
//                 ring.r,
//                 12
//             )

//             points.forEach(([x, z]) => {
//                 vertices.push(x, ring.y, z)
//             })
//         })

//         // Side walls
//         for (let r = 0; r < rings.length - 1; r++) {
//             const current = r * perimeterCount
//             const next = (r + 1) * perimeterCount

//             for (let i = 0; i < perimeterCount; i++) {
//                 const j = (i + 1) % perimeterCount

//                 indices.push(
//                     current + i,
//                     next + i,
//                     current + j
//                 )

//                 indices.push(
//                     current + j,
//                     next + i,
//                     next + j
//                 )
//             }
//         }

//         // Bottom face
//         const bottomCenter = vertices.length / 3
//         vertices.push(0, 0, 0)

//         for (let i = 0; i < perimeterCount; i++) {
//             const j = (i + 1) % perimeterCount

//             indices.push(
//                 bottomCenter,
//                 i,
//                 j
//             )
//         }

//         // Top face
//         const topCenter = vertices.length / 3
//         vertices.push(0, BASE_H, 0)

//         const topStart = (rings.length - 1) * perimeterCount

//         for (let i = 0; i < perimeterCount; i++) {
//             const j = (i + 1) % perimeterCount

//             indices.push(
//                 topCenter,
//                 topStart + j,
//                 topStart + i
//             )
//         }

//         keycapGeo.setAttribute(
//             "position",
//             new THREE.Float32BufferAttribute(vertices, 3)
//         )

//         keycapGeo.setIndex(indices)

//         keycapGeo.computeVertexNormals()
//         keycapGeo.normalizeNormals()
//         keycapGeo.computeBoundingBox()
//         keycapGeo.computeBoundingSphere()

//         M.keyBody.flatShading = false
//         M.keyBody.needsUpdate = true

//         add(
//             keycap,
//             keycapGeo,
//             M.keyBody,
//             [0, BASE_TOP - BASE_H, -0.14]
//         )

//         // =====================================
//         // CHARACTER
//         // =====================================

//         const head = new THREE.Group()

//         head.rotation.x = -Math.PI / 2
//         head.position.y = BASE_TOP + REVEAL - HEAD_FRONT

//         keycap.add(head)

//         // Face
//         add(
//             head,
//             sphere(1, 48, 32),
//             M.skin,
//             [0, 0, 0],
//             [1.0, 0.92, 0.9]
//         )

//         // Hair
//         add(
//             head,
//             sphere(1.1, 48, 32),
//             M.hair,
//             [0, 0.1, -0.18],
//             [1.05, 0.98, 0.95]
//         )

//         add(
//             head,
//             new THREE.SphereGeometry(
//                 1.06,
//                 48,
//                 24,
//                 0,
//                 Math.PI * 2,
//                 0,
//                 Math.PI * 0.42
//             ),
//             M.hair,
//             [0, 0.12, 0.02],
//             [1.04, 1.0, 0.96]
//         )

//         // Bangs
//         ;[-0.6, -0.3, 0, 0.3, 0.6].forEach((x, i) => {
//             add(
//                 head,
//                 sphere(1, 20, 16),
//                 i % 2 ? M.hairLight : M.hair,
//                 [
//                     x,
//                     0.42 - Math.abs(x) * 0.15,
//                     0.82 - Math.abs(x) * 0.25
//                 ],
//                 [0.17, 0.42, 0.1],
//                 [0, x * 0.5, -x * 0.12]
//             )
//         })

//         // Side hair
//         ;[-1, 1].forEach((side) => {
//             add(
//                 head,
//                 sphere(1, 20, 16),
//                 M.hair,
//                 [side * 0.98, -0.18, 0.3],
//                 [0.2, 0.62, 0.2],
//                 [0, side * 0.5, side * -0.08]
//             )

//             add(
//                 head,
//                 sphere(1, 16, 12),
//                 M.hairLight,
//                 [side * 1.0, -0.62, 0.3],
//                 [0.12, 0.2, 0.12]
//             )
//         })

//         // Star hair clip
//         add(
//             head,
//             new THREE.OctahedronGeometry(0.16, 0),
//             M.star,
//             [0.62, 0.62, 0.78],
//             [1, 1, 0.5],
//             [0.3, 0.3, 0.5]
//         )

//         // Eyes and eyebrows
//         ;[-1, 1].forEach((side) => {
//             const x = side * 0.38

//             const eye = new THREE.Group()

//             eye.position.set(x, -0.1, 0.8)
//             eye.rotation.y = side * 0.32

//             head.add(eye)

//             add(
//                 eye,
//                 sphere(1, 24, 16),
//                 M.eye,
//                 [0, 0, 0],
//                 [0.2, 0.25, 0.06]
//             )

//             add(
//                 eye,
//                 sphere(1, 20, 14),
//                 M.pupil,
//                 [0, -0.02, 0.04],
//                 [0.11, 0.17, 0.04]
//             )

//             add(
//                 eye,
//                 sphere(1, 12, 10),
//                 M.white,
//                 [0.05, 0.07, 0.07],
//                 [0.04, 0.05, 0.02]
//             )

//             add(
//                 head,
//                 new THREE.CylinderGeometry(
//                     0.015,
//                     0.015,
//                     0.34,
//                     6
//                 ),
//                 M.ink,
//                 [x * 1.1, 0.24, 0.82],
//                 [1, 1, 1],
//                 [0, side * 0.35, Math.PI / 2 - side * 0.1]
//             )
//         })

//         // Mouth
//         add(
//             head,
//             sphere(1, 20, 14),
//             M.mouth,
//             [0, -0.48, 0.76],
//             [0.12, 0.05, 0.03]
//         )

//         // Blush
//         ;[-1, 1].forEach((side) => {
//             add(
//                 head,
//                 sphere(1, 16, 12),
//                 M.blush,
//                 [side * 0.6, -0.34, 0.68],
//                 [0.13, 0.08, 0.03],
//                 [0, side * 0.6, 0]
//             )
//         })

//         // =====================================
//         // ORBIT CONTROLS
//         // =====================================

//         const controls = new OrbitControls(
//             camera,
//             renderer.domElement
//         )

//         controls.enableDamping = true
//         controls.dampingFactor = 0.08
//         controls.enableZoom = false
//         controls.enablePan = false

//         controls.minPolarAngle = Math.PI * 0.1
//         controls.maxPolarAngle = Math.PI * 0.6

//         controls.autoRotate = true
//         controls.autoRotateSpeed = 2.2

//         controls.target.set(0, -0.65, 0)

//         renderer.domElement.style.touchAction = "pan-y"
//         renderer.domElement.style.cursor = "grab"

//         let resumeTimer

//         const onStart = () => {
//             controls.autoRotate = false
//             clearTimeout(resumeTimer)

//             renderer.domElement.style.cursor = "grabbing"
//         }

//         const onEnd = () => {
//             renderer.domElement.style.cursor = "grab"

//             resumeTimer = setTimeout(() => {
//                 controls.autoRotate = true
//             }, 2500)
//         }

//         controls.addEventListener("start", onStart)
//         controls.addEventListener("end", onEnd)

//         const reduceMotion = window.matchMedia(
//             "(prefers-reduced-motion: reduce)"
//         ).matches

//         if (reduceMotion) {
//             controls.autoRotate = false
//         }

//         // =====================================
//         // RESPONSIVE
//         // =====================================

//         const resize = () => {
//             const w = mount.clientWidth || 1
//             const h = mount.clientHeight || 1

//             renderer.setSize(w, h, false)

//             renderer.domElement.style.width = "100%"
//             renderer.domElement.style.height = "100%"

//             camera.aspect = w / h
//             camera.updateProjectionMatrix()
//         }

//         resize()

//         const ro = new ResizeObserver(resize)
//         ro.observe(mount)

//         // =====================================
//         // ANIMATION
//         // =====================================

//         let raf

//         const clock = new THREE.Clock()

//         const tick = () => {
//             if (!reduceMotion) {
//                 keycap.position.y =
//                     Math.sin(clock.getElapsedTime() * 1.4) * 0.05
//             }

//             clipPlane.constant = -(
//                 BASE_TOP - 0.01 + keycap.position.y
//             )

//             controls.update()
//             renderer.render(scene, camera)

//             raf = requestAnimationFrame(tick)
//         }

//         tick()

//         // =====================================
//         // CLEANUP
//         // =====================================

//         return () => {
//             cancelAnimationFrame(raf)
//             clearTimeout(resumeTimer)

//             ro.disconnect()

//             controls.removeEventListener("start", onStart)
//             controls.removeEventListener("end", onEnd)

//             controls.dispose()

//             geometries.forEach((geo) => geo.dispose())

//             Object.values(M).forEach((material) => {
//                 material.dispose()
//             })

//             renderer.dispose()

//             if (renderer.domElement.parentNode === mount) {
//                 mount.removeChild(renderer.domElement)
//             }
//         }
//     }, [])

//     return (
//         <div
//             ref={mountRef}
//             className="h-full w-full"
//             role="img"
//             aria-label="Solid white taller tapered artisan keycap with character"
//         />
//     )
// }

const MitsuroKanroji = () => {
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
                    All keycaps
                </Link>

                <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-2 md:gap-12">
                    <div data-media className="aspect-square overflow-hidden rounded-2xl border border-white/25 bg-white/10">
                        <Image className="w-full h-full object-cover" width={300} height={300} src="/collections/keycaps/keycap1.jpeg" />
                    </div>

                    <div className="flex flex-col">
                        <div data-info className="flex gap-1 md:gap-2">
                            <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-[#E6EFFD]">Rp 225.000</span>
                            <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-[#E6EFFD]">$ 12.5</span>
                        </div>

                        <h1 data-info className="font-serif-display mt-5 text-4xl font-normal leading-tight sm:text-5xl md:text-6xl">
                            Mitsuro Kanroji
                        </h1>
                        <p data-info className="mt-2 text-base text-[#D4E4FC] md:text-lg">Demon Slayer</p>

                        <dl data-info className="mt-8 divide-y divide-white/15 rounded-2xl border border-white/25 bg-white/10 px-6 text-[15px] md:text-base">
                            <div className="flex items-baseline justify-between gap-4 py-4">
                                <dt className="text-[#A9C8F6]">Creator</dt>
                                <dd className="text-right text-[#D4E4FC]">LOBO</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-4 py-4">
                                <dt className="text-[#A9C8F6]">Store</dt>
                                <dd className="text-right text-[#D4E4FC]">Thocky Supply</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-4 py-4">
                                <dt className="text-[#A9C8F6]">Buy Date</dt>
                                <dd className="text-right text-[#D4E4FC]">6 November 2025</dd>
                            </div>
                        </dl>

                        <p data-info className="mt-8 max-w-prose text-[15px] leading-relaxed text-[#D4E4FC] md:text-base">
                            my first join artisan keycap community in real life by buying ths keycaps
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MitsuroKanroji