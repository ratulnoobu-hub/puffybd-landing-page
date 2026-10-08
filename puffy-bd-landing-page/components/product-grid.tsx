'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { families, products } from '@/lib/products'
import { ProductCard } from './product-card'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export function ProductGrid() {
  const [active, setActive] = useState<(typeof families)[number]>('All')
  const visible = active === 'All' ? products : products.filter((p) => p.family === active)

  return (
    <section id="collection" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="The Collection"
          title={
            <>
              Six stories, <em className="text-gold-gradient">bottled.</em>
            </>
          }
          description="Each extrait de parfum is aged for eight weeks and finished by hand in our Dhaka atelier."
        />

        <div role="tablist" aria-label="Filter by scent family" className="flex flex-wrap gap-1 rounded-full border border-border p-1">
          {families.map((family) => (
            <button
              key={family}
              type="button"
              role="tab"
              aria-selected={active === family}
              onClick={() => setActive(family)}
              className={cn(
                'relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors',
                active === family ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {active === family && (
                <motion.span
                  layoutId="family-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{family}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
