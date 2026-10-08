'use client'

import { motion } from 'framer-motion'
import { Droplets, Gem, Leaf } from 'lucide-react'
import { SectionHeading } from './section-heading'

const pillars = [
  {
    icon: Leaf,
    title: 'Ethically sourced',
    body: 'Agarwood from Sylhet, rose from Taif, saffron from Kashmir — traced to the grower.',
  },
  {
    icon: Droplets,
    title: 'Extrait concentration',
    body: 'Up to 30% perfume oil for a sillage that holds from dawn prayers to midnight.',
  },
  {
    icon: Gem,
    title: 'Hand-finished',
    body: 'Every bottle is filled, sealed and numbered by hand in our Dhaka atelier.',
  },
]

export function Craft() {
  return (
    <section id="craft" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        align="center"
        eyebrow="Our Craft"
        title={
          <>
            Slow perfumery, <em className="text-gold-gradient">patiently made.</em>
          </>
        }
      />
      <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="group bg-background p-10 transition-colors hover:bg-card"
          >
            <div className="flex size-12 items-center justify-center rounded-full border border-primary/30 text-primary transition-shadow group-hover:shadow-[0_0_30px_-4px_oklch(0.8_0.11_80/0.6)]">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-8 font-serif text-2xl text-foreground">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
