import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ZonesPage from "../pages/ZonesPage";
import TeamsPage from "../pages/TeamsPage";
import InstallationsPage from "../pages/InstallationsPage";

import Layout from "../components/layout/Layout";
import WorkersPage from "../pages/WorkersPage";

const Router = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Layout />}>

          <Route path="dashboard" element={<DashboardPage />} />
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