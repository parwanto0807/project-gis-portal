import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GIS Portal',
    short_name: 'GIS Portal',
    description: 'GIS Portal Web Application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo-sm.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-md.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
