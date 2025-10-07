## Tech Stack

- **React 19** - Modern functional components with hooks
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server
- **TanStack Query** - Server state management and data fetching
- **Tailwind CSS** - Utility-first styling framework
- **ShadCN UI** - Reusable component library
- **Heroicons** - SVG icon library
- **React Circular Progressbar** - Progress visualization

## Whats implemented 
 - Proper Data layer 
 - Solid Project structure 
 - Table layout & table structure
 - Filtering system (except campaign_id, private_id):
   - Location
   - Duration
   - Purpose
   - Rating
 - Sorting system
   - Hierarchy for "Reitingas"
   - ClientSide sorting for "Laikas"&"Interest Rate"
 - Pagination system that adjust to how many items are displayed on the page 10/20/50/100

## Folder Structure

The project follows a **feature-based architecture** adhering to SOLID and DRY principles:

```
src/
├── app/
│   ├── providers/
│   │   └── QueryProvider.tsx
│   └── main.tsx
├── features/
│   └── projects/
│       ├── api/
│       │   └── projects.api.ts
│       ├── components/
│       │   ├── FilterPanel.tsx
│       │   ├── ProjectsTable.tsx
│       │   ├── Pagination.tsx
│       │   └── filters/
│       ├── hooks/
│       │   └── useProjects.ts
│       ├── model/
│       │   ├── project.model.ts
│       │   ├── filter.model.ts
│       │   └── sort.model.ts
│       ├── services/
│       │   ├── table.service.tsx
│       │   ├── filter.service.ts
│       │   └── sort.service.ts
│       ├── constants/
│       │   └── project.constants.ts
│       └── pages/
│           └── ProjectsPage.tsx
├── components/ui/
│   ├── button.tsx
│   ├── table.tsx
│   ├── select.tsx
│   └── ...
├── lib/
│   ├── fetchClient.ts
│   └── utils.ts
├── utils/
│   └── queryBuilder.ts
└── styles/
    └── index.css
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   create new .env file based on .example paste YOUR_URL
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```