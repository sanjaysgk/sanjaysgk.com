import type { Metadata } from 'next'
import Link from 'next/link'
import { PostCard } from '@/components/blog/post-card'
import { CategoryBadge } from '@/components/blog/category-badge'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { getPostsByCategory } from '@/lib/source'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Personal reflections, quick notes, and things I\'m thinking about.',
}

export default function JournalPage() {
  const notes = getPostsByCategory('note').slice(0, 6)
  const thoughts = getPostsByCategory('thought').slice(0, 6)

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <ViewAnimation initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Journal</h1>
          <p className='mt-2 text-muted-foreground'>Personal reflections, quick notes, and things I&apos;m thinking about.</p>
        </ViewAnimation>
      </Section>

      <Section className='p-4 lg:p-6'>
        <ViewAnimation delay={0.05} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl font-semibold'>Notes</h2>
              <CategoryBadge category='note' />
            </div>
            <Link href='/journal/notes' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>See all →</Link>
          </div>
        </ViewAnimation>
        <div className='flex flex-col divide-y divide-dashed divide-border'>
          {notes.map((post, i) => (
            <ViewAnimation key={post.url} delay={0.05 * (i + 1)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
              <PostCard title={post.data.title} description={post.data.description ?? ''} image={post.data.image} url={post.url} date={post.data.date.toDateString()} author={post.data.author} tags={post.data.tags} slugs={post.slugs} />
            </ViewAnimation>
          ))}
          {notes.length === 0 && <p className='py-8 text-center text-muted-foreground'>No notes yet.</p>}
        </div>
      </Section>

      <Section className='p-4 lg:p-6'>
        <ViewAnimation delay={0.1} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl font-semibold'>Thoughts</h2>
              <CategoryBadge category='thought' />
            </div>
            <Link href='/journal/thoughts' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>See all →</Link>
          </div>
        </ViewAnimation>
        <div className='flex flex-col divide-y divide-dashed divide-border'>
          {thoughts.map((post, i) => (
            <ViewAnimation key={post.url} delay={0.1 + 0.05 * (i + 1)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
              <PostCard title={post.data.title} description={post.data.description ?? ''} image={post.data.image} url={post.url} date={post.data.date.toDateString()} author={post.data.author} tags={post.data.tags} slugs={post.slugs} />
            </ViewAnimation>
          ))}
          {thoughts.length === 0 && <p className='py-8 text-center text-muted-foreground'>No thoughts yet.</p>}
        </div>
      </Section>
    </>
  )
}
