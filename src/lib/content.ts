import fs from 'fs'
import path from 'path'

export type SiteContent = {
  site: {
    brandLine: string
    heroHeadline: string
    heroSubhead: string
    footerEmail: string
    footerSocialHandle: string
    footerCopyrightText: string
  }
  pages: {
    home: {
      problemEyebrow: string
      problemTitle: string
      problemBody: string
      whoEyebrow: string
      whoTitle: string
      whoBody: string
      howEyebrow: string
      howTitle: string
      howIntro: string
      pillars: { title: string; body: string }[]
      proofEyebrow: string
      proofTitle: string
      ctaHeadline: string
      ctaBody: string
    }
    about: {
      mission: string
      tenets: { title: string; body: string }[]
      timeline: { year: string; title: string; description: string }[]
    }
    work: {
      intro: string
      principles: { title: string; description: string }[]
    }
    join: { title: string; intro: string; formHeading: string; formBody: string }
    volunteer: { title: string; intro: string; formHeading: string; formBody: string }
  }
  projects: {
    slug: string
    title: string
    subtitle: string
    location: string
    category: string
    description: string
    impactNote: string
    stats: { value: string; label: string }[]
    images: string[]
    compareImages?: { before: string; after: string }
    fieldLog: { time: string; message: string }[]
  }[]
}

const contentPath = path.join(process.cwd(), 'src', 'content', 'site.json')

export function getDefaultContent(): SiteContent {
  return {
    site: {
      brandLine: 'For the ones who show up.',
      heroHeadline: 'LEGIONS',
      heroSubhead: 'For the youth who inspire',
      footerEmail: 'hello@legions.tz',
      footerSocialHandle: '@legions.tz',
      footerCopyrightText: '© 2026 Legions Tz · Dar es Salaam, Tanzania',
    },
    pages: {
      home: {
        problemEyebrow: 'Why this work exists',
        problemTitle:
          'Overflowing waste on public beaches. Families missing meals during Ramadhan. Schools that need shade, trees, and care.',
        problemBody:
          'The five projects on this site answer those exact conditions, one piece of visible work at a time.',
        whoEyebrow: 'Who we are',
        whoTitle: 'Who We Are',
        whoBody:
          'Legions moves where the need is visible: patched up walls, cleared shorelines, trees in the ground, families with one less thing to worry about. No hierarchy. No waiting on permission. Just students, graduates, and young professionals putting their hands where the problem is.',
        howEyebrow: 'How we move',
        howTitle: 'Hands in. Overhead out.',
        howIntro:
          'We keep the structure light so the work stays honest. Every shilling goes straight to materials, food, tools, and supplies. Nothing sits in an account.',
        pillars: [
          {
            title: 'Direct labor',
            body: "If a wall needs painting or a beach needs clearing, you'll find Legions members doing it themselves, not managing someone else who is.",
          },
          {
            title: 'No hierarchy',
            body: 'People lead by showing up, not by title. No gatekeepers, no approval chains, no waiting for a meeting.',
          },
          {
            title: 'Peer fundraising',
            body: 'Micro donations move through M-Pesa and Tigo Pesa in minutes, tracked in public, spent within days.',
          },
        ],
        proofEyebrow: 'No spin. Just receipts.',
        proofTitle: 'Proof of work',
        ctaHeadline: 'Bring hands, not status.',
        ctaBody:
          "Want to volunteer, donate, or help document the work? Tell us what you've got, we'll plug you into whatever's next.",
      },
      about: {
        mission:
          'Legions moves where the need is visible and keeps the response close to the ground.',
        tenets: [
          { title: 'Youth-Centric Leadership', body: 'The organization relies heavily on the energy, fresh perspectives, and leadership of its student members to plan and execute its goals. It transforms empathy into tangible, hands-on action.' },
          { title: 'Collaborative Action', body: 'Legions does not operate in a silo. A core part of its strategy involves collaborating with like-minded organizations, pooling resources, and expanding its network to maximize its footprint across Dar es Salaam.' },
          { title: 'Operational Agility', body: 'Because the club is powered entirely by high school and university students, it can mobilize quickly for rapid response community needs and sustained campaigns. Over 139 student volunteers have contributed more than 2,600 hours of service.' },
        ],
        timeline: [
          { year: '2023', title: 'Organized in Dar', description: 'Legions took shape around student-led community service.' },
          { year: '2024', title: 'Grew the base', description: 'More volunteers joined, projects expanded, and the work became more visible.' },
          { year: '2025', title: 'Built consistency', description: 'The team deepened partnerships and kept showing up across the city.' },
        ],
      },
      work: {
        intro:
          'The structure stays light so the work can stay honest, visible, and fast.',
        principles: [
          {
            title: 'Direct Labor',
            description:
              "If a wall needs painting or a beach needs clearing, you'll find Legions members doing it themselves, not managing someone else who is.",
          },
          {
            title: 'No Ego or Hierarchy',
            description:
              'People lead by showing up, not by title. No gatekeepers, no approval chains, no waiting for a meeting.',
          },
          {
            title: 'Peer Fundraising',
            description:
              'Micro donations move through M-Pesa and Tigo Pesa in minutes, tracked in public, spent within days.',
          },
        ],
      },
      join: {
        title: 'Bring your name, email, and reason.',
        intro: 'Add your full name, email, and why you want in. We will follow up with the right next step.',
        formHeading: 'Name, email, why.',
        formBody: 'Use this quick form if you want to volunteer, donate, or help document the work.',
      },
      volunteer: {
        title: 'Sign up to show up.',
        intro: 'Add your name, email, and a short note about why you want in.',
        formHeading: 'New volunteer signup',
        formBody: 'This page is just for new volunteers. Send your details and we will place you where the work is happening.',
      },
    },
    projects: [],
  }
}

export function readContent(): SiteContent {
  try {
    const raw = fs.readFileSync(contentPath, 'utf8')
    return JSON.parse(raw) as SiteContent
  } catch {
    return getDefaultContent()
  }
}

export function writeContent(content: SiteContent) {
  fs.mkdirSync(path.dirname(contentPath), { recursive: true })
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2))
}
