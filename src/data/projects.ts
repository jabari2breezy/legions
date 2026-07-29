export const TODO_JOIN_URL =
  import.meta.env.VITE_JOIN_URL ??
  'https://instagram.com/legions.tz';

export interface ProjectProps {
  title: string;
  context: string;
  planning: string;
  stats: string[];
}

export const projects: ProjectProps[] = [
  {
    title: 'Care Home Revival & Dignity Program',
    context:
      'Identified understaffed facilities with minimal enrichment programming, creating dependency and despair among long-term residents.',
    planning:
      'Organized multi-week volunteer rotations, deployed art supplies, installed murals, facilitated intergenerational mentorship pairings with university students.',
    stats: [
      '120+ Elders Engaged',
      '8 Care Facilities Transformed',
      '600+ Volunteer Hours',
    ],
  },
  {
    title: 'Family Economic Relief Initiative',
    context:
      'Tracked ultra-poor families trapped in seasonal income collapse; single parents unable to afford food + school fees simultaneously.',
    planning:
      'Direct peer-to-peer cash transfers via mobile money, matched with micro-skill workshops (sewing, small-scale farming) for income diversification.',
    stats: [
      '340 Families Stabilized',
      '$12.5K Distributed',
      '89% Remained Above Poverty Line at 6mo. Follow-up',
    ],
  },
  {
    title: 'Public Space Reclamation & Greening',
    context:
      'Derelict ward parks and market surrounds choked with litter, broken infrastructure, zero gathering function; community safety compromised.',
    planning:
      'Mobilized 80-person volunteer teams on weekend sprints, cleared rubble, planted 400+ native trees, rebuilt public seating, installed directional wayfinding.',
    stats: [
      '5 Public Spaces Reclaimed',
      '400+ Trees Planted',
      '2,000+ Weekly Visitors',
    ],
  },
  {
    title: 'Coastal Ecosystem & Mangrove Restoration',
    context:
      'Rapid mangrove loss driving coastal erosion, fishery collapse, and methane spike; youth unemployment in fishing communities acute.',
    planning:
      'Coordinated with maritime authorities; deployed 60+ youth in weekly restoration shifts, replanted 3,000+ saplings, trained community rangers in stewardship.',
    stats: [
      '3,200 Mangroves Established',
      '60 Youth Trained as Rangers',
      '15% Erosion Reversal at Pilot Site',
    ],
  },
  {
    title: 'Civic Literacy & Digital Inclusion Bootcamp',
    context:
      'Underserved wards had near-zero civic engagement (voter registration, local budget advocacy, rights awareness); digital divide isolated vulnerable populations.',
    planning:
      'Ran 8-week cohorts in local community centers, taught civic process mapping, digital tools (Google Suite, Canva, mobile banking), facilitated peer teaching.',
    stats: [
      '120 Youth Graduated',
      '85% Digital Literacy Gain',
      '60 New Voter Registrations',
    ],
  },
];
