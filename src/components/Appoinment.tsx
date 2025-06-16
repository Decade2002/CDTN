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

  // For cancel popup
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

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
        setAppointments(data.data);
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
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Find days with appointments in the current month
  const daysWithAppointments = appointments
    .filter((a) => {
      const d = parseYYYYDDMM(a.appointment_day);
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

  const appointmentStatus = (id) => {
    const status = appointments.filter((a) => a.appointment_id === id)
    if(status[0].appointment_status === "pending") {
      return "Đã lên lịch"
    } else if(status[0].appointment_status === "confirmed")
      return "Đã hoàn thành"
    else return "Đã bị hủy"
  }

  // Cancel appointment handler
  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return;
    setLoading(true);
    setError("");
    setSuccess("");
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/appointments/${appointmentToCancel.appointment_id}/cancel/`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to cancel appointment.");
      setSuccess("Đã hủy lịch hẹn thành công!");
      setShowCancelPopup(false);
      setAppointmentToCancel(null);
    } catch (err) {
      setError(err.message);
      setShowCancelPopup(false);
      setAppointmentToCancel(null);
    } finally {
      setLoading(false);
    }
  };

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
      {/* Success/Error Message */}
      {success && <div className="mt-4 text-green-700 font-semibold">{success}</div>}
      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
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
                  key={a.appointment_id}
                  className="p-3 rounded border border-teal-200 bg-teal-50 flex flex-col relative"
                >
                  <span>
                    <span className="font-semibold">Giờ hẹn:</span> {a.appointment_time}
                  </span>
                  <span>
                    <span className="font-semibold">Bác sĩ:</span> {a.doctor.full_name}
                  </span>
                  <span>
                    <span className="font-semibold">Tình trạng :</span> {appointmentStatus(a.appointment_id)}
                  </span>
                  {a.appointment_status !== "cancelled" ? 
                    <button
                      className={`absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded`}
                      onClick={() => {
                        setShowCancelPopup(true);
                        setAppointmentToCancel(a);
                      }}
                      disabled={loading}
                    >
                      Huỷ lịch
                    </button> :
                    <div></div>
                  }
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Cancel Confirmation Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg border border-teal-600 w-full max-w-xs">
            <div className="font-bold text-red-700 mb-3">Xác nhận huỷ lịch hẹn</div>
            <div className="mb-4">Bạn có chắc chắn muốn huỷ lịch hẹn này?</div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => {
                  setShowCancelPopup(false);
                  setAppointmentToCancel(null);
                }}
                disabled={loading}
              >
                Không
              </button>
              <button
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleCancelAppointment}
                disabled={loading}
              >
                {loading ? "Đang huỷ..." : "Có"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}