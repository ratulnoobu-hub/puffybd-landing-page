'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ShoppingBag } from 'lucide-react'
import { useBag } from './bag-provider'
import { cn } from '@/lib/utils'

export function AddToBagButton() {
  const { add } = useBag()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <motion.button
      type="button"
      onClick={handleAdd}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold uppercase tracking-[0.25em] transition-colors',
        'bg-primary text-primary-foreground shadow-[0_0_40px_-10px] shadow-primary/60 hover:bg-primary/90',
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
          {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingBag className="size-4" aria-hidden="true" />}
          {added ? 'Added to bag' : 'Add to bag'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
