import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  const handleShowTodayNote = () => {
    navigate("/note");
  };

  const handleShowAllNote = () => {
    navigate("/note");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar sx={{ overflow: "hidden" }} />
      <div className="flex flex-col gap-4 m-10">
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
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;
