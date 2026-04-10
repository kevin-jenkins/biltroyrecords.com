interface TrackListProps {
  tracks: string[]
}

export default function TrackList({ tracks }: TrackListProps) {
  return (
    <ol className="border border-border divide-y divide-border">
      {tracks.map((track, i) => (
        <li
          key={i}
          className="flex items-center gap-5 px-5 py-3.5 hover:bg-surface-2 transition-colors duration-150"
        >
          <span className="text-xs text-muted-2 font-mono w-6 text-right shrink-0 tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-sm text-primary">{track}</span>
        </li>
      ))}
    </ol>
  )
}
