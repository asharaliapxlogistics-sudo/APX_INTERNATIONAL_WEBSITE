import { Link } from 'react-router-dom'
import LegalLayout, { type LegalSection } from '../components/LegalLayout'
import { company, offices } from '../data/site'

const hq = offices[0]
const uk = offices.find((o) => o.country === 'United Kingdom')!

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          {company.name} (“APX”, “we”, “us”) is a courier and logistics company with its head office in Karachi,
          Pakistan and an office in the United Kingdom. We are responsible for the personal information described in
          this policy.
        </p>
        <p>
          This policy explains what personal information we collect when you use our website or our services, why we
          collect it, and the choices and rights you have.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'Information we collect',
    body: (
      <>
        <p>
          <strong>Information you give us</strong>
        </p>
        <ul>
          <li>Contact form: your name, email address, phone number, the service you’re interested in and your message.</li>
          <li>
            Bookings: sender and receiver names, addresses, phone numbers and email addresses, and details of the
            shipment such as contents, weight, value and customs documents.
          </li>
          <li>Messages you send us by email, phone or WhatsApp.</li>
          <li>Payment and billing details needed to invoice your shipments.</li>
        </ul>
        <p>
          <strong>Information collected automatically</strong>
        </p>
        <ul>
          <li>
            Technical information such as your IP address, browser type and the pages you visit, which our hosting
            provider records in server logs.
          </li>
          <li>Tracking numbers you enter on our Tracking page.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    body: (
      <ul>
        <li>To reply to your enquiries and send you quotes.</li>
        <li>To collect, transport, clear through customs and deliver your shipments.</li>
        <li>To share shipment updates and handle claims and complaints.</li>
        <li>To invoice you and keep accounting records.</li>
        <li>To meet legal obligations, including customs, tax and security requirements.</li>
        <li>To keep our website secure and improve our services.</li>
      </ul>
    ),
  },
  {
    id: 'legal-basis',
    title: 'Legal basis for using your information',
    body: (
      <>
        <p>
          Where UK data protection law (the UK GDPR) applies, we rely on the following legal bases:
        </p>
        <ul>
          <li>
            <strong>Contract</strong> — to provide the shipping services you book, or to take steps you ask for before
            booking, such as a quote.
          </li>
          <li>
            <strong>Legal obligation</strong> — to meet customs, tax, accounting and security requirements.
          </li>
          <li>
            <strong>Legitimate interests</strong> — to run and improve our business, keep our website secure and reply
            to enquiries, where this does not override your rights.
          </li>
          <li>
            <strong>Consent</strong> — where we ask for it, for example before sending you marketing messages. You can
            withdraw consent at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    body: (
      <>
        <p>We never sell your personal information. We share it only where needed to provide our services:</p>
        <ul>
          <li>Airlines, shipping lines, delivery partners and carriers that move your shipment.</li>
          <li>Customs and other government authorities, where required by law.</li>
          <li>
            Service providers that help us run our business — for example our website host (Netlify), which also
            receives contact-form submissions, and email and messaging providers.
          </li>
          <li>Legal advisers and auditors, where necessary.</li>
          <li>Law enforcement or regulators, where we are legally required to.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'transfers',
    title: 'International transfers',
    body: (
      <p>
        Because we ship internationally, your information is shared between our offices in Pakistan and the United
        Kingdom and with partners in the destination country of your shipment. Some of our service providers are based in
        the United States. Where UK law applies, we take steps to make sure your information stays protected when it is
        transferred, such as using approved contract terms.
      </p>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-party content and links',
    body: (
      <>
        <p>
          To display this website, your browser loads fonts from Google Fonts and some images, videos and flag icons from
          other content providers. These providers receive your IP address so they can send the content to your browser.
        </p>
        <p>
          If you click our WhatsApp button, you leave our website and WhatsApp’s own privacy policy applies to your
          conversation. Links to Facebook and Instagram are covered by those platforms’ policies.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and local storage',
    body: (
      <p>
        We do not use advertising or tracking cookies. Our website stores a small setting in your browser’s session
        storage so the opening animation is shown only once per visit. It is deleted when you close your browser. If we
        add analytics or other cookies in future, we will update this policy and ask for your consent where required.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: (
      <p>
        We keep enquiry messages for as long as needed to respond and follow up, normally no longer than two years.
        Shipment, customs and billing records are kept for as long as required by tax, customs and accounting laws,
        and then securely deleted.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'How we protect it',
    body: (
      <p>
        We use appropriate technical and organisational measures to protect your information, including secure (HTTPS)
        connections and limiting access to staff who need it. No system is completely secure, so please contact us
        straight away if you think your information has been misused.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Ask for a copy of the personal information we hold about you.</li>
          <li>Ask us to correct information that is wrong or incomplete.</li>
          <li>Ask us to delete your information, where we no longer need to keep it.</li>
          <li>Object to, or ask us to restrict, how we use your information.</li>
          <li>Ask us to transfer your information to another organisation.</li>
          <li>Withdraw consent at any time, where we rely on consent.</li>
        </ul>
        <p>
          To use any of these rights, contact us using the details below. We will reply within one month. If you are in
          the UK and are unhappy with how we handle your information, you can complain to the Information Commissioner’s
          Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a>.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: <p>Our services are intended for adults. We do not knowingly collect information from children under 16.</p>,
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. The latest version will always be on this page, with the date it
        was last updated. Please also read our <Link to="/terms">Terms and Conditions</Link>.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        <p>For any privacy question or request, contact us at:</p>
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

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Privacy policy"
      title="Privacy Policy"
      intro="How APX International collects, uses and protects your personal information."
      updated="6 October 2026"
      sections={sections}
    />
  )
}
