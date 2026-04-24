import type { Metadata } from 'next'
import { PostCard } from '@/components/blog/post-card'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { getPostsByCategory } from '@/lib/source'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Paper reviews, field overviews, and publications.',
}

export default function ResearchPage() {
  const posts = getPostsByCategory('research')

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <ViewAnimation initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Research</h1>
          <p className='mt-2 text-muted-foreground'>Paper reviews, field overviews, and publications.</p>
        </ViewAnimation>
      </Section>
      <Section className='p-4 lg:p-6'>
        <div className='flex flex-col divide-y divide-dashed divide-border'>
          {posts.map((post, i) => (
            <ViewAnimation key={post.url} delay={0.05 * (i + 1)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
              <PostCard title={post.data.title} description={post.data.description ?? ''} image={post.data.image} url={post.url} date={post.data.date.toDateString()} author={post.data.author} tags={post.data.tags} slugs={post.slugs} />
            </ViewAnimation>
          ))}
          {posts.length === 0 && <p className='py-8 text-center text-muted-foreground'>No research posts yet.</p>}
        </div>
      </Section>
    </>
  )
}
