import {
  Plane,
  Truck,
  Ship,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'

export const company = {
  name: 'APX International',
  tagline: 'Delivering the Best',
  since: 1990,
  email: 'info@apxlog.com',
  portalUrl: '/login',
}

export type Office = {
  country: string
  city: string
  label: string
  flag: string
  address: string[]
  phones: string[]
  email?: string
  /** International format, digits only — used for wa.me links */
  whatsapp?: string
}

export const offices: Office[] = [
  {
    country: 'Pakistan',
    city: 'Karachi',
    label: 'Head office',
    flag: 'pk',
    address: ['187/B, Block 2, P.E.C.H.S', 'Near McDonald', 'Karachi, Pakistan'],
    phones: [],
    email: 'info@apxlog.com',
  },
  {
    country: 'Pakistan',
    city: 'Karachi',
    label: 'Branch office',
    flag: 'pk',
    address: ['1/1-A, Night Square', 'Federal B Area', 'Karachi, Pakistan'],
    phones: ['+92 21 36375691', '+92 345 3177311'],
    email: 'csdapxfb@gmail.com',
    whatsapp: '923453177311',
  },
  {
    country: 'Pakistan',
    city: 'Karachi',
    label: 'Branch office',
    flag: 'pk',
    address: ['Shop 103 & 106, First Floor', 'Cliff Shopping Mall, Clifton', 'Karachi, Pakistan'],
    phones: ['+92 301 8260440', '+92 21 35164827'],
    email: 'apx.cliff@gmail.com',
  },
  {
    country: 'Pakistan',
    city: 'Faisalabad',
    label: 'Branch office',
    flag: 'pk',
    address: ['A-63, Peoples Colony (Choti-D)', 'Faisalabad, Pakistan'],
    phones: ['+92 41 8555422', '+92 41 8555423'],
    email: 'faisalabadapx@gmail.com',
  },
  {
    country: 'United Kingdom',
    city: 'London',
    label: 'Branch office',
    flag: 'gb',
    address: ['450 Bath Road, Longford', 'Heathrow, England', 'UB7 0EB'],
    phones: ['+44 7884 090724'],
    email: 'admin@apxxpress.com',
    whatsapp: '447884090724',
  },
  {
    country: 'United States',
    city: 'Kingwood',
    label: 'Branch office',
    flag: 'us',
    address: ['6109 Moody Pines Ct', 'Kingwood, TX 77345', 'United States'],
    phones: ['+1 346 213 4425'],
    email: 'admin@apxxpress.com',
  },
  {
    country: 'United Arab Emirates',
    city: 'Dubai',
    label: 'Branch office',
    flag: 'ae',
    address: ['Office # 3, Ground Floor, Al Zarouni 2 Building', 'Beirut Street, Al Qusais Industrial 5', 'Dubai, UAE'],
    phones: ['+971 52 897 3242'],
    email: 'accounts@apxexpress.ae',
  },
]

export const mapsLink = (o: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address.join(', '))}`

export const socials = {
  facebook: 'https://www.facebook.com/logisticsapx',
  instagram: 'https://www.instagram.com/apxlogistics.official',
}

export type Service = {
  slug: string
  title: string
  short: string
  description: string
  points: string[]
  icon: LucideIcon
  /** Unsplash stock photo id — swap for APX's own photography when available */
  image: string
  imagePosition?: string
  stat: { value: string; label: string }
}

export const services: Service[] = [
  {
    slug: 'international-courier',
    title: 'International Courier',
    short: 'Door-to-door express delivery to 200+ countries, faster and safer than ever.',
    description:
      'Documents, parcels and e-commerce shipments delivered door-to-door across 200+ countries. Our partner network and real-time visibility keep every package moving on schedule.',
    points: ['Express & economy options', 'Customs clearance support', 'Live shipment updates'],
    icon: Plane,
    image: '1570710891163-6d3b5c47248b',
    stat: { value: '200+', label: 'Countries delivered' },
  },
  {
    slug: 'transportation',
    title: 'Transportation',
    short: 'Reliable road transport for full and part loads across the region.',
    description:
      'A dependable fleet for full-truck and part-load movements, scheduled pickups and inter-city line hauls — planned around your timelines.',
    points: ['FTL & LTL movements', 'Scheduled pickups', 'Trained, vetted drivers'],
    icon: Truck,
    image: '1761133381018-aed5063d22fe',
    stat: { value: 'FTL · LTL', label: 'Full & part loads' },
  },
  {
    slug: 'freight-cargo',
    title: 'Freight & Cargo',
    short: 'Air and sea freight specialists since 2012 — from a pallet to full containers.',
    description:
      'Air and sea freight solutions for commercial cargo of any size. We handle booking, documentation and clearance so your goods move without friction.',
    points: ['Air & sea freight', 'FCL / LCL consolidation', 'Documentation handled'],
    icon: Ship,
    image: '1578575437130-527eed3abbec',
    stat: { value: 'Air · Sea', label: 'Freight since 2012' },
  },
  {
    slug: 'warehouse-distribution',
    title: 'Warehouse & Distribution',
    short: 'Secure storage, pick-pack and distribution to keep your stock flowing.',
    description:
      'Secure, organised storage with inventory control, pick-and-pack and onward distribution — a flexible extension of your supply chain.',
    points: ['Secure storage', 'Pick, pack & dispatch', 'Inventory reporting'],
    icon: Warehouse,
    image: '1586528116022-aeda1613c63d',
    stat: { value: 'UK · USA · CA', label: 'Own warehouses' },
  },
]

export const stats = [
  { value: 35, suffix: '+', label: 'Years of experience' },
  { value: 200, suffix: '+', label: 'Countries served' },
  { value: 1, suffix: 'M+', label: 'Parcels delivered' },
  { value: 99, suffix: '%', label: 'On-time delivery' },
]
