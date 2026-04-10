export type ReleaseType = 'LP' | 'EP' | 'Single' | 'Compilation'

export interface ProductImage {
  src: string
  alt: string
}

export interface PhysicalProduct {
  title:       string
  description: string
  price:       string   // e.g. "$25 USD"
  buyUrl:      string
  images:      ProductImage[]
}

export interface Album {
  slug:           string
  artist:         string
  title:          string
  type:           ReleaseType
  releaseDate:    string       // ISO 8601: YYYY-MM-DD
  coverImage:     string       // path relative to /public
  description:    string
  tracks:         string[]
  spotifyAlbumId?: string
  spotifyTrackId?: string
  spotifyUrl?:    string
  bandcampUrl?:   string
  instagramUrl?:  string
  physicalProducts?: PhysicalProduct[]
}

export const albums: Album[] = [
  {
    slug:          'hypnic-jerks',
    artist:        'Hypnic Jerks',
    title:         'Hypnic Jerks',
    type:          'EP',
    releaseDate:   '2025-08-01',
    coverImage:    '/images/hypnic-jerks-ep.jpg',
    spotifyAlbumId: '72OXQpk7rhAS9nKgfc8ETT',
    spotifyUrl:    'https://open.spotify.com/album/72OXQpk7rhAS9nKgfc8ETT',
    instagramUrl:  'https://www.instagram.com/hypnicjerksband/',
    description:   `The self-titled debut EP from Chapel Hill's Hypnic Jerks. Four tracks recorded and released in 2025.`,
    tracks: [
      'Storm Drain',
      'Ghost',
      'Take Off Your Shoes',
      'Pass Through',
    ],
  },
  {
    slug:          'attacking-the-rust',
    artist:        'Megayacht',
    title:         'Attacking The Rust',
    type:          'LP',
    releaseDate:   '2024-08-02',
    coverImage:    '/images/image03.jpg',
    spotifyAlbumId: '5fSGybUgzQRdXabeBExFIM',
    spotifyUrl:    'https://open.spotify.com/album/5fSGybUgzQRdXabeBExFIM',
    bandcampUrl:   'https://megayacht.bandcamp.com/album/attacking-the-rust',
    description:   `Megayacht's debut LP, Attacking The Rust, brings the band's indie rock sensibilities to the forefront. Attacking The Rust is the result of two years of writing, iteration, and recording. Tracked and mixed at Biltroy Studios in Hillsborough, NC, the band was able to capture the joy, tone, and intention of each song on the album.`,
    tracks: [
      'Wanted To Be There',
      'Caviar Eyes',
      'These Bones Convey',
      "Let's Disappoint Them",
      'Vanity Eyepatch',
      'The List',
      'No Trespassing',
      'Revisions To The System',
      'Be Still My Heart',
      'Spiders Of Mention',
    ],
    physicalProducts: [
      {
        title:       'Initial Pressing 12" Vinyl',
        description: '140g 12" black vinyl. Full color jacket, labels, poly-lined inner sleeve, shrink wrapped. Includes digital download.',
        price:       '$25 USD',
        buyUrl:      'https://megayacht.bandcamp.com/album/attacking-the-rust',
        images: [
          { src: '/images/atr-vinyl-1.jpg', alt: 'Attacking The Rust vinyl record and jacket' },
          { src: '/images/atr-vinyl-2.jpg', alt: 'Attacking The Rust front jacket' },
          { src: '/images/atr-vinyl-3.jpg', alt: 'Attacking The Rust back jacket' },
        ],
      },
    ],
  },
]

export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug)
}

export function getSpotifyEmbedUrl(album: Album): string | null {
  if (album.spotifyAlbumId) {
    return `https://open.spotify.com/embed/album/${album.spotifyAlbumId}?utm_source=generator&theme=0`
  }
  if (album.spotifyTrackId) {
    return `https://open.spotify.com/embed/track/${album.spotifyTrackId}?utm_source=generator&theme=0`
  }
  return null
}

/** Formats "2024-08-02" → "August 2, 2024". The T12:00:00 prevents UTC rollback in western timezones. */
export function formatReleaseDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  })
}
