# Blog Content Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the blog into a hierarchical knowledge platform with categories (Learn/Journal), series (book-style deep dives), a tools page, and updated navigation — all within the existing Fumadocs + shadcn/ui architecture.

**Architecture:** Content uses Fumadocs MDX with a `category` field in frontmatter to organize posts. Series metadata lives in a TypeScript config file. New landing pages filter posts by category and render appropriate layouts. Navigation tabs replace the current simple links.

**Tech Stack:** Next.js 16, Fumadocs MDX, shadcn/ui, Tailwind CSS v4, TypeScript

**Blog app root:** `/Users/sanjay/Work/projects/Startups/myPortfolio/sanjaysgk.com/apps/blog`

---

## File Map

### New Files
| File | Responsibility |
|------|---------------|
| `src/constants/series.ts` | Series definitions (title, description, gradient, icon) |
| `src/constants/tools.ts` | Tools data grouped by category |
| `src/lib/source/helpers.ts` | Query helpers: getPostsByCategory, getSeriesChapters, getSeriesInfo |
| `src/app/(home)/learn/page.tsx` | Learn landing page (Research + Tutorials sections) |
| `src/app/(home)/learn/research/page.tsx` | All research posts |
| `src/app/(home)/learn/tutorials/page.tsx` | All tutorial posts |
| `src/app/(home)/journal/page.tsx` | Journal landing page (Notes + Thoughts sections) |
| `src/app/(home)/journal/notes/page.tsx` | All notes |
| `src/app/(home)/journal/thoughts/page.tsx` | All thoughts |
| `src/app/(home)/series/page.tsx` | Series landing page with cover cards |
| `src/app/(home)/series/[slug]/page.tsx` | Series detail page with chapter list |
| `src/app/(home)/tools/page.tsx` | Tools page grouped by category |
| `src/components/blog/series-cover.tsx` | Auto-generated series cover card |
| `src/components/blog/series-nav.tsx` | Series chapter dropdown navigator for post pages |
| `src/components/blog/category-badge.tsx` | Color-coded category badge |

### Modified Files
| File | Changes |
|------|---------|
| `source.config.ts` | Add `category` and `series` fields to schema |
| `src/lib/source/blog.ts` | Export new helper functions |
| `src/constants/navigation/links.tsx` | Replace nav items: Blog, Learn, Series, Journal, Tools, Tags |
| `src/app/(home)/posts/[slug]/page.tsx` | Add series navigator when post belongs to a series |
| `content/*.mdx` | Add category field to all 5 existing posts |

---

## Task 1: Content Schema + Categories

**Files:**
- Modify: `source.config.ts`
- Modify: `content/building-canimmune.mdx`
- Modify: `content/immunolyser-published.mdx`
- Modify: `content/from-civil-to-code.mdx`
- Modify: `content/hpc-bioinformatics-tips.mdx`
- Modify: `content/building-scrollpaper.mdx`

- [ ] **Step 1: Add category and series fields to source.config.ts**

In `source.config.ts`, find the schema definition inside `defineCollections` and add two new fields after `tags`:

```typescript
// Add after tags field:
category: z.enum(['research', 'tutorial', 'note', 'thought']).default('research'),
series: z.object({
  name: z.string(),
  order: z.number(),
}).optional(),
```

- [ ] **Step 2: Update existing posts with categories**

Add `category` field to each post's frontmatter:

- `building-canimmune.mdx`: add `category: research`
- `immunolyser-published.mdx`: add `category: research`
- `from-civil-to-code.mdx`: add `category: thought`
- `hpc-bioinformatics-tips.mdx`: add `category: tutorial`
- `building-scrollpaper.mdx`: add `category: note`

- [ ] **Step 3: Verify build**

Run: `SKIP_ENV_VALIDATION=1 pnpm build --filter=blog`
Expected: Build passes

- [ ] **Step 4: Commit**

```bash
git add source.config.ts content/
git commit -m "feat(blog): add category and series fields to content schema"
```

---

## Task 2: Query Helpers

**Files:**
- Create: `src/lib/source/helpers.ts`
- Modify: `src/lib/source/index.ts`

- [ ] **Step 1: Create helpers.ts**

Create `src/lib/source/helpers.ts`:

```typescript
import { getSortedByDatePosts } from './blog'
import type { BlogPage } from './blog'

export type Category = 'research' | 'tutorial' | 'note' | 'thought'

export function getPostsByCategory(category: Category): BlogPage[] {
  return getSortedByDatePosts().filter(
    (post) => post.data.category === category
  )
}

export function getSeriesChapters(seriesName: string): BlogPage[] {
  return getSortedByDatePosts()
    .filter((post) => post.data.series?.name === seriesName)
    .sort((a, b) => (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0))
}

export function getSeriesList(): string[] {
  const series = new Set<string>()
  for (const post of getSortedByDatePosts()) {
    if (post.data.series?.name) {
      series.add(post.data.series.name)
    }
  }
  return Array.from(series)
}
```

- [ ] **Step 2: Export from index.ts**

In `src/lib/source/index.ts`, add:

```typescript
export * from './helpers'
```

- [ ] **Step 3: Verify build**

Run: `SKIP_ENV_VALIDATION=1 pnpm build --filter=blog`

- [ ] **Step 4: Commit**

```bash
git add src/lib/source/
git commit -m "feat(blog): add category and series query helpers"
```

---

## Task 3: Series + Tools Config

**Files:**
- Create: `src/constants/series.ts`
- Create: `src/constants/tools.ts`

- [ ] **Step 1: Create series.ts**

Create `src/constants/series.ts`:

```typescript
export interface SeriesConfig {
  title: string
  description: string
  coverGradient: string
  coverIcon: string
}

export const SERIES: Record<string, SeriesConfig> = {
  'cancer-neoantigen-discovery': {
    title: 'Cancer Neoantigen Discovery',
    description:
      'A comprehensive guide to computational neoantigen discovery — from mutation data to immunotherapy targets.',
    coverGradient: 'from-rose-500 to-purple-600',
    coverIcon: '🧬',
  },
  'immunopeptidomics-101': {
    title: 'Immunopeptidomics 101',
    description:
      'Understanding immunopeptidomics from first principles — data analysis, tools, and workflows.',
    coverGradient: 'from-blue-500 to-cyan-600',
    coverIcon: '🔬',
  },
  'building-bioinformatics-saas': {
    title: 'Building a Bioinformatics SaaS',
    description:
      'From idea to product — building a SaaS platform for computational biology.',
    coverGradient: 'from-amber-500 to-orange-600',
    coverIcon: '🚀',
  },
  'from-autocad-to-python': {
    title: 'From AutoCAD to Python',
    description:
      'My non-linear career transition from civil engineering to bioinformatics.',
    coverGradient: 'from-emerald-500 to-teal-600',
    coverIcon: '🔄',
  },
}
```

- [ ] **Step 2: Create tools.ts**

Create `src/constants/tools.ts`:

```typescript
export interface Tool {
  name: string
  description: string
  url?: string
}

export interface ToolCategory {
  title: string
  description: string
  tools: Tool[]
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    title: 'Research Tools',
    description: 'Bioinformatics software, databases, and HPC tools',
    tools: [
      { name: 'NetMHCpan', description: 'MHC binding affinity prediction', url: 'https://services.healthtech.dtu.dk/services/NetMHCpan-4.1/' },
      { name: 'MSFragger', description: 'Ultrafast proteomics search engine', url: 'https://msfragger.nesvilab.org/' },
      { name: 'STAR', description: 'RNA-seq splice-aware aligner', url: 'https://github.com/alexdobin/STAR' },
      { name: 'GATK', description: 'Genome analysis toolkit', url: 'https://gatk.broadinstitute.org/' },
      { name: 'AlphaFold', description: 'Protein structure prediction', url: 'https://alphafold.ebi.ac.uk/' },
      { name: 'Nextflow', description: 'Workflow orchestration for pipelines', url: 'https://www.nextflow.io/' },
      { name: 'MaxQuant', description: 'Quantitative proteomics', url: 'https://www.maxquant.org/' },
    ],
  },
  {
    title: 'Dev Tools',
    description: 'IDE, CLI, frameworks, and libraries',
    tools: [
      { name: 'VS Code', description: 'Primary code editor' },
      { name: 'Cursor', description: 'AI-powered code editor' },
      { name: 'Claude Code', description: 'AI coding assistant in the terminal' },
      { name: 'iTerm2', description: 'Terminal emulator for macOS' },
      { name: 'Docker', description: 'Containerisation for reproducible environments' },
      { name: 'Next.js', description: 'React framework for the web' },
      { name: 'Python', description: 'Primary language for bioinformatics' },
      { name: 'FastAPI', description: 'Modern Python web framework' },
    ],
  },
  {
    title: 'Productivity',
    description: 'Apps, workflows, and note-taking',
    tools: [
      { name: 'Notion', description: 'Notes, planning, and project management' },
      { name: 'Obsidian', description: 'Research notes and knowledge graph' },
      { name: 'Arc', description: 'Browser for power users' },
      { name: 'Figma', description: 'UI design and prototyping' },
      { name: 'Linear', description: 'Project tracking for side projects' },
    ],
  },
  {
    title: 'Hardware',
    description: 'Machines, peripherals, and infrastructure',
    tools: [
      { name: 'MacBook Pro M3', description: 'Daily driver for development' },
      { name: 'Monash M3 Cluster', description: 'HPC cluster for bioinformatics pipelines' },
    ],
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/constants/series.ts src/constants/tools.ts
git commit -m "feat(blog): add series and tools config data"
```

---

## Task 4: Navigation Update

**Files:**
- Modify: `src/constants/navigation/links.tsx`

- [ ] **Step 1: Replace nav links**

Replace the entire content of `src/constants/navigation/links.tsx`:

```tsx
import type { LinkItemType } from 'fumadocs-ui/layouts/shared'
import { Icons } from '@/components/icons/icons'

export const linkItems: LinkItemType[] = [
  {
    text: 'Blog',
    icon: <Icons.posts />,
    url: '/posts',
    active: 'nested-url',
  },
  {
    text: 'Learn',
    icon: <Icons.code />,
    url: '/learn',
    active: 'nested-url',
  },
  {
    text: 'Series',
    icon: <Icons.layers />,
    url: '/series',
    active: 'nested-url',
  },
  {
    text: 'Journal',
    icon: <Icons.notebook />,
    url: '/journal',
    active: 'nested-url',
  },
  {
    text: 'Tools',
    icon: <Icons.wrench />,
    url: '/tools',
  },
  {
    text: 'Tags',
    url: '/tags',
    active: 'nested-url',
    on: 'menu',
  },
  {
    text: 'About',
    icon: <Icons.user />,
    url: '/about',
    on: 'menu',
  },
]
```

Note: Check that `Icons.layers`, `Icons.notebook`, `Icons.wrench` exist in the icons file. If not, add them from lucide-react (`Layers`, `BookOpen`, `Wrench`).

- [ ] **Step 2: Add missing icons if needed**

Check `src/components/icons/icons.tsx` for the icon names. If `layers`, `notebook`, `wrench` are missing, add them using the existing pattern (import from lucide-react, add to Icons object).

- [ ] **Step 3: Verify build**

Run: `SKIP_ENV_VALIDATION=1 pnpm build --filter=blog`

- [ ] **Step 4: Commit**

```bash
git add src/constants/navigation/ src/components/icons/
git commit -m "feat(blog): update navigation with Learn, Series, Journal, Tools tabs"
```

---

## Task 5: Category Badge Component

**Files:**
- Create: `src/components/blog/category-badge.tsx`

- [ ] **Step 1: Create category-badge.tsx**

```tsx
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  research: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  tutorial: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  note: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  thought: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
}

const CATEGORY_LABELS: Record<string, string> = {
  research: 'Research',
  tutorial: 'Tutorial',
  note: 'Note',
  thought: 'Thought',
}

export function CategoryBadge({
  category,
  className,
}: {
  category: string
  className?: string
}) {
  return (
    <Badge
      className={cn(
        'text-xs font-medium border-0',
        CATEGORY_COLORS[category] ?? '',
        className
      )}
      variant='secondary'
    >
      {CATEGORY_LABELS[category] ?? category}
    </Badge>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/category-badge.tsx
git commit -m "feat(blog): add color-coded category badge component"
```

---

## Task 6: Learn Landing + Sub-pages

**Files:**
- Create: `src/app/(home)/learn/page.tsx`
- Create: `src/app/(home)/learn/research/page.tsx`
- Create: `src/app/(home)/learn/tutorials/page.tsx`

- [ ] **Step 1: Create learn landing page**

Create directories: `mkdir -p src/app/\(home\)/learn/research src/app/\(home\)/learn/tutorials`

Create `src/app/(home)/learn/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { PostCard } from '@/components/blog/post-card'
import { CategoryBadge } from '@/components/blog/category-badge'
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
        <ViewAnimation
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Learn</h1>
          <p className='mt-2 text-muted-foreground'>
            Explore research topics and hands-on tutorials.
          </p>
        </ViewAnimation>
      </Section>

      {/* Research Section */}
      <Section className='p-4 lg:p-6'>
        <ViewAnimation
          delay={0.05}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl font-semibold'>Research</h2>
              <CategoryBadge category='research' />
            </div>
            <Link href='/learn/research' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
              See all →
            </Link>
          </div>
        </ViewAnimation>
        <div className='flex flex-col divide-y divide-dashed divide-border'>
          {research.map((post, i) => (
            <ViewAnimation
              key={post.url}
              delay={0.05 * (i + 1)}
              initial={{ opacity: 0, translateY: -6 }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <PostCard
                title={post.data.title}
                description={post.data.description ?? ''}
                image={post.data.image}
                url={post.url}
                date={post.data.date.toDateString()}
                author={post.data.author}
                tags={post.data.tags}
                slugs={post.slugs}
              />
            </ViewAnimation>
          ))}
          {research.length === 0 && (
            <p className='py-8 text-center text-muted-foreground'>No research posts yet.</p>
          )}
        </div>
      </Section>

      {/* Tutorials Section */}
      <Section className='p-4 lg:p-6'>
        <ViewAnimation
          delay={0.1}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl font-semibold'>Tutorials</h2>
              <CategoryBadge category='tutorial' />
            </div>
            <Link href='/learn/tutorials' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
              See all →
            </Link>
          </div>
        </ViewAnimation>
        <div className='flex flex-col divide-y divide-dashed divide-border'>
          {tutorials.map((post, i) => (
            <ViewAnimation
              key={post.url}
              delay={0.1 + 0.05 * (i + 1)}
              initial={{ opacity: 0, translateY: -6 }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <PostCard
                title={post.data.title}
                description={post.data.description ?? ''}
                image={post.data.image}
                url={post.url}
                date={post.data.date.toDateString()}
                author={post.data.author}
                tags={post.data.tags}
                slugs={post.slugs}
              />
            </ViewAnimation>
          ))}
          {tutorials.length === 0 && (
            <p className='py-8 text-center text-muted-foreground'>No tutorials yet.</p>
          )}
        </div>
      </Section>
    </>
  )
}
```

- [ ] **Step 2: Create research sub-page**

Create `src/app/(home)/learn/research/page.tsx` — same pattern as `/posts/page.tsx` but filtered to `category === 'research'`. Title: "Research", description: "Paper reviews, field overviews, and publications."

- [ ] **Step 3: Create tutorials sub-page**

Create `src/app/(home)/learn/tutorials/page.tsx` — same pattern but filtered to `category === 'tutorial'`. Title: "Tutorials", description: "Step-by-step guides and code walkthroughs."

- [ ] **Step 4: Verify build**

Run: `SKIP_ENV_VALIDATION=1 pnpm build --filter=blog`

- [ ] **Step 5: Commit**

```bash
git add src/app/\(home\)/learn/
git commit -m "feat(blog): add Learn landing page with Research and Tutorials sections"
```

---

## Task 7: Journal Landing + Sub-pages

**Files:**
- Create: `src/app/(home)/journal/page.tsx`
- Create: `src/app/(home)/journal/notes/page.tsx`
- Create: `src/app/(home)/journal/thoughts/page.tsx`

- [ ] **Step 1: Create journal landing page**

Same pattern as Learn page but with Notes + Thoughts sections. Title: "Journal", description: "Personal reflections, quick notes, and things I'm thinking about."

- [ ] **Step 2: Create notes sub-page**

Filtered to `category === 'note'`. Title: "Notes", description: "Quick learnings, TILs, and observations."

- [ ] **Step 3: Create thoughts sub-page**

Filtered to `category === 'thought'`. Title: "Thoughts", description: "Career reflections, opinions, and life lessons."

- [ ] **Step 4: Verify build & commit**

```bash
git add src/app/\(home\)/journal/
git commit -m "feat(blog): add Journal landing page with Notes and Thoughts sections"
```

---

## Task 8: Series System

**Files:**
- Create: `src/components/blog/series-cover.tsx`
- Create: `src/app/(home)/series/page.tsx`
- Create: `src/app/(home)/series/[slug]/page.tsx`

- [ ] **Step 1: Create series cover card component**

Create `src/components/blog/series-cover.tsx`:

```tsx
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
```

- [ ] **Step 2: Create series landing page**

Create `src/app/(home)/series/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import { SeriesCover } from '@/components/blog/series-cover'
import { SERIES } from '@/constants/series'
import { getSeriesChapters } from '@/lib/source'

export const metadata: Metadata = {
  title: 'Series',
  description: 'Explore content series — multi-part deep dives into topics.',
}

export default function SeriesPage() {
  const seriesEntries = Object.entries(SERIES)

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Series</h1>
          <p className='mt-2 text-muted-foreground'>
            Multi-part deep dives into topics I care about.
          </p>
        </ViewAnimation>
      </Section>
      <Section className='p-4 lg:p-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
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
```

- [ ] **Step 3: Create series detail page**

Create directories: `mkdir -p src/app/\(home\)/series/\[slug\]`

Create `src/app/(home)/series/[slug]/page.tsx`:

```tsx
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
        <ViewAnimation
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <div className='flex flex-col items-center sm:flex-row gap-8'>
            {/* Cover */}
            <div
              className={cn(
                'h-48 w-36 shrink-0 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br text-white',
                config.coverGradient
              )}
            >
              <span className='text-5xl'>{config.coverIcon}</span>
            </div>
            {/* Info */}
            <div className='flex-1'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                {config.title}
              </h1>
              <p className='mt-2 text-muted-foreground'>{config.description}</p>
            </div>
          </div>
        </ViewAnimation>
      </Section>

      {/* Chapter List */}
      <Section className='p-4 lg:p-6'>
        <ViewAnimation
          delay={0.05}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h2 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4'>
            Content
          </h2>
        </ViewAnimation>
        <div className='flex flex-col divide-y divide-border'>
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
                  className='flex items-center gap-4 py-4 group hover:bg-muted/30 -mx-4 px-4 rounded-lg transition-colors'
                >
                  <span className='text-lg font-semibold text-muted-foreground w-6 text-right'>
                    {i + 1}
                  </span>
                  <span className='font-medium group-hover:text-primary transition-colors'>
                    {chapter.data.title}
                  </span>
                </Link>
              </ViewAnimation>
            ))
          ) : (
            <p className='py-8 text-center text-muted-foreground'>
              Chapters coming soon.
            </p>
          )}
        </div>
      </Section>
    </>
  )
}
```

- [ ] **Step 4: Verify build & commit**

```bash
git add src/components/blog/series-cover.tsx src/app/\(home\)/series/
git commit -m "feat(blog): add series landing page and detail page with chapter list"
```

---

## Task 9: Tools Page

**Files:**
- Create: `src/app/(home)/tools/page.tsx`

- [ ] **Step 1: Create tools page**

Create directory: `mkdir -p src/app/\(home\)/tools`

Create `src/app/(home)/tools/page.tsx`:

```tsx
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
        <ViewAnimation
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Tools</h1>
          <p className='mt-2 text-muted-foreground'>
            The software, hardware, and workflows I use for research and building.
          </p>
        </ViewAnimation>
      </Section>

      {TOOL_CATEGORIES.map((category, catIdx) => (
        <Section key={category.title} className='p-4 lg:p-6'>
          <ViewAnimation
            delay={0.05 * (catIdx + 1)}
            initial={{ opacity: 0, translateY: -6 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <h2 className='text-xl font-semibold mb-1'>{category.title}</h2>
            <p className='text-sm text-muted-foreground mb-4'>{category.description}</p>
          </ViewAnimation>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {category.tools.map((tool, toolIdx) => (
              <ViewAnimation
                key={tool.name}
                delay={0.05 * (catIdx + 1) + 0.03 * (toolIdx + 1)}
                initial={{ opacity: 0, translateY: -6 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <div className='rounded-xl border border-border border-dashed p-4 transition-colors hover:bg-muted/30'>
                  <div className='flex items-start justify-between'>
                    <h3 className='font-medium text-sm'>{tool.name}</h3>
                    {tool.url && (
                      <Link
                        href={tool.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                      >
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
```

- [ ] **Step 2: Verify build & commit**

```bash
git add src/app/\(home\)/tools/
git commit -m "feat(blog): add tools page with categorized tool cards"
```

---

## Task 10: Series Navigator on Post Pages

**Files:**
- Create: `src/components/blog/series-nav.tsx`
- Modify: `src/app/(home)/posts/[slug]/page.tsx`

- [ ] **Step 1: Create series navigator component**

Create `src/components/blog/series-nav.tsx`:

```tsx
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
      {/* Series badge */}
      <Link
        href={`/series/${seriesSlug}`}
        className='text-xs font-medium text-muted-foreground hover:text-foreground transition-colors'
      >
        Series: {seriesTitle}
      </Link>

      {/* Chapter dropdown */}
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

      {/* Prev/Next */}
      <div className='flex justify-between mt-3 gap-2'>
        {prev ? (
          <Link
            href={prev.url}
            className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors'
          >
            <ChevronLeft className='size-3' /> Previous
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.url}
            className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors'
          >
            Next <ChevronRight className='size-3' />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Integrate into post page**

In `src/app/(home)/posts/[slug]/page.tsx`, add the series navigator above the article content:

1. Import: `import { SeriesNav } from '@/components/blog/series-nav'`
2. Import: `import { getSeriesChapters } from '@/lib/source'`
3. Import: `import { SERIES } from '@/constants/series'`
4. After getting `page` data, check if it has a series:
```typescript
const seriesName = page.data.series?.name
const seriesConfig = seriesName ? SERIES[seriesName] : null
const seriesChapters = seriesName
  ? getSeriesChapters(seriesName).map((c) => ({
      title: c.data.title,
      url: c.url,
      order: c.data.series?.order ?? 0,
    }))
  : []
```
5. Before the `<InlineTOC>`, render:
```tsx
{seriesConfig && seriesName && (
  <SeriesNav
    seriesTitle={seriesConfig.title}
    seriesSlug={seriesName}
    chapters={seriesChapters}
    currentOrder={page.data.series?.order ?? 0}
  />
)}
```

- [ ] **Step 3: Verify build & commit**

```bash
git add src/components/blog/series-nav.tsx src/app/\(home\)/posts/\[slug\]/
git commit -m "feat(blog): add series navigator to post pages"
```

---

## Task 11: Final Integration

- [ ] **Step 1: Full build check**

Run: `SKIP_ENV_VALIDATION=1 pnpm build`
Expected: Both portfolio and blog apps build successfully.

- [ ] **Step 2: Dev test**

Run: `pnpm dev:blog`
Navigate to each new page:
- `/learn` — shows Research + Tutorials sections
- `/learn/research` — filtered research posts
- `/learn/tutorials` — filtered tutorials
- `/series` — series cards with cover gradients
- `/series/cancer-neoantigen-discovery` — chapter list (empty until posts are tagged)
- `/journal` — Notes + Thoughts sections
- `/journal/notes` — filtered notes
- `/journal/thoughts` — filtered thoughts
- `/tools` — tool cards grouped by category
- `/tags` — still works
- `/posts` — still works

- [ ] **Step 3: Commit & push**

```bash
git add -A
git commit -m "feat(blog): complete content architecture — Learn, Series, Journal, Tools, Tags"
git push
```
