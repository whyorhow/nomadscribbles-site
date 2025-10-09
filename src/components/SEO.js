import React from "react";
import { Helmet } from "react-helmet-async";

function SEO({ title, description, image, url }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && (
        <meta
          property="og:image"
          content={process.env.PUBLIC_URL + image}
        />
      )}
      <meta property="og:type" content="article" />
    </Helmet>
  );
}

export default SEO;
