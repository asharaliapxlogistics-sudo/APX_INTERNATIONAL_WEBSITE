# APX International website — test cases

All tests live in this `tests/` folder, separate from the website code in `src/`.

| Folder | Tool | What it checks |
|---|---|---|
| `tests/unit/` | Vitest + Testing Library (jsdom) | Logic and components in isolation |
| `tests/e2e/` | Playwright in Google Chrome | The real production build, like a visitor would use it — on a laptop (1280×800) and a phone (375×812) |

## How to run

```bash
npm test            # unit tests
npm run test:e2e    # end-to-end tests (builds the site first)
npm run test:all    # both
```

The end-to-end HTML report is saved to `playwright-report/` (open `index.html`).

---

## Unit tests (`tests/unit/`)

### Tracking data — `mockTracking.test.ts`
| ID | Test case | Expected result |
|---|---|---|
| TC-U01 | Track the same number twice | Same shipment both times |
| TC-U02 | Track a number in lower case | Same result as upper case |
| TC-U03 | Track 200 different numbers | Always 7 events, newest first, valid status, 0–100% progress, timestamps only on completed steps |
| TC-U04 | Check origins and destinations | Never India or Dubai |
| TC-U05 | Track a delivered shipment | 100% progress, "Delivered" date |

### Tracking and contact form — `api.test.ts`
| ID | Test case | Expected result |
|---|---|---|
| TC-U06 | Track a valid number with spaces around it | Shipment found |
| TC-U07 | Track invalid numbers (empty, too short, spaces, symbols, too long) | Clear error message |
| TC-U08 | Send the contact form | Posted to Netlify Forms as `contact`, with all fields |
| TC-U09 | Contact form submission fails | Friendly "call or email us" error |

### Company data — `site.test.ts`
| ID | Test case | Expected result |
|---|---|---|
| TC-U10 | Company name | "APX International" |
| TC-U11 | Offices | Karachi head office, Clifton and Lahore branches, UK and USA — no Dubai |
| TC-U12 | Addresses and phones | All office addresses and phone numbers are correct |
| TC-U13 | WhatsApp numbers | Each matches a listed phone number |
| TC-U14 | Directions link | Valid Google Maps link with the office address |
| TC-U15 | Services | Four services, each with a unique link, photo, stat and points |

### Prohibited Items — `Prohibited.test.tsx`
| ID | Test case | Expected result |
|---|---|---|
| TC-U16 | Item counts | 21 items: 13 not allowed, 8 restricted |
| TC-U17 | Search "perfume", "mithai", "gold", "vape", "laptop" | The matching item is shown |
| TC-U18 | Filter "Not allowed" | Alcohol and tobacco listed; perfume not |
| TC-U19 | Search for something not on the list | "Isn't on our list" message and "Ask about my item" link |

### Packaging Guide — `Packaging.test.tsx`
| ID | Test case | Expected result |
|---|---|---|
| TC-U20 | Packing steps | All 6 steps shown |
| TC-U21 | Removed cards | No Liquids or Electronics cards |
| TC-U22 | Calculator: 50×40×30 cm, 8 kg | Chargeable 12.00 kg (by volume) with "smaller box" tip |
| TC-U23 | Calculator: 20×20×20 cm, 10 kg | Chargeable 10.00 kg (by actual weight) |

### Components — `components.test.tsx`
| ID | Test case | Expected result |
|---|---|---|
| TC-U24 | Tracking map, shipment in transit | Origin, destination, status and "50% of the way" |
| TC-U25 | Tracking map, delivered shipment | "Delivered", 100% |
| TC-U26 | Tracking map, unknown city | Map is hidden (no broken map) |
| TC-U27 | WhatsApp button | Opens menu with Pakistan and UK WhatsApp links and a pre-filled message |
| TC-U28 | Navbar | All main links, Resources and Customer Portal |
| TC-U29 | Services mega menu | Opens on hover with all 4 services and the quote card |
| TC-U30 | Footer | Privacy and Terms links, "Ready to ship?" CTA, no "Track a shipment" in the bottom line, copyright is the last line |

### Pages — `App.test.tsx`
| ID | Test case | Expected result |
|---|---|---|
| TC-U31 | Open every page (Home, About, Services, Tracking, Contact, Packaging, Prohibited, Terms, Privacy, Login) and an unknown URL | Each shows its own heading; unknown URL shows 404 |
| TC-U32 | Home page text | No India, Dubai or UAE |
| TC-U33 | First visit in a session | Intro splash is shown |

---

## End-to-end tests (`tests/e2e/site.spec.ts`)

Every test runs twice — once at laptop size and once at phone size.

| ID | Test case | Expected result |
|---|---|---|
| TC-E01 | Open each of the 10 pages | Page heading visible, title "APX International", no JavaScript errors |
| TC-E02 | Each of the 10 pages | No sideways scrolling |
| TC-E03 | Click About, Services, Tracking, Contact in the menu | Each page opens (uses the mobile menu on phones) |
| TC-E04 | Track APX20490 from the home page | Tracking page shows the shipment, route map ("50% of the way") and history |
| TC-E05 | Track an invalid number | "We couldn't find that shipment" |
| TC-E06 | Send the contact form empty | Browser blocks it; no "Message sent" |
| TC-E07 | Open the WhatsApp button | Pakistan and UK WhatsApp links shown |
| TC-E08 | Search "perfume" on Prohibited Items | Only "Perfume & aftershave" shown |
| TC-E09 | Calculator 50×40×30 cm, 8 kg | "12.00 kg" chargeable weight |
| TC-E10 | Hover Services in the navbar (laptop) | Mega menu opens; clicking Freight & Cargo goes to that service and closes it |
| TC-E11 | Refresh /packaging | Same page reloads (no 404) |
| TC-E12 | Check the deploy build | Netlify contact form and page-refresh redirect are included |
| TC-E13 | Open an unknown URL | 404 page; "Back to home" works |
| TC-E14 | Footer Privacy and Terms links | Both pages open |
| TC-E15 | First visit | Splash shows, then disappears and the home page is visible |
| TC-E16 | Scroll the whole home page | No broken images |
| TC-E17 | Phone menu | Lists every page including Packaging Guide and Prohibited Items; links work |
| TC-E18 | About page world map | Country names shown (Pakistan, Brazil…), no India |
| TC-E19 | Click a Services tab | Jumps to that service |
| TC-E20 | Contact page offices | Karachi, Clifton, Lahore, Heathrow and Kingwood addresses with five Google Maps links |

---

## Manual checks before going live

These need a person (or the live Netlify site) and are not automated:

| ID | Check | How |
|---|---|---|
| TC-M01 | Contact form reaches APX | On the live site, send a test message → it appears under **Forms** in Netlify and the notification email arrives |
| TC-M02 | WhatsApp opens on a phone | Tap the button on a real phone → WhatsApp opens the right chat with the message pre-filled |
| TC-M03 | Phone call links | Tap each number on a phone → dialler opens with the right number |
| TC-M04 | Smooth scrolling feel | Scroll with a mouse wheel on a laptop — smooth, not jumpy |
| TC-M05 | Real devices | Check on an iPhone (Safari) and an Android phone (Chrome) |
| TC-M06 | Content sign-off | APX confirms testimonials, statistics, IATA status, warehouse cities, FAQ, Terms and Privacy wording |

---

## Latest results — 6 October 2026

| Suite | Result |
|---|---|
| Unit tests | **51 / 51 passed** |
| End-to-end (laptop + phone) | **74 passed, 2 skipped** (TC-E10 runs on laptop only, TC-E17 on phone only) |

Issues found and fixed during testing:
- **Website bug:** on the Services page at 1280 px wide, the floating stat cards on the right poked 1 px past the screen edge, allowing a tiny sideways scroll. Fixed.
- **Test fixes (the site was correct):** TC-E09, TC-E10 and TC-E18 matched text that legitimately appears twice on the page (e.g. "12.00 kg" as both volumetric and chargeable weight). The tests were narrowed to the right element.
- End-to-end tests run one browser at a time, as two animated Chrome windows at once were too slow on this machine.
