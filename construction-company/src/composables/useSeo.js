// composables/useSeo.js
import { useHead } from '@vueuse/head'

export function useSeo({ title, description, keywords = '', image = '/default-seo-image.webp', url }) {
  const currentUrl = url || window.location.href

  useHead({
    title,
    htmlAttrs: { lang: 'en' }, 
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: currentUrl },
      { property: 'og:image', content: image },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    link: [
      { rel: 'canonical', href: currentUrl }
    ]
  })
}
