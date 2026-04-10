'use client'

interface SpotifyPlayerProps {
  embedUrl: string
  title: string
}

export default function SpotifyPlayer({ embedUrl, title }: SpotifyPlayerProps) {
  return (
    <div className="w-full overflow-hidden border border-border rounded-sm">
      <iframe
        src={embedUrl}
        title={`Spotify — ${title}`}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block"
      />
    </div>
  )
}
