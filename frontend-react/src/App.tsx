/**
 * App Component
 * 
 * Root component of the application.
 */

import React from 'react';
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
