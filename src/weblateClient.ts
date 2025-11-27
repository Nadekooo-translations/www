import axios from "axios";

const client = axios.create({
	baseURL: import.meta.env.WEBLATE_BASE_URL,
	headers: {
		Authorization: "Token " + import.meta.env.WEBLATE_TOKEN,
	},
});
