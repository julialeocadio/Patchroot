import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Português", value: "pt" },
          { title: "Español", value: "es" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "Short summary used on the blog listing and for previews.",
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description:
            "Describe the image for accessibility and SEO.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "category" },
        }),
      ],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "number",
      description: "Estimated reading time in minutes.",
      validation: (Rule) => Rule.integer().positive(),
    }),

    defineField({
      name: "body",
      title: "Content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "title",
          title: "SEO Title",
          type: "string",
          description:
            "Title used by search engines. Ideally under 60 characters.",
          validation: (Rule) => Rule.max(60),
        }),

        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 3,
          description:
            "Description used by search engines and social previews.",
          validation: (Rule) => Rule.max(160),
        }),

        defineField({
          name: "image",
          title: "Social Image",
          type: "image",
          description:
            "Optional image used when the article is shared on social media.",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      language: "language",
      media: "mainImage",
    },

    prepare(selection) {
      const { title, author, language, media } = selection;

      const languageLabels: Record<string, string> = {
        en: "English",
        pt: "Português",
        es: "Español",
      };

      return {
        title,
        media,
        subtitle: [
          language && languageLabels[language],
          author && `by ${author}`,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
