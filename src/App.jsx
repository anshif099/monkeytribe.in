import { useState } from 'react'
import Home from './pages/home.jsx'
import PromptX from './pages/promptx.jsx'
import GrowthX from './pages/growthx.jsx'
import BrandX from './pages/brandx.jsx'
import CopyCraft from './pages/copycraft.jsx'
import Courses from './pages/courses.jsx'
import Contact from './pages/contact.jsx'
import Programmes from './pages/programmes.jsx'
import Webinars from './pages/webinars.jsx'
import Blog from './pages/blog.jsx'
import About from './pages/about.jsx'
import Register from './pages/register.jsx'
import CmsManager from './components/CmsManager.jsx'

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
      {pageContent}
    </>
  )
}

export default App
