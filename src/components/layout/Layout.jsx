import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Drawer, useMediaQuery } from "@mui/material";

const Layout = () => {

  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  return (

    <div style={{ display: "flex" }}>

      {/* Sidebar desktop */}
      {!isMobile && <Sidebar />}

      {/* Sidebar mobile */}
      {isMobile && (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Sidebar />
        </Drawer>
      )}

      <div style={{ flex: 1 }}>

        <Header toggleMenu={() => setOpen(true)} />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>

      </div>

    </div>

  );

};

export default Layout;