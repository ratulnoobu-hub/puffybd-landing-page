const columns = [
  { title: 'Shop', links: ['All fragrances', 'Gift sets', 'Discovery kit', 'Attars'] },
  { title: 'House', links: ['Our craft', 'Journal', 'Stockists', 'Careers'] },
  { title: 'Care', links: ['Shipping', 'Returns', 'Contact', 'FAQ'] },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl text-gold-gradient">Puffy</span>
            <span className="text-[10px] font-medium tracking-[0.4em] text-muted-foreground">BD</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Luxury fragrances hand-blended in Dhaka. Free delivery across Bangladesh on orders above Tk 3,000.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-foreground">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#top" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground">
          {'© 2026 Puffy BD. All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}
