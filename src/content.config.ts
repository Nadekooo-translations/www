import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';
import {TranslationFrontMatter} from "./types.ts";

const translations = defineCollection({
	loader: glob({pattern: "**/*.mdx", base: "./src/translations"}),
	schema: TranslationFrontMatter,
});

export const collections = {translations};
