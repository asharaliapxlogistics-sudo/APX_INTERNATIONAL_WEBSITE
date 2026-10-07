import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Tracking from './pages/Tracking'
import Login from './pages/Login'
import Packaging from './pages/Packaging'
import Prohibited from './pages/Prohibited'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import { scrollToTop } from './lib/smoothScroll'

function SiteLayout() {
  const { pathname } = useLocation()
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) scrollToTop()
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <SplashScreen />
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/packaging" element={<Packaging />} />
          <Route path="/prohibited-items" element={<Prohibited />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
