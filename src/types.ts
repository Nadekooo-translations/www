import {z} from 'astro:content';

export const TranslationFrontMatter = z.object({
	name: z.string(),
	contributionUrl: z.optional(z.string().url()),
	externalUrl: z.optional(z.string().url()),
	weblateComponent: z.optional(z.string()),
});
