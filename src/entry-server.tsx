import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import DestinationsPage from '@/pages/DestinationsPage';
import OurStoryPage from '@/pages/OurStoryPage';
import EnquiriesPage from '@/pages/EnquiriesPage';

import enTranslations from '../public/locales/en/common.json';

export async function render(url: string) {
  const i18n = createInstance();
  await i18n.use(initReactI18next).init({
    lng: 'en',
    resources: { en: { common: enTranslations } },
    interpolation: { escapeValue: false },
    defaultNS: 'common',
    ns: ['common'],
  });

  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <StaticRouter location={url}>
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
          </StaticRouter>
        </ThemeProvider>
      </I18nextProvider>
    </HelmetProvider>
  );

  return { html, helmetContext };
}
