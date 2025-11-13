import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const translations = defineCollection({
	loader: glob({pattern: "**/*.mdx", base: "./src/translations"}),
	schema: z.object({
		name: z.string(),
		weblateUrl: z.optional(z.string().url()),
		externalUrl: z.optional(z.string().url()),
	}),
});

export const collections = {translations};
