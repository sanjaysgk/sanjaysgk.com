/* eslint-disable @next/next/no-img-element */
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
      {/* Hero: Cover + Title */}
      <Section className='px-4 py-8 lg:px-6 lg:py-12'>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <div className='flex flex-col gap-8 md:flex-row md:items-start'>
            {/* Cover Image */}
            <div
              className={cn(
                'relative aspect-[85/110] w-48 md:w-56 shrink-0 rounded-2xl overflow-hidden shadow-lg',
                !config.coverImage &&
                  `bg-gradient-to-br ${config.coverGradient}`
              )}
            >
              {config.coverImage ? (
                <img
                  src={config.coverImage}
                  alt={config.title}
                  className='absolute inset-0 w-full h-full object-cover'
                />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <span className='text-6xl'>{config.coverIcon}</span>
                </div>
              )}
            </div>

            {/* Title + Description */}
            <div className='flex-1 md:pt-4'>
              <h1 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
                {config.title}
              </h1>
              <p className='mt-3 text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl'>
                {config.description}
              </p>
            </div>
          </div>
        </ViewAnimation>
      </Section>

      {/* Chapter List */}
      <Section className='px-4 pb-8 lg:px-6'>
        <ViewAnimation
          delay={0.05}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h2 className='text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6'>
            Content
          </h2>
        </ViewAnimation>

        <div className='flex flex-col'>
          {chapters.length > 0 ? (
            chapters.map((chapter, i) => (
              <ViewAnimation
                key={chapter.url}
                delay={0.05 * (i + 2)}
                initial={{ opacity: 0, translateY: -6 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <Link
                  href={chapter.url}
                  className='group flex items-center gap-5 py-4 border-b border-border transition-colors hover:bg-muted/20 -mx-4 px-4'
                >
                  <span className='text-base font-medium text-muted-foreground/60 w-6 text-right tabular-nums'>
                    {i + 1}
                  </span>
                  <span className='text-[15px] font-medium group-hover:text-primary transition-colors'>
                    {chapter.data.title}
                  </span>
                </Link>
              </ViewAnimation>
            ))
          ) : (
            <p className='py-12 text-center text-muted-foreground'>
              Chapters coming soon.
            </p>
          )}
        </div>
      </Section>
    </>
  )
}
