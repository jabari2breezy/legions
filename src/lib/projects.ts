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
  fieldLog: { time: string; message: string }[]
  compareImages?: { before: string; after: string }
  secondaryCompareImages?: { before: string; after: string }
}

export const projects: ProjectData[] = [
  {
    slug: 'ramadhan',
    title: 'The Ramadhan Project',
    subtitle: 'Citywide food drive',
    location: 'Dar es Salaam',
    description:
      '1,200+ fasting individuals reached through a citywide food drive with 100% of funds going to food procurement.',
    stats: [
      { value: '1,200+', label: 'fasting individuals reached' },
      { value: '100%', label: 'to food procurement' },
    ],
    impactNote:
      'Hampers went directly to families and local orphanages with no overhead between the fundraiser and the food.',
    images: Array.from(
      { length: 13 },
      (_, i) => `/projects/ramadhan-project/ramadhan-project-${i + 1}.jpg`
    ),
    layout: 'numbers',
    fieldLog: [
      { time: '09:10', message: 'Food pickup is in. Cars are loading now.' },
      { time: '12:40', message: 'First drop done. A few more stops left.' },
      { time: '18:05', message: 'Wrapped. Everyone is tired but good.' },
    ],
  },
  {
    slug: 'ujasiri-house',
    title: 'Ujasiri House Renovation',
    subtitle: 'Tumaini La Maisha',
    location: 'Muhimbili National Hospital',
    description:
      '30+ families served daily through a renovation powered by 100% volunteer labor.',
    stats: [
      { value: '30+', label: 'families served daily' },
      { value: '100%', label: 'volunteer labor' },
    ],
    impactNote:
      'The renovation focused on paint, repairs, and comfort for children undergoing cancer treatment and their families.',
    images: [
      '/projects/ujasiri-house/before.jpg',
      '/projects/ujasiri-house/after.jpg',
      '/projects/ujasiri-house/before2.jpg',
      '/projects/ujasiri-house/after2.jpg',
      ...Array.from(
        { length: 15 },
        (_, i) => `/projects/ujasiri-house/ujasiri-house-${i + 1}.jpg`
      ),
    ],
    layout: 'gallery',
    compareImages: {
      before: '/projects/ujasiri-house/before.jpg',
      after: '/projects/ujasiri-house/after.jpg',
    },
    secondaryCompareImages: {
      before: '/projects/ujasiri-house/before2.jpg',
      after: '/projects/ujasiri-house/after2.jpg',
    },
    fieldLog: [
      { time: '08:00', message: 'At the gate. Paint and tools are here.' },
      { time: '13:15', message: 'Walls are primed. Murals are starting.' },
      { time: '19:20', message: 'Finished the last room. We are out.' },
    ],
  },
  {
    slug: 'beach-cleanups',
    title: 'Coastal Beach Cleanups',
    subtitle: 'Coco Beach & Msasani',
    location: 'Dar es Salaam Coast',
    description:
      '150+ volunteers mobilized across Coco Beach and Msasani to remove 1.5+ tons of waste.',
    stats: [
      { value: '150+', label: 'volunteers mobilized' },
      { value: '1.5+', label: 'tons removed' },
    ],
    impactNote:
      'The shoreline work removed plastic, glass, and mixed waste across multiple cleanup sessions.',
    images: [
      ...Array.from(
        { length: 4 },
        (_, i) => `/projects/beach-cleanup/beach-cleanup-${i + 1}.jpg`
      ),
      '/projects/beach-cleanup/beach-cleanup-5.png',
      '/projects/beach-cleanup/beach-cleanup-6.png',
    ],
    layout: 'horizontal',
    fieldLog: [
      { time: '06:30', message: 'Everyone is at Coco Beach. Bags and gloves ready.' },
      { time: '10:15', message: 'Msasani section is nearly cleared.' },
      { time: '14:05', message: 'Final sweep done. Heavy bags are gone.' },
    ],
  },
  {
    slug: 'tree-planting',
    title: 'Tree Planting: Project MYK',
    subtitle: 'Public schools',
    location: 'Dar es Salaam Schools',
    description:
      '500+ trees planted with a 90%+ survival rate through school-based planting and care.',
    stats: [
      { value: '500+', label: 'trees planted' },
      { value: '90%+', label: 'survival rate' },
    ],
    impactNote:
      'Student caretakers were assigned to keep the trees alive after the planting day.',
    images: Array.from(
      { length: 7 },
      (_, i) => `/projects/tree-planting/tree-planting-${i + 1}.jpg`
    ),
    layout: 'counter',
    fieldLog: [
      { time: '07:45', message: 'Seedlings unloaded. Schools are opening up.' },
      { time: '11:30', message: 'Planting is moving fast. Kids are helping.' },
      { time: '16:00', message: 'Watering teams are assigned. Trees are in.' },
    ],
  },
  {
    slug: 'amsen-visits',
    title: 'AMSEN Special Needs Visits',
    subtitle: 'Al Muntazir Special Needs Center',
    location: 'Dar es Salaam',
    description:
      '40+ students engaged through visits where 100% of supplies were donated.',
    stats: [
      { value: '40+', label: 'students engaged' },
      { value: '100%', label: 'supplies donated' },
      { value: '25+', label: 'volunteers trained' },
    ],
    impactNote:
      'The visits focused on sensory play, shared time, and donated learning supplies for the center.',
    images: Array.from(
      { length: 8 },
      (_, i) => `/projects/amsen-visits/amsen-visits-${i + 1}.jpg`
    ),
    layout: 'narrative',
    fieldLog: [
      { time: '09:00', message: 'We are inside. Supplies handed over.' },
      { time: '11:10', message: 'Kids are locked in on the art table.' },
      { time: '13:00', message: 'Session ended well. Everyone said thank you.' },
    ],
  },
]

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug)
}
