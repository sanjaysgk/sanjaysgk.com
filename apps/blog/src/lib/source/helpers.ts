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
