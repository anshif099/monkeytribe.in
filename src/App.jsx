import { useState, lazy, Suspense } from 'react'
import Home from './pages/home.jsx'
import CmsManager from './components/CmsManager.jsx'

// Dynamically import subpages to enable code splitting
const PromptX = lazy(() => import('./pages/promptx.jsx'))
const GrowthX = lazy(() => import('./pages/growthx.jsx'))
const BrandX = lazy(() => import('./pages/brandx.jsx'))
const CopyCraft = lazy(() => import('./pages/copycraft.jsx'))
const Courses = lazy(() => import('./pages/courses.jsx'))
const Contact = lazy(() => import('./pages/contact.jsx'))
const Programmes = lazy(() => import('./pages/programmes.jsx'))
const Webinars = lazy(() => import('./pages/webinars.jsx'))
const Blog = lazy(() => import('./pages/blog.jsx'))
const About = lazy(() => import('./pages/about.jsx'))
const Register = lazy(() => import('./pages/register.jsx'))

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Expose routing globally to avoid prop drilling in deeply nested footer/header elements
  window.__navigate = handleNavigate;

  let pageContent;

  if (currentPage === 'promptx') {
    pageContent = <PromptX onNavigate={handleNavigate} />
  } else if (currentPage === 'growthx') {
    pageContent = <GrowthX onNavigate={handleNavigate} />
  } else if (currentPage === 'brandx') {
    pageContent = <BrandX onNavigate={handleNavigate} />
  } else if (currentPage === 'copycraft') {
    pageContent = <CopyCraft onNavigate={handleNavigate} />
  } else if (currentPage === 'courses') {
    pageContent = <Courses onNavigate={handleNavigate} />
  } else if (currentPage === 'contact') {
    pageContent = <Contact onNavigate={handleNavigate} />
  } else if (currentPage === 'programmes') {
    pageContent = <Programmes onNavigate={handleNavigate} />
  } else if (currentPage === 'webinars') {
    pageContent = <Webinars onNavigate={handleNavigate} />
  } else if (currentPage === 'blog') {
    pageContent = <Blog onNavigate={handleNavigate} />
  } else if (currentPage === 'about') {
    pageContent = <About onNavigate={handleNavigate} />
  } else if (currentPage === 'register') {
    pageContent = <Register onNavigate={handleNavigate} />
  } else {
    pageContent = <Home onNavigate={handleNavigate} />
  }

  return (
    <>
      <CmsManager currentPage={currentPage} onNavigate={handleNavigate} />
      <Suspense fallback={<div className="page-loading-fallback" style={{ minHeight: '100vh', background: '#0b0c10' }}></div>}>
        {pageContent}
      </Suspense>
    </>
  )
}

export default App
