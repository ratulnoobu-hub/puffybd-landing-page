export type Family = 'Woody' | 'Floral' | 'Oriental' | 'Fresh'

export type Product = {
  id: string
  name: string
  family: Family
  notes: string[]
  price: number
  size: string
  image: string
  badge?: string
}

export const families: Array<'All' | Family> = ['All', 'Woody', 'Floral', 'Oriental', 'Fresh']

export const products: Product[] = [
  {
    id: 'oud-noir',
    name: 'Oud Noir',
    family: 'Woody',
    notes: ['Agarwood', 'Leather', 'Black Pepper'],
    price: 6500,
    size: '100 ml',
    image: '/images/oud-noir-custom.jpg',
    badge: 'Bestseller',
  },
  {
    id: 'rose-saffron',
    name: 'Rose Saffron',
    family: 'Floral',
    notes: ['Taif Rose', 'Saffron', 'Oud'],
    price: 5800,
    size: '100 ml',
    image: '/images/rose-saffron.png',
  },
  {
    id: 'amber-musk',
    name: 'Amber Musk',
    family: 'Oriental',
    notes: ['Amber', 'White Musk', 'Vanilla'],
    price: 5200,
    size: '75 ml',
    image: '/images/amber-musk.png',
    badge: 'New',
  },
  {
    id: 'jasmine-night',
    name: 'Jasmine Night',
    family: 'Floral',
    notes: ['Night Jasmine', 'Tuberose', 'Sandalwood'],
    price: 4900,
    size: '75 ml',
    image: '/images/jasmine-night.png',
  },
  {
    id: 'vetiver-smoke',
    name: 'Vetiver Smoke',
    family: 'Woody',
    notes: ['Vetiver', 'Incense', 'Cedar'],
    price: 5500,
    size: '100 ml',
    image: '/images/vetiver-smoke.png',
  },
  {
    id: 'citrus-gold',
    name: 'Citrus Gold',
    family: 'Fresh',
    notes: ['Bergamot', 'Neroli', 'Ambergris'],
    price: 4500,
    size: '75 ml',
    image: '/images/citrus-gold.png',
    badge: 'Limited',
  },
]

export const formatPrice = (value: number) => `Tk ${value.toLocaleString('en-US')}`

const descriptions: Record<string, string> = {
  'oud-noir':
    'A brooding, smoky composition built on rare agarwood. Supple leather and a crack of black pepper give way to a deep, resinous trail that lingers long after dusk.',
  'rose-saffron':
    'Dew-soaked Taif rose meets golden threads of saffron, warmed by a whisper of oud. Romantic, regal and unmistakably Eastern.',
  'amber-musk':
    'A soft, glowing skin scent. Honeyed amber and creamy vanilla melt into clean white musk for an intimate warmth that wears close.',
  'jasmine-night':
    'Night-blooming jasmine and heady tuberose unfold over a bed of creamy sandalwood, an ode to warm evenings in a moonlit garden.',
  'vetiver-smoke':
    'Earthy vetiver root wrapped in curling incense smoke and dry cedar. Grounded, contemplative and quietly confident.',
  'citrus-gold':
    'Sparkling bergamot and sun-drenched neroli lifted by a salty ambergris drydown. Bright, effortless and made for golden hours.',
}

export function getAllProducts() {
  return products
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getProductDescription(id: string) {
  return descriptions[id] ?? ''
}
