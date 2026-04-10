import Image from 'next/image'
import Link from 'next/link'
import type { Album } from '@/data/albums'
import { formatReleaseDate } from '@/data/albums'

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link
      href={`/albums/${album.slug}`}
      className="group block bg-surface border border-border overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#333] hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
    >
      {/* Cover — full image, no cropping */}
      <div className="relative aspect-square w-full overflow-hidden bg-black">
        <Image
          src={album.coverImage}
          alt={`${album.title} by ${album.artist}`}
          fill
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info strip */}
      <div className="p-5 flex flex-col gap-2 border-t border-border">
        <span className="text-[10px] uppercase tracking-widest text-accent font-medium">
          {formatReleaseDate(album.releaseDate)}
        </span>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted font-semibold">
            {album.artist}
          </p>
          <h3 className="text-base font-bold text-primary leading-snug mt-1">
            {album.title}
          </h3>
        </div>
        <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-widest border border-border text-muted-2 px-2 py-0.5 w-fit">
          {album.type}
        </span>
      </div>
    </Link>
  )
}
