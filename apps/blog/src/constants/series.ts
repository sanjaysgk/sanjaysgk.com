export interface SeriesConfig {
  title: string
  description: string
  coverGradient: string
  coverIcon: string
  coverImage?: string // Optional custom cover image path (in /public)
}

export const SERIES: Record<string, SeriesConfig> = {
  'cancer-neoantigen-discovery': {
    title: 'Cancer Neoantigen Discovery',
    description:
      'A comprehensive guide to computational neoantigen discovery — from mutation data to immunotherapy targets.',
    coverGradient: 'from-rose-500 to-purple-600',
    coverIcon: '🧬',
    coverImage: '/images/series/cancer-neoantigen-discovery.png',
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
