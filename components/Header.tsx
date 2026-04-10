import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/image01.png"
            alt="Biltroy Records"
            width={80}
            height={36}
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity invert"
            style={{ height: '28px', width: 'auto' }}
          />
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-muted hidden sm:block">
          independent label // Chapel Hill, NC
        </span>
      </div>
    </header>
  )
}
