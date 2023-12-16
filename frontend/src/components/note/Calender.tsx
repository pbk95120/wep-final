import * as React from "react";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadMemo, getNote } from "../../api/api";

const Calendar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [memo, setMemo] = useState("");
  const handleShowTodayNote = () => {
    navigate("/note");
  };

  const handleShowAllNote = () => {
    navigate("/note");
  };

  const getMemo = async () => {
    const userid = localStorage.getItem("access_token");
    const notename = pathname.substring(6, pathname.length);
    const res = await getNote(userid, notename);
    setMemo(res.memo);
  };

  const handleSaveMemo = async () => {
    const userid = localStorage.getItem("access_token");
    const notename = pathname.substring(6, pathname.length);
    const res = await uploadMemo(userid, notename, memo);
    console.log(res);
  };

  const checkPage = () => {
    getMemo();
    setIsDetailPage(true);
  };

  useEffect(() => {
    pathname.startsWith("/note/") ? checkPage() : setIsDetailPage(false);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar sx={{ overflow: "hidden" }} />
      <div className="flex flex-col gap-4 m-10">
        {isDetailPage ? (
          <>
            <label
              htmlFor="message"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Memo
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            ></textarea>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1c2536" }}
              onClick={handleSaveMemo}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1c2536" }}
              onClick={handleShowTodayNote}
            >
              Show Today Note
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1c2536" }}
              onClick={handleShowAllNote}
            >
              Show All Note
            </Button>
          </>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;
