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
      className='group block'
    >
      {/* Cover */}
      <div
        className={cn(
          'relative aspect-square rounded-2xl overflow-hidden',
          !config.coverImage && `bg-gradient-to-br ${config.coverGradient}`
        )}
      >
        {config.coverImage ? (
          <img
            src={config.coverImage}
            alt={config.title}
            className='absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500'
          />
        ) : (
          <div className='flex items-center justify-center h-full'>
            <span className='text-7xl drop-shadow-lg'>{config.coverIcon}</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className='mt-3 font-bold text-[15px] leading-tight'>
        {config.title}
      </h3>

      {/* Description */}
      <p className='mt-1 text-[13px] text-muted-foreground leading-snug line-clamp-3'>
        {config.description}
      </p>
    </Link>
  )
}
