export const colors = {
  bgDeep: '#1A1147',
  bgMid: '#2B1B7A',
  bgViolet: '#3D2FA8',
  accentCyan: '#4DE8D4',
  accentBlue: '#4361EE',
  white: '#FFFFFF',
} as const;

export const easings = {
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  outPower4: 'cubic-bezier(0.25, 1, 0.5, 1)',
  menu: 'cubic-bezier(0.77, 0, 0.18, 1)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
} as const;

export const timing = {
  sectionTransition: 1.1,
  navTransition: 0.4,
  cardHover: 0.5,
  magneticDuration: 0.4,
  magneticReturn: 0.6,
  staggerBase: 0.08,
  staggerParagraph: 0.15,
  counterDuration: 1.6,
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const sectionIndices = {
  home: 0,
  about: 1,
  projects: 2,
  contact: 3,
} as const;

export const sectionHashes = {
  0: 'home',
  1: 'about',
  2: 'projects',
  3: 'contact',
} as const;