"use client";

import { useState } from "react";
import { Item } from "@/types/data";

interface SearchAndFilterProps {
	items: Item[];
	onFilterChange: (filteredItems: Item[]) => void;
}

export default function SearchAndFilter({
	items,
	onFilterChange,
}: SearchAndFilterProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<Item["status"] | "all">(
		"all"
	);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		applyFilters(value, statusFilter);
	};

	const handleStatusFilterChange = (value: Item["status"] | "all") => {
		setStatusFilter(value);
		applyFilters(searchTerm, value);
	};

	const applyFilters = (search: string, status: Item["status"] | "all") => {
		let filtered = [...items];

		// Apply search filter
		if (search.trim()) {
			filtered = filtered.filter(
				(item) =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.description.toLowerCase().includes(search.toLowerCase()) ||
					item.source.toLowerCase().includes(search.toLowerCase())
			);
		}

		// Apply status filter
		if (status !== "all") {
			filtered = filtered.filter((item) => item.status === status);
		}

		onFilterChange(filtered);
	};

	return (
		<div className="bg-white p-4 border-b border-gray-200">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1">
					<label htmlFor="search" className="sr-only">
						Search items
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg
								className="h-5 w-5 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<input
							id="search"
							type="text"
							value={searchTerm}
							onChange={(e) => handleSearchChange(e.target.value)}
							placeholder="Search by title or description..."
							className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
				</div>

				<div className="sm:w-48">
					<label htmlFor="status-filter" className="sr-only">
						Filter by status
					</label>
					<select
						id="status-filter"
						value={statusFilter}
						onChange={(e) =>
							handleStatusFilterChange(e.target.value as Item["status"] | "all")
						}
						className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="all">All Status</option>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
						<option value="pending">Pending</option>
					</select>
				</div>

				<div className="flex items-center space-x-2">
					<button
						onClick={() => {
							setSearchTerm("");
							setStatusFilter("all");
							onFilterChange(items);
						}}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
					>
						Clear Filters
					</button>
				</div>
			</div>

			{(searchTerm || statusFilter !== "all") && (
				<div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
					<span>Active filters:</span>
					{searchTerm && (
						<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
							Search: &quot;{searchTerm}&quot;
						</span>
					)}
					{statusFilter !== "all" && (
						<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
							Status: {statusFilter}
						</span>
					)}
				</div>
			)}
		</div>
	);
}
