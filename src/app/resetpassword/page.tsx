"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [gmail, setgmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Send OTP handler
  const handleSendOtp = async () => {
    setMsg("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/resend-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ gmail }),
      });
      if (!response.ok) throw new Error("Failed to send OTP. Please check your Gmail.");
      setOtpSent(true);
      setMsg("OTP has been sent to your Gmail.");
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Reset password handler
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gmail,
          otp,
          new_password: newPassword,
          new_password2: confirmPassword,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to reset password.");
      }
      setMsg("Password reset successful. You can now log in.");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      useRouter().push("/signIn")
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className="max-w-md mb-10 mx-auto mt-12 p-6 bg-white rounded shadow border border-teal-600"
    >
      <h2 className="text-xl font-bold mb-4 text-teal-700">Reset Password</h2>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-teal-600">Gmail</label>
        <input
          type="gmail"
          className="w-full p-2 border rounded border-teal-300"
          value={gmail}
          onChange={(e) => setgmail(e.target.value)}
          required
          disabled={otpSent}
        />
      </div>
      <button
        type="button"
        onClick={handleSendOtp}
        className="mb-4 w-full p-2 rounded bg-teal-600 text-white font-bold hover:bg-teal-700 disabled:bg-gray-300"
        disabled={!gmail || loading || otpSent}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-teal-600">New Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded border-teal-300"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={!otpSent}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-teal-600">Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded border-teal-300"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={!otpSent}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-teal-600">OTP</label>
        <input
          type="text"
          className="w-full p-2 border rounded border-teal-300"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          disabled={!otpSent}
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:bg-gray-300"
        disabled={!otpSent || loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
      {msg && <div className="mt-4 text-green-600 font-semibold">{msg}</div>}
      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
    </form>
  );
}