"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function SetAppointment({doctors}) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    doctor_user_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("")

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const token = localStorage.getItem("access_token")
  let router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();
    if(token) {
      setError("");
      setSuccess("");
      setLoading(true);
      try {
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        console.log(form)
        const res = await fetch("http://127.0.0.1:8000/api/appointmentregister/", {
          method: "POST",
          headers: { "Authorization": `Bearer ${access_token}`, "Content-Type": "application/json", },
          body: JSON.stringify(form),
        });
        const a = await res.json()
        console.log(a)
        if (!res.ok) throw a;
        setSuccess("Đặt lịch thành công!");
        setForm({ date: "", time: "", doctor_user_id: "" });
        router.push("/appointment")
      } catch (err) {
        console.log(err)
        setError(err.date || err.time || err.message);
      } finally {
        setLoading(false);
      }
    } else {
      router.push("/signIn")
    }
  };

  // Tạo danh sách các giờ khám mẫu
  const timeSlots = [
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
  ];
  const filteredDoctors = doctors.filter((doc) =>
    doc.full_name?.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  const selectedDoctor = doctors.find((doc) => doc.user_id === form.doctor_user_id);

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/hospital.png')` }}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Đặt lịch hẹn</h2>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Ngày */}
          <div>
            <label className="block mb-1 font-medium">
              Ngày <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              className="w-full border border-teal-600 rounded px-3 py-2 outline-none"
              value={form.date}
              onChange={onChange}
              required
            />
          </div>
          {/* Giờ */}
          <div>
            <label className="block mb-1 font-medium">
              Giờ <span className="text-red-500">*</span>
            </label>
            <select
              name="time"
              className="w-full border border-teal-600 rounded px-3 py-2 outline-none"
              value={form.time}
              onChange={onChange}
              required
            >
              <option value="">Chọn khung giờ</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          {/* Bác sĩ */}
          <div className="relative">
            <label className="block mb-1 font-medium">
              Bác sĩ 
            </label>
            <input
              type="text"
              className="w-full border border-teal-600 rounded px-3 py-2 outline-none"
              placeholder="Tìm kiếm bác sĩ theo tên..."
              value={selectedDoctor ? selectedDoctor.full_name : searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setForm(prev => ({ ...prev, doctor_user_id: "" }));
              }}
              onFocus={() => setSearchTerm("")}
              autoComplete="off"
              readOnly={!!form.doctor_user_id}
              style={{ backgroundColor: form.doctor_user_id ? "#f0fdfa" : undefined }}
            />
            {/* Dropdown danh sách bác sĩ tìm kiếm */}
            {searchTerm && !form.doctor_user_id && (
              <div className="absolute z-10 left-0 right-0 bg-white border border-teal-200 rounded shadow max-h-48 overflow-y-auto">
                {filteredDoctors.length === 0 && (
                  <div className="p-2 text-gray-500 text-sm">Không tìm thấy bác sĩ phù hợp</div>
                )}
                {filteredDoctors.map((doc) => (
                  <button
                    type="button"
                    key={doc.user_id}
                    className="w-full text-left px-4 py-2 hover:bg-teal-50 text-teal-700"
                    onClick={() => {
                      setForm(prev => ({ ...prev, doctor_user_id: doc.user_id }));
                      setSearchTerm("");
                    }}
                  >
                    {doc.degree} {doc.full_name}
                    <span className="text-left px-4 py-2 hover:bg-teal-50 text-teal-700">({doc.specialty})</span>
                  </button>
                ))}
              </div>
            )}
            {/* Nút xoá chọn bác sĩ */}
            {form.doctor_user_id && (
              <button
                type="button"
                className="absolute right-2 top-1/2 mt-2 -translate-y-1/2 text-teal-600 hover:text-red-600 text-lg font-bold"
                onClick={() => {
                  setForm(prev => ({ ...prev, doctor_user_id: "" }));
                  setSearchTerm("");
                }}
                aria-label="Huỷ chọn bác sĩ"
              >
                ×
              </button>
            )}
          </div>
          {error && <div className="text-red-600 font-medium">{error}</div>}
          {success && <div className="text-green-600 font-medium">{success}</div>}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white rounded px-6 py-2 font-semibold text-lg hover:bg-teal-700 transition"
            disabled={loading}
          >
            {loading ? "Đang đặt lịch..." : "Đặt lịch"}
          </button>
        </form>
      </div>
    </div>
  );
}