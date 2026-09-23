import { groq } from "next-sanity";

export const postsQuery = groq`
  *[
    _type == "post"
    && language == $language
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    language,
    excerpt,
    publishedAt,
    readingTime,
    mainImage {
      asset,
      alt
    },
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      title,
      "slug": slug.current
    }
  }
`;

export const postBySlugQuery = groq`
  *[
    _type == "post"
    && language == $language
    && slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    language,
    excerpt,
    publishedAt,
    readingTime,
    mainImage {
      asset,
      alt
    },
    body,
    seo,
    "author": author->{
      name,
      image,
      bio
    },
    "categories": categories[]->{
      title,
      "slug": slug.current
    },
    tags
  }
`;

export const relatedPostsQuery = groq`
  *[
    _type == "post"
    && language == $language
    && slug.current != $slug
    && (
      count(categories[]->slug.current[@ in $categorySlugs]) > 0
      || count(tags[@ in $tags]) > 0
    )
  ] {
    _id,
    title,
    "slug": slug.current,
    language,
    excerpt,
    publishedAt,
    readingTime,

    mainImage {
      asset,
      alt
    },

    "categories": categories[]->{
      title,
      "slug": slug.current
    }
  }
  | order(publishedAt desc)
  [0...3]
`;