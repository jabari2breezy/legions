export type ProjectStatus = "completed" | "ongoing" | "planned";
export type ImageOrientation = "landscape" | "portrait" | "square";

export interface ProjectImage {
  id: string;
  filename: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  orientation: ImageOrientation;
}

export interface ProjectImageGroup {
  groupId: string;
  label: string | null;
  description?: string;
  images: ProjectImage[];
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectTimeframe {
  startDate: string;
  endDate: string | null;
  displayLabel: string;
  status: ProjectStatus;
}

export interface ProjectTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  storyParagraphs: string[];
  timeframe: ProjectTimeframe;
  stats: ProjectStat[];
  heroImage: ProjectImage;
  groups: ProjectImageGroup[];
  testimonial?: ProjectTestimonial;
  relatedSlugs: string[];
}

export interface ProjectSummary {
  slug: string;
  title: string;
  category: string;
  stats: ProjectStat[];
  heroImage: {
    filename: string;
    alt: string;
  };
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: {
    filename: string;
    alt: string;
  };
}
