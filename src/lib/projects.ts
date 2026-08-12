export interface ProjectData {
  slug: string
  title: string
  subtitle: string
  location: string
  description: string
  stats: { value: string; label: string }[]
  impactNote: string
  images: string[]
  layout: 'numbers' | 'gallery' | 'horizontal' | 'counter' | 'narrative'
}

export const projects: ProjectData[] = [
  {
    slug: 'ramadhan',
    title: 'The Ramadhan Project',
    subtitle: 'Citywide food drive',
    location: 'Dar es Salaam',
    description:
      'Raised funds online to buy food in bulk directly from wholesale suppliers, assembled food packs, and hand-delivered them across target neighborhoods during Ramadhan.',
    stats: [
      { value: '1,200+', label: 'fasting individuals reached' },
      { value: '100%', label: 'to food procurement' },
    ],
    impactNote:
      'Hampers delivered to low-income families and local orphanages. Every shilling raised went directly to food with zero admin overhead.',
    images: Array.from(
      { length: 13 },
      (_, i) => `/projects/ramadhan-project/ramadhan-project-${i + 1}.jpg`
    ),
    layout: 'numbers',
  },
  {
    slug: 'ujasiri-house',
    title: 'Ujasiri House Renovation',
    subtitle: 'Tumaini La Maisha',
    location: 'Muhimbili National Hospital',
    description:
      'Plastered, repainted, and painted custom murals at Ujasiri House, a free hostel for pediatric cancer patients and their families at Muhimbili National Hospital.',
    stats: [
      { value: '30+', label: 'families served daily' },
      { value: '100%', label: 'volunteer labor' },
    ],
    impactNote:
      'All funds went directly to paint and repair supplies, transforming the hostel environment for children undergoing cancer treatment.',
    images: Array.from(
      { length: 15 },
      (_, i) => `/projects/ujasiri-house/ujasiri-house-${i + 1}.jpg`
    ),
    layout: 'gallery',
  },
  {
    slug: 'beach-cleanups',
    title: 'Coastal Beach Cleanups',
    subtitle: 'Coco Beach & Msasani',
    location: 'Dar es Salaam Coast',
    description:
      'Cleared heavily polluted shorelines around Coco Beach and Msasani, sorting waste on-site for proper recycling and disposal.',
    stats: [
      { value: '150+', label: 'volunteers mobilized' },
      { value: '1.5+', label: 'tons removed' },
    ],
    impactNote:
      '3,300+ lbs of plastic, glass, and trash cleared from the coastline across multiple cleanup sessions.',
    images: [
      ...Array.from(
        { length: 4 },
        (_, i) => `/projects/beach-cleanup/beach-cleanup-${i + 1}.jpg`
      ),
      '/projects/beach-cleanup/beach-cleanup-5.png',
      '/projects/beach-cleanup/beach-cleanup-6.png',
    ],
    layout: 'horizontal',
  },
  {
    slug: 'tree-planting',
    title: 'Tree Planting: Project MYK',
    subtitle: 'Public schools',
    location: 'Dar es Salaam Schools',
    description:
      'Planted native shade and fruit trees at unshaded public schools and established student-led watering teams to keep them alive long-term.',
    stats: [
      { value: '500+', label: 'trees planted' },
      { value: '90%+', label: 'survival rate' },
    ],
    impactNote:
      'Hundreds of students benefiting through a student guardianship program. Each tree has a young caretaker.',
    images: Array.from(
      { length: 7 },
      (_, i) => `/projects/tree-planting/tree-planting-${i + 1}.jpg`
    ),
    layout: 'counter',
  },
  {
    slug: 'amsen-visits',
    title: 'AMSEN Special Needs Visits',
    subtitle: 'Al Muntazir Special Needs Center',
    location: 'Dar es Salaam',
    description:
      'Organized interactive art, music, and play sessions for students at the Al Muntazir Special Needs (AMSEN) center, creating sensory-rich experiences tailored to individual needs.',
    stats: [
      { value: '40+', label: 'students engaged' },
      { value: '100%', label: 'supplies donated' },
      { value: '25+', label: 'volunteers trained' },
    ],
    impactNote:
      "Purchased sensory art and learning supplies went entirely to the center's therapy department, sustaining activities beyond the visit itself.",
    images: Array.from(
      { length: 8 },
      (_, i) => `/projects/amsen-visits/amsen-visits-${i + 1}.jpg`
    ),
    layout: 'narrative',
  },
]

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug)
}
