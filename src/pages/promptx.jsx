import { useEffect } from 'react'
import Header from '../components/header.jsx'
import PromptXHero from '../components/promptx-hero.jsx'
import PromptxSkills from '../components/promptx-skills.jsx'
import PromptxCurriculum from '../components/promptx-curriculum.jsx'
import PromptxEnrol from '../components/promptx-enrol.jsx'
import PromptxMarketing from '../components/promptx-marketing.jsx'
import Footer from '../components/footer.jsx'

function PromptX({ onNavigate }) {
  useEffect(() => {
    const title = 'AI Prompt Engineering Course Kerala | Monkey Tribe'
    const description = 'Join PromptX, a practical AI prompt engineering course in Kerala by Monkey Tribe and Creative Monkeys Advertising. Learn expert prompting, AI workflows, and real-world AI applications.'
    const canonicalUrl = 'https://www.monkeytribe.in/promptx'
    const previousTitle = document.title
    const managedHead = [
      ['meta[name="description"]', 'meta', { name: 'description', content: description }],
      ['meta[property="og:title"]', 'meta', { property: 'og:title', content: title }],
      ['meta[property="og:description"]', 'meta', { property: 'og:description', content: description }],
      ['meta[property="og:url"]', 'meta', { property: 'og:url', content: canonicalUrl }],
      ['meta[property="og:type"]', 'meta', { property: 'og:type', content: 'website' }],
      ['meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: title }],
      ['meta[name="twitter:description"]', 'meta', { name: 'twitter:description', content: description }],
      ['link[rel="canonical"]', 'link', { rel: 'canonical', href: canonicalUrl }],
    ]
    const previousHead = managedHead.map(([selector]) => {
      const element = document.head.querySelector(selector)

      return {
        selector,
        attributes: element
          ? Array.from(element.attributes, (attribute) => [attribute.name, attribute.value])
          : null,
      }
    })

    const upsertMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        document.head.appendChild(element)
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
      })
    }

    const upsertLink = (selector, attributes) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('link')
        document.head.appendChild(element)
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
      })
    }

    document.title = title
    managedHead.forEach(([selector, tagName, attributes]) => {
      if (tagName === 'link') {
        upsertLink(selector, attributes)
      } else {
        upsertMeta(selector, attributes)
      }
    })

    const schemaId = 'promptx-course-schema'
    let schema = document.getElementById(schemaId)
    if (!schema) {
      schema = document.createElement('script')
      schema.id = schemaId
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }

    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'AI Prompt Engineering Course in Kerala - PromptX',
      description,
      provider: {
        '@type': 'Organization',
        name: 'Monkey Tribe',
        url: 'https://www.monkeytribe.in/',
      },
      url: canonicalUrl,
      educationalCredentialAwarded: 'Certification',
      teaches: [
        'AI prompt engineering',
        'Prompt design patterns',
        'AI workflow building',
        'Real-world AI applications',
      ],
    })

    return () => {
      document.title = previousTitle
      previousHead.forEach(({ selector, attributes }) => {
        const element = document.head.querySelector(selector)
        if (!element) return

        if (!attributes) {
          element.remove()
          return
        }

        Array.from(element.attributes).forEach((attribute) => {
          element.removeAttribute(attribute.name)
        })

        attributes.forEach(([key, value]) => {
          element.setAttribute(key, value)
        })
      })
      document.getElementById(schemaId)?.remove()
    }
  }, [])

  return (
    <main className="promptx-page" style={{ background: '#0e0c21', minHeight: '100vh' }}>
      <Header onNavigate={onNavigate} currentPage="promptx" />
      <PromptXHero />
      <PromptxSkills />
      <PromptxCurriculum />
      <PromptxEnrol />
      <PromptxMarketing onNavigate={onNavigate} />
      <Footer />
    </main>
  )
}

export default PromptX
