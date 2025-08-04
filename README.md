# Adaka Admin - Data Management Dashboard

A modern, responsive Next.js application for managing data with advanced filtering, sorting, and bulk operations capabilities.

## 🚀 Features

### Core Functionality
- **Data Management**: View, edit, and delete items with a clean, modern interface
- **Advanced Search**: Search by name or description with real-time filtering
- **Status Filtering**: Filter items by status (Active, Inactive, Pending)
- **Sortable Columns**: Click column headers to sort by name, status, or creation date
- **Bulk Operations**: Select multiple items for bulk deletion
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Interface
- **Modern Dashboard**: Clean, professional interface with statistics cards
- **Interactive Data Table**: Sortable columns with hover effects and selection
- **Modal Dialogs**: Context-aware modals for viewing, editing, and deleting items
- **Status Indicators**: Color-coded status badges for easy identification
- **Real-time Updates**: Instant feedback for all user actions

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, utility-first CSS framework
- **Next.js 14**: Latest React framework with App Router
- **Client-side State Management**: Efficient state handling with React hooks
- **Component Architecture**: Modular, reusable components

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd adaka-admin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
adaka-admin/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main dashboard page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── DataTable.tsx     # Main data table component
│   │   ├── ActionModal.tsx   # Modal for actions (view/edit/delete)
│   │   └── SearchAndFilter.tsx # Search and filter controls
│   ├── lib/
│   │   └── mockData.ts       # Mock data and utility functions
│   └── types/
│       └── data.ts           # TypeScript type definitions
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🎯 Usage

### Viewing Data
- The dashboard displays all items in a sortable table
- Use the search bar to find specific items by name or description
- Filter by status using the dropdown menu
- Click column headers to sort data

### Managing Items
- **View**: Click the "View" button to see detailed item information
- **Edit**: Click the "Edit" button to modify item details (form ready for backend integration)
- **Delete**: Click the "Delete" button to remove items with confirmation

### Bulk Operations
- Select individual items using checkboxes
- Use "Select All" to choose all visible items
- Perform bulk deletion on selected items
- Clear selection to start over

### Statistics Dashboard
The top section shows real-time statistics:
- Total number of items
- Active items count
- Pending items count
- Currently selected items

## 🔧 Customization

### Adding New Data
To add new mock data, edit `src/lib/mockData.ts`:

```typescript
export const mockItems: Item[] = [
  {
    id: '6',
    name: 'New Project',
    description: 'Your new project description',
    status: 'active',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
  },
  // ... more items
];
```

### Modifying Item Structure
Update the `Item` interface in `src/types/data.ts`:

```typescript
export interface Item {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  // Add new fields here
}
```

### Styling Customization
The project uses Tailwind CSS. Modify styles in:
- `src/app/globals.css` for global styles
- Component files for specific styling
- Tailwind configuration in `tailwind.config.js`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Code Quality
- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Full type safety
- **Prettier**: Code formatting (if configured)

## 🔌 API Integration

The current version uses mock data. To integrate with a real API:

1. **Replace mock data** in `src/lib/mockData.ts` with API calls
2. **Add API utilities** for CRUD operations
3. **Implement error handling** for network requests
4. **Add loading states** for better UX

Example API integration structure:
```typescript
// src/lib/api.ts
export const api = {
  getItems: () => fetch('/api/items').then(res => res.json()),
  deleteItem: (id: string) => fetch(`/api/items/${id}`, { method: 'DELETE' }),
  updateItem: (id: string, data: Partial<Item>) => 
    fetch(`/api/items/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🔮 Roadmap

- [ ] Backend API integration
- [ ] User authentication
- [ ] Real-time updates
- [ ] Export functionality (CSV, PDF)
- [ ] Advanced filtering options
- [ ] Dark mode support
- [ ] Mobile app version

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
