"use client"

import { useEffect, useState } from "react";

export default function SearchDoctor({ doctors }) {
  const [specialtys, setSpecialtys] = useState([{ name: "Tất cả" }]);
  const [selectedDept, setSelectedDept] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Fetch specialties from API
  useEffect(() => {
    fetch("http://localhost:8000/api/specialties")
      .then((res) => res.json())
      .then((data) => {
        const apiSpecialties = Array.isArray(data)
          ? data
          : (data.results || []); // fallback if wrapped in results
        console.log(apiSpecialties)
        setSpecialtys([
          { name: "Tất cả" },
          ...apiSpecialties.map((spec) => ({
            name: spec.specialty,
          })),
        ]);
      })
      .catch(() => {
        // fallback to hardcoded if fetch fails
        setSpecialtys([
          { name: "Tất cả" },
        ]);
      });
  }, []);

  // Filter doctors
  const vnStr = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');

  const filteredDoctors = (doctors ?? []).filter(doc =>
    (selectedDept === "Tất cả" || vnStr(doc.specialty).toLowerCase() === vnStr(selectedDept).toLowerCase()) &&
    [doc.full_name, doc.degree, doc.specialty].some(field =>
      vnStr(field).toLowerCase().includes(vnStr(search).toLowerCase())
    )
  );

  // Calculate paging
  const totalPages = Math.ceil(filteredDoctors.length / perPage);
  const pagedDoctors = filteredDoctors.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Reset to first page if filters/search change
  useEffect(() => {
    setPage(1);
  }, [selectedDept, search]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

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
              onClick={() => {setSelectedDept(dept.name)
                console.log(dept.name === selectedDept)
              }}
              className={`flex justify-between items-center px-4 py-2 rounded ${
                selectedDept === dept.name
                  ? "bg-teal-700 text-white font-semibold"
                  : "bg-white text-gray-900 hover:bg-teal-50"
              }`}
            >
              <span>{dept.name === "Tất cả" ? "Tất cả" : "Khoa " + dept.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          {pagedDoctors.map((doc) =>(
            <div
              key={doc.user_id}
              className="flex gap-6 items-center border-b pb-6"
            >
              <img
                src={"http://localhost:8000" + doc.img}
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
                  <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                    <span>{doc.exam_fee} đồng</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {pagedDoctors.length === 0 && (
            <div className="col-span-2 text-gray-500 text-center py-8">
              Không tìm thấy bác sĩ phù hợp.
            </div>
          )}
        </div>
        {/* Paging Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-teal-600 text-teal-700 bg-white hover:bg-teal-50 disabled:opacity-50"
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded border ${
                  page === i + 1
                    ? "bg-teal-700 text-white border-teal-700"
                    : "border-teal-600 text-teal-700 bg-white hover:bg-teal-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-teal-600 text-teal-700 bg-white hover:bg-teal-50 disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}