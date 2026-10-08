'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, Heart, Plus } from 'lucide-react'
import { formatPrice, type Product } from '@/lib/products'
import { useBag } from './bag-provider'
import { cn } from '@/lib/utils'

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useBag()
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })
  const glowX = useTransform(mx, (v) => `${v * 100}%`)
  const glowY = useTransform(my, (v) => `${v * 100}%`)
  const glow = useMotionTemplate`radial-gradient(400px circle at ${glowX} ${glowY}, oklch(0.8 0.11 80 / 0.18), transparent 60%)`

  function handleMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  function handleAdd() {
    add()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card"
    >
      <Link
        href={`/products/${product.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 z-[15]"
      />
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={`${product.name} perfume bottle`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {product.badge && (
          <span className="absolute left-4 top-4 z-20 rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-primary backdrop-blur-md">
            {product.badge}
          </span>
        )}

        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={() => setLiked((l) => !l)}
          aria-pressed={liked}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur-md transition-colors hover:border-primary/50"
        >
          <Heart
            className={cn('size-4 transition-colors', liked ? 'fill-primary text-primary' : 'text-foreground')}
            aria-hidden="true"
          />
        </motion.button>
      </div>

      <div className="pointer-events-none relative z-20 -mt-10 p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{product.family}</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="font-serif text-3xl leading-none text-foreground">
            <Link
              href={`/products/${product.id}`}
              className="pointer-events-auto rounded-sm transition-colors hover:text-primary group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {product.name}
            </Link>
          </h3>
          <p className="font-serif text-xl text-foreground">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {product.notes.join(' · ')} <span className="text-muted-foreground/60">— {product.size}</span>
        </p>

        <motion.button
          type="button"
          onClick={handleAdd}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'pointer-events-auto mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors',
            added
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? 'added' : 'add'}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {added ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
              {added ? 'Added to bag' : 'Add to bag'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.article>
  )
}
