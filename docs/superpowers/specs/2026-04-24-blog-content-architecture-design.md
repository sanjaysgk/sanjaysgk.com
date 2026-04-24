# Blog Content Architecture Design

## Goal

Restructure the blog from a flat list of posts into a hierarchical knowledge platform with categories, subcategories, series (multi-part deep dives), and a navigation system inspired by Tines blog and HBR magazine.

## Content Hierarchy

```
Blog (Home)              — Featured hero + all latest posts
├── Learn                — Knowledge & education
│   ├── Research         — Paper reviews, field overviews, publications
│   └── Tutorials        — Step-by-step guides, code walkthroughs
├── Series               — Multi-part deep dives (book-style, ordered chapters)
├── Journal              — Personal & reflective
│   ├── Notes            — Quick learnings, TILs, observations
│   └── Thoughts         — Career reflections, opinions, life lessons
├── Tools                — Software, hardware, and workflows I use daily
│   ├── Research Tools   — Bioinformatics software, databases, HPC tools
│   ├── Dev Tools        — IDE, CLI, frameworks, libraries
│   ├── Productivity     — Apps, workflows, note-taking
│   └── Hardware         — Machines, peripherals, lab equipment
└── Tags                 — Cross-cutting tag-based discovery
```

## Navigation

Top-level nav tabs:

```
Blog    Learn    Series    Journal    Tools    Tags
```

- **Blog** (`/posts`) — All posts reverse-chronologically. Featured hero post at top, then grid of latest articles.
- **Learn** (`/learn`) — Landing page with two sections: Research topics grid + Tutorials grid. Each section shows cards with title, description, date, reading time.
- **Series** (`/series`) — Grid of series cards with auto-generated cover images, title, description, and chapter count.
- **Journal** (`/journal`) — Landing page with two sections: Notes + Thoughts.
- **Tags** (`/tags`) — All tags with post counts, clickable to filter.

## Content Schema

### Post Frontmatter

```yaml
---
title: string                    # Post title
description: string              # Short summary for cards/SEO
date: YYYY-MM-DD                 # Publication date
author: string                   # Author name (default: "Sanjay")
tags: [string]                   # Cross-cutting tags
image: string                    # Optional cover image path

# Category system
category: "research" | "tutorial" | "note" | "thought"

# Series (optional — only for series chapters)
series:
  name: string                   # Series identifier (e.g., "cancer-neoantigen-discovery")
  order: number                  # Chapter number (1-based)
---
```

### Series Definition

Series metadata is defined in a config file (`src/constants/series.ts`), not in MDX frontmatter. This keeps series-level info (title, description, cover color) centralized:

```typescript
export const SERIES = {
  "cancer-neoantigen-discovery": {
    title: "Cancer Neoantigen Discovery",
    description: "A comprehensive guide to computational neoantigen discovery — from mutation data to immunotherapy targets.",
    coverGradient: "from-rose-500 to-purple-600",   // For auto-generated cover
    coverIcon: "🧬",                                 // Emoji or Lucide icon
  },
  "immunopeptidomics-101": {
    title: "Immunopeptidomics 101",
    description: "Understanding immunopeptidomics from first principles — data analysis, tools, and workflows.",
    coverGradient: "from-blue-500 to-cyan-600",
    coverIcon: "🔬",
  },
  "building-bioinformatics-saas": {
    title: "Building a Bioinformatics SaaS",
    description: "From idea to product — building a SaaS platform for computational biology.",
    coverGradient: "from-amber-500 to-orange-600",
    coverIcon: "🚀",
  },
  "from-autocad-to-python": {
    title: "From AutoCAD to Python",
    description: "My non-linear career transition from civil engineering to bioinformatics.",
    coverGradient: "from-emerald-500 to-teal-600",
    coverIcon: "🔄",
  },
} as const;
```

## Pages & Routes

### `/posts` (Blog Home)
- Featured hero: latest post with large card, image, title, description
- "Latest articles" grid below: 3-column card grid with image, title, date, category badge, reading time
- Pagination at bottom

### `/learn` (Learn Landing)
```
Learn
Explore research topics and hands-on tutorials.

── Research ──────────────────
[Research card] [Research card] [Research card]
[Research card] [Research card] [Research card]
See all research →

── Tutorials ─────────────────
[Tutorial card] [Tutorial card] [Tutorial card]
[Tutorial card] [Tutorial card] [Tutorial card]
See all tutorials →
```

### `/learn/research` (All Research Posts)
- Filtered listing of category="research" posts
- Grid layout with cards

### `/learn/tutorials` (All Tutorial Posts)
- Filtered listing of category="tutorial" posts

### `/series` (Series Landing)
- Grid of series cards, each with:
  - Auto-generated cover (gradient + title + icon)
  - Series title
  - Description
  - "X chapters" count
- Clicking a card goes to the series detail page

### `/series/[slug]` (Series Detail)
- Large cover image at top
- Series title + description
- Numbered chapter list:
  ```
  CONTENT
  1  What are neoantigens?
  2  MHC binding prediction
  3  Building CAN-IMMUNE
  4  LC-MS/MS validation
  ```
- Each chapter links to its post

### `/posts/[slug]` (Individual Post — Series Chapter)
When a post belongs to a series, the post page shows:
- Series badge at top: "Series: Cancer Neoantigen Discovery"
- Chapter dropdown navigator: "3/4 — Building CAN-IMMUNE ▼"
  - Dropdown lists all chapters with current highlighted
- "← Previous Chapter" / "Next Chapter →" navigation at bottom
- Left sidebar TOC (same as regular posts)

### `/journal` (Journal Landing)
```
Journal
Personal reflections, quick notes, and things I'm thinking about.

── Notes ─────────────────────
[Note card] [Note card] [Note card]
See all notes →

── Thoughts ──────────────────
[Thought card] [Thought card] [Thought card]
See all thoughts →
```

### `/journal/notes` (All Notes)
### `/journal/thoughts` (All Thoughts)

### `/tools` (Tools Landing)

A curated list of software, hardware, and workflows I use daily — grouped by category. Each tool is a card with name, description, icon/logo, and optional link.

```
Tools
The software, hardware, and workflows I use for research and building.

── Research Tools ────────────
┌──────────┐ ┌──────────┐ ┌──────────┐
│ NetMHCpan│ │ MSFragger│ │ STAR     │
│ MHC bind.│ │ Proteom. │ │ RNA-seq  │
│ predict. │ │ search   │ │ aligner  │
└──────────┘ └──────────┘ └──────────┘

── Dev Tools ─────────────────
┌──────────┐ ┌──────────┐ ┌──────────┐
│ VS Code  │ │ Cursor   │ │ iTerm2   │
│ Editor   │ │ AI code  │ │ Terminal │
└──────────┘ └──────────┘ └──────────┘

── Productivity ──────────────
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Notion   │ │ Obsidian │ │ Arc      │
│ Notes &  │ │ Research │ │ Browser  │
│ planning │ │ notes    │ │          │
└──────────┘ └──────────┘ └──────────┘

── Hardware ──────────────────
┌──────────┐ ┌──────────┐
│ MacBook  │ │ Monash M3│
│ Pro M3   │ │ HPC Clstr│
└──────────┘ └──────────┘
```

Tools data is defined in a config file (`src/constants/tools.ts`), not as MDX content. Each tool has: name, description, category, icon (URL or emoji), and optional link.

### `/tags` (Tags)
- Grid of tag badges with post counts
- Clicking filters to posts with that tag

## Tools Data Structure

Tools are defined in `src/constants/tools.ts`:

```typescript
interface Tool {
  name: string;
  description: string;
  url?: string;           // Link to tool's website
  icon?: string;          // URL to icon image or emoji
}

interface ToolCategory {
  title: string;
  description: string;
  tools: Tool[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    title: "Research Tools",
    description: "Bioinformatics software, databases, and HPC tools",
    tools: [
      { name: "NetMHCpan", description: "MHC binding affinity prediction", url: "https://services.healthtech.dtu.dk/services/NetMHCpan-4.1/" },
      { name: "MSFragger", description: "Ultrafast proteomics search engine", url: "https://msfragger.nesvilab.org/" },
      { name: "STAR", description: "RNA-seq splice-aware aligner", url: "https://github.com/alexdobin/STAR" },
      { name: "GATK", description: "Genome analysis toolkit", url: "https://gatk.broadinstitute.org/" },
      { name: "AlphaFold", description: "Protein structure prediction", url: "https://alphafold.ebi.ac.uk/" },
      { name: "Nextflow", description: "Workflow orchestration for pipelines", url: "https://www.nextflow.io/" },
      { name: "MaxQuant", description: "Quantitative proteomics", url: "https://www.maxquant.org/" },
    ],
  },
  {
    title: "Dev Tools",
    description: "IDE, CLI, frameworks, and libraries",
    tools: [
      { name: "VS Code", description: "Primary code editor" },
      { name: "Cursor", description: "AI-powered code editor" },
      { name: "Claude Code", description: "AI coding assistant in the terminal" },
      { name: "iTerm2", description: "Terminal emulator for macOS" },
      { name: "Docker", description: "Containerisation for reproducible environments" },
      { name: "Next.js", description: "React framework for the web" },
      { name: "Python", description: "Primary language for bioinformatics" },
      { name: "FastAPI", description: "Modern Python web framework" },
    ],
  },
  {
    title: "Productivity",
    description: "Apps, workflows, and note-taking",
    tools: [
      { name: "Notion", description: "Notes, planning, and project management" },
      { name: "Obsidian", description: "Research notes and knowledge graph" },
      { name: "Arc", description: "Browser for power users" },
      { name: "Figma", description: "UI design and prototyping" },
      { name: "Linear", description: "Project tracking for side projects" },
    ],
  },
  {
    title: "Hardware",
    description: "Machines, peripherals, and infrastructure",
    tools: [
      { name: "MacBook Pro M3", description: "Daily driver for development" },
      { name: "Monash M3 Cluster", description: "HPC cluster for bioinformatics pipelines" },
    ],
  },
];
```

## Auto-Generated Series Covers

Each series gets an auto-generated cover image on the `/series` page:

```
┌─────────────────────────────┐
│                             │
│  gradient background        │
│  (from-rose-500 to-purple)  │
│                             │
│      🧬                     │
│                             │
│  Cancer Neoantigen          │
│  Discovery                  │
│                             │
│  4 chapters                 │
│                             │
└─────────────────────────────┘
```

Implemented as a Tailwind-styled div (not an image file) — gradient background, large emoji/icon, title text, chapter count. Dark mode inverts to darker gradient tones.

## Card Design

All content cards follow a consistent pattern inspired by Tines:

```
┌─────────────────────────────┐
│  [image or gradient cover]  │
│                             │
├─────────────────────────────┤
│  Category Badge  · 5 min    │
│                             │
│  Post Title Here            │
│                             │
│  Short description text     │
│  that wraps to two lines... │
│                             │
│  Apr 24, 2026               │
└─────────────────────────────┘
```

- Category badge uses color coding:
  - Research: blue
  - Tutorial: green
  - Note: amber
  - Thought: purple
  - Series chapter: gradient matching the series

## Implementation Scope

### Phase 1: Content Schema + Categories
- Update Fumadocs source config with `category` and `series` fields
- Update existing 5 posts with proper categories
- Create utility functions: `getPostsByCategory()`, `getSeriesChapters()`

### Phase 2: Navigation + Landing Pages
- Update nav tabs: Blog, Learn, Series, Journal, Tags
- Create `/learn`, `/learn/research`, `/learn/tutorials` pages
- Create `/journal`, `/journal/notes`, `/journal/thoughts` pages

### Phase 3: Series System
- Create `src/constants/series.ts` config
- Create `/series` landing page with cover cards
- Create `/series/[slug]` detail page with chapter list
- Add series navigator dropdown to post pages
- Add chapter prev/next navigation

### Phase 4: Card Design + Polish
- Redesign post cards to match Tines style (image covers, category badges)
- Auto-generated series cover components
- Category color coding system

## Constraints

- No database — all content is MDX files
- No new dependencies — use existing Fumadocs + shadcn/ui
- Must work within the monorepo structure (apps/blog/)
- Series metadata in code, not in a CMS
- Mobile responsive — cards collapse to single column
