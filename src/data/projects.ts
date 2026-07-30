export const TODO_JOIN_URL =
  import.meta.env.VITE_JOIN_URL ??
  'https://instagram.com/legions.tz';

export const PROGRAMMES = [
  'Cultural',
  'Education',
  'High-Rise',
  'Hospitality',
  'Leisure',
  'Mixed-Use',
  'Office',
  'Outdoor Retail',
  'Renovation',
  'Residential',
  'Shopping Mall',
  'Showroom',
  'Sports',
  'Store Design',
  'Transport',
] as const;

export const SCOPES = [
  'Architecture',
  'Façade',
  'Interiors',
  'Landscape',
  'Masterplan',
  'Model Making',
  'Wayfinding',
] as const;

export const STATUSES = [
  'Completed',
  'Concept',
  'In Progress',
  'On Site',
] as const;

export const SCALES = ['<5000', '<35000', '<100000', '>100000'] as const;

export const YEARS = Array.from({ length: 2026 - 2008 + 1 }, (_, i) => 2008 + i);

export type Programme = (typeof PROGRAMMES)[number];
export type Scope = (typeof SCOPES)[number];
export type Status = (typeof STATUSES)[number];
export type Scale = (typeof SCALES)[number];
export type FilterCategory = 'programme' | 'scope' | 'status' | 'scale' | 'year';

export interface ProjectProps {
  title: string;
  context: string;
  planning: string;
  stats: string[];
}

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
    id: 'care-home-revival',
    slug: 'care-home-revival',
    title: 'Care Home Revival & Dignity Program',
    subtitle: 'Intergenerational care, dignity and companionship',
    description:
      'A multi-week volunteer rotation across understaffed care facilities, restoring dignity through companionship, creative enrichment, and environmental upgrades.',
    context:
      'Identified understaffed facilities with minimal enrichment programming, creating dependency and despair among long-term residents.',
    planning:
      'Organized multi-week volunteer rotations, deployed art supplies, installed murals, facilitated intergenerational mentorship pairings with university students.',
    stats: [
      '120+ Elders Engaged',
      '8 Care Facilities Transformed',
      '600+ Volunteer Hours',
    ],
    images: amsenVisitsImages,
    location: 'Dar es Salaam',
    year: 2024,
    programme: ['Renovation', 'Residential'],
    scope: ['Interiors', 'Wayfinding'],
    status: ['Completed'],
    scale: '<5000',
  },
  {
    id: 'family-economic-relief',
    slug: 'family-economic-relief',
    title: 'Family Economic Relief Initiative',
    subtitle: 'Direct cash transfers and livelihood diversification',
    description:
      'A peer-to-peer safety net delivering direct mobile-money transfers and micro-skill workshops to ultra-poor families facing seasonal income collapse.',
    context:
      'Tracked ultra-poor families trapped in seasonal income collapse; single parents unable to afford food + school fees simultaneously.',
    planning:
      'Direct peer-to-peer cash transfers via mobile money, matched with micro-skill workshops (sewing, small-scale farming) for income diversification.',
    stats: [
      '340 Families Stabilized',
      '$12.5K Distributed',
      '89% Remained Above Poverty Line at 6mo. Follow-up',
    ],
    images: ramadhanProjectImages,
    location: 'Dar es Salaam',
    year: 2025,
    programme: ['Cultural'],
    scope: ['Architecture'],
    status: ['Completed'],
    scale: '<5000',
  },
  {
    id: 'public-space-greening',
    slug: 'public-space-greening',
    title: 'Public Space Reclamation & Greening',
    subtitle: 'Community-led public realm regeneration',
    description:
      'A grassroots campaign to reclaim derelict ward parks and market surrounds, transforming them into safe, green gathering spaces.',
    context:
      'Derelict ward parks and market surrounds choked with litter, broken infrastructure, zero gathering function; community safety compromised.',
    planning:
      'Mobilized 80-person volunteer teams on weekend sprints, cleared rubble, planted 400+ native trees, rebuilt public seating, installed directional wayfinding.',
    stats: [
      '5 Public Spaces Reclaimed',
      '400+ Trees Planted',
      '2,000+ Weekly Visitors',
    ],
    images: treePlantingImages,
    location: 'Dar es Salaam',
    year: 2025,
    programme: ['Leisure', 'Outdoor Retail'],
    scope: ['Landscape', 'Masterplan'],
    status: ['In Progress'],
    scale: '<35000',
  },
  {
    id: 'coastal-mangrove-restoration',
    slug: 'coastal-mangrove-restoration',
    title: 'Coastal Ecosystem & Mangrove Restoration',
    subtitle: 'Youth ranger corps and shoreline resilience',
    description:
      'A youth-led coastal restoration programme replanting mangroves, training community rangers, and reversing erosion in fishing communities.',
    context:
      'Rapid mangrove loss driving coastal erosion, fishery collapse, and methane spike; youth unemployment in fishing communities acute.',
    planning:
      'Coordinated with maritime authorities; deployed 60+ youth in weekly restoration shifts, replanted 3,000+ saplings, trained community rangers in stewardship.',
    stats: [
      '3,200 Mangroves Established',
      '60 Youth Trained as Rangers',
      '15% Erosion Reversal at Pilot Site',
    ],
    images: beachCleanupImages,
    location: 'Dar es Salaam Coast',
    year: 2025,
    programme: ['Outdoor Retail', 'Leisure'],
    scope: ['Landscape', 'Masterplan'],
    status: ['On Site'],
    scale: '<100000',
  },
  {
    id: 'civic-literacy-bootcamp',
    slug: 'civic-literacy-bootcamp',
    title: 'Civic Literacy & Digital Inclusion Bootcamp',
    subtitle: 'Rights awareness and digital skills training',
    description:
      'An 8-week bootcamp teaching civic processes, rights awareness, and essential digital tools to underserved youth and community groups.',
    context:
      'Underserved wards had near-zero civic engagement (voter registration, local budget advocacy, rights awareness); digital divide isolated vulnerable populations.',
    planning:
      'Ran 8-week cohorts in local community centers, taught civic process mapping, digital tools (Google Suite, Canva, mobile banking), facilitated peer teaching.',
    stats: [
      '120 Youth Graduated',
      '85% Digital Literacy Gain',
      '60 New Voter Registrations',
    ],
    images: ujasiriHouseImages,
    location: 'Dar es Salaam',
    year: 2026,
    programme: ['Education', 'Renovation'],
    scope: ['Interiors', 'Wayfinding'],
    status: ['Completed'],
    scale: '<5000',
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
