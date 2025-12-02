import axios from "axios";

export interface CreditDatum {
	email: string;
	username: string;
	full_name: string;
	change_count: number;
	date_joined: string;
}

export type CreditLanguage = {[language: string] : CreditDatum[]}
export type CreditsResponse = CreditLanguage[];

const client = axios.create({
	baseURL: import.meta.env.WEBLATE_BASE_URL,
	headers: {
		Authorization: "Token " + import.meta.env.WEBLATE_TOKEN,
	},
});

export const fetchCredits = async (component: string, lang = "fr"): Promise<CreditsResponse> => {
	const res = await client.get(`/components/${component}/credits/?start=2021-01-01&end=2030-01-01&lang=${lang}`);
	return res.data;
};

export const avatar = (username: string) => import.meta.env.WEBLATE_AVATAR_BASE_URL + username + ".png";
