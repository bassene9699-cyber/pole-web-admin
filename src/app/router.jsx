import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ZonesPage from "../pages/ZonesPage";
import TeamsPage from "../pages/TeamsPage";
import InstallationsPage from "../pages/InstallationsPage";
import WorkersPage from "../pages/WorkersPage";
import ProjectsPage from "../pages/ProjectsPage";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const Router = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="zones" element={<ZonesPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="installations" element={<InstallationsPage />} />
          <Route path="workers" element={<WorkersPage />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

};

export default Router;