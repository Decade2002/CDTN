"use client"

import SearchDoctor from "@/components/SearchDoc";
import SetAppointment from "@/components/SetAppointment";
import { useEffect, useState } from "react";


export default function Doctor() {
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    const FetchAPI = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/appointmentregister/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
      }) .catch(err => setError(err))
      const data = await response.json()
      // console.log(data.doctors)
      setDoctors(data.doctors)
    } 
    FetchAPI()
  }, [])
  return(
      <div>
          <SetAppointment doctors={doctors}></SetAppointment>
          <SearchDoctor doctors={doctors}></SearchDoctor>
      </div>
  )
}