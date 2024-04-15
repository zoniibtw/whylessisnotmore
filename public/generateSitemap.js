const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// List of routes in your React app
const routes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/interiors', changefreq: 'weekly', priority: 0.8 },
    { url: '/style', changefreq: 'weekly', priority: 0.8 },
    { url: '/hotels', changefreq: 'weekly', priority: 0.8 },
    { url: '/journal', changefreq: 'monthly', priority: 0.6 },
    { url: '/wishlist', changefreq: 'monthly', priority: 0.6 },
    { url: '/story', changefreq: 'monthly', priority: 0.6 },
    { url: '/consultant', changefreq: 'monthly', priority: 0.6 },
    { url: '/cookie-policy', changefreq: 'yearly', priority: 0.4 }
];

const sitemap = new SitemapStream({ hostname: 'https://www.whylessisnotmore.com' });

// Create sitemap.xml in the public directory
const writePath = path.resolve('/', 'sitemap.xml');
const writeStream = createWriteStream(writePath);
sitemap.pipe(writeStream);

routes.forEach(route => sitemap.write(route));
sitemap.end();

// Convert sitemap stream to promise to handle completion
streamToPromise(sitemap).then(() => console.log('Sitemap generated successfully!')).catch(e => console.error(e));
