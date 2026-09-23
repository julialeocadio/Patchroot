import { sanityClient } from "@/sanity/lib/sanity";
import { postsQuery } from "@/sanity/lib/sanity.queries";

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  readingTime?: number;
  categories?: {
    title: string;
    slug: string;
  }[];
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  const posts: Post[] = await sanityClient.fetch(postsQuery, {
    language: locale,
  });

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#E6007E]">
            PatchRoot
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Blog
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Insights on cybersecurity, penetration testing, secure
            development, privacy, and technology.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">
            No articles published yet.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group rounded-2xl border p-6 transition hover:-translate-y-1"
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.categories?.map((category) => (
                    <span
                      key={category.slug}
                      className="text-xs font-medium uppercase tracking-wide text-[#E6007E]"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-semibold tracking-tight group-hover:text-[#E6007E]">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mt-3 line-clamp-3 text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
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
                  className="mt-6 inline-block text-sm font-semibold text-[#E6007E]"
                >
                  Read article →
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}