import {
  Plane,
  Truck,
  Ship,
  PackageCheck,
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
    address: ['1/1-A, Night Square', 'Federal B Area', 'Karachi, Pakistan'],
    phones: ['+92 21 36375691', '+92 345 3177311'],
    email: 'info@apxlog.com',
    whatsapp: '923453177311',
  },
  {
    country: 'Pakistan',
    city: 'Karachi',
    label: 'Clifton branch',
    flag: 'pk',
    address: ['Shop 103 & 106, First Floor', 'Cliff Shopping Mall, Clifton', 'Karachi, Pakistan'],
    phones: ['+92 301 8260440', '+92 21 35164827', '+92 21 36375691'],
    email: 'apx.cliff@gmail.com',
  },
  {
    country: 'Pakistan',
    city: 'Lahore',
    label: 'Lahore branch',
    flag: 'pk',
    address: ["LG 16, Zamin Centre, Faletti's Express", 'Davis Road, Shimla Pahari', 'Lahore, Pakistan'],
    phones: ['+92 322 2049615', '+92 42 36374800'],
  },
  {
    country: 'United Kingdom',
    city: 'London',
    label: 'UK office',
    flag: 'gb',
    address: ['450 Bath Road, Longford', 'Heathrow, England', 'UB7 0EB'],
    phones: ['+44 7884 090724'],
    whatsapp: '447884090724',
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
    slug: 'domestic-express',
    title: 'Domestic Express',
    short: 'Fast last-mile delivery of international imports across the country.',
    description:
      'Once your international imports land, we take them the last mile — express nationwide delivery with proof of delivery on every shipment.',
    points: ['Nationwide coverage', 'Proof of delivery', 'Cash-on-delivery support'],
    icon: PackageCheck,
    image: '1638501478003-4e9761dcfe22',
    imagePosition: 'center 85%',
    stat: { value: 'Nationwide', label: 'Last-mile delivery' },
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
