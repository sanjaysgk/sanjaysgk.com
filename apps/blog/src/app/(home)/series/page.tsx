import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { SeriesCover } from '@/components/blog/series-cover'
import { SERIES } from '@/constants/series'
import { getSeriesChapters } from '@/lib/source'

export const metadata: Metadata = {
  title: 'Series',
  description: 'Explore content series for research and technology.',
}

export default function SeriesPage() {
  const seriesEntries = Object.entries(SERIES)

  return (
    <>
      <Section className='px-4 pt-8 pb-2 lg:px-6'>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h1 className='text-2xl font-bold sm:text-3xl'>Series</h1>
          <p className='mt-1.5 text-sm text-muted-foreground'>
            Explore content series for research and technology.
          </p>
        </ViewAnimation>
      </Section>
      <Section className='px-4 py-6 lg:px-6'>
        <div className='grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4'>
          {seriesEntries.map(([slug, config], i) => {
            const chapters = getSeriesChapters(slug)
            return (
              <ViewAnimation
                key={slug}
                delay={0.05 * (i + 1)}
                initial={{ opacity: 0, translateY: -6 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <SeriesCover
                  slug={slug}
                  config={config}
                  chapterCount={chapters.length}
                />
              </ViewAnimation>
            )
          })}
        </div>
      </Section>
    </>
  )
}
