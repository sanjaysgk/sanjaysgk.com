import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { SERIES } from '@/constants/series'
import { getSeriesChapters } from '@/lib/source'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  return Object.keys(SERIES).map((slug) => ({ slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const config = SERIES[slug]
  if (!config) return {}
  return { title: config.title, description: config.description }
}

export default async function SeriesDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const config = SERIES[slug]
  if (!config) notFound()

  const chapters = getSeriesChapters(slug)

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <ViewAnimation initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <div className='flex flex-col items-center sm:flex-row gap-8'>
            <div className={cn('h-48 w-36 shrink-0 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br text-white', config.coverGradient)}>
              <span className='text-5xl'>{config.coverIcon}</span>
            </div>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>{config.title}</h1>
              <p className='mt-2 text-muted-foreground'>{config.description}</p>
            </div>
          </div>
        </ViewAnimation>
      </Section>

      <Section className='p-4 lg:p-6'>
        <ViewAnimation delay={0.05} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <h2 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4'>Content</h2>
        </ViewAnimation>
        <div className='flex flex-col divide-y divide-border'>
          {chapters.length > 0 ? (
            chapters.map((chapter, i) => (
              <ViewAnimation key={chapter.url} delay={0.05 * (i + 2)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
                <Link href={chapter.url} className='flex items-center gap-4 py-4 group hover:bg-muted/30 -mx-4 px-4 rounded-lg transition-colors'>
                  <span className='text-lg font-semibold text-muted-foreground w-6 text-right'>{i + 1}</span>
                  <span className='font-medium group-hover:text-primary transition-colors'>{chapter.data.title}</span>
                </Link>
              </ViewAnimation>
            ))
          ) : (
            <p className='py-8 text-center text-muted-foreground'>Chapters coming soon.</p>
          )}
        </div>
      </Section>
    </>
  )
}
