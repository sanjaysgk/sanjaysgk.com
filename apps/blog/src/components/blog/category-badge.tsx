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
