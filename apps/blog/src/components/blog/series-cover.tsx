/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { SeriesConfig } from '@/constants/series'

interface SeriesCoverProps {
  slug: string
  config: SeriesConfig
  chapterCount: number
}

export function SeriesCover({ slug, config, chapterCount }: SeriesCoverProps) {
  return (
    <Link
      href={`/series/${slug}`}
      className='group block transition-all duration-200'
    >
      {/* Cover Image */}
      <div
        className={cn(
          'relative aspect-[4/3] rounded-2xl overflow-hidden mb-4',
          !config.coverImage && `bg-gradient-to-br ${config.coverGradient}`
        )}
      >
        {config.coverImage ? (
          <img
            src={config.coverImage}
            alt={config.title}
            className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
          />
        ) : (
          <div className='flex items-center justify-center h-full'>
            <span className='text-6xl drop-shadow-lg'>{config.coverIcon}</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className='font-bold text-base group-hover:text-primary transition-colors'>
        {config.title}
      </h3>

      {/* Description */}
      <p className='mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-3'>
        {config.description}
      </p>
    </Link>
  )
}
