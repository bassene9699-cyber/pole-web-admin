import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1 }}>

        <Header />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>

      </div>

    </div>

  );

};

export default Layout;