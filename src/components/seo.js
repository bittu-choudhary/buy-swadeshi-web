import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            titleTemplate
            siteUrl
            ogImageUrl
            ogTitle
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaSiteUrl = site.siteMetadata.siteUrl
  const ogImageUrl = site.siteMetadata.ogImageUrl
  const ogTitle = site.siteMetadata.ogTitle


  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={site.siteMetadata.title}
      titleTemplate={site.siteMetadata.titleTemplate}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: ogTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: metaSiteUrl,
        },
        {
          property: `og:image`,
          content: ogImageUrl,
        },
        {
          property: `og:image:width`,
          content: `720`,
        },
        {
          property: `og:image:height`,
          content: `720`,
        },
        {
          property: `twitter:image`,
          content: ogImageUrl,
        },
        {
          name: `twitter:card`,
          content: `product`,
        },
        {
          property: `twitter:url`,
          content: metaSiteUrl,
        },
        {
          name: `twitter:title`,
          content: ogTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO