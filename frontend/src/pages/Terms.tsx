import { Link } from 'react-router-dom'
import LegalLayout, { type LegalSection } from '../components/LegalLayout'
import { company, offices } from '../data/site'

const [hq, uk] = offices

const sections: LegalSection[] = [
  {
    id: 'about',
    title: 'About these terms',
    body: (
      <>
        <p>
          These Terms and Conditions (“Terms”) apply to every shipment you book with {company.name} (“APX”, “we”,
          “us”) and to your use of this website. By booking a shipment, handing a parcel to us or using our website, you
          agree to these Terms.
        </p>
        <p>
          “You” or “Shipper” means the person or business sending the shipment. “Receiver” means the person or
          business it is addressed to. “Shipment” means all parcels, documents and goods travelling under one tracking
          number.
        </p>
        <p>
          If any written agreement, airway bill or booking confirmation you receive from us contains different terms,
          that document applies to that shipment.
        </p>
      </>
    ),
  },
  {
    id: 'services',
    title: 'Our services',
    body: (
      <>
        <p>
          We provide international courier, freight and cargo, transportation, domestic express delivery and
          warehousing services, either directly or through trusted carriers and partners in our network.
        </p>
        <p>
          We may choose the route, carrier and method of transport that we consider best for your shipment, unless you
          have booked a specific service with us.
        </p>
      </>
    ),
  },
  {
    id: 'booking',
    title: 'Bookings, quotes and payment',
    body: (
      <>
        <ul>
          <li>Quotes are based on the information you give us — destination, service and chargeable weight.</li>
          <li>
            Chargeable weight is the higher of the actual weight and the volumetric weight (length × width × height in
            cm ÷ 5000). We may re-weigh and re-measure your shipment and adjust the price accordingly.
          </li>
          <li>Prices do not include customs duties, taxes or destination charges unless we state otherwise in writing.</li>
          <li>Payment is due at the time of booking unless you have an approved credit account with us.</li>
          <li>Extra costs caused by incorrect information, re-delivery, storage or return of a shipment are payable by you.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'responsibilities',
    title: 'Your responsibilities',
    body: (
      <>
        <p>When you send a shipment with us, you confirm that:</p>
        <ul>
          <li>The description, value, weight and contents you declare are complete and accurate.</li>
          <li>The receiver’s name, full address and phone number are correct.</li>
          <li>
            The shipment is packed properly to survive normal handling in transit — see our{' '}
            <Link to="/packaging">Packaging Guide</Link>.
          </li>
          <li>
            The shipment contains no prohibited items and complies with the laws of the origin, transit and destination
            countries — see our <Link to="/prohibited-items">Prohibited Items</Link> list.
          </li>
          <li>You have provided all documents needed for export, import and customs clearance.</li>
        </ul>
        <p>You are responsible for any loss, fines or costs we suffer because any of the above is not true.</p>
      </>
    ),
  },
  {
    id: 'prohibited',
    title: 'Prohibited and restricted items',
    body: (
      <>
        <p>
          We do not accept items listed as “Not allowed” on our <Link to="/prohibited-items">Prohibited Items</Link>{' '}
          page, including cash, weapons, explosives, drugs, flammable or dangerous goods, alcohol and tobacco products.
          Restricted items are accepted only with our prior agreement and any conditions we set.
        </p>
        <p>
          If a shipment contains prohibited items, we may refuse it, hold it, return it at your cost or hand it to the
          relevant authorities. No refund will be due in that case.
        </p>
      </>
    ),
  },
  {
    id: 'inspection',
    title: 'Inspection',
    body: (
      <p>
        We, our partners or government authorities may open and inspect any shipment at any time, without notice, for
        safety, security, customs or legal reasons.
      </p>
    ),
  },
  {
    id: 'customs',
    title: 'Customs, duties and taxes',
    body: (
      <>
        <p>
          Shipments may be subject to customs checks, duties and taxes in the destination country. Unless agreed
          otherwise, these are payable by the receiver. If the receiver refuses to pay, you agree to pay them, together
          with any storage or return costs.
        </p>
        <p>
          We may act as your agent to arrange customs clearance. Delays caused by customs authorities are outside our
          control.
        </p>
      </>
    ),
  },
  {
    id: 'delivery',
    title: 'Delivery and transit times',
    body: (
      <>
        <ul>
          <li>
            Transit times we give are estimates, not guarantees. Delays can be caused by customs, weather, airline or
            carrier schedules and other events outside our control.
          </li>
          <li>
            We deliver to the receiver’s address, not necessarily to the receiver in person. We may deliver to a
            neighbour, reception or other responsible person at that address.
          </li>
          <li>Proof of delivery may be a signature, photo or electronic record.</li>
          <li>
            If a shipment cannot be delivered, we will try to contact you. Unclaimed shipments may be returned at your
            cost or, after a reasonable time, disposed of in line with the law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Our liability',
    body: (
      <>
        <p>
          We take great care with every shipment. If a shipment is lost or damaged while in our care, our liability is
          limited to the lower of the actual cost of repair or replacement and the declared value — up to the limit
          stated in your booking confirmation or airway bill. For international air shipments, international conventions
          such as the Montreal Convention may apply and limit liability further.
        </p>
        <p>We are not liable for:</p>
        <ul>
          <li>Loss of profit, income, business or any indirect or consequential loss.</li>
          <li>Damage caused by poor packaging, the nature of the goods, or inaccurate declarations.</li>
          <li>Delays, or loss or damage caused by events outside our reasonable control.</li>
          <li>Prohibited items, or items accepted against our advice.</li>
        </ul>
        <p>
          Nothing in these Terms limits liability that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: 'claims',
    title: 'Claims',
    body: (
      <>
        <ul>
          <li>Damage or missing contents must be reported to us in writing within 7 days of delivery.</li>
          <li>Loss of a shipment must be reported to us in writing within 30 days of the booking date.</li>
          <li>
            Please keep the packaging and contents for inspection and send us your tracking number, photos, and proof of
            value such as an invoice.
          </li>
          <li>Shipping charges must be paid in full before a claim is processed.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'force-majeure',
    title: 'Events outside our control',
    body: (
      <p>
        We are not responsible for failure or delay caused by events outside our reasonable control, including natural
        disasters, extreme weather, war, unrest, strikes, pandemics, government or customs action, and airline,
        shipping-line or network disruptions.
      </p>
    ),
  },
  {
    id: 'website',
    title: 'Use of this website',
    body: (
      <>
        <p>
          Tracking information, transit estimates, calculators and other content on this website are provided for
          guidance and may not always be complete or up to date. The text, logos, images and design of this website
          belong to APX or its licensors and may not be copied without permission.
        </p>
        <p>
          How we handle your personal information is explained in our <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These Terms are governed by the laws of Pakistan, and the courts of Karachi have jurisdiction, unless the law of
        your country gives you the right to bring a claim where you live. If you are a consumer, nothing in these Terms
        affects your statutory rights.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these Terms from time to time. The version on this page on the date you book your shipment applies
        to that shipment.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        <p>
          <strong>{company.name} — {hq.label}</strong>
          <br />
          {hq.address.join(', ')}
          <br />
          {hq.phones.join(' · ')}
          {hq.email && (
            <>
              <br />
              <a href={`mailto:${hq.email}`}>{hq.email}</a>
            </>
          )}
        </p>
        <p>
          <strong>{company.name} — {uk.label}</strong>
          <br />
          {uk.address.join(', ')}
          <br />
          {uk.phones.join(' · ')}
        </p>
      </>
    ),
  },
]

export default function Terms() {
  return (
    <LegalLayout
      eyebrow="Terms & conditions"
      title="Terms and Conditions"
      intro="The terms that apply when you ship with APX International or use our website."
      updated="6 October 2026"
      sections={sections}
    />
  )
}
