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
    text: 'Volumes',
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
