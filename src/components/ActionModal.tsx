"use client";

import { ActionModalProps } from "@/types/data";
import { formatDate } from "@/lib/mockData";

export default function ActionModal({
	isOpen,
	onClose,
	action,
	item,
	onConfirm,
}: ActionModalProps) {
	if (!isOpen || !item) return null;

	const getModalContent = () => {
		switch (action) {
			case "view":
				return {
					title: "View Item Details",
					content: (
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Title
								</label>
								<p className="mt-1 text-sm text-gray-900">{item.title}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Description
								</label>
								<p className="mt-1 text-sm text-gray-900">{item.description}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Status
								</label>
								<p className="mt-1 text-sm text-gray-900 capitalize">
									{item.status}
								</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Created
								</label>
								<p className="mt-1 text-sm text-gray-900">
									{formatDate(item.createdAt)}
								</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Last Updated
								</label>
								<p className="mt-1 text-sm text-gray-900">
									{formatDate(item.updatedAt)}
								</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									URL
								</label>
								<a
									href={item.source}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-1 text-sm text-blue-500 hover:text-blue-700 underline"
								>
									{item.source}
								</a>
							</div>
						</div>
					),
					confirmText: "Close",
					confirmStyle: "bg-blue-600 hover:bg-blue-700",
				};

			case "edit":
				return {
					title: "Edit Item",
					content: (
						<div className="space-y-4 text-black">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Title
								</label>
								<input
									type="text"
									defaultValue={item.title}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Description
								</label>
								<textarea
									defaultValue={item.description}
									rows={3}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									URL
								</label>
								<input
									type="text"
									defaultValue={item.source}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Status
								</label>
								<select
									defaultValue={item.status}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
									<option value="pending">Pending</option>
								</select>
							</div>
						</div>
					),
					confirmText: "Save Changes",
					confirmStyle: "bg-green-600 hover:bg-green-700",
				};

			case "delete":
				return {
					title: "Confirm Delete",
					content: (
						<div className="space-y-4">
							<div className="bg-red-50 border border-red-200 rounded-md p-4">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg
											className="h-5 w-5 text-red-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<h3 className="text-sm font-medium text-red-800">
											Are you sure you want to delete this item?
										</h3>
										<div className="mt-2 text-sm text-red-700">
											<p>
												This action cannot be undone. The item &quot;
												{item.title}
												&quot; will be permanently deleted.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					),
					confirmText: "Delete",
					confirmStyle: "bg-red-600 hover:bg-red-700",
				};

			default:
				return {
					title: "Action",
					content: <div>Unknown action</div>,
					confirmText: "OK",
					confirmStyle: "bg-gray-600 hover:bg-gray-700",
				};
		}
	};

	const modalContent = getModalContent();

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
			<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
				<div className="mt-3">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-medium text-gray-900">
							{modalContent.title}
						</h3>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 transition-colors"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<div className="mt-2">{modalContent.content}</div>

					<div className="flex justify-end space-x-3 mt-6">
						<button
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={onConfirm}
							className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${modalContent.confirmStyle}`}
						>
							{modalContent.confirmText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
