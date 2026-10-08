'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + (i % 3),
  delay: (i % 6) * 0.8,
  duration: 6 + (i % 5),
}))

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ scale: glowScale }}
          animate={{ opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-10%] top-1/2 size-[42rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.75_0.13_75/0.45),transparent_65%)] blur-3xl md:right-[5%]"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-40 top-10 size-[28rem] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.12_40/0.25),transparent_70%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,var(--background))]" />
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-primary"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show" style={{ y: textY, opacity: fade }}>
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-primary"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Maison de Parfum · Dhaka
          </motion.p>
          <motion.h1
            variants={item}
            className="font-serif text-6xl font-light leading-[0.95] tracking-tight text-foreground text-balance sm:text-7xl lg:text-8xl"
          >
            Wear the <em className="text-gold-gradient">glow</em> of the night.
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Hand-blended luxury fragrances of rare oud, Taif rose and golden amber — crafted in small
            batches to linger long after you leave the room.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#collection"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.8_0.11_80/0.8)]"
            >
              Explore collection
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </motion.a>
            <a
              href="#craft"
              className="rounded-full border border-border px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Our craft
            </a>
          </motion.div>
          <motion.dl variants={item} className="mt-14 grid max-w-sm grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              ['24h', 'Longevity'],
              ['40+', 'Rare notes'],
              ['12k', 'Patrons'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-3xl text-foreground">{value}</dd>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={{ y: bottleY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative aspect-[9/16] overflow-hidden rounded-[2.5rem] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_80%)]"
          >
            <Image
              src="/images/hero-bottle.png"
              alt="Puffy BD signature perfume bottle with amber liquid and a gold cap, glowing against a dark backdrop"
              fill
              priority
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute -left-4 bottom-24 rounded-2xl border border-border bg-background/60 px-5 py-4 backdrop-blur-xl sm:-left-12"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Signature</p>
            <p className="font-serif text-2xl text-foreground">Golden Hour</p>
            <p className="text-xs text-primary">Amber · Oud · Saffron</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
