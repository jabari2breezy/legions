export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  tags: string[]
}

export const projectsList: Project[] = [
  {
    id: 'amsen-visits',
    title: 'AMSEN Engagement & Visits',
    subtitle: 'Educational Outreach & Mentorship',
    description: 'Empowering children with special needs through regular skill workshops, creative arts, and inclusive community games.',
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    tags: ['Education', 'Inclusion', 'Community'],
  },
  {
    id: 'ujasiri-house',
    title: 'Ujasiri House Restoration',
    subtitle: 'Shelter & Facility Overhaul',
    description: 'Full-scale renovation of living spaces, study areas, and sanitation facilities for vulnerable children in Dar es Salaam.',
    coverImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Renovation', 'Youth Welfare', 'Infrastructure'],
  },
  {
    id: 'tree-planting',
    title: 'Coastal Tree Planting Initiative',
    subtitle: 'Environmental Ecosystem Restoration',
    description: 'Planting over 1,000 native mangrove and shade trees to combat coastal erosion and green urban spaces.',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    tags: ['Environment', 'Sustainability', 'Climate Action'],
  },
  {
    id: 'beach-cleanups',
    title: 'Marine Protection & Beach Cleanups',
    subtitle: 'Ocean & Coastline Cleanups',
    description: 'Removing plastics and non-biodegradable waste from local beaches while raising marine conservation awareness.',
    coverImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ocean Protection', 'Waste Reduction'],
  },
  {
    id: 'ramadhan-project',
    title: 'Ramadhan Food Drive & Support',
    subtitle: 'Community Relief & Meal Distribution',
    description: 'Distributing essential food packages and organizing community fast-breaking meals for underprivileged families.',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Food Security', 'Charity', 'Mutual Aid'],
  },
]
