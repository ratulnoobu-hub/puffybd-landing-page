'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type BagContextValue = {
  count: number
  add: () => void
}

const BagContext = createContext<BagContextValue | null>(null)

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const add = useCallback(() => setCount((c) => c + 1), [])
  const value = useMemo(() => ({ count, add }), [count, add])
  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}

export function useBag() {
  const ctx = useContext(BagContext)
  if (!ctx) throw new Error('useBag must be used within BagProvider')
  return ctx
}
