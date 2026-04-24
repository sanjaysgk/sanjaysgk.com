import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { owner as ghOwner, repo } from './config/github'

export const title = 'Sanjay\'s Blog'
export const description = 'Thoughts on bioinformatics, computational biology, building products, and the intersection of science and code.'
export const owner = 'Sanjay'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
  githubUrl: `https://github.com/${ghOwner}/${repo}`,
}
