"use client";

import { useState } from "react";
import { DataTableProps, Action, Item } from "@/types/data";
import { getStatusColor, formatDate } from "@/lib/mockData";

export default function DataTable({
	items,
	onAction,
	selectedItems,
	onSelectionChange,
}: DataTableProps) {
	const [sortField, setSortField] = useState<keyof Item>("title");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const handleSort = (field: keyof Item) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	const sortedItems = [...items].sort((a, b) => {
		const aValue = a[sortField];
		const bValue = b[sortField];

		if (typeof aValue === "string" && typeof bValue === "string") {
			return sortDirection === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		return 0;
	});

	const handleSelectAll = (checked: boolean) => {
		items.forEach((item) => {
			onSelectionChange(item._id, checked);
		});
	};

	const isAllSelected =
		items.length > 0 && selectedItems.length === items.length;
	const isIndeterminate =
		selectedItems.length > 0 && selectedItems.length < items.length;

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="px-6 py-4 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold text-gray-900">
						Data Management
					</h2>
					<div className="flex items-center space-x-2">
						<span className="text-sm text-gray-500">
							{selectedItems.length} of {items.length} selected
						</span>
						{selectedItems.length > 0 && (
							<button
								onClick={() => onAction("delete", items[0])}
								className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
							>
								Delete Selected
							</button>
						)}
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left">
								<input
									type="checkbox"
									checked={isAllSelected}
									ref={(input) => {
										if (input) input.indeterminate = isIndeterminate;
									}}
									onChange={(e) => handleSelectAll(e.target.checked)}
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
							</th>
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
								onClick={() => handleSort("title")}
							>
								Title{" "}
								{sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Description
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								URL
							</th>
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
								onClick={() => handleSort("status")}
							>
								Status{" "}
								{sortField === "status" &&
									(sortDirection === "asc" ? "↑" : "↓")}
							</th>
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
								onClick={() => handleSort("createdAt")}
							>
								Created{" "}
								{sortField === "createdAt" &&
									(sortDirection === "asc" ? "↑" : "↓")}
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{sortedItems.map((item) => (
							<tr
								key={item._id}
								className={`hover:bg-gray-50 transition-colors ${
									selectedItems.includes(item._id) ? "bg-blue-50" : ""
								}`}
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<input
										type="checkbox"
										checked={selectedItems.includes(item._id)}
										onChange={(e) =>
											onSelectionChange(item._id, e.target.checked)
										}
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
									/>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium max-w-xs truncate text-gray-900">
										{item.title}
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm text-gray-900 max-w-xs truncate">
										{item.description}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap max-w-[200px] truncate">
									<a
										href={item.source}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-blue-500 hover:text-blue-700 underline"
									>
										{item.source}
									</a>
								</td>
								<td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
									<span
										className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
											item.status
										)}`}
									>
										{item.status}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{formatDate(item.createdAt)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div className="flex items-center space-x-2">
										<button
											onClick={() => onAction("view", item)}
											className="text-blue-600 hover:text-blue-900 transition-colors"
										>
											View
										</button>
										<button
											onClick={() => onAction("edit", item)}
											className="text-green-600 hover:text-green-900 transition-colors"
										>
											Edit
										</button>
										<button
											onClick={() => onAction("delete", item)}
											className="text-red-600 hover:text-red-900 transition-colors"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{items.length === 0 && (
				<div className="text-center py-12">
					<div className="text-gray-500 text-lg">No items found</div>
					<div className="text-gray-400 text-sm mt-2">
						Add some items to get started
					</div>
				</div>
			)}
		</div>
	);
}
