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
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            className="w-8/12 max-h-screen rounded my-10"
            src="images/library.jpg"
            alt="library"
          ></img>
          <p className="bold text-2xl mt-10 mb-4">Start With Edu Note</p>
          <Link to="/note">
            <Button variant="contained" sx={{ backgroundColor: "#1c2536" }}>
              Start Note
            </Button>
          </Link>
        </div>
      </div>
      <div className="h-screen" style={{ borderLeft: "1px solid #e7e7e7" }}>
        <Calendar></Calendar>
      </div>
    </main>
  );
};

export default HomePage;
