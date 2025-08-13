const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/sobre', changefreq: 'monthly', priority: 0.7 },
  { url: '/contato', changefreq: 'monthly', priority: 0.7 },
];

const stream = new SitemapStream({ hostname: 'https://seudominio.com' });

streamToPromise(stream)
  .then((data) => {
    createWriteStream('./public/sitemap.xml').write(data.toString());
  });

links.forEach(link => stream.write(link));
stream.end();