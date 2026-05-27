import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function cmsApiPlugin() {
  return {
    name: 'cms-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/save-cms') {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const filePath = path.resolve(__dirname, 'src/cms-data.json')
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: true, message: 'CMS data saved successfully!' }))
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else if (req.method === 'POST' && req.url === '/api/upload-image') {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            try {
              const { filename, base64 } = JSON.parse(body)
              const base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
              const buffer = Buffer.from(base64Data, 'base64')
              
              const dir = path.resolve(__dirname, 'public/cms-images')
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true })
              }
              
              const filePath = path.join(dir, filename)
              fs.writeFileSync(filePath, buffer)
              
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: true, url: `/cms-images/${filename}` }))
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

function inlineCssPlugin() {
  return {
    name: 'inline-css-plugin',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx || !ctx.bundle) return html
      let newHtml = html
      let allCss = ''

      // Collect all CSS assets (index + vendor chunks)
      for (const [key, value] of Object.entries(ctx.bundle)) {
        if (key.endsWith('.css') && value.type === 'asset') {
          allCss += value.source
          // Remove the link tag for this CSS file
          const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const linkRegex = new RegExp(`<link[^>]*href=["']?/?${escapedKey}["']?[^>]*>`, 'g')
          newHtml = newHtml.replace(linkRegex, '')
        }
      }

      if (allCss) {
        // Insert combined style tag right before </head>
        newHtml = newHtml.replace('</head>', `<style>${allCss}</style></head>`)
        console.log(`Inlined ${allCss.length} bytes of CSS into index.html`)
      }
      return newHtml
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cmsApiPlugin(), inlineCssPlugin()],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor'
            }
            return 'vendor'
          }
        }
      }
    }
  }
})

