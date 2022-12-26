import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarBox.css";

export const CalendarBox = ({ className, date, setDate }) => {
  const [show, setShow] = useState(false);

  const handleCalendar = () => {
    let timer;

    timer = setTimeout(() => {
      setShow(!show);
    }, 100);

    return () => clearTimeout(timer);
  };

  return (
    <div className="calendar-input">
      <div className={`calendar-input__wrapper ${className}`} onClick={handleCalendar}>
        <span className="calendar-input__head">{date.toLocaleDateString()}</span>
        <div><img src="/images/calendar.svg" alt="pic" /></div>
      </div>
      { show && <div className="calendar-input__box">
        <Calendar onChange={setDate} onClickDay={handleCalendar} />
      </div> }
    </div>
  );
};
