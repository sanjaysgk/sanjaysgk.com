'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function Share({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url

  return (
    <div>
      <p className='mb-1 text-fd-muted-foreground text-sm'>Share</p>
      <button
        type='button'
        className='flex items-center gap-2 text-sm font-medium hover:text-fd-primary transition-colors'
        onClick={() => {
          navigator.clipboard.writeText(fullUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}
