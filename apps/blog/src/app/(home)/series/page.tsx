import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { SeriesCover } from '@/components/blog/series-cover'
import { SERIES } from '@/constants/series'
import { getSeriesChapters } from '@/lib/source'

export const metadata: Metadata = {
  title: 'Series',
  description: 'Multi-part deep dives into topics I care about.',
}

export default function SeriesPage() {
  const seriesEntries = Object.entries(SERIES)

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <ViewAnimation initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Series</h1>
          <p className='mt-2 text-muted-foreground'>Multi-part deep dives into topics I care about.</p>
        </ViewAnimation>
      </Section>
      <Section className='p-4 lg:p-6'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {seriesEntries.map(([slug, config], i) => {
            const chapters = getSeriesChapters(slug)
            return (
              <ViewAnimation key={slug} delay={0.05 * (i + 1)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
                <SeriesCover slug={slug} config={config} chapterCount={chapters.length} />
              </ViewAnimation>
            )
          })}
        </div>
      </Section>
    </>
  )
}
