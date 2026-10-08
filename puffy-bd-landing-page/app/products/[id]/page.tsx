import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { AddToBagButton } from '@/components/add-to-bag-button'
import { BagProvider } from '@/components/bag-provider'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { formatPrice, getAllProducts, getProductById, getProductDescription } from '@/lib/products'

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ id: product.id }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return { title: 'Not found | Puffy BD' }
  return {
    title: `${product.name} | Puffy BD`,
    description: getProductDescription(product.id),
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <BagProvider>
      <Navbar />
      <main className="min-h-screen overflow-x-clip pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/#collection"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to collection
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-card">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={`${product.name} perfume bottle`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {product.badge && (
                <span className="absolute left-5 top-5 rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-primary backdrop-blur-md">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">{product.family}</p>
              <h1 className="mb-6 font-serif text-5xl leading-none text-foreground md:text-6xl">{product.name}</h1>
              <p className="mb-8 font-serif text-2xl italic text-foreground/80">
                {formatPrice(product.price)} <span className="text-base not-italic text-muted-foreground">/ {product.size}</span>
              </p>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{getProductDescription(product.id)}</p>

              <div className="mb-10">
                <h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Key notes</h2>
                <ul className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <li key={note} className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <AddToBagButton />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </BagProvider>
  )
}
