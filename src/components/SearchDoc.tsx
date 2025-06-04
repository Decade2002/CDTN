"use client"

import { useState } from "react";

const departments = [
  { name: "Tất cả", count: 483 },
  { name: "Khoa Răng Miệng", count: 36 },
  { name: "Khoa Xương Cốt", count: 28 },
  { name: "Khoa Chuẩn Đoán", count: 18 },
  { name: "Khoa Tim Mạch", count: 22 },
  { name: "Khoa Phẫu Thuật", count: 14 },
  { name: "Khoa Mắt Mũi", count: 11 },
];

const doctors = [
  {
    id: 1,
    name: "PGS.TS - Nguyễn Thị Ngọc Lan",
    position: "Phó giáo sư, Tiến sĩ",
    department: "Khoa Tim Mạch",
    hospital: "Bệnh viện Đa khoa Hồng Ngọc – Phúc Trường Minh",
    avatar: "/doctor1.jpg",
  },
  {
    id: 2,
    name: "ThS.BSCKII - Bùi Thanh Tiến",
    position: "Thạc sĩ | Bác sĩ Chuyên khoa II",
    department: "Khoa Xương Cốt",
    hospital: "Bệnh viện Đa khoa Hồng Ngọc – Phúc Trường Minh",
    avatar: "/doctor2.jpg",
  },
  {
    id: 3,
    name: "PGS.TS - Trần Thị Minh Hoa",
    position: "Phó Giáo sư, Tiến sĩ",
    department: "Khoa Răng Miệng",
    hospital: "Bệnh viện Đa khoa Hồng Ngọc – Phúc Trường Minh",
    avatar: "/doctor3.jpg",
  },
  {
    id: 4,
    name: "TTƯT.ThS.BSCKI - Bùi Xuân Quyền",
    position: "Thầy thuốc ưu tú | Thạc sĩ | Bác sĩ Chuyên khoa I",
    department: "Khoa Phẫu Thuật",
    hospital: "Bệnh viện Đa khoa Hồng Ngọc – Phúc Trường Minh",
    avatar: "/doctor4.jpg",
  },
];

export default function SearchDoctor() {
  const [selectedDept, setSelectedDept] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (doc) =>
      (selectedDept === "Tất cả" || doc.department === selectedDept) &&
      (doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.position.toLowerCase().includes(search.toLowerCase()) ||
        doc.department.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex gap-8 bg-white min-h-screen p-6">
      <div className="w-80 shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold text-lg">Bộ lọc</span>
        </div>
        <div className="flex gap-2 mb-4">
          <select className="border rounded px-3 py-2 w-1/2 focus:border-teal-700 outline-none">
            <option>Chọn theo khoa</option>
          </select>
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
          {departments.map((dept, idx) => (
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
              <span
                className={`ml-2 text-sm px-2 py-0.5 rounded ${
                  selectedDept === dept.name
                    ? "bg-teal-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {dept.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="flex gap-6 items-center border-b pb-6"
          >
            <img
              src={doc.avatar}
              alt={doc.name}
              className="w-40 h-40 object-cover rounded shadow"
              draggable={false}
            />
            <div>
              <h3 className="font-bold text-xl mb-1">{doc.name}</h3>
              <a
                href="#"
                className="text-teal-700 text-sm font-semibold hover:underline"
              >
                Xem chi tiết
              </a>
              <div className="mt-2 flex flex-col gap-1 text-gray-700 text-[15px]">
                <div>
                  <span className="material-icons text-sm align-middle mr-1">school</span>
                  {doc.position}
                </div>
                <div>
                  <span className="material-icons text-sm align-middle mr-1">location_on</span>
                  {doc.hospital}
                </div>
                <div>
                  <span className="material-icons text-sm align-middle mr-1">local_hospital</span>
                  <span>{doc.department}</span>
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