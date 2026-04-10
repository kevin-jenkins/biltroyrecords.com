import Image from 'next/image'
import { albums } from '@/data/albums'
import AlbumCard from '@/components/AlbumCard'

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="w-full py-12 px-6 flex flex-col items-center text-center">
        <Image
          src="/images/image01.png"
          alt="Biltroy Records"
          width={260}
          height={120}
          className="object-contain invert opacity-95"
          priority
          loading="eager"
        />
      </section>

      {/* ── Releases ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted mb-10">
          Releases
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {albums.map((album, i) => (
            <div key={album.slug} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <AlbumCard album={album} priority={i === 0} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-10 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex justify-end">
          <p className="text-[11px] text-muted-2 tracking-wider">
            © {new Date().getFullYear()} Biltroy Records. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
