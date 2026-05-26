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

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (currentPage === 'promptx') {
    return <PromptX onNavigate={handleNavigate} />
  }

  if (currentPage === 'growthx') {
    return <GrowthX onNavigate={handleNavigate} />
  }

  if (currentPage === 'brandx') {
    return <BrandX onNavigate={handleNavigate} />
  }

  if (currentPage === 'copycraft') {
    return <CopyCraft onNavigate={handleNavigate} />
  }

  if (currentPage === 'courses') {
    return <Courses onNavigate={handleNavigate} />
  }

  if (currentPage === 'contact') {
    return <Contact onNavigate={handleNavigate} />
  }

  if (currentPage === 'programmes') {
    return <Programmes onNavigate={handleNavigate} />
  }

  if (currentPage === 'webinars') {
    return <Webinars onNavigate={handleNavigate} />
  }

  if (currentPage === 'blog') {
    return <Blog onNavigate={handleNavigate} />
  }

  if (currentPage === 'about') {
    return <About onNavigate={handleNavigate} />
  }

  if (currentPage === 'register') {
    return <Register onNavigate={handleNavigate} />
  }

  return <Home onNavigate={handleNavigate} />
}

export default App
