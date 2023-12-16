import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Calendar from "../components/note/Calender";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Modal from "../components/layout/Modal";
import { getNoteList, deleteNote } from "../api/api";

const NotePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [ctimeList, setCtimeList] = useState([]);
  const [mtimeList, setMtimeList] = useState([]);

  useEffect(() => {
    getNotes();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getNotes = async () => {
    const userid = localStorage.getItem("access_token");
    const res = await getNoteList(userid);
    setNotes(res.fileList);
    setCtimeList(res.ctimeList);
    setMtimeList(res.mtimeList);
  };

  const handleDeleteNote = async (notename: string) => {
    const userid = localStorage.getItem("access_token");
    const res = await deleteNote(userid, notename);
    console.log(res);
    getNotes();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex">
      {isMobile ? <Navbar /> : <Sidebar />}
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex w-full justify-around my-4 gap-20">
          <p className="bold text-2xl">Edu Note</p>
          <Button
            onClick={handleOpenModal}
            variant="contained"
            sx={{ backgroundColor: "#1c2536" }}
          >
            Add Note
          </Button>
        </div>
        {isModalOpen && <Modal closeModal={handleCloseModal} />}
        <div className="w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Note Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Note Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Edit
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {notes.map((item, idx) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <Link to={`/note/${notes[idx]}`}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {notes[idx]}
                    </th>
                  </Link>
                  <td className="px-6 py-4">All Note</td>
                  <td className="px-6 py-4">{ctimeList[idx]}</td>
                  <td className="px-6 py-4">{mtimeList[idx]}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteNote(notes[idx])}>
                      delete Note
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-screen" style={{ borderLeft: "1px solid #e7e7e7" }}>
        <Calendar></Calendar>
      </div>
    </main>
  );
};

export default NotePage;
