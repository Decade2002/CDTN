"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    fetch("http://localhost:8000/api/bills", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi lấy danh sách hóa đơn");
        return res.json();
      })
      .then((data) => {
        setBills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const billStatus = (bill) => {
    if(bill === "paid") return ""
    else if(bill === "unpaid") return "Hãy thanh toán trong 30p kể từ lúc đặt lịch"
    else return "Hết hạn"
  }

  const billType = (type) => {
    if(type === "deposit") return "Đặt cọc"
    else if(type === "test") return "Xét nghiệm"
    else if(type === "prescription") return "Thuốc"
    else return "Khám nghiệm"
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <span className="text-teal-600 text-lg font-semibold animate-pulse">
          Đang tải hóa đơn...
        </span>
      </div>
    );
  if (!bills?.length)
    return (
      <div className="flex justify-center items-center h-48">
        <span className="text-gray-500 text-lg">Không có hóa đơn nào.</span>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10 px-4">
      <h2 className="text-2xl font-bold mb-8 text-teal-700 text-center tracking-wide">
        Danh sách hóa đơn
      </h2>
      <div className="space-y-7">
        {bills.map((bill) => (
          <div
            key={bill.payment_id}
            className="bg-white rounded-xl shadow-md border border-teal-100 px-6 py-5 flex flex-col gap-2 relative hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <div className="text-teal-600 text-sm font-medium uppercase tracking-wide">
                  Mã đơn: {bill.order_code}
                </div>
                <div className="text-teal-600 text-sm font-medium uppercase tracking-wide">
                  Tiền: {billType(bill.payment_type)}
                </div>
                <div className="text-gray-500 text-xs">
                  Ngày tạo:{" "}
                  {bill.payment_timestamp
                    ? new Date(bill.payment_timestamp).toLocaleString()
                    : ""}
                </div>
                <div className="text-red-500 text-sm">
                  {
                    billStatus(bill.payment_status)
                  }
                </div>
              </div>
              <div className="flex items-center mt-2 sm:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    bill.payment_status === "paid"
                      ? "bg-teal-100 text-teal-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {bill.payment_status === "paid"
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </span>
              </div>
            </div>
            <hr className="my-2 border-teal-50" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="text-gray-700">
                  <b>Số tiền:</b>{" "}
                  <span className="text-lg text-teal-700 font-bold">
                    {bill.total_amount?.toLocaleString().split(".00")} VNĐ
                  </span>
                </div>
                <div className="text-gray-700">
                  <b>Phương thức:</b>{" "}
                  <span className="text-teal-600 font-medium">
                    {bill.payment_method || "Chưa chọn"}
                  </span>
                </div>
              </div>
              {bill.payment_status !== "paid" && (
                <button
                  onClick={() => {window.open(`http://localhost:8000/payment/${bill.payment_id}/`)}}
                  className="ml-auto inline-block px-5 py-2 text-white font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 shadow transition-colors"
                >
                  Thanh Toán
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}