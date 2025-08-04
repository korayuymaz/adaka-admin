import { Item } from "@/types/data";

export const mockItems: Item[] = [
	{
		id: "1",
		name: "Project Alpha",
		description: "A comprehensive project management system",
		url: "https://www.google.com",
		status: "active",
		createdAt: "2024-01-15T10:30:00Z",
		updatedAt: "2024-01-20T14:45:00Z",
	},
	{
		id: "2",
		name: "Beta Dashboard",
		description: "Analytics dashboard for real-time data visualization",
		url: "https://www.google.com",
		status: "pending",
		createdAt: "2024-01-10T09:15:00Z",
		updatedAt: "2024-01-18T16:20:00Z",
	},
	{
		id: "3",
		name: "Gamma API",
		description: "RESTful API for mobile applications",
		url: "https://www.google.com",
		status: "inactive",
		createdAt: "2024-01-05T11:00:00Z",
		updatedAt: "2024-01-12T13:30:00Z",
	},
	{
		id: "4",
		name: "Delta Database",
		description: "High-performance database optimization system",
		url: "https://www.google.com",
		status: "active",
		createdAt: "2024-01-08T08:45:00Z",
		updatedAt: "2024-01-22T10:15:00Z",
	},
	{
		id: "5",
		name: "Epsilon Security",
		description: "Advanced security framework implementation",
		url: "https://www.google.com",
		status: "pending",
		createdAt: "2024-01-12T15:20:00Z",
		updatedAt: "2024-01-19T12:00:00Z",
	},
];

export const getStatusColor = (status: Item["status"]) => {
	switch (status) {
		case "active":
			return "bg-green-100 text-green-800";
		case "inactive":
			return "bg-gray-100 text-gray-800";
		case "pending":
			return "bg-yellow-100 text-yellow-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
