"use client"

import { useEffect, useState } from "react";

export default function SearchDoctor({ doctors }) {
  const specialtys = [
    { name: "Tất cả"},
    { name: "Khoa Răng Miệng"},
    { name: "Khoa Xương Cốt"},
    { name: "Khoa Chuẩn Đoán"},
    { name: "Khoa Tim Mạch"},
    { name: "Khoa Phẫu Thuật"},
    { name: "Khoa Mắt Mũi"},
  ];
  const [selectedDept, setSelectedDept] = useState("Tất cả");
  const [search, setSearch] = useState("");
  console.log(doctors)
  const filteredDoctors = (doctors ?? []).filter(
    (doc) =>
      (selectedDept === "Tất cả" || doc.specialty === selectedDept) &&
      (doc.full_name.toLowerCase().includes(search.toLowerCase()) ||
        doc.degree.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex gap-8 bg-white min-h-screen p-6">
      <div className="w-80 shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold text-lg">Bộ lọc</span>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="border rounded px-3 py-2 w-full focus:border-teal-700 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="absolute right-3 top-2.5 material-icons text-teal-700 text-lg cursor-pointer" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {specialtys.map((dept, idx) => (
            <button
              key={dept.name}
              onClick={() => setSelectedDept(dept.name)}
              className={`flex justify-between items-center px-4 py-2 rounded ${
                selectedDept === dept.name
                  ? "bg-teal-700 text-white font-semibold"
                  : "bg-white text-gray-900 hover:bg-teal-50"
              }`}
            >
              <span>{dept.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.user_id}
            className="flex gap-6 items-center border-b pb-6"
          >
            <img
              src={doc.img}
              alt={doc.full_name}
              className="w-40 h-40 object-cover rounded shadow"
              draggable={false}
            />
            <div>
              <h3 className="font-bold text-xl mb-1">{doc.full_name}</h3>
              <div className="mt-2 flex flex-col gap-1 text-gray-700 text-[15px]">
                <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                  {doc.degree}
                </div>
                <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span>{doc.specialty}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredDoctors.length === 0 && (
          <div className="col-span-2 text-gray-500 text-center py-8">
            Không tìm thấy bác sĩ phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}