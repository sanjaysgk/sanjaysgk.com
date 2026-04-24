import type { Metadata } from 'next'
import Link from 'next/link'
import { PostCard } from '@/components/blog/post-card'
import { CategoryBadge } from '@/components/blog/category-badge'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { getPostsByCategory } from '@/lib/source'

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Explore research topics and hands-on tutorials.',
}

export default function LearnPage() {
  const research = getPostsByCategory('research').slice(0, 6)
  const tutorials = getPostsByCategory('tutorial').slice(0, 6)

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <ViewAnimation initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Learn</h1>
          <p className='mt-2 text-muted-foreground'>Explore research topics and hands-on tutorials.</p>
        </ViewAnimation>
      </Section>

      <Section className='p-4 lg:p-6'>
        <ViewAnimation delay={0.05} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl font-semibold'>Research</h2>
              <CategoryBadge category='research' />
            </div>
            <Link href='/learn/research' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>See all →</Link>
          </div>
        </ViewAnimation>
        <div className='flex flex-col divide-y divide-dashed divide-border'>
          {research.map((post, i) => (
            <ViewAnimation key={post.url} delay={0.05 * (i + 1)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
              <PostCard title={post.data.title} description={post.data.description ?? ''} image={post.data.image} url={post.url} date={post.data.date.toDateString()} author={post.data.author} tags={post.data.tags} slugs={post.slugs} />
            </ViewAnimation>
          ))}
          {research.length === 0 && <p className='py-8 text-center text-muted-foreground'>No research posts yet.</p>}
        </div>
      </Section>

      <Section className='p-4 lg:p-6'>
        <ViewAnimation delay={0.1} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl font-semibold'>Tutorials</h2>
              <CategoryBadge category='tutorial' />
            </div>
            <Link href='/learn/tutorials' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>See all →</Link>
          </div>
        </ViewAnimation>
        <div className='flex flex-col divide-y divide-dashed divide-border'>
          {tutorials.map((post, i) => (
            <ViewAnimation key={post.url} delay={0.1 + 0.05 * (i + 1)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
              <PostCard title={post.data.title} description={post.data.description ?? ''} image={post.data.image} url={post.url} date={post.data.date.toDateString()} author={post.data.author} tags={post.data.tags} slugs={post.slugs} />
            </ViewAnimation>
          ))}
          {tutorials.length === 0 && <p className='py-8 text-center text-muted-foreground'>No tutorials yet.</p>}
        </div>
      </Section>
    </>
  )
}
