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
      className='group block rounded-xl overflow-hidden border border-border transition-all duration-200 hover:shadow-md hover:border-border/80'
    >
      <div
        className={cn(
          'h-40 flex flex-col items-center justify-center bg-gradient-to-br text-white p-6',
          config.coverGradient
        )}
      >
        <span className='text-4xl mb-2'>{config.coverIcon}</span>
        <span className='text-xs font-medium opacity-80'>
          {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'}
        </span>
      </div>
      <div className='p-4'>
        <h3 className='font-semibold group-hover:text-primary transition-colors'>
          {config.title}
        </h3>
        <p className='mt-1 text-sm text-muted-foreground line-clamp-2'>
          {config.description}
        </p>
      </div>
    </Link>
  )
}
