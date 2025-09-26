import { Item } from "@/types/data";

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
