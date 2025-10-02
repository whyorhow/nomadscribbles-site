export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/xml");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.nomadscribbles.com/</loc>
      <lastmod>2025-10-02</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://www.nomadscribbles.com/nomads-gallery</loc>
      <lastmod>2025-10-02</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://www.nomadscribbles.com/brazil/saopaulo</loc>
      <lastmod>2025-10-02</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://www.nomadscribbles.com/nomads-shop/brazil/saopaulo</loc>
      <lastmod>2025-10-02</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  </urlset>`;

  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
