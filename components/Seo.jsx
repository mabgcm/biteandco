import Head from 'next/head';

const siteName = 'Bite & Co';
const siteUrl = 'https://biteandco.ca';
const defaultImage = `${siteUrl}/assets/img/menu/tiramisu.png`;

export default function Seo({
  title,
  description,
  path = '/',
  image = defaultImage,
  type = 'website',
  children
}) {
  const canonicalUrl = `${siteUrl}${path}`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={siteName} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}
    </Head>
  );
}
