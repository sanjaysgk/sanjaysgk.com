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
