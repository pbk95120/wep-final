import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Calendar from "../components/note/Calender";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NoteDetailPage = () => {
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

      <div className="flex flex-col w-full h-screen justify-between">
        <div>
          <div className="flex justify-center gap-2 w-full mt-4">
            <img className="w-8 h-8 rounded-full ml-2" src="/images/Clova_fill.png"></img>
            <div className="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Clova</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">now</span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                That's awesome. I think our users will really appreciate the improvements.
              </p>
            </div>
            <button
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              data-dropdown-placement="bottom-start"
              className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
              type="button"
            ></button>
          </div>
          <div className="flex justify-center gap-2 w-full mt-4">
            <img className="w-8 h-8 rounded-full ml-2" src="/images/profile.png"></img>
            <div className="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">User</span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">now</span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                That's awesome. I think our users will really appreciate the improvements.
              </p>
            </div>
            <button
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              data-dropdown-placement="bottom-start"
              className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
              type="button"
            ></button>
          </div>
        </div>

        <form>
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <textarea
              id="chat"
              rows={1}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>

      <div className="h-screen" style={{ borderLeft: "1px solid #e7e7e7" }}>
        <Calendar></Calendar>
      </div>
    </main>
  );
};

export default NoteDetailPage;
