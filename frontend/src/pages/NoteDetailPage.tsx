import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Calendar from "../components/note/Calender";
import { getNote, getQa } from "../api/api";

const NoteDetailPage = () => {
  const userid = localStorage.getItem("access_token");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  const [fileMessage, setFileMessage] = useState("");
  const [clovaMessage, setClovaMessage] = useState([]);
  const [userMessage, setUserMessage] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    window.addEventListener("resize", handleResize);

    const fetchData = async () => {
      try {
        const res = await getNote(userid, "테스트");
        console.log(res);
        setFileMessage(res.contents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userid, "테스트", query);
    try {
      const res = await getQa(userid, "테스트", query);
      const newMessage = [...clovaMessage, res.query];
      setClovaMessage(newMessage);
      setUserMessage([...userMessage, query]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex">
      {isMobile ? <Navbar /> : <Sidebar />}
      <div className="flex flex-col w-full h-screen justify-between">
        <div className="overflow-auto">
          <div className="flex justify-center gap-2 w-full mt-4">
            <img
              className="w-8 h-8 rounded-full ml-2"
              src="/images/Clova_fill.png"
              alt="clova"
            ></img>
            <div className="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Clova
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  now
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white overflow-auto max-h-60">
                {fileMessage}
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
          {clovaMessage.map((msg, index) => (
            <>
              <div className="flex justify-center gap-2 w-full mt-4">
                <img
                  className="w-8 h-8 rounded-full ml-2"
                  src="/images/profile.png"
                  alt="profile"
                ></img>
                <div className="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      User
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      now
                    </span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {userMessage[index]}
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
                <img
                  className="w-8 h-8 rounded-full ml-2"
                  src="/images/Clova_fill.png"
                  alt="clova"
                ></img>
                <div className="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      Clova
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      now
                    </span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white overflow-auto max-h-60">
                    {clovaMessage[index]}
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
            </>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <textarea
              id="chat"
              rows={1}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              onChange={(e) => setQuery(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              value={query}
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

      <div className="max-h-max" style={{ borderLeft: "1px solid #e7e7e7" }}>
        <Calendar></Calendar>
      </div>
    </main>
  );
};

export default NoteDetailPage;
