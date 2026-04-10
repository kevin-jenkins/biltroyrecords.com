'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { PhysicalProduct } from '@/data/albums'

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function VinylIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="9" />
    </svg>
  )
}

interface ProductSectionProps {
  products: PhysicalProduct[]
}

export default function ProductSection({ products }: ProductSectionProps) {
  return (
    <div className="border-t border-border pt-8 flex flex-col gap-10">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
        Physical
      </h2>
      {products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: PhysicalProduct }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-col gap-5">

      {/* ── Gallery ───────────────────────────────────────────────── */}
      {/* Main image */}
      <div className="relative aspect-square w-full bg-[#0d0d0d] border border-border overflow-hidden">
        <Image
          src={product.images[activeIndex].src}
          alt={product.images[activeIndex].alt}
          fill
          className="object-contain transition-opacity duration-200"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {product.images.length > 1 && (
        <div className="flex gap-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square w-16 shrink-0 border overflow-hidden transition-all duration-150
                ${i === activeIndex
                  ? 'border-accent opacity-100'
                  : 'border-border opacity-40 hover:opacity-70'
                }`}
              aria-label={img.alt}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain bg-[#0d0d0d]"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Details ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">

        {/* Format label + title */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-muted text-[10px] uppercase tracking-widest font-semibold">
            <VinylIcon />
            <span>Vinyl</span>
          </div>
          <h3 className="text-xl font-black text-primary">{product.title}</h3>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-primary">{product.price}</span>
          <span className="text-xs text-muted uppercase tracking-wider">or more</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed">{product.description}</p>

        <div className="border-t border-border" />

        {/* Buy button */}
        <a
          href={product.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-primary text-background text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors duration-200 w-full"
        >
          <CartIcon />
          Buy on Bandcamp
        </a>

        <p className="text-[11px] text-muted-2 text-center">
          Sold &amp; fulfilled via Bandcamp. Ships within 3 days.
        </p>
      </div>
    </div>
  )
}
