import { sanityClient } from "@/sanity/lib/sanity";
import { postsQuery } from "@/sanity/lib/sanity.queries";
import { urlForImage } from "@/sanity/lib/sanity.images";
import { getTranslations } from "next-intl/server";

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

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  const posts: Post[] = await sanityClient.fetch(postsQuery, {
    language: locale,
  });

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  
  const t = await getTranslations({
    locale,
    namespace: "Blog",
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Hero */}
      <section className="border-b border-[#2C2C2C]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E6007E]">
              PatchRoot 
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {t("title2")}
              <span className="text-[#E6007E]">{t("titleAccent")}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#B3B3B3] md:text-xl">
              {t("paragraph")}
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-[#2C2C2C] bg-[#141414] px-6 py-16 text-center">
            <p className="text-[#B3B3B3]">
              {t("noArticles")}
            </p>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featuredPost && (
              <article className="group overflow-hidden rounded-3xl border border-[#2C2C2C] bg-[#141414] transition-all duration-300 hover:border-[#E6007E]/60">
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  {featuredPost.mainImage?.asset ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={urlForImage(featuredPost.mainImage)
                          .width(1200)
                          .height(700)
                          .fit("crop")
                          .auto("format")
                          .url()}
                        alt={
                          featuredPost.mainImage.alt ||
                          featuredPost.title
                        }
                        className="h-full min-h-[300px] w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="min-h-[300px] bg-gradient-to-br from-[#1C1C1C] to-[#080808]" />
                  )}

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {featuredPost.categories?.map((category) => (
                        <span
                          key={category.slug}
                          className="rounded-full border border-[#E6007E]/30 bg-[#E6007E]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#E6007E]"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>

                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#707070]">
                      {t("featuredArticles")}
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight transition-colors group-hover:text-[#E6007E] md:text-4xl">
                      {featuredPost.title}
                    </h2>

                    {featuredPost.excerpt && (
                      <p className="mt-5 text-base leading-7 text-[#B3B3B3]">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-[#707070]">
                      <time dateTime={featuredPost.publishedAt}>
                        {new Date(
                          featuredPost.publishedAt,
                        ).toLocaleDateString(locale)}
                      </time>

                      {featuredPost.readingTime && (
                        <>
                          <span>·</span>
                          <span>
                            {featuredPost.readingTime} {t("minRead")}
                          </span>
                        </>
                      )}
                    </div>

                    <a
                      href={`/${locale}/blog/${featuredPost.slug}`}
                      className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#E6007E] transition-colors hover:text-[#FF2E93]"
                    >
                      {t("read")}
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* More articles */}
            {remainingPosts.length > 0 && (
              <div className="mt-20">
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E6007E]">
                    {t("more")}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                    {t("latest")}
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {remainingPosts.map((post) => (
                    <article
                      key={post._id}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#2C2C2C] bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-[#E6007E]/60"
                    >
                      {/* Image */}
                      {post.mainImage?.asset ? (
                        <div className="overflow-hidden">
                          <img
                            src={urlForImage(post.mainImage)
                              .width(900)
                              .height(500)
                              .fit("crop")
                              .auto("format")
                              .url()}
                            alt={
                              post.mainImage.alt ||
                              post.title
                            }
                            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-[#1C1C1C] to-[#080808]" />
                      )}

                      <div className="flex flex-1 flex-col p-6">
                        {/* Categories */}
                        {post.categories &&
                          post.categories.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                              {post.categories.map((category) => (
                                <span
                                  key={category.slug}
                                  className="text-xs font-semibold uppercase tracking-wider text-[#E6007E]"
                                >
                                  {category.title}
                                </span>
                              ))}
                            </div>
                          )}

                        <h3 className="text-xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-[#E6007E]">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#B3B3B3]">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="mt-auto pt-6">
                          <div className="flex items-center gap-3 text-xs text-[#707070]">
                            <time dateTime={post.publishedAt}>
                              {new Date(
                                post.publishedAt,
                              ).toLocaleDateString(locale)}
                            </time>

                            {post.readingTime && (
                              <>
                                <span>·</span>
                                <span>
                                  {post.readingTime} min read
                                </span>
                              </>
                            )}
                          </div>

                          <a
                            href={`/${locale}/blog/${post.slug}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#E6007E] transition-colors hover:text-[#FF2E93]"
                          >
                            {t("read")}
                            <span className="transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}