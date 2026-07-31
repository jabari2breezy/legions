export const TODO_JOIN_URL =
  import.meta.env.VITE_JOIN_URL ??
  'https://instagram.com/legions.tz';

export const PROGRAMMES = [
  'AMSEN Visits',
  'Ujasiri House renovation',
  'Ramadhan project',
  'Tree planting',
  'Beach cleanup',
] as const;

export const SCOPES = [
  'Social Inclusion',
  'Environmental Stewardship',
  'Facility Improvement',
  'Food Security',
  'Greening',
] as const;

export const STATUSES = ['Completed', 'Ongoing'] as const;

export const SCALES = ['Local', 'District', 'Coastal'] as const;

export const YEARS = [2024, 2025, 2026] as const;

export type Programme = (typeof PROGRAMMES)[number];
export type Scope = (typeof SCOPES)[number];
export type Status = (typeof STATUSES)[number];
export type Scale = (typeof SCALES)[number];
export type FilterCategory = 'programme' | 'scope' | 'status' | 'scale' | 'year';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  context: string;
  planning: string;
  stats: string[];
  images: string[];
  location: string;
  year: number;
  programme: Programme[];
  scope: Scope[];
  status: Status[];
  scale: Scale;
}

const amsenVisitsImages = [
  '/projects/amsen-visits/amsen-visits-1.jpg',
  '/projects/amsen-visits/amsen-visits-2.jpg',
  '/projects/amsen-visits/amsen-visits-3.jpg',
  '/projects/amsen-visits/amsen-visits-4.jpg',
  '/projects/amsen-visits/amsen-visits-5.jpg',
  '/projects/amsen-visits/amsen-visits-6.jpg',
  '/projects/amsen-visits/amsen-visits-7.jpg',
  '/projects/amsen-visits/amsen-visits-8.jpg',
];

const ramadhanProjectImages = [
  '/projects/ramadhan-project/ramadhan-project-1.jpg',
  '/projects/ramadhan-project/ramadhan-project-2.jpg',
  '/projects/ramadhan-project/ramadhan-project-3.jpg',
  '/projects/ramadhan-project/ramadhan-project-4.jpg',
  '/projects/ramadhan-project/ramadhan-project-5.jpg',
  '/projects/ramadhan-project/ramadhan-project-6.jpg',
  '/projects/ramadhan-project/ramadhan-project-7.jpg',
  '/projects/ramadhan-project/ramadhan-project-8.jpg',
  '/projects/ramadhan-project/ramadhan-project-9.jpg',
  '/projects/ramadhan-project/ramadhan-project-10.jpg',
  '/projects/ramadhan-project/ramadhan-project-11.jpg',
  '/projects/ramadhan-project/ramadhan-project-12.jpg',
  '/projects/ramadhan-project/ramadhan-project-13.jpg',
];

const treePlantingImages = [
  '/projects/tree-planting/tree-planting-1.jpg',
  '/projects/tree-planting/tree-planting-2.jpg',
  '/projects/tree-planting/tree-planting-3.jpg',
  '/projects/tree-planting/tree-planting-4.jpg',
  '/projects/tree-planting/tree-planting-5.jpg',
  '/projects/tree-planting/tree-planting-6.jpg',
  '/projects/tree-planting/tree-planting-7.jpg',
];

const beachCleanupImages = [
  '/projects/beach-cleanup/beach-cleanup-1.jpg',
  '/projects/beach-cleanup/beach-cleanup-2.jpg',
  '/projects/beach-cleanup/beach-cleanup-3.jpg',
  '/projects/beach-cleanup/beach-cleanup-4.jpg',
  '/projects/beach-cleanup/beach-cleanup-5.png',
  '/projects/beach-cleanup/beach-cleanup-6.png',
];

const ujasiriHouseImages = [
  '/projects/ujasiri-house/ujasiri-house-1.jpg',
  '/projects/ujasiri-house/ujasiri-house-2.jpg',
  '/projects/ujasiri-house/ujasiri-house-3.jpg',
  '/projects/ujasiri-house/ujasiri-house-4.jpg',
  '/projects/ujasiri-house/ujasiri-house-5.jpg',
  '/projects/ujasiri-house/ujasiri-house-6.jpg',
  '/projects/ujasiri-house/ujasiri-house-7.jpg',
  '/projects/ujasiri-house/ujasiri-house-8.jpg',
  '/projects/ujasiri-house/ujasiri-house-9.jpg',
  '/projects/ujasiri-house/ujasiri-house-10.jpg',
  '/projects/ujasiri-house/ujasiri-house-11.jpg',
  '/projects/ujasiri-house/ujasiri-house-12.jpg',
  '/projects/ujasiri-house/ujasiri-house-13.jpg',
  '/projects/ujasiri-house/ujasiri-house-14.jpg',
  '/projects/ujasiri-house/ujasiri-house-15.jpg',
];

export const projects: Project[] = [
  {
    id: 'amsen-visits',
    slug: 'amsen-visits',
    title: 'AMSEN Visits',
    subtitle: 'Inclusive companionship for neurodivergent students',
    description:
      'Regular youth-led visits to the Al Muntazir Special Needs (AMSEN) center, bringing creative arts, sensory-friendly games, and genuine peer companionship to students with special needs.',
    context:
      'Children with neurodivergence and special physical or intellectual needs in Dar-es-Salaam often face social isolation due to lingering societal stigma and a lack of inclusive youth-led community interaction. Legions Tz recognized that institutional care needs to be complemented by genuine human connection, social integration, and peer companionship.',
    planning:
      'The team held consultations with AMSEN administrators and specialized educators to understand sensory profiles, mobility needs, and comfort levels. Members prepared through inclusive engagement workshops, then planned sensory-friendly itineraries featuring creative arts, crafts, interactive music, and gentle physical games. Fundraising supplied specialized art supplies, educational toys, and individual gift packages left as permanent donations to the center.',
    stats: [
      '40+ Special Needs Students Engaged',
      '100% Resource Donation to Therapy Department',
      '25+ Youth Volunteers Trained in Inclusive Civic Action',
    ],
    images: amsenVisitsImages,
    location: 'Dar es Salaam',
    year: 2024,
    programme: ['AMSEN Visits'],
    scope: ['Social Inclusion'],
    status: ['Completed'],
    scale: 'Local',
  },
  {
    id: 'beach-cleanup',
    slug: 'beach-cleanup',
    title: 'Beach Cleanups',
    subtitle: 'Youth-driven coastal restoration and marine protection',
    description:
      'Grassroots beach cleanups along Dar-es-Salaam coastline that remove tons of plastic waste, protect marine wildlife, and restore public coastal spaces for safe community use.',
    context:
      'Rapid urban growth along Dar-es-Salaam\'s coastline has led to severe plastic accumulation, endangering marine wildlife and degrading public coastal spaces. Driven by the urgent need for localized environmental stewardship, Legions Tz stepped in to address marine pollution directly through grassroots youth action.',
    planning:
      'Planning began with site reconnaissance to identify heavily polluted coastal sections and coordinate permissions with municipal beach governance committees. Digital recruitment rallied youth volunteers and micro-sponsors. The team procured biodegradable waste bags, gloves, safety equipment, trash pickers, and hydration stations, then established on-site waste-sorting streams and partnered with local waste collectors for proper recycling.',
    stats: [
      '1.5+ Tons of Waste Removed',
      '150+ Volunteers Mobilized',
      'Kilometers of Coastline Restored',
    ],
    images: beachCleanupImages,
    location: 'Dar es Salaam Coast',
    year: 2025,
    programme: ['Beach cleanup'],
    scope: ['Environmental Stewardship'],
    status: ['Ongoing'],
    scale: 'Coastal',
  },
  {
    id: 'ramadhan-project',
    slug: 'ramadhan-project',
    title: 'Ramadhan Project',
    subtitle: 'Dignified food security for fasting families',
    description:
      'A Ramadan initiative delivering bulk food hampers and Iftar provisions directly to underprivileged households, orphanages, and families supporting sick relatives in hospitals.',
    context:
      'During the holy month of Ramadan, underprivileged households, local orphanages, and families supporting sick relatives in hospitals face severe economic strain due to rising food prices. Legions Tz initiated the Ramadhan Project to uphold values of charity and mutual aid.',
    planning:
      'Community needs assessments identified underfunded orphanages, pediatric long-term care stays, and low-income families. Peer-to-peer digital fundraising and mobile money drives collected micro-donations. Members negotiated directly with wholesale suppliers to maximize purchasing power for rice, flour, oil, sugar, dates, and dry rations, then packed and hand-delivered balanced hampers along pre-mapped distribution routes.',
    stats: [
      '1,200+ Individuals & Fasting Families Supported',
      'Multiple Orphanages & Care Facilities Reached',
      '100% Direct Allocation — Zero Admin Overhead',
    ],
    images: ramadhanProjectImages,
    location: 'Dar es Salaam',
    year: 2025,
    programme: ['Ramadhan project'],
    scope: ['Food Security'],
    status: ['Completed'],
    scale: 'District',
  },
  {
    id: 'tree-planting',
    slug: 'tree-planting',
    title: 'Tree Planting',
    subtitle: 'Maboresho Ya Kijani / Project MYK',
    description:
      'Urban greening and school planting drives that combat heat islands, improve air quality, and create shaded learning environments through native saplings and student guardianship.',
    context:
      'Urban heat island effects and rapid deforestation in Dar-es-Salaam leave many public schools and community spaces barren, exposed to extreme heat, and lacking natural shade. As part of Maboresho Ya Kijani (Green Improvements), Legions Tz sought to combat local climate vulnerability and create eco-friendly learning environments.',
    planning:
      'The team surveyed public school grounds lacking green cover, partnered with horticultural nurseries and environmental organizations to select resilient native shade and fruit saplings, and prepared soil, tools, and organic fertilizer. Student-led tree-guardianship agreements assigned watering and maintenance responsibilities to guarantee high survival rates.',
    stats: [
      '500+ Trees Planted',
      '90%+ Survival Rate via Student Guardianship',
      'Hundreds of Students Benefiting from Shade',
    ],
    images: treePlantingImages,
    location: 'Dar es Salaam',
    year: 2025,
    programme: ['Tree planting'],
    scope: ['Greening'],
    status: ['Completed'],
    scale: 'District',
  },
  {
    id: 'ujasiri-house-renovation',
    slug: 'ujasiri-house-renovation',
    title: 'Ujasiri House Renovation',
    subtitle: 'Ujasiri Revamped — a therapeutic home for healing',
    description:
      'A full revitalization of the Ujasiri House hostel, providing free housing and psycho-social support for pediatric cancer patients and caregivers, through paint, plaster, and therapeutic murals.',
    context:
      'The Ujasiri House, operated by Tumaini La Maisha (TLM), offers free housing, meals, and psycho-social support to pediatric cancer patients and their caregivers during multi-month treatment cycles at Muhimbili National Hospital. Years of continuous use had left the facility worn, faded, and sterile.',
    planning:
      'Multi-stage site surveys alongside TLM staff assessed wall damage, painting requirements, and spatial design needs. A dedicated fundraising campaign secured high-grade, non-toxic paints, plaster, brushes, and repair supplies. Members designed child-friendly mural concepts and color schemes for therapeutic pediatric environments, then executed scraping, plastering, priming, and hand-painted murals across living quarters and play areas.',
    stats: [
      '30+ Families Hosted Daily / Hundreds Annually',
      '100% Sweat-Equity Efficiency',
      'Complete Interior/ Exterior Spatial Transformation',
    ],
    images: ujasiriHouseImages,
    location: 'Dar es Salaam',
    year: 2026,
    programme: ['Ujasiri House renovation'],
    scope: ['Facility Improvement'],
    status: ['Completed'],
    scale: 'Local',
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectsMatchingFilters(
  activeFilters: Record<FilterCategory, string[]>
): Project[] {
  return projects.filter((project) => {
    const programmeMatch =
      activeFilters.programme.length === 0 ||
      activeFilters.programme.some((value) => project.programme.includes(value as Programme));
    const scopeMatch =
      activeFilters.scope.length === 0 ||
      activeFilters.scope.some((value) => project.scope.includes(value as Scope));
    const statusMatch =
      activeFilters.status.length === 0 ||
      activeFilters.status.some((value) => project.status.includes(value as Status));
    const scaleMatch =
      activeFilters.scale.length === 0 ||
      activeFilters.scale.includes(project.scale);
    const yearMatch =
      activeFilters.year.length === 0 ||
      activeFilters.year.includes(String(project.year));

    return programmeMatch && scopeMatch && statusMatch && scaleMatch && yearMatch;
  });
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterSection {
  category: FilterCategory;
  label: string;
  options: FilterOption[];
}

export const FILTER_SECTIONS: FilterSection[] = [
  { category: 'programme', label: 'Project', options: PROGRAMMES.map((value) => ({ value, label: value, count: countByCategory('programme', value) })) },
  { category: 'scope', label: 'Scope', options: SCOPES.map((value) => ({ value, label: value, count: countByCategory('scope', value) })) },
  { category: 'status', label: 'Status', options: STATUSES.map((value) => ({ value, label: value, count: countByCategory('status', value) })) },
  { category: 'scale', label: 'Scale', options: SCALES.map((value) => ({ value, label: value, count: countByCategory('scale', value) })) },
  { category: 'year', label: 'Year', options: YEARS.map((value) => ({ value: String(value), label: String(value), count: countByCategory('year', String(value)) })) },
];

function countByCategory(category: FilterCategory, value: string): number {
  return projects.filter((project) => {
    if (category === 'scale') return project.scale === value;
    if (category === 'year') return String(project.year) === value;
    const key = category as keyof Project;
    const field = project[key];
    return Array.isArray(field) && field.includes(value as never);
  }).length;
}
