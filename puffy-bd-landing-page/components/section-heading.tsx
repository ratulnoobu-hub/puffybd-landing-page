'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn('max-w-xl', align === 'center' && 'mx-auto text-center')}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-5xl font-light leading-[1.05] text-foreground text-balance md:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">{description}</p>}
    </motion.div>
  )
}
