import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { sanityClient } from "@/sanity/lib/sanity";
import { postBySlugQuery, relatedPostsQuery, } from "@/sanity/lib/sanity.queries";
import { urlForImage } from "@/sanity/lib/sanity.images";
import type { Metadata } from "next";

type ArticlePageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type Article = {
  _id: string;
  title: string;
  slug: string;
  language: string;
  excerpt?: string;
  publishedAt: string;
  readingTime?: number;

  mainImage?: {
    asset?: {
        _ref?: string;
    };
    alt?: string;
  };

  body: TypedObject | TypedObject[];

  seo?: {
    title?: string;
    description?: string;
    image?: unknown;
  };

  author?: {
    name: string;
    image?: unknown;
    bio?: unknown;
  };

  categories?: {
    title: string;
    slug: string;
  }[];

  tags?: string[];
};

type RelatedPost = {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt: string;
    readingTime?: number;

    mainImage?: {
        asset?: {
            _ref?: string;
        };
        alt?: string;
    };

    categories?: {
        title: string;
        slug: string;
    }[];
};

type ImageValue = {
  asset?: {
    _ref?: string;
  };
  alt?: string;
  caption?: string;
};

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-12 mb-4 text-3xl font-bold tracking-tight">
        {children}
      </h2>
    ),

    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-10 mb-3 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),

    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 leading-8 text-muted-foreground">
        {children}
      </p>
    ),

    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 border-l-4 border-[#E6007E] pl-6 text-lg italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-muted-foreground">
        {children}
      </ul>
    ),

    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-muted-foreground">
        {children}
      </ol>
    ),
  },

  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[#E6007E] underline underline-offset-4"
      >
        {children}
      </a>
    ),

    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
        {children}
      </code>
    ),
  },

  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null;

      const imageUrl = urlForImage(value)
        .width(1200)
        .auto("format")
        .url();

      return (
        <figure className="my-10">
          <img
            src={imageUrl}
            alt={value.alt || ""}
            className="h-auto w-full rounded-2xl"
          />

          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const article: Article | null = await sanityClient.fetch(
    postBySlugQuery,
    {
      language: locale,
      slug,
    },
  );

  if (!article) {
    return {
      title: "Article Not Found | PatchRoot",
    };
  }

  const title =
    article.seo?.title ||
    `${article.title} | PatchRoot`;

  const description =
    article.seo?.description ||
    article.excerpt ||
    "Cybersecurity, penetration testing, secure development, privacy, and technology insights from PatchRoot.";

  const imageUrl = article.seo?.image
    ? urlForImage(article.seo.image)
        .width(1200)
        .height(630)
        .auto("format")
        .url()
    : undefined;

  return {
    title,
    description,

    alternates: {
      canonical: `/${locale}/blog/${article.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt,
      url: `/${locale}/blog/${article.slug}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },

    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { locale, slug } = await params;

  const article: Article | null = await sanityClient.fetch(
    postBySlugQuery,
    {
      language: locale,
      slug,
    },
  );

  if (!article) {
    notFound();
  }

  const categorySlugs = 
    article.categories?.map((category) => category.slug) ?? [];

  const relatedPosts: RelatedPost[] = await sanityClient.fetch(
    relatedPostsQuery,
    {
        language: locale,
        slug,
        categorySlugs,
        tags: article.tags ?? [],
    },
  );

  const featuredImageUrl = article.mainImage?.asset
    ? urlForImage(article.mainImage)
        .width(1400)
        .auto("format")
        .url()
    : null;

  return (
    <main className="min-h-screen px-6 py-20">
      <article className="mx-auto max-w-4xl">
        <header className="mb-12">
          <div className="mb-5 flex flex-wrap gap-2">
            {article.categories?.map((category) => (
              <span
                key={category.slug}
                className="text-sm font-medium text-[#E6007E]"
              >
                {category.title}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {article.author?.name && (
              <span>By {article.author.name}</span>
            )}

            <span>·</span>

            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString(locale)}
            </time>

            {article.readingTime && (
              <>
                <span>·</span>
                <span>{article.readingTime} min read</span>
              </>
            )}
          </div>
        </header>

        {featuredImageUrl && (
          <figure className="mb-14">
            <img
              src={featuredImageUrl}
              alt={article.mainImage?.alt || article.title}
              className="h-auto w-full rounded-3xl"
            />
          </figure>
        )}

        <div className="mx-auto max-w-3xl">
          <PortableText
            value={article.body}
            components={portableTextComponents}
          />
        </div>

{article.tags && article.tags.length > 0 && (
  <footer className="mx-auto mt-16 max-w-3xl border-t pt-8">
    <div className="flex flex-wrap gap-2">
      {article.tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
        >
          #{tag}
        </span>
      ))}
    </div>
  </footer>
)}

{relatedPosts.length > 0 && (
  <section className="mx-auto mt-20 max-w-6xl border-t pt-12">
    <div className="mb-8">
      <p className="text-sm font-medium uppercase tracking-wider text-[#E6007E]">
        Keep reading
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight">
        Related posts
      </h2>
    </div>

    <div className="grid gap-8 md:grid-cols-3">
      {relatedPosts.map((post) => (
        <article
          key={post._id}
          className="group overflow-hidden rounded-2xl border transition hover:-translate-y-1"
        >
        {post.mainImage?.asset && (
            <img
                src={urlForImage(post.mainImage)
                    .width(800)
                    .height(450)
                    .fit("crop")
                    .auto("format")
                    .url()}
                alt={post.mainImage.alt || post.title}
                className="aspect-video w-full object-cover"
            />
        )}

          <div className="p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              {post.categories?.map((category) => (
                <span
                  key={category.slug}
                  className="text-xs font-medium uppercase tracking-wide text-[#E6007E]"
                >
                  {category.title}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-[#E6007E]">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {post.excerpt}
              </p>
            )}

            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(locale)}
              </time>

              {post.readingTime && (
                <>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>

            <a
              href={`/${locale}/blog/${post.slug}`}
              className="mt-5 inline-block text-sm font-semibold text-[#E6007E]"
            >
              Read article →
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
)}
      </article>
    </main>
  );
}