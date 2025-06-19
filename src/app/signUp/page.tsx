"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    password: "",
    password2: "",
    birth_day: "",
    gender: "",
    phone: "",
    address: "",
    gmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [registerGmail, setRegisterGmail] = useState("")
  const router = useRouter()
  
  const onChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    console.log(value)
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error (data)
      }
      setSuccess("Đăng ký thành công! Vui lòng nhập mã xác nhận.");
      setRegisterGmail(form.gmail);
      setShowOtp(true);
      setForm({
        full_name: "",
        username: "",
        password: "",
        password2: "",
        birth_day: "",
        gender: "",
        phone: "",
        address: "",
        gmail: "",
      });
    } catch (err) {
      console.log(err)
      setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const onConfirmOtp = async (e) => {
    e.preventDefault();
    setOtpError("");
    // You might need to send username/email + otp, adapt as needed
    try {
      const response = await fetch("http://localhost:8000/api/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gmail: registerGmail, otp }),
      });
      const data = await response.json();
      console.log("data: " + data)
      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.detail ||
            "Mã xác nhận không đúng hoặc đã hết hạn!"
        );
      }
      // Success
      setShowOtp(false);
      router.push("/signIn");
    } catch (err: any) {
      setOtpError(err.message || "Mã xác nhận không đúng hoặc đã hết hạn!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Đăng ký tài khoản</h1>
      <form
        className="w-full max-w-2xl flex flex-col gap-6"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div>
          <label className="block mb-1 font-medium">Họ và tên</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={onChange}
            placeholder="Nhập họ và tên"
            className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="Tên đăng nhập"
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
        <div>
            <label className="block mb-1 font-medium">Nhập lại Mật khẩu</label>
            <input
              type="password"
              name="password2"
              value={form.password2}
              onChange={onChange}
              placeholder="Nhập lại mật khẩu"
              className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
              required
            />
        </div>
        <div>
          <label className="block mb-1 font-medium">Ngày sinh</label>
          <input
            type="date"
            name="birth_day"
            value={form.birth_day}
            onChange={onChange}
            className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Giới tính</label>
            <select
              name="gender"
              value={form.gender}
              onChange={onChange}
              className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Nhập số điện thoại"
              className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="Nhập địa chỉ"
            className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            name="gmail"
            value={form.gmail}
            onChange={onChange}
            placeholder="Nhập email"
            className="w-full border border-teal-700 rounded px-3 py-2 outline-none"
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-48 bg-teal-700 text-white rounded px-6 py-2 font-medium text-lg cursor-pointer hover:bg-teal-800 transition"
          >
            Đăng ký
          </button>
        </div>
      </form>
      <div className="mt-6 flex items-center gap-2 text-base">
        <span>Đã có tài khoản?</span>
        <button
          className="px-4 py-1  text-teal-700  font-semibold cursor-pointer transition"
          onClick={() => router.push("/signIn")}
          type="button"
        >
          Đăng nhập
        </button>
      </div>
      {showOtp && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <form
            className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center"
            onSubmit={onConfirmOtp}
          >
            <h2 className="text-2xl font-bold mb-4">Xác nhận OTP</h2>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="Nhập mã OTP"
              className="border border-teal-700 rounded px-3 py-2 mb-4 outline-none"
              required
            />
            {otpError && <div className="text-red-600 mb-2">{otpError}</div>}
            <button
              type="submit"
              className="w-40 bg-teal-700 text-white rounded px-6 py-2 font-medium text-lg cursor-pointer hover:bg-teal-800 transition"
            >
              Xác nhận
            </button>
          </form>
        </div>
      )}
    </div>
  );
}