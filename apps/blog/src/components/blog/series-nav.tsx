'use client'

import Link from 'next/link'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Chapter {
  title: string
  url: string
  order: number
}

interface SeriesNavProps {
  seriesTitle: string
  seriesSlug: string
  chapters: Chapter[]
  currentOrder: number
}

export function SeriesNav({
  seriesTitle,
  seriesSlug,
  chapters,
  currentOrder,
}: SeriesNavProps) {
  const [open, setOpen] = useState(false)
  const currentIndex = chapters.findIndex((c) => c.order === currentOrder)
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

  return (
    <div className='rounded-xl border border-border border-dashed p-4 mb-6'>
      <Link
        href={`/series/${seriesSlug}`}
        className='text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
      >
        Volume: {seriesTitle}
      </Link>

      <div className='relative mt-2'>
        <button
          type='button'
          onClick={() => setOpen(!open)}
          className='flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted/50 transition-colors'
        >
          <span>
            {currentOrder} / {chapters.length} — {chapters[currentIndex]?.title}
          </span>
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>
        {open && (
          <div className='absolute z-10 mt-1 w-full rounded-lg border border-border bg-background shadow-md'>
            {chapters.map((chapter) => (
              <Link
                key={chapter.order}
                href={chapter.url}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg',
                  chapter.order === currentOrder && 'bg-muted/30 font-medium'
                )}
              >
                <span className='w-5 text-right text-muted-foreground'>{chapter.order}</span>
                <span>{chapter.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className='flex justify-between mt-3 gap-2'>
        {prev ? (
          <Link href={prev.url} className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors'>
            <ChevronLeft className='size-3' /> Previous
          </Link>
        ) : <span />}
        {next ? (
          <Link href={next.url} className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors'>
            Next <ChevronRight className='size-3' />
          </Link>
        ) : <span />}
      </div>
    </div>
  )
}
