"use client";
import { useEffect, useState } from "react";

export default function AppointmentCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setError("");
    setSuccess("");
    setLoading(true);

    const access_token = JSON.parse(localStorage.getItem('access_token'));
    fetch("http://127.0.0.1:8000/api/appointments/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch appointments");
        return response.json();
      })
      .then((data) => {
        // Adjust this if your API doesn't return appointments directly as an array
        setAppointments(data.data);
        console.log(data.data[0])
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Calendar calculations
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = [];
  for (let i = 1; i <= lastDay.getDate(); i++) daysInMonth.push(i);

  function parseYYYYDDMM(dateString) {
    // Expected format: "YYYY-DD-MM"
    const [year, day, month] = dateString.split("-");
    // JavaScript months are 0-based, so subtract 1 from month
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Find days with appointments in the current month
  const daysWithAppointments = appointments
    .filter((a) => {
      const d = parseYYYYDDMM(a.appointment_day);
      // console.log(d.getDate())
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    })
    .map((a) => parseYYYYDDMM(a.appointment_day).getDate());

  // Format YYYY-MM-DD
  const formatDate = (y, m, d) =>
    `${y}-${String(d).padStart(2, "0")}-${String(m + 1).padStart(2, "0")}`;

  // Vietnamese months
  const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

  const selectedAppointments = appointments.filter(
    (a) => a.appointment_day === selectedDate
  );

  console.log("appointments", appointments);
  console.log("selectedDate", selectedDate);
  console.log("selectedAppointments", selectedAppointments);

  return (
    <div className="mt-10 mb-10 max-w-lg mx-auto bg-white rounded shadow p-6 border border-teal-600">
      <div className="flex justify-between items-center mb-4">
        <button
          className="p-1 px-2 rounded hover:bg-teal-50 text-teal-600 border border-transparent hover:border-teal-200"
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear((y) => y - 1);
            } else {
              setCurrentMonth((m) => m - 1);
            }
            setSelectedDate(null);
          }}
        >
          &lt;
        </button>
        <div className="font-bold text-lg text-teal-600">
          {months[currentMonth]} {currentYear}
        </div>
        <button
          className="p-1 px-2 rounded hover:bg-teal-50 text-teal-600 border border-transparent hover:border-teal-200"
          onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear((y) => y + 1);
            } else {
              setCurrentMonth((m) => m + 1);
            }
            setSelectedDate(null);
          }}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center font-semibold text-teal-600">
        <div>T2</div>
        <div>T3</div>
        <div>T4</div>
        <div>T5</div>
        <div>T6</div>
        <div>T7</div>
        <div>CN</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: startDay - 1 }).map((_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {daysInMonth.map((day) => {
          const dateStr = formatDate(currentYear, currentMonth, day);
          const isToday =
            dateStr === formatDate(today.getFullYear(), today.getMonth(), today.getDate());
          // console.log(daysWithAppointments)
          const hasAppointment = daysWithAppointments.includes(day);
          const isSelected = selectedDate === dateStr;
          return (
            <button
              key={day}
              className={`
                aspect-square rounded flex items-center justify-center
                border 
                ${hasAppointment ? "bg-yellow-300 font-bold border-teal-600 text-teal-700" : "border-gray-200"}
                ${isToday ? "ring-2 ring-teal-600 ring-offset-2" : ""}
                ${isSelected ? "bg-teal-600 text-white" : ""}
                hover:bg-teal-50 transition
              `}
              onClick={() => setSelectedDate(dateStr)}
            >
              {day}
            </button>
          );
        })}
      </div>
      {/* Detail for selected date */}
      {selectedDate && (
        <div className="mt-6">
          <div className="font-semibold mb-2 text-teal-600">
            Lịch hẹn ngày {selectedDate.split("-").reverse().join("/")}
          </div>
          {selectedAppointments.length === 0 ? (
            <div className="text-gray-500 text-sm">Không có lịch hẹn.</div>
          ) : (
            <ul className="space-y-2">
              {selectedAppointments.map((a, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded border border-teal-200 bg-teal-50 flex flex-col"
                >
                  <span>
                    <span className="font-semibold">Giờ hẹn:</span> {a.appointment_time}
                  </span>
                  <span>
                    <span className="font-semibold">Bác sĩ:</span> {a.doctor.full_name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}