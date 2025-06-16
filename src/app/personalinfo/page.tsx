"use client";
import { useState, useEffect } from "react";

export default function PersonalInformation({ onUpload }) {
  const [info, setInfo] = useState("");
  const [originalInfo, setOriginalInfo] = useState();
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cập nhật lại info nếu user prop thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const access_token = JSON.parse(localStorage.getItem('access_token'))
      console.log(access_token)
      const response = await fetch("http://localhost:8000/api/profile/", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data)
      setInfo(data);
      setOriginalInfo(data);
    }
    fetchData()
  }, []);

  // Kiểm tra xem đã chỉnh sửa gì chưa
  const isChanged = JSON.stringify(info) !== JSON.stringify(originalInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    if (isChanged) {
      setLoading(true)
      setError("")
      setOriginalInfo(info);
      console.log(info)
      try {
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        const response = await fetch("http://localhost:8000/api/profile/", {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        console.log(data.errors)
        if (!response.ok) {
          throw new Error(data?.errors);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setInfo(originalInfo);
  };

  const handleFileChange = (e) => {
    const fileObj = e.target.files[0];
    if (fileObj) setFile(fileObj);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    // Giả lập upload, thay bằng API thực tế nếu cần
    setUploadMessage("Đã upload thành công: " + file.name);
    onUpload && onUpload(file);
    setFile(null);
    e.target.reset();
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mt-12 mb-12">
      <h2 className="text-xl font-bold mb-4 text-teal-700">Thông tin cá nhân</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Họ và tên</label>
          <input
            type="text"
            name="full_name"
            value={info.full_name || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-teal-600"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Ngày sinh</label>
          <input
            type="date"
            name="birth_day"
            value={info.birth_day || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-teal-600"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Giới tính</label>
          <select
            name="gender"
            value={info.gender || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-teal-600"
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={info.phone || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-teal-600"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={info.address || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-teal-600"
          />
        </div>
        {error && <div className="text-red-600 font-medium">{error}</div>}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            className={`px-4 py-2 rounded font-semibold transition
            ${isChanged
                ? "bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                : "bg-gray-300 text-gray-800 cursor-not-allowed"
              }`}
            disabled={!isChanged}
            onClick={handleConfirm}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-semibold"
            onClick={handleCancel}
            disabled={!isChanged}
          >
            Huỷ
          </button>
        </div>
        <div>
          <label className="block font-medium mb-1">
            Upload hồ sơ bệnh án (Word, Ảnh)
          </label>
          <input
            type="file"
            accept="image/*,.doc,.docx,.pdf"
            className="border border-teal-600 rounded px-2 py-1"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="bg-teal-600 text-white rounded px-4 py-2 ml-3 font-semibold hover:bg-teal-700 transition"
            disabled={!file}
            onSubmit={handleFileUpload}
          >
            Tải lên
          </button>
          {uploadMessage && (
            <div className="text-green-600 mt-2">{uploadMessage}</div>
          )}
        </div>
      </form>
    </div>
  );
}