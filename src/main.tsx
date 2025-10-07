import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { QueryProvider } from './app/providers/QueryProvider.tsx';
import { ProjectsPage } from './features/projects/pages/ProjectsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ProjectsPage />
    </QueryProvider>
  </StrictMode>,
);
