'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <section id="newsletter" className="relative px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-primary/20 bg-card px-6 py-20 text-center md:px-16"
      >
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute left-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent,oklch(0.8_0.11_80/0.18),transparent_30%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        <div className="relative">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">The Inner Circle</p>
          <h2 className="mx-auto mt-4 max-w-xl font-serif text-5xl font-light leading-[1.05] text-foreground text-balance md:text-6xl">
            First to know, <em className="text-gold-gradient">first to wear.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground text-pretty">
            Private launches, limited-edition attars and 10% off your first order — delivered quietly to your
            inbox.
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                role="status"
                className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-6 py-4 text-sm text-foreground"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                Welcome to the circle. Check your inbox.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: status === 'error' ? [0, -8, 8, -4, 4, 0] : 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="mx-auto mt-10 max-w-md"
              >
                <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 p-1.5 backdrop-blur-md transition-colors focus-within:border-primary/60 focus-within:shadow-[0_0_40px_-10px_oklch(0.8_0.11_80/0.6)]">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    placeholder="you@example.com"
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                    className="min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground"
                  >
                    Join
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </motion.button>
                </div>
                {status === 'error' && (
                  <p id="newsletter-error" role="alert" className="mt-3 text-sm text-destructive">
                    Please enter a valid email address.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
