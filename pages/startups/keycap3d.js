"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js"

const PINK = 0xff1493

const SIZE = 2
const HEIGHT = 1.45
const TAPER = 0.22

// --------------------------------------------------
// KEYCAP BODY: SOLID, CLOSED, OPAQUE
// --------------------------------------------------

function makeKeycapGeometry() {
    let geometry = new RoundedBoxGeometry(
        SIZE,
        HEIGHT,
        SIZE,
        12,
        0.2
    )

    geometry.deleteAttribute("normal")
    geometry = mergeVertices(geometry, 0.0001)

    const positions = geometry.attributes.position

    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = positions.getZ(i)

        const t = THREE.MathUtils.clamp(
            (y + HEIGHT / 2) / HEIGHT,
            0,
            1
        )

        const scale = 1 - TAPER * t

        positions.setXYZ(
            i,
            x * scale,
            y,
            z * scale
        )
    }

    geometry.computeVertexNormals()
    geometry.computeBoundingSphere()

    return geometry
}

// --------------------------------------------------
// SOFT SHADOW
// --------------------------------------------------

function makeShadowTexture() {
    const canvas = document.createElement("canvas")

    canvas.width = 128
    canvas.height = 128

    const context = canvas.getContext("2d")

    const gradient = context.createRadialGradient(
        64, 64, 0,
        64, 64, 64
    )

    gradient.addColorStop(0, "rgba(70, 0, 35, 0.35)")
    gradient.addColorStop(1, "rgba(70, 0, 35, 0)")

    context.fillStyle = gradient
    context.fillRect(0, 0, 128, 128)

    return new THREE.CanvasTexture(canvas)
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

const Keycap3D = () => {
    const wrap = useRef(null)

    useEffect(() => {
        const el = wrap.current
        if (!el) return

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

        let renderer

        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
            })
        } catch (error) {
            console.error("WebGL initialization failed:", error)
            return
        }

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, 2)
        )

        renderer.setClearColor(0x000000, 0)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.NoToneMapping

        renderer.domElement.style.display = "block"
        renderer.domElement.style.width = "100%"
        renderer.domElement.style.height = "100%"

        el.appendChild(renderer.domElement)

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            32,
            1,
            0.1,
            50
        )

        camera.position.set(0, 3.7, 7.5)
        camera.lookAt(0, 0, 0)

        // --------------------------------------------------
        // LIGHTING
        // --------------------------------------------------

        const ambient = new THREE.AmbientLight(0xffffff, 1.15)
        scene.add(ambient)

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
        keyLight.position.set(3, 6, 5)
        scene.add(keyLight)

        const fillLight = new THREE.DirectionalLight(0xff8fbd, 0.45)
        fillLight.position.set(-4, 2, -3)
        scene.add(fillLight)

        // --------------------------------------------------
        // KEYCAP RIG
        // --------------------------------------------------

        const rig = new THREE.Group()

        rig.rotation.order = "YXZ"
        scene.add(rig)

        // --------------------------------------------------
        // SOLID PINK BODY
        // --------------------------------------------------

        const capGeometry = makeKeycapGeometry()

        const capMaterial = new THREE.MeshStandardMaterial({
            color: PINK,
            roughness: 0.78,
            metalness: 0,
            transparent: false,
            opacity: 1,
            depthWrite: true,
            depthTest: true,
            side: THREE.FrontSide,
        })

        const cap = new THREE.Mesh(capGeometry, capMaterial)

        rig.add(cap)

        // --------------------------------------------------
        // SHADOW
        // --------------------------------------------------

        const shadowTexture = makeShadowTexture()

        const shadowMaterial = new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            opacity: 0.45,
            depthWrite: false,
        })

        const shadow = new THREE.Mesh(
            new THREE.PlaneGeometry(3.8, 3.8),
            shadowMaterial
        )

        shadow.rotation.x = -Math.PI / 2
        shadow.position.set(0, -0.95, 0)
        scene.add(shadow)

        // --------------------------------------------------
        // RESIZE
        // --------------------------------------------------

        const resize = () => {
            const width = el.clientWidth || 1
            const height = el.clientHeight || 1

            renderer.setSize(width, height, false)

            camera.aspect = width / height

            camera.position.z = width / height < 0.9 ? 9 : 7.5

            camera.updateProjectionMatrix()
        }

        resize()

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(el)

        // --------------------------------------------------
        // MOUSE INTERACTION
        // --------------------------------------------------

        const pointer = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
        }

        const onPointerMove = (event) => {
            pointer.targetX =
                (event.clientX / window.innerWidth) * 2 - 1

            pointer.targetY =
                (event.clientY / window.innerHeight) * 2 - 1
        }

        if (!reducedMotion) {
            window.addEventListener("pointermove", onPointerMove, {
                passive: true,
            })
        }

        // --------------------------------------------------
        // ANIMATION
        // --------------------------------------------------

        const clock = new THREE.Clock()

        let animationFrame = 0
        let visible = true

        const draw = (time) => {
            pointer.x += (pointer.targetX - pointer.x) * 0.055
            pointer.y += (pointer.targetY - pointer.y) * 0.055

            const scroll = Math.min(
                window.scrollY / window.innerHeight,
                1.2
            )

            rig.rotation.y =
                time * 0.22 + pointer.x * 0.32 + scroll * 0.5

            rig.rotation.x = -0.12 + pointer.y * 0.12

            rig.position.y = Math.sin(time * 1.1) * 0.045

            shadow.material.opacity =
                0.4 + Math.sin(time * 1.1) * 0.035

            renderer.render(scene, camera)
        }

        const tick = () => {
            animationFrame = requestAnimationFrame(tick)

            if (visible) {
                draw(clock.getElapsedTime())
            }
        }

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting
            }
        )

        intersectionObserver.observe(el)

        if (reducedMotion) {
            draw(0)
        } else {
            gsap.fromTo(
                rig.scale,
                { x: 0.001, y: 0.001, z: 0.001 },
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1.2,
                    delay: 0.2,
                    ease: "back.out(1.5)",
                }
            )

            tick()
        }

        // --------------------------------------------------
        // CLEANUP
        // --------------------------------------------------

        return () => {
            cancelAnimationFrame(animationFrame)

            gsap.killTweensOf(rig.scale)

            resizeObserver.disconnect()
            intersectionObserver.disconnect()

            window.removeEventListener("pointermove", onPointerMove)

            capGeometry.dispose()
            capMaterial.dispose()

            shadow.geometry.dispose()
            shadowMaterial.dispose()
            shadowTexture.dispose()

            renderer.dispose()

            if (renderer.domElement.parentNode === el) {
                el.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div
            ref={wrap}
            role="img"
            aria-label="Solid pink keycap"
            className="h-full w-full"
        />
    )
}

export default Keycap3D