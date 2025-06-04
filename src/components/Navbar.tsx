"use client"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
    return(
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
                <li>
                  <Link href="#" className="text-black font-semibold hover:text-teal-700 transition hover:underline underline-offset-4">Blogs</Link>
                </li>
              </ul>
              <ul className="flex items-center gap-7">
                <Link href="signUp" className="text-teal-700 font-semibold hover:underline underline-offset-4">Đăng Ký</Link>
                <Link
                  href="/signIn"
                  className="block px-8 py-2 bg-teal-700 text-white font-bold rounded-md shadow hover:bg-teal-800 transition text-center"
                >
                    Đăng nhập
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
}