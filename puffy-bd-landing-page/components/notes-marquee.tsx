'use client'

import { motion } from 'framer-motion'

const notes = ['Agarwood', 'Taif Rose', 'Saffron', 'Ambergris', 'Night Jasmine', 'Vetiver', 'Bergamot', 'White Musk']

export function NotesMarquee() {
  const row = [...notes, ...notes]
  return (
    <section id="notes" aria-label="Signature notes" className="relative overflow-hidden border-y border-border py-6">
      <motion.ul
        className="flex w-max gap-12"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((note, i) => (
          <li
            key={`${note}-${i}`}
            aria-hidden={i >= notes.length}
            className="flex items-center gap-12 font-serif text-3xl italic text-muted-foreground"
          >
            {note}
            <span className="size-1.5 rotate-45 bg-primary" aria-hidden="true" />
          </li>
        ))}
      </motion.ul>
    </section>
  )
}
