export interface Item {
	id: string;
	name: string;
	description: string;
	status: "active" | "inactive" | "pending";
	createdAt: string;
	updatedAt: string;
	url: string;
}

export type Action = "view" | "edit" | "delete" | "select";

export interface DataTableProps {
	items: Item[];
	onAction: (action: Action, item: Item) => void;
	selectedItems: string[];
	onSelectionChange: (itemId: string, selected: boolean) => void;
}

export interface ActionModalProps {
	isOpen: boolean;
	onClose: () => void;
	action: Action;
	item: Item | null;
	onConfirm: () => void;
}
