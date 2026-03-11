import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Drawer } from "@mui/material";

const Layout = () => {

  const [open, setOpen] = useState(false);

  return (

    <div style={{ display: "flex" }}>

      {/* Sidebar desktop */}
      <div className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* Sidebar mobile */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Sidebar />
      </Drawer>

      <div style={{ flex: 1, marginLeft: "220px" }}>

        <Header toggleMenu={() => setOpen(true)} />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>

      </div>

    </div>

  );

};

export default Layout;