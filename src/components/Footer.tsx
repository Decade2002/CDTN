import React from "react";

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start px-8 gap-8">
        <div className="mb-8 md:mb-0 flex-shrink-0 flex flex-col items-start">
          <div className="flex items-center">
            <img src="/logo2.png" alt="Logo" className="w-20 h-20" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 ml-8">
          <div>
            <h3 className="font-bold mb-3">Dịch vụ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Giá cả</a></li>
              <li><a href="#" className="hover:underline">Chuyên ngành</a></li>
              <li><a href="#" className="hover:underline">Đánh giá</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Công ty</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Về chúng tôi</a></li>
              <li><a href="#" className="hover:underline">Liên hệ</a></li>
              <li><a href="#" className="hover:underline">Việc làm</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Liên hệ nhân viên hỗ trợ</a></li>
              <li><a href="#" className="hover:underline">Báo cáo lỗi</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Mạng xã hội</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="bg-white text-teal-700 rounded p-1 inline-flex">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.117 8.642V6.73c0-.64.065-1.005 1.01-1.005h1.706V2.64h-2.47C12.099 2.64 11.1 3.785 11.1 5.606V8.64H8.909V11.6h2.192v7.76h4.016v-7.76h2.006l.301-2.959h-2.307z"/>
                  </svg>
                </span>
                <a href="#" className="hover:underline">Facebook</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white text-teal-700 rounded p-1 inline-flex">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.5.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </span>
                <a href="#" className="hover:underline">Instagram</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white text-teal-700 rounded p-1 inline-flex">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.8 7.001a2.81 2.81 0 0 0-1.978-1.98C18.18 4.5 12 4.5 12 4.5s-6.18 0-7.821.522A2.81 2.81 0 0 0 2.2 7.003 29.19 29.19 0 0 0 1.5 12a29.19 29.19 0 0 0 .701 4.997 2.81 2.81 0 0 0 1.978 1.98C5.82 19.5 12 19.5 12 19.5s6.18 0 7.821-.523a2.81 2.81 0 0 0 1.978-1.98A29.19 29.19 0 0 0 22.5 12a29.19 29.19 0 0 0-.701-4.999zM10 15.5V8.5l6.5 3.5L10 15.5z"/>
                  </svg>
                </span>
                <a href="#" className="hover:underline">YouTube</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}