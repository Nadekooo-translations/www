import {z} from 'astro:content';

export const TranslationFrontMatter = z.object({
	name: z.string(),
	weblateUrl: z.optional(z.string().url()),
	externalUrl: z.optional(z.string().url()),
});
