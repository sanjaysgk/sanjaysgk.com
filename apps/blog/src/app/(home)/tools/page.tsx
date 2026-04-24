import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { TOOL_CATEGORIES } from '@/constants/tools'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'The software, hardware, and workflows I use for research and building.',
}

export default function ToolsPage() {
  return (
    <>
      <Section className='p-4 lg:p-6'>
        <ViewAnimation initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Tools</h1>
          <p className='mt-2 text-muted-foreground'>The software, hardware, and workflows I use for research and building.</p>
        </ViewAnimation>
      </Section>

      {TOOL_CATEGORIES.map((category, catIdx) => (
        <Section key={category.title} className='p-4 lg:p-6'>
          <ViewAnimation delay={0.05 * (catIdx + 1)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
            <h2 className='text-xl font-semibold mb-1'>{category.title}</h2>
            <p className='text-sm text-muted-foreground mb-4'>{category.description}</p>
          </ViewAnimation>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {category.tools.map((tool, toolIdx) => (
              <ViewAnimation key={tool.name} delay={0.05 * (catIdx + 1) + 0.03 * (toolIdx + 1)} initial={{ opacity: 0, translateY: -6 }} whileInView={{ opacity: 1, translateY: 0 }}>
                <div className='rounded-xl border border-border border-dashed p-4 transition-colors hover:bg-muted/30'>
                  <div className='flex items-start justify-between'>
                    <h3 className='font-medium text-sm'>{tool.name}</h3>
                    {tool.url && (
                      <Link href={tool.url} target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground transition-colors'>
                        <ExternalLink className='size-3.5' />
                      </Link>
                    )}
                  </div>
                  <p className='mt-1 text-xs text-muted-foreground'>{tool.description}</p>
                </div>
              </ViewAnimation>
            ))}
          </div>
        </Section>
      ))}
    </>
  )
}
