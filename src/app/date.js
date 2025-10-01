"use client";

import { useState, useEffect } from "react";

export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleString("default", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return currentDate;
}
