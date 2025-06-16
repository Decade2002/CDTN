"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter()

  useEffect(() => {
    const signInValue = JSON.parse(localStorage.getItem("isSignedIn"));
    console.log(signInValue)
    if(signInValue === "true")
      setIsSignedIn(true);
  }, []);

  // Fake logout
  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("access_token")
    setOpenDropdown(false);
    setShowPersonal(false);
    window.location.href = '/signIn';
  };


  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpenDropdown(false);
      }
    }
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <nav className="bg-gray-100 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="mt-2 flex-shrink-0 flex items-center">
            <img
              src="/logo2.png"
              alt="Logo"
              className="w-18 h-18"
            />
          </div>
          <div className="hidden md:flex items-center flex-1 justify-between ml-8">
            <ul className="flex items-center gap-7">
              <li>
                <Link
                  href="/"
                  className="text-teal-700 font-semibold pb-1 hover:underline underline-offset-4"
                >
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-black font-semibold hover:text-teal-700 transition hover:underline underline-offset-4">Dịch Vụ</Link>
              </li>
              <li>
                <Link href="/contact" className="text-black font-semibold hover:text-teal-700 transition hover:underline underline-offset-4">Liên Hệ</Link>
              </li>
              <li>
                <Link href="/doctor" className="text-black font-semibold hover:text-teal-700 transition hover:underline underline-offset-4">Bác sĩ</Link>
              </li>
            </ul>
            {!isSignedIn ? (
              <ul className="flex items-center gap-7">
                <Link href="/signUp" className="text-teal-700 font-semibold hover:underline underline-offset-4">Đăng Ký</Link>
                <Link
                  href="/signIn"
                  className="block px-8 py-2 bg-teal-700 text-white font-bold rounded-md shadow hover:bg-teal-800 transition text-center"
                >
                  Đăng nhập
                </Link>
              </ul>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-teal-600 shadow hover:bg-teal-50 transition"
                  onClick={() => setOpenDropdown((v) => !v)}
                >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
                  </svg>

                </button>
                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-teal-200 rounded-lg shadow-lg z-50">
                    <Link
                      className="block px-4 py-3 hover:bg-teal-50 text-teal-800 font-medium"
                      href="/personalinfo"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      href="/appointment"
                      className="block px-4 py-3 hover:bg-teal-50 text-teal-800 font-medium"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Xem lịch hẹn
                    </Link>
                    <Link
                      href="/results"
                      className="block px-4 py-3 hover:bg-teal-50 text-teal-800 font-medium"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Xem kết quả khám
                    </Link>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-teal-50 text-red-600 font-medium"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}