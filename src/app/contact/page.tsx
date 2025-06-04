"use client"
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    topic: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert("Liên hệ gửi:\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-full overflow-hidden">
        <img
          src="/hospital.png"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center pt-8 pb-16 px-3">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Hãy liên hệ với chúng tôi
        </h1>
        <p className="mb-8 text-gray-500 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <form
          className="w-full max-w-xl flex flex-col gap-6"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Chủ đề
            </label>
            <select
              name="topic"
              value={form.topic}
              onChange={handleChange}
              className="w-full border border-teal-700 rounded px-3 py-2 outline-none bg-white"
              required
            >
              <option value="">Chọn chủ đề</option>
              <option value="Hỗ trợ kỹ thuật">Hỗ trợ kỹ thuật</option>
              <option value="Tư vấn dịch vụ">Tư vấn dịch vụ</option>
              <option value="Góp ý">Góp ý</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Nội dung
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Hãy ghi nội dung của bạn"
              rows={17}
              className="w-full border border-teal-700 rounded px-3 py-2 outline-none min-h-[180px] max-h-[350px] resize-vertical bg-white"
              required
            />
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="w-48 bg-teal-700 text-white rounded px-6 py-2 font-medium text-lg hover:bg-teal-800 transition"
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}