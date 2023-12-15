import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around items-center bg-navy rounded p-3">
      <Link to="/">
        <div>
          <HomeIcon sx={{ color: "#9da4ae" }} />
        </div>
      </Link>
      <Link to="/note">
        <div>
          <ChatIcon sx={{ color: "#9da4ae" }} />
        </div>
      </Link>
      <Link to="/login">
        <div>
          <LoginIcon sx={{ color: "#9da4ae" }} />
        </div>
      </Link>
      <Link to="/register">
        <div>
          <AppRegistrationIcon sx={{ color: "#9da4ae" }} />
        </div>
      </Link>
      <div>
        <LogoutIcon sx={{ color: "#9da4ae" }} />
      </div>
    </div>
  );
};

export default Navbar;
