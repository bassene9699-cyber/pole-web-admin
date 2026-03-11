import { Link } from "react-router-dom";

const Sidebar = () => {

  return (

    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}
    >

      <h2>Admin</h2>

      <nav style={{ marginTop: "40px" }}>

        <p>
          <Link to="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
        </p>

        <p>
          <Link to="/projects" style={{ color: "white" }}>
            Projects
          </Link>
        </p>

        <p>
          <Link to="/zones" style={{ color: "white" }}>
            Zones
          </Link>
        </p>

        <p>
          <Link to="/teams" style={{ color: "white" }}>
            Teams
          </Link>
        </p>

        <p>
          <Link to="/installations" style={{ color: "white" }}>
            Installations
          </Link>
        </p>

        <p>
          <Link to="/workers" style={{ color: "white" }}>
            Workers
          </Link>
        </p>

      </nav>

    </div>

  );

};

export default Sidebar;