import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ toggleMenu }) => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div
      style={{
        height: "60px",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px"
      }}
    >

      <MenuIcon
        onClick={toggleMenu}
        style={{ cursor: "pointer" }}
      />

      <button
        onClick={handleLogout}
        style={{
          padding: "8px 14px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>

  );

};

export default Header;