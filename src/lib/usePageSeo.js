import { useEffect } from 'react'

export function usePageSeo({ title, description, canonicalUrl, schema, schemaId = 'page-schema' }) {
  useEffect(() => {
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
    const previousTitle = document.title
    const previousHead = managedHead.map(([selector]) => {
      const element = document.head.querySelector(selector)

      return {
        selector,
        attributes: element
          ? Array.from(element.attributes, (attribute) => [attribute.name, attribute.value])
          : null,
      }
    })

    const upsertElement = (selector, tagName, attributes) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement(tagName)
        document.head.appendChild(element)
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
      })
    }

    document.title = title
    managedHead.forEach(([selector, tagName, attributes]) => {
      upsertElement(selector, tagName, attributes)
    })

    if (schema) {
      let schemaElement = document.getElementById(schemaId)
      if (!schemaElement) {
        schemaElement = document.createElement('script')
        schemaElement.id = schemaId
        schemaElement.type = 'application/ld+json'
        document.head.appendChild(schemaElement)
      }

      schemaElement.textContent = JSON.stringify(schema)
    }

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
  }, [canonicalUrl, description, schema, schemaId, title])
}
