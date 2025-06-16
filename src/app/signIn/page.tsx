"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";

export default function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const onLogin = (access_token) => {
    localStorage.setItem('isSignedIn', JSON.stringify('true'))
    localStorage.setItem('access_token', JSON.stringify(access_token))
    console.log(JSON.parse(localStorage.getItem('user')))
    window.location.href = "/"
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Sai tên đăng nhập hoặc mật khẩu.");
      }
      onLogin(data.access_token);
    } catch (err) {
      setError(err.message || "Sai tên đăng nhập hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Đăng nhập</h1>
      <form
        className="w-full max-w-md flex flex-col gap-6"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div>
          <label className="block mb-1 font-medium">Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="Nhập tên đăng nhập"
            className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Nhập mật khẩu"
            className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
            required
          />
        </div>
        {error && <div className="text-red-600 font-medium">{error}</div>}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-48 bg-teal-700 text-white rounded px-6 py-2 font-medium text-lg hover:bg-teal-800 transition"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>
      </form>
      <div className="mt-6 flex items-center gap-2 text-base">
        <span>Quên mật khẩu?</span>
        <button
          className="px-4 py-1  text-teal-700  font-semibold cursor-pointer transition"
          onClick={() => router.push("/resetpassword")}
          type="button"
        >
          Tìm lại mật khẩu
        </button>
      </div>
    </div>
  );
}