import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import { SitemapStream } from 'sitemap'
// /src/pages/api/sitemap.js
import { createGzip } from 'zlib'

import Projects from '../../json/Project.json'

const STATIC_URLS = Projects.map((project) => project.slug)

const sitemapApi = async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')

  const xmlTop = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://contractaddress.com</loc>
    </url>
    `

  let xmlUrls = ''

  STATIC_URLS.forEach((slug) => {
    xmlUrls +=
      '<url><loc>' + `https://contractaddress.com/${slug}` + '</loc></url>'
  })

  const xmlBottom = `</urlset>`

  res.end(xmlTop + xmlUrls + xmlBottom)
}

export default sitemapApi
