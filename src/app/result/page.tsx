"use client";
import { useEffect, useState } from "react";

export default function MedicalResultTable() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    fetch("http://127.0.0.1:8000/api/medical-records/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch medical records");
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setMedicalRecords(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case "loading":
        return "Đang tiến hành";
      case "done":
        return "Đã hoàn thành";
      default:
        return status;
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-teal-700">Kết quả y tế</h2>
        {loading ? (
          <div className="text-teal-700">Đang tải...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-teal-600 rounded-lg bg-white shadow">
              <thead>
                <tr className="bg-teal-100 text-teal-800">
                  <th className="p-4 border-b border-teal-600 text-left w-32">
                    Trạng thái
                  </th>
                  <th className="p-4 border-b border-teal-600 text-left w-60">
                    Triệu chứng
                  </th>
                  <th className="p-4 border-b border-teal-600 text-left w-60">
                    Chuẩn đoán
                  </th>
                  <th className="p-4 border-b border-teal-600 text-left w-60">
                    Giải pháp trị liệu
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicalRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-6 text-gray-500"
                    >
                      Không có kết quả y tế nào.
                    </td>
                  </tr>
                ) : (
                  medicalRecords.map((record, idx) => (
                    <tr key={record.id || idx} className="hover:bg-teal-50">
                      <td className="p-4 border-b border-teal-100 align-top break-words whitespace-pre-line max-w-[8rem]">
                        {getStatusText(record.record_status)}
                      </td>
                      <td className="p-4 border-b border-teal-100 align-top break-words whitespace-pre-line max-w-[15rem]">
                        {record.record_note}
                      </td>
                      <td className="p-4 border-b border-teal-100 align-top break-words whitespace-pre-line max-w-[15rem]">
                        {record.diagnosis}
                      </td>
                      <td className="p-4 border-b border-teal-100 align-top break-words whitespace-pre-line max-w-[15rem]">
                        {record.treatment}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style jsx global>{`
        td,
        th {
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}