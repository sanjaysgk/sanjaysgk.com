import { Icons } from '@/components/icons/icons'
import type { Social } from '@/types'

export const socials: Social[] = [
  {
    icon: <Icons.gitHub />,
    name: 'GitHub',
    url: 'https://github.com/sanjaysgk',
    description: 'Check out my projects',
  },
  {
    icon: <Icons.twitter />,
    name: 'X (Twitter)',
    url: 'https://x.com/SanjaySGK1',
    description: 'Follow for updates',
  },
  {
    icon: <Icons.linkedin />,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sanjaygowda6',
    description: 'Connect with me',
  },
  {
    icon: <Icons.mail />,
    name: 'Email',
    url: 'mailto:sanjaysgk@gmail.com',
    description: 'Get in touch',
  },
]
