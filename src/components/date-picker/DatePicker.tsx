import React, { useEffect, useRef, useState } from "react";
import "./DatePicker.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const enum CalenderType {
  Date,
  Month,
  Year,
}

const DatePicker: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calenderType, setCalenderType] = useState<CalenderType>(
    CalenderType.Date
  );

  const calendarRef = useRef<HTMLDivElement>(null);

  const Months = [
    {
      name: "January",
      short: "Jan",
    },
    {
      name: "February",
      short: "Feb",
    },
    {
      name: "March",
      short: "Mar",
    },
    {
      name: "April",
      short: "Apr",
    },
    {
      name: "May",
      short: "May",
    },
    {
      name: "June",
      short: "Jun",
    },
    {
      name: "July",
      short: "Jul",
    },
    {
      name: "August",
      short: "Aug",
    },
    {
      name: "September",
      short: "Sep",
    },
    {
      name: "October",
      short: "Oct",
    },
    {
      name: "November",
      short: "Nov",
    },
    {
      name: "December",
      short: "Dec",
    },
  ];
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
  const increaseYear = () => setCurrentYear((prev) => prev + 1);
  const decreaseYear = () => setCurrentYear((prev) => prev - 1);

  const selectedDay = () => {
    return selectedDate?.split("-")[0];
  };

  const selectedMonth = () => {
    return selectedDate?.split("-")[1];
  };

  useEffect(() => {
    handleDateClick(new Date().getDate());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalenderType(CalenderType.Date);
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  useEffect(() => {
    if (showCalendar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCalendar]);

  return (
    <div className="date-picker-container">
      <div className="date-picker-input" onClick={toggleCalendar}>
        <FontAwesomeIcon icon={faCalendarDays} />
        <span>{selectedDate}</span>
      </div>
      {showCalendar && (
        <div className="calender-container">
          <div className="calendar" ref={calendarRef}>
            <div className="calendar-header">
              <div
                className="calendar-month"
                onClick={() => setCalenderType(CalenderType.Month)}
              >
                {new Date(0, currentMonth).toLocaleString("default", {
                  month: "long",
                })}
              </div>
              <div
                className="calendar-year"
                onClick={() => setCalenderType(CalenderType.Year)}
              >
                {currentYear}
              </div>
            </div>
            <div className="calendar-body">
              {calenderType === CalenderType.Date && (
                <div className="days">
                  <div className="day-labels">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <span key={day}>{day}</span>
                      )
                    )}
                  </div>
                  <div className="dates">
                    {Array.from({ length: firstDayIndex }).map((_, index) => (
                      <span key={`empty-${index}`} className="empty"></span>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, index) => (
                      <span
                        key={index + 1}
                        className={`date ${
                          selectedDay() === `${index + 1}` ? "selected" : ""
                        }`}
                        onClick={() => handleDateClick(index + 1)}
                      >
                        {index + 1}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {calenderType === CalenderType.Month && (
                <div className="months">
                  {Months.map((month, index) => (
                    <span
                      className={`${
                        selectedMonth() === month.short ? "selected" : ""
                      }`}
                      key={month.short}
                      onClick={() => {
                        setCurrentMonth(index);
                        setCalenderType(CalenderType.Date);
                      }}
                    >
                      {month.name}
                    </span>
                  ))}
                </div>
              )}
              {calenderType === CalenderType.Year && (
                <div className="years">
                  <div className="select-year">
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      onClick={decreaseYear}
                      className="fa-icon"
                    />
                    <span>{currentYear}</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      onClick={increaseYear}
                      className="fa-icon"
                    />
                  </div>
                  <div
                    className="select-btn"
                    onClick={() => setCalenderType(CalenderType.Month)}
                  >
                    Select
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
