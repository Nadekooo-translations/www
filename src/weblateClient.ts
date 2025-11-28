import axios from "axios";

const client = axios.create({
	baseURL: import.meta.env.WEBLATE_BASE_URL,
	headers: {
		Authorization: "Token " + import.meta.env.WEBLATE_TOKEN,
	},
});

export const fetchCredits = async (component: string, lang = "fr") => {
	const res = await client.get(`/components/${component}/credits/?start=2021-01-01&end=2030-01-01&lang=${lang}`);
	return res.data;
};
