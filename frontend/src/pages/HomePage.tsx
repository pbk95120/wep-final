import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Calendar from "../components/note/Calender";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main className="flex">
      {isMobile ? <Navbar /> : <Sidebar />}
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex-col w-full">
          <p className="bold text-2xl">Edu Note</p>
          <Link to="/note">
            <Button variant="contained" sx={{ backgroundColor: "#1c2536" }}>
              Start Note
            </Button>
          </Link>
        </div>
        <div className="w-full"></div>
      </div>
      <div className="h-screen" style={{ borderLeft: "1px solid #e7e7e7" }}>
        <Calendar></Calendar>
      </div>
    </main>
  );
};

export default HomePage;
