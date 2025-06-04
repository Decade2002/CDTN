"use client"

import { useState } from "react";

const categories = [
  { name: "Tất cả", count: 18 },
  { name: "Khoa Răng Miệng", count: 3 },
  { name: "Khoa Xương Cốt", count: 3 },
  { name: "Khoa Chuẩn Đoán", count: 3 },
  { name: "Khoa Tim Mạch", count: 3 },
  { name: "Khoa Phẫu Thuật", count: 3 },
  { name: "Khoa Mắt Mũi", count: 3 },
];

const services = [
  {
    id: 1,
    title: "Điều trị sâu răng",
    desc: "Loại bỏ phần răng bị sâu và trám lại giúp bảo vệ răng thật.",
    image: "/dental1.png",
    category: "Khoa Răng Miệng",
  },
  {
    id: 2,
    title: "Chỉnh nha - Niềng răng",
    desc: "Chỉnh hình răng lệch lạc, hô, móm bằng các phương pháp niềng hiện đại.",
    image: "/dental2.png",
    category: "Khoa Răng Miệng",
  },
  {
    id: 3,
    title: "Lấy cao răng & tẩy trắng răng",
    desc: "Loại bỏ mảng bám và làm trắng răng, giúp nụ cười tươi sáng.",
    image: "/dental3.png",
    category: "Khoa Răng Miệng",
  },

  {
    id: 4,
    title: "Điều trị thoái hóa khớp",
    desc: "Điều trị nội khoa và vật lý trị liệu giúp giảm đau và phục hồi vận động.",
    image: "/bone1.png",
    category: "Khoa Xương Cốt",
  },
  {
    id: 5,
    title: "Nắn chỉnh xương gãy",
    desc: "Xử lý chấn thương, gãy xương bằng bó bột hoặc phẫu thuật.",
    image: "/bone2.png",
    category: "Khoa Xương Cốt",
  },
  {
    id: 6,
    title: "Tiêm huyết tương giàu tiểu cầu (PRP)",
    desc: "Kích thích phục hồi mô xương, khớp bằng công nghệ sinh học.",
    image: "/bone3.png",
    category: "Khoa Xương Cốt",
  },

  {
    id: 7,
    title: "Chụp X-quang",
    desc: "Phát hiện tổn thương xương, phổi, và các cơ quan khác.",
    image: "/diagnostic1.png",
    category: "Khoa Chuẩn Đoán",
  },
  {
    id: 8,
    title: "Siêu âm tổng quát",
    desc: "Kiểm tra các cơ quan nội tạng, phát hiện bất thường sớm.",
    image: "/diagnostic2.png",
    category: "Khoa Chuẩn Đoán",
  },
  {
    id: 9,
    title: "Chụp cộng hưởng từ (MRI)",
    desc: "Chẩn đoán chính xác các bệnh lý não, tủy sống, khớp.",
    image: "/diagnostic3.png",
    category: "Khoa Chuẩn Đoán",
  },

  {
    id: 10,
    title: "Điện tâm đồ (ECG)",
    desc: "Kiểm tra hoạt động và nhịp đập của tim, phát hiện rối loạn tim mạch.",
    image: "/cardio1.png",
    category: "Khoa Tim Mạch",
  },
  {
    id: 11,
    title: "Siêu âm tim",
    desc: "Đánh giá cấu trúc và chức năng tim qua hình ảnh siêu âm.",
    image: "/cardio2.png",
    category: "Khoa Tim Mạch",
  },
  {
    id: 12,
    title: "Đo huyết áp 24h",
    desc: "Theo dõi huyết áp liên tục, hỗ trợ chẩn đoán tăng huyết áp.",
    image: "/cardio3.png",
    category: "Khoa Tim Mạch",
  },

  {
    id: 13,
    title: "Phẫu thuật nội soi",
    desc: "Ít xâm lấn, phục hồi nhanh, giảm đau sau mổ.",
    image: "/surgery1.png",
    category: "Khoa Phẫu Thuật",
  },
  {
    id: 14,
    title: "Phẫu thuật chỉnh hình",
    desc: "Điều trị dị tật, phục hồi thẩm mỹ và chức năng cơ thể.",
    image: "/surgery2.png",
    category: "Khoa Phẫu Thuật",
  },
  {
    id: 15,
    title: "Cắt bỏ u bướu",
    desc: "Loại bỏ các khối u lành tính hoặc ác tính bằng phương pháp hiện đại.",
    image: "/surgery3.png",
    category: "Khoa Phẫu Thuật",
  },

  {
    id: 16,
    title: "Phẫu thuật cận thị, loạn thị",
    desc: "Laser hoặc đặt kính nội nhãn giúp cải thiện thị lực.",
    image: "/eye1.png",
    category: "Khoa Mắt Mũi",
  },
  {
    id: 17,
    title: "Điều trị viêm xoang",
    desc: "Kết hợp thuốc và phẫu thuật nội soi mũi xoang.",
    image: "/eye2.png",
    category: "Khoa Mắt Mũi",
  },
  {
    id: 18,
    title: "Lấy dị vật mắt, mũi",
    desc: "Xử lý nhanh chóng an toàn các trường hợp dị vật đường thở, mắt.",
    image: "/eye3.png",
    category: "Khoa Mắt Mũi",
  },
];

export default function Services() {
  const [selectedCat, setSelectedCat] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const filteredServices = services.filter(
    (s) =>
      (selectedCat === "Tất cả" || s.category === selectedCat) &&
      (s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase()))
  );

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
              className={`flex justify-between items-center px-4 py-2 rounded ${
                selectedCat === cat.name
                  ? "bg-teal-700 text-white font-semibold"
                  : "bg-white text-gray-900 hover:bg-teal-50"
              }`}
            >
              <span className="text-left">{cat.name}</span>
              <span
                className={`ml-2 text-sm px-2 py-0.5 rounded ${
                  selectedCat === cat.name
                    ? "bg-teal-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((s) => (
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
            </div>
          </div>
        ))}
        {filteredServices.length === 0 && (
          <div className="col-span-3 text-gray-500 text-center py-8">
            Không tìm thấy dịch vụ phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}