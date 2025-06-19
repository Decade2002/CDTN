"use client"

import { useEffect, useState } from "react";

// Add as many services as you want, including those from previous messages.
// (Here's some from before, and a few new ones for demo.)
const services = [
  {
    id: 1,
    title: "Điều trị sâu răng",
    desc: "Loại bỏ phần răng bị sâu và trám lại giúp bảo vệ răng thật.",
    image: "/dental1.png",
    category: "Khoa Răng hàm mặt",
  },
  {
    id: 2,
    title: "Chỉnh nha - Niềng răng",
    desc: "Chỉnh hình răng lệch lạc, hô, móm bằng các phương pháp niềng hiện đại.",
    image: "/dental2.png",
    category: "Khoa Răng hàm mặt",
  },
  {
    id: 3,
    title: "Lấy cao răng & tẩy trắng răng",
    desc: "Loại bỏ mảng bám và làm trắng răng, giúp nụ cười tươi sáng.",
    image: "/dental3.png",
    category: "Khoa Răng hàm mặt",
  },
  {
    id: 4,
    title: "Khám nội tổng quát",
    desc: "Tầm soát sức khỏe tổng thể, phát hiện sớm các bệnh lý nội khoa.",
    image: "/internal1.png",
    category: "Khoa Nội khoa",
  },
  {
    id: 5,
    title: "Siêu âm tim",
    desc: "Đánh giá cấu trúc và chức năng tim qua hình ảnh siêu âm.",
    image: "/cardio2.png",
    category: "Khoa Nội khoa",
  },
  {
    id: 6,
    title: "Khám da liễu",
    desc: "Chẩn đoán và điều trị các bệnh lý về da, tóc, móng.",
    image: "/derma1.png",
    category: "Khoa Da liễu",
  },
  {
    id: 7,
    title: "Điều trị mụn",
    desc: "Chăm sóc và điều trị mụn trứng cá hiệu quả.",
    image: "/derma2.png",
    category: "Khoa Da liễu",
  },
  {
    id: 8,
    title: "Khám mắt",
    desc: "Kiểm tra thị lực, sàng lọc các bệnh lý về mắt.",
    image: "/eye1.png",
    category: "Khoa Mắt",
  },
  {
    id: 9,
    title: "Phẫu thuật nội soi",
    desc: "Ít xâm lấn, phục hồi nhanh, giảm đau sau mổ.",
    image: "/surgery1.png",
    category: "Khoa Ngoại khoa",
  },
  {
    id: 10,
    title: "Cắt bỏ u bướu",
    desc: "Loại bỏ các khối u lành tính hoặc ác tính bằng phương pháp hiện đại.",
    image: "/surgery3.png",
    category: "Khoa Ngoại khoa",
  },
  {
    id: 11,
    title: "Khám nhi tổng quát",
    desc: "Kiểm tra sức khỏe định kỳ cho trẻ em.",
    image: "/pediatrics1.png",
    category: "Khoa Nhi khoa",
  },
  {
    id: 12,
    title: "Điều trị viêm xoang",
    desc: "Kết hợp thuốc và phẫu thuật nội soi mũi xoang.",
    image: "/ent1.png",
    category: "Khoa Tai mũi họng",
  },
  {
    id: 13,
    title: "Khám Sản phụ khoa",
    desc: "Kiểm tra sức khỏe phụ nữ, thai kỳ, tư vấn sinh sản.",
    image: "/obgyn1.png",
    category: "Khoa Sản phụ khoa",
  },
  {
    id: 14,
    title: "Khám tiền sản",
    desc: "Tư vấn, kiểm tra sức khỏe mẹ và bé trước sinh nhằm đảm bảo thai kỳ an toàn.",
    image: "/obgyn2.png",
    category: "Khoa Sản phụ khoa",
  },
  {
    id: 15,
    title: "Siêu âm thai",
    desc: "Theo dõi sự phát triển của thai nhi, phát hiện dị tật sớm.",
    image: "/obgyn3.png",
    category: "Khoa Sản phụ khoa",
  },
  {
    id: 16,
    title: "Khám mắt chuyên sâu",
    desc: "Tư vấn các bệnh lý phức tạp về mắt, theo dõi và điều trị lâu dài.",
    image: "/eye2.png",
    category: "Khoa Mắt",
  },
  {
    id: 17,
    title: "Phẫu thuật đục thủy tinh thể",
    desc: "Điều trị đục thủy tinh thể bằng phương pháp phẫu thuật hiện đại.",
    image: "/eye3.png",
    category: "Khoa Mắt",
  },
  {
    id: 18,
    title: "Khám da liễu thẩm mỹ",
    desc: "Tư vấn và điều trị các vấn đề về da cho mục đích thẩm mỹ.",
    image: "/derma3.png",
    category: "Khoa Da liễu",
  },
  {
    id: 19,
    title: "Khám dị ứng",
    desc: "Xét nghiệm, chẩn đoán và điều trị các bệnh lý dị ứng.",
    image: "/derma4.png",
    category: "Khoa Da liễu",
  },
  {
    id: 20,
    title: "Khám nhi tai mũi họng",
    desc: "Tầm soát và điều trị các bệnh lý tai mũi họng ở trẻ em.",
    image: "/ent2.png",
    category: "Khoa Tai mũi họng",
  },
  {
    id: 21,
    title: "Nội soi tai mũi họng",
    desc: "Chẩn đoán chính xác các bệnh lý tai mũi họng bằng thiết bị nội soi hiện đại.",
    image: "/ent3.png",
    category: "Khoa Tai mũi họng",
  },
  {
    id: 22,
    title: "Khám sức khỏe trẻ em",
    desc: "Theo dõi phát triển thể chất, tinh thần và tiêm chủng cho trẻ.",
    image: "/pediatrics2.png",
    category: "Khoa Nhi khoa",
  },
  {
    id: 23,
    title: "Khám tầm soát ung thư",
    desc: "Kiểm tra định kỳ phát hiện sớm các dấu hiệu ung thư.",
    image: "/oncology1.png",
    category: "Khoa Nội khoa",
  },
  {
    id: 24,
    title: "Điều trị đau đầu mãn tính",
    desc: "Chẩn đoán nguyên nhân và điều trị các loại đau đầu kéo dài.",
    image: "/internal2.png",
    category: "Khoa Nội khoa",
  },
  {
    id: 25,
    title: "Khám và tư vấn dinh dưỡng",
    desc: "Xây dựng chế độ ăn hợp lý cho trẻ em, người lớn và phụ nữ mang thai.",
    image: "/nutrition1.png",
    category: "Khoa Nhi khoa",
  },
  {
    id: 26,
    title: "Khám bệnh ngoài giờ",
    desc: "Hỗ trợ khám chữa bệnh vào các ngày cuối tuần và ngoài giờ hành chính.",
    image: "/general1.png",
    category: "Khoa Nội khoa",
  },
  {
    id: 27,
    title: "Khám tổng quát cho người cao tuổi",
    desc: "Theo dõi và chăm sóc sức khỏe toàn diện cho người già.",
    image: "/geriatrics1.png",
    category: "Khoa Nội khoa",
  },
];

export default function Services() {
  const [categories, setCategories] = useState([{ name: "Tất cả" }]);
  const [selectedCat, setSelectedCat] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9;

  // Fetch specialties from API
  useEffect(() => {
    fetch("http://localhost:8000/api/specialties")
      .then((res) => res.json())
      .then((data) => {
        // API may return array of specialties or an object with results
        const apiSpecialties = Array.isArray(data)
          ? data
          : (data.results || []);
        setCategories([
          { name: "Tất cả" },
          ...apiSpecialties.map((spec) => ({
            name: "Khoa " + (spec.specialty || spec.name || spec),
          })),
        ]);
      })
      .catch(() => {
        setCategories([
          { name: "Tất cả" },
          { name: "Khoa Sản phụ khoa" },
          { name: "Khoa Mắt" },
          { name: "Khoa Răng hàm mặt" },
          { name: "Khoa Nội khoa" },
          { name: "Khoa Da liễu" },
          { name: "Khoa Ngoại khoa" },
          { name: "Khoa Nhi khoa" },
          { name: "Khoa Tai mũi họng" },
        ]);
      });
  }, []);

  // Normalize Vietnamese strings for search/filter
  const vnStr = s =>
    s
      ? s
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
      : "";

  // Filter services
  const filteredServices = services.filter(
    (s) =>
      (selectedCat === "Tất cả" ||
        vnStr(s.category).toLowerCase() === vnStr(selectedCat).toLowerCase()) &&
      (vnStr(s.title).toLowerCase().includes(vnStr(search).toLowerCase()) ||
        vnStr(s.desc).toLowerCase().includes(vnStr(search).toLowerCase()))
  );

  // Paging
  const totalPages = Math.ceil(filteredServices.length / perPage);
  const pagedServices = filteredServices.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Reset page when filter/search changes
  useEffect(() => {
    setPage(1);
  }, [selectedCat, search]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="flex gap-8 bg-white min-h-screen p-6">
      <div className="w-80 shrink-0">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="border rounded px-3 py-2 w-full focus:border-teal-700 outline-none pr-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-teal-700 text-lg pointer-events-none">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCat(cat.name)}
              className={`flex px-4 py-2 rounded text-left ${
                selectedCat === cat.name
                  ? "bg-teal-700 text-white font-semibold"
                  : "bg-white text-gray-900 hover:bg-teal-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
          {pagedServices.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded shadow-sm border overflow-hidden flex flex-col max-h-[320px] min-h-[320px]"
            >
              <div className="w-full h-56 bg-gray-100">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="flex-1 flex flex-col p-4">
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-700 text-sm mb-2 flex-1 line-clamp-2">
                  {s.desc}
                </p>
                <span className="text-xs text-gray-500">{s.category}</span>
              </div>
            </div>
          ))}
          {pagedServices.length === 0 && (
            <div className="col-span-3 text-gray-500 text-center py-8">
              Không tìm thấy dịch vụ phù hợp.
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