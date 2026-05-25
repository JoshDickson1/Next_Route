import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { useLenis } from '@/hooks/useLenis'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const HomePage         = lazy(() => import('@/pages/HomePage'))
const ServicesPage     = lazy(() => import('@/pages/ServicesPage'))
const DestinationsPage = lazy(() => import('@/pages/DestinationsPage'))
const OurStoryPage     = lazy(() => import('@/pages/OurStoryPage'))
const EnquiriesPage    = lazy(() => import('@/pages/EnquiriesPage'))

function AppInner() {
  useLenis()

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/"             element={<HomePage />} />
            <Route path="/services"     element={<ServicesPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/our-story"    element={<OurStoryPage />} />
            <Route path="/enquiries"    element={<EnquiriesPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
