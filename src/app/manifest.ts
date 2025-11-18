import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'UEBSchool Рівне - Біблійна школа',
    short_name: 'UEBSchool',
    description: 'Повна біблійна програма у м. Рівне. Духовна освіта та християнське лідерство.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['education', 'lifestyle'],
    lang: 'uk',
    dir: 'ltr',
  }
}
