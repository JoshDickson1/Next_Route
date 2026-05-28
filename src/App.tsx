import { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { I18nProvider } from '@/providers/I18nProvider'
import { useLenis } from '@/hooks/useLenis'
import { getLenis } from '@/lib/lenis'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { LoadingScreen } from '@/components/LoadingScreen'

const HomePage         = lazy(() => import('@/pages/HomePage'))
const ServicesPage     = lazy(() => import('@/pages/ServicesPage'))
const DestinationsPage = lazy(() => import('@/pages/DestinationsPage'))
const OurStoryPage     = lazy(() => import('@/pages/OurStoryPage'))
const EnquiriesPage    = lazy(() => import('@/pages/EnquiriesPage'))
const ReviewsPage           = lazy(() => import('@/pages/ReviewsPage'))
const DestinationDetailPage = lazy(() => import('@/pages/DestinationDetailPage'))
const TeamPage              = lazy(() => import('@/pages/TeamPage'))
const NotFoundPage          = lazy(() => import('@/pages/NotFoundPage'))

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => getLenis()?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{  scale: 0.93 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#0d1b38] text-white shadow-[0_8px_28px_-6px_rgba(13,27,56,.55)] cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function AppInner() {
  useLenis()
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/"             element={<HomePage />} />
              <Route path="/services"     element={<ServicesPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/our-story"    element={<OurStoryPage />} />
              <Route path="/enquiries"    element={<EnquiriesPage />} />
              <Route path="/reviews"              element={<ReviewsPage />} />
              <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
              <Route path="/team"               element={<TeamPage />} />
              <Route path="*"            element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <I18nProvider>
        <ThemeProvider>
          <AppInner />
        </ThemeProvider>
      </I18nProvider>
    </HelmetProvider>
  )
}
