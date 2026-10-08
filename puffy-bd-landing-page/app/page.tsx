import { BagProvider } from '@/components/bag-provider'
import { Craft } from '@/components/craft'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { Newsletter } from '@/components/newsletter'
import { NotesMarquee } from '@/components/notes-marquee'
import { ProductGrid } from '@/components/product-grid'

export default function Page() {
  return (
    <BagProvider>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <NotesMarquee />
        <ProductGrid />
        <Craft />
        <Newsletter />
      </main>
      <Footer />
    </BagProvider>
  )
}
