/**
 * App Component
 * 
 * Root component of the application.
 */

import { Layout } from './components/Layout';
import { ProjectsPage } from './pages/ProjectsPage';
import './App.css';

function App() {
  return (
    <Layout>
      <ProjectsPage />
    </Layout>
  );
}

export default App;
