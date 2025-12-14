import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import type { GetImageResult } from "astro";

const translations = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/translations" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      contributionUrl: z.optional(z.string().url()),
      contributorsUrl: z.optional(z.string().url()),
      externalUrl: z.optional(z.string().url()),
      discordInvite: z.optional(z.string().url()),
      weblateComponent: z.optional(z.string()),
      carouselImages: z.optional(
        z.array(
          image().or(
            z.object({
              image: image(),
              caption: z.optional(z.string()),
              link: z.optional(z.string()),
            }),
          ),
        ),
      ),
      icon: z.optional(image()),
      resolvedIcon: z.optional(z.string()),
    }),
});

export const collections = { translations };
