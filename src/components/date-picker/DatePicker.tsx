import React, { useEffect, useState } from "react";
import "./DatePicker.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const DatePicker: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  const increaseMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const decreaseMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const increaseYear = () => setCurrentYear((prev) => prev + 1);
  const decreaseYear = () => setCurrentYear((prev) => prev - 1);

  useEffect(() => {
    handleDateClick(new Date().getDate());
  }, []);

  return (
    <div className="date-picker-container">
      <div className="date-picker-input" onClick={toggleCalendar}>
        <FontAwesomeIcon icon={faCalendarDays} />
        <span>
          {selectedDate}
          {/* <DatePicker /> */}
        </span>
      </div>
      {showCalendar && (
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={decreaseMonth}>{"<"}</button>
            <span>
              {new Date(0, currentMonth).toLocaleString("default", {
                month: "long",
              })}
            </span>
            <button onClick={increaseMonth}>{">"}</button>
            <button onClick={decreaseYear}>{"<"}</button>
            <span>{currentYear}</span>
            <button onClick={increaseYear}>{">"}</button>
          </div>
          <div className="calendar-body">
            <div className="day-labels">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="dates">
              {Array.from({ length: firstDayIndex }).map((_, index) => (
                <span key={`empty-${index}`} className="empty"></span>
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => (
                <span
                  key={index + 1}
                  className="date"
                  onClick={() => handleDateClick(index + 1)}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
