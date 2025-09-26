import { Item } from "@/types/data";

const API_URL = process.env.BACKEND_URL || "http://localhost:4000";

export class NewsService {
	private apiUrl: string;

	constructor() {
		this.apiUrl = `${API_URL}/api/news`;
	}

	async getNews() {
		const response = await fetch(this.apiUrl);
		return response.json();
	}

	async updateNews(id: string, news: Item) {
		const response = await fetch(`${this.apiUrl}/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(news),
		});
		return response.json();
	}
}

export const newsService = new NewsService();
