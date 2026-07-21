export const projects = [
  {
    id: 'tree-planting',
    title: 'School Botanical Gardens & Tree Planting',
    description: 'Established botanical gardens in two public schools across Dar es Salaam, planting 2,000+ native trees and creating living classrooms for environmental education. Students maintain the gardens as part of their curriculum, learning about biodiversity, climate action, and sustainable agriculture.',
    mainImage: '/images/programs-environmental.jpg',
    galleryImages: [
      { src: '/images/programs-environmental.jpg', alt: 'Students planting trees in school garden' },
      { src: '/images/impact-botanical-garden.jpg', alt: 'Established botanical garden at public school' },
    ],
    stats: [
      { label: 'Trees Planted', value: '2,000+' },
      { label: 'Schools', value: '2' },
      { label: 'Student Gardeners', value: '150+' },
    ],
  },
  {
    id: 'ujasiri-house',
    title: 'Ujasiri House Renovation',
    description: 'Complete renovation of the childhood cancer ward (Ujasiri House) at Muhimbili National Hospital. Transformed a neglected space into a healing environment with fresh paint, new beds, play areas, and medical equipment upgrades. The ward now serves 50+ young patients monthly in dignity and comfort.',
    mainImage: '/images/impact-ujasiri-house.jpg',
    galleryImages: [
      { src: '/images/impact-ujasiri-house.jpg', alt: 'Renovated Ujasiri House interior' },
    ],
    stats: [
      { label: 'Patients Served Monthly', value: '50+' },
      { label: 'Ward Capacity', value: '24 Beds' },
      { label: 'Renovation Year', value: '2024' },
    ],
  },
  {
    id: 'pwani-well',
    title: 'Pwani Region Water Well',
    description: 'Constructed a deep borehole well with solar-powered pump in a rural village in Pwani Region, providing clean, reliable water access to a community that previously walked 5km daily for contaminated water. The well serves 300+ families and includes a water committee for maintenance.',
    mainImage: '/images/impact-water-well.jpg',
    galleryImages: [
      { src: '/images/impact-water-well.jpg', alt: 'Solar-powered water well in Pwani Region' },
    ],
    stats: [
      { label: 'Families Served', value: '300+' },
      { label: 'Water Access', value: '24/7' },
      { label: 'Distance Reduced', value: '5km → 0m' },
    ],
  },
  {
    id: 'ramadan-iftar',
    title: 'Annual Ramadan Iftar for Orphans',
    description: 'Third annual Ramadan Iftar gathering serving 550+ orphaned children across Dar es Salaam. More than a meal, it\'s a celebration of community belonging — each child receives new clothes, hygiene kits, school supplies, and the experience of breaking fast together in joy and dignity.',
    mainImage: '/images/impact-ramadan-iftar.jpg',
    galleryImages: [
      { src: '/images/impact-ramadan-iftar.jpg', alt: 'Ramadan Iftar gathering for orphans' },
      { src: '/images/impact-orphan-support.jpg', alt: 'Children receiving hygiene kits and supplies' },
    ],
    stats: [
      { label: 'Children Served', value: '550+' },
      { label: 'Years Running', value: '3' },
      { label: 'Hygiene Kits Distributed', value: '550+' },
    ],
  },
  {
    id: 'ration-packages',
    title: 'Family Ration Packages',
    description: 'Monthly distribution of food ration packages to vulnerable families in informal settlements across Dar es Salaam. Each package provides a month of staple nutrition (rice, beans, oil, flour) for a family of six. Distribution is student-volunteer led with partner organizations for verification and reach.',
    mainImage: '/images/impact-hygiene-kits.jpg',
    galleryImages: [
      { src: '/images/impact-orphan-support.jpg', alt: 'Volunteers distributing ration packages' },
      { src: '/images/impact-hygiene-kits.jpg', alt: 'Food packages ready for distribution' },
    ],
    stats: [
      { label: 'Families Monthly', value: '150' },
      { label: 'People Fed Monthly', value: '900+' },
      { label: 'Volunteer Hours/Month', value: '200+' },
    ],
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

export function getProjectIndex(id) {
  return projects.findIndex((p) => p.id === id);
}