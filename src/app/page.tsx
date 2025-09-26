"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import ActionModal from "@/components/ActionModal";
import SearchAndFilter from "@/components/SearchAndFilter";
import { Item, Action } from "@/types/data";
import { newsService } from "@/services/news";

export default function Home() {
	const [items, setItems] = useState<Item[]>([]);
	const [filteredItems, setFilteredItems] = useState<Item[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [modalState, setModalState] = useState<{
		isOpen: boolean;
		action: Action;
		item: Item | null;
	}>({
		isOpen: false,
		action: "view",
		item: null,
	});

	const getItems = async () => {
		const data = await newsService.getNews();
		setItems(data);
		setFilteredItems(data);
	};

	const updateStatus = async (item: Item) => {
		const result = await newsService.updateNews(item._id, item);
		console.log(result);
	};

	useEffect(() => {
		getItems();
	}, []);

	const handleAction = (action: Action, item: Item) => {
		setModalState({
			isOpen: true,
			action,
			item,
		});
	};

	const handleModalClose = () => {
		setModalState({
			isOpen: false,
			action: "view",
			item: null,
		});
	};

	const handleStatusChange = (item: Item) => {
		updateStatus(item);
	};

	const handleModalConfirm = () => {
		const { action, item } = modalState;
		console.log(action, item);
		if (!item) return;

		switch (action) {
			case "delete":
				// Remove the item from both arrays
				const updatedItems = items.filter((i) => i._id !== item._id);
				setItems(updatedItems);
				setFilteredItems((prev) => prev.filter((i) => i._id !== item._id));
				// Remove from selected items if it was selected
				setSelectedItems((prev) => prev.filter((id) => id !== item._id));
				break;

			case "edit":
				// In a real app, you would update the item here
				// For now, we'll just close the modal
				console.log("Edit item:", item);
				updateStatus(item);
				break;

			case "view":
				// Just close the modal for view action
				break;
		}

		handleModalClose();
	};

	const handleSelectionChange = (itemId: string, selected: boolean) => {
		if (selected) {
			setSelectedItems((prev) => [...prev, itemId]);
		} else {
			setSelectedItems((prev) => prev.filter((id) => id !== itemId));
		}
	};

	const handleFilterChange = (filtered: Item[]) => {
		setFilteredItems(filtered);
		// Clear selections when filter changes
		setSelectedItems([]);
	};

	const handleBulkDelete = () => {
		return;
		// TODO: Implement bulk delete
		/* if (selectedItems.length === 0) return;

		const updatedItems = items.filter(
			(item) => !selectedItems.includes(item._id)
		);
		setItems(updatedItems);
		setFilteredItems((prev) =>
			prev.filter((item) => !selectedItems.includes(item._id))
		);
		setSelectedItems([]);
		*/
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="px-4 sm:px-0 mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Data Management Dashboard
					</h1>
					<p className="mt-2 text-sm text-gray-600">
						Manage your data with search, filter, and bulk operations
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 px-4 sm:px-0">
					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="p-5">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<svg
										className="h-6 w-6 text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
										/>
									</svg>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dl>
										<dt className="text-sm font-medium text-gray-500 truncate">
											Total Items
										</dt>
										<dd className="text-lg font-medium text-gray-900">
											{items.length}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="p-5">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<svg
										className="h-6 w-6 text-green-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dl>
										<dt className="text-sm font-medium text-gray-500 truncate">
											Active Items
										</dt>
										<dd className="text-lg font-medium text-gray-900">
											{items.filter((item) => item.status === "active").length}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="p-5">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<svg
										className="h-6 w-6 text-yellow-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dl>
										<dt className="text-sm font-medium text-gray-500 truncate">
											Pending Items
										</dt>
										<dd className="text-lg font-medium text-gray-900">
											{items.filter((item) => item.status === "pending").length}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="p-5">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<svg
										className="h-6 w-6 text-blue-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 10h16M4 14h16M4 18h16"
										/>
									</svg>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dl>
										<dt className="text-sm font-medium text-gray-500 truncate">
											Selected Items
										</dt>
										<dd className="text-lg font-medium text-gray-900">
											{selectedItems.length}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="bg-white shadow-lg rounded-lg overflow-hidden">
					{/* Search and Filter */}
					<SearchAndFilter items={items} onFilterChange={handleFilterChange} />

					{/* Data Table */}
					<DataTable
						items={filteredItems}
						onAction={handleAction}
						selectedItems={selectedItems}
						onSelectionChange={handleSelectionChange}
					/>
				</div>

				{/* Bulk Actions */}
				{selectedItems.length > 0 && (
					<div className="mt-6 px-4 sm:px-0">
						<div className="bg-white shadow rounded-lg p-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<span className="text-sm font-medium text-gray-700">
										{selectedItems.length} item(s) selected
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<button
										onClick={() => setSelectedItems([])}
										className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
									>
										Clear Selection
									</button>
									<button
										onClick={handleBulkDelete}
										className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
									>
										Delete Selected
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Action Modal */}
			<ActionModal
				isOpen={modalState.isOpen}
				onClose={handleModalClose}
				action={modalState.action}
				item={modalState.item}
				onConfirm={handleModalConfirm}
				handleStatusChange={handleStatusChange}
			/>
		</div>
	);
}
