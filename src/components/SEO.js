import React from "react";
import { Helmet } from "react-helmet-async";

function SEO({ title, description, image, slug }) {
  const baseUrl = "https://nomadscribbles.com";
  const pageUrl = slug ? `${baseUrl}/${slug}` : baseUrl;
  const fullImage = image ? `${baseUrl}${image}` : `${baseUrl}/images/default-share.png`;
  const defaultDescription =
    "Nomad Scribbles – a collection of travel stories, sketches, and adventures across the world.";

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph (for Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Nomad Scribbles" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Fallback language */}
      <html lang="en" />
    </Helmet>
  );
}

export default SEO;

