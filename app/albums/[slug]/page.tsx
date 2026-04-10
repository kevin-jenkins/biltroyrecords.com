import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { albums, getAlbumBySlug, getSpotifyEmbedUrl, formatReleaseDate } from '@/data/albums'
import SpotifyPlayer from '@/components/SpotifyPlayer'
import TrackList from '@/components/TrackList'
import ExternalLinks from '@/components/ExternalLinks'
import ProductSection from '@/components/ProductSection'

// Required for static export — pre-generates every album route at build time
export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const album = getAlbumBySlug(slug)
  if (!album) return {}
  return {
    title: `${album.title} — ${album.artist}`,
    description: album.description,
    openGraph: { images: [album.coverImage] },
  }
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const album = getAlbumBySlug(slug)
  if (!album) notFound()

  const embedUrl = getSpotifyEmbedUrl(album)

  return (
    <main className="min-h-screen">
      {/* ── Back nav ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted hover:text-primary transition-colors duration-200"
        >
          <span>←</span>
          <span>All Releases</span>
        </Link>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* LEFT: cover + physical products */}
        <div className="flex flex-col gap-8">
          {/* Cover image — full artwork, no cropping */}
          <div className="relative aspect-square w-full border border-border bg-black">
            <Image
              src={album.coverImage}
              alt={`${album.title} by ${album.artist}`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Physical products sit directly below the cover */}
          {album.physicalProducts && album.physicalProducts.length > 0 && (
            <ProductSection products={album.physicalProducts} />
          )}
        </div>

        {/* RIGHT: metadata + streaming + tracklist */}
        <div className="flex flex-col gap-6 pt-2">

          {/* Type badge */}
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent border border-border px-2.5 py-1 w-fit">
            {album.type}
          </span>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">
              {album.artist}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
              {album.title}
            </h1>
          </div>

          <p className="text-[11px] uppercase tracking-widest text-muted-2">
            {formatReleaseDate(album.releaseDate)}
          </p>

          <p className="text-sm text-muted leading-relaxed">
            {album.description}
          </p>

          <ExternalLinks album={album} />

          {embedUrl && (
            <SpotifyPlayer embedUrl={embedUrl} title={album.title} />
          )}

          {/* Tracklist */}
          {album.tracks.length > 1 && (
            <div className="pt-2">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted mb-5">
                Tracklist
              </h2>
              <TrackList tracks={album.tracks} />
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-7xl mx-auto flex justify-end">
          <p className="text-[11px] text-muted-2 tracking-wider">
            © {new Date().getFullYear()} Biltroy Records. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
