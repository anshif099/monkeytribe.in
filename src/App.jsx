import { useState, lazy, Suspense, useEffect } from 'react'
import Home from './pages/home.jsx'

// Dynamically import components to enable code splitting
const CmsManager = lazy(() => import('./components/CmsManager.jsx'))
const CustomCourse = lazy(() => import('./pages/custom-course.jsx'))

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
const AiIntegratedDigitalMarketing = lazy(() => import('./pages/ai-integrated-digital-marketing.jsx'))
const AiPromptEngineeringGuide = lazy(() => import('./pages/ai-prompt-engineering-guide.jsx'))
const CareerOpportunitiesInAiEra = lazy(() => import('./pages/career-opportunities-in-ai-era.jsx'))

// Derive the initial page from the current URL pathname
function getPageFromPath(pathname) {
  const slug = pathname.replace(/^\//, '').replace(/\/$/, '') || 'home';
  return slug;
}

function App() {
  const [currentPage, setCurrentPage] = useState(() => getPageFromPath(window.location.pathname))
  const [showCms, setShowCms] = useState(false)

  useEffect(() => {
    const checkCms = () => {
      const isCmsActive = window.location.pathname === '/admin' || 
                          sessionStorage.getItem('mt_cms_logged_in') === 'true' || 
                          localStorage.getItem('mt_cms_data') !== null;
      setShowCms(isCmsActive);
    };
    checkCms();

    // Sync state when the user uses back/forward browser buttons
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      checkCms();
    };
    
    window.addEventListener('storage', checkCms);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('storage', checkCms);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (page) => {
    const newPath = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', newPath);
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
  } else if (currentPage === 'ai-integrated-digital-marketing') {
    pageContent = <AiIntegratedDigitalMarketing onNavigate={handleNavigate} />
  } else if (currentPage === 'ai-prompt-engineering-guide') {
    pageContent = <AiPromptEngineeringGuide onNavigate={handleNavigate} />
  } else if (currentPage === 'career-opportunities-in-ai-era') {
    pageContent = <CareerOpportunitiesInAiEra onNavigate={handleNavigate} />
  } else if (currentPage.startsWith('custom-course-')) {
    // Dynamic custom courses created via CMS
    const customCourses = (() => {
      try { return JSON.parse(localStorage.getItem('mt_custom_courses') || '[]'); } catch { return []; }
    })();
    const course = customCourses.find(c => c.id === currentPage);
    pageContent = (
      <CustomCourse
        onNavigate={handleNavigate}
        courseId={currentPage}
        courseName={course ? course.label : currentPage}
      />
    )
  } else {
    pageContent = <Home onNavigate={handleNavigate} />
  }

  return (
    <>
      {showCms && (
        <Suspense fallback={null}>
          <CmsManager currentPage={currentPage} onNavigate={handleNavigate} />
        </Suspense>
      )}
      <Suspense fallback={<div className="page-loading-fallback" style={{ minHeight: '100vh', background: '#0b0c10' }}></div>}>
        {pageContent}
      </Suspense>
    </>
  )
}

export default App
